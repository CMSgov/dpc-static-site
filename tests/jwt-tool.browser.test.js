import { test as base, describe, expect, inject } from 'vitest';
import { chromium } from 'playwright';

const PAGE_URL = inject('jwtToolUrl');

const test = base.extend({
  browser: [
    async ({}, use) => {
      const browser = await chromium.launch();
      await use(browser);
      await browser.close();
    },
    { scope: 'worker' }
  ],
  page: async ({ browser }, use) => {
    const page = await browser.newPage();
    await use(page);
    await page.close();
  }
});

async function generateTestKeyPair() {
  const keyPair = await crypto.subtle.generateKey(
    {
      name: 'RSASSA-PKCS1-v1_5',
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-384'
    },
    true,
    ['sign', 'verify']
  );
  const exported = await crypto.subtle.exportKey('pkcs8', keyPair.privateKey);
  const base64 = Buffer.from(exported).toString('base64');
  const wrapped = base64.match(/.{1,64}/g).join('\n');
  const privateKeyPem = `-----BEGIN PRIVATE KEY-----\n${wrapped}\n-----END PRIVATE KEY-----`;
  return { privateKeyPem, publicKey: keyPair.publicKey };
}

function decodeBase64UrlJson(part) {
  const padded = part.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(Buffer.from(padded, 'base64').toString('utf-8'));
}

describe('JWT tool page (E2E)', () => {
  test('generates a verifiable JWT when the form is submitted', async ({ page }) => {
    const { privateKeyPem, publicKey } = await generateTestKeyPair();
    await page.goto(PAGE_URL);

    await page.getByLabel('Paste your Private Key').fill(privateKeyPem);
    await page.getByLabel('Paste your Client Token').fill('test-client-token');
    await page.getByLabel('Paste your Public Key ID').fill('fd38276d-786a-49ec-9987-5e7b258e77cf');
    await page.getByLabel('Select an Environment').selectOption('sandbox');

    await page.getByRole('button', { name: 'Generate JWT' }).click();

    const output = page.getByLabel('Generated JWT');
    await expect.poll(() => output.inputValue()).toMatch(/^[^.]+\.[^.]+\.[^.]+$/);

    const jwt = await output.inputValue();
    const [headerB64, payloadB64, signatureB64] = jwt.split('.');

    const header = decodeBase64UrlJson(headerB64);
    const payload = decodeBase64UrlJson(payloadB64);

    expect(header.alg).toBe('RS384');
    expect(header.kid).toBe('fd38276d-786a-49ec-9987-5e7b258e77cf');
    expect(header.typ).toBe('JWT');

    expect(payload.iss).toBe('test-client-token');
    expect(payload.sub).toBe('test-client-token');
    expect(payload.aud).toBe('https://sandbox.dpc.cms.gov/api/v1/Token/auth');
    expect(typeof payload.exp).toBe('number');

    const signature = Uint8Array.from(
      atob(signatureB64.replace(/-/g, '+').replace(/_/g, '/')),
      c => c.charCodeAt(0)
    );
    const message = new TextEncoder().encode(`${headerB64}.${payloadB64}`);
    const valid = await crypto.subtle.verify(
      'RSASSA-PKCS1-v1_5',
      publicKey,
      signature,
      message
    );
    expect(valid).toBe(true);
  });

  test('enables the copy button after a JWT is generated', async ({ page }) => {
    const { privateKeyPem } = await generateTestKeyPair();
    await page.goto(PAGE_URL);

    const copyButton = page.getByRole('button', { name: 'Copy' });
    await expect.poll(() => copyButton.getAttribute('aria-disabled')).toBe('true');

    await page.getByLabel('Paste your Private Key').fill(privateKeyPem);
    await page.getByLabel('Paste your Client Token').fill('tok');
    await page.getByLabel('Paste your Public Key ID').fill('kid');
    await page.getByLabel('Select an Environment').selectOption('sandbox');
    await page.getByRole('button', { name: 'Generate JWT' }).click();

    await expect.poll(() => copyButton.getAttribute('aria-disabled')).toBeNull();
  });
});
