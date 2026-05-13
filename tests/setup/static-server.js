import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { createServer } from 'node:http';
import { resolve } from 'node:path';
import sirv from 'sirv';

const SITE_DIR = resolve(process.cwd(), '_site');
const ENTRY_FILE = resolve(SITE_DIR, 'jwt-tool.html');

export default async function setup({ provide }) {
  if (!existsSync(ENTRY_FILE)) {
    console.log('[test-setup] _site/jwt-tool.html missing — running jekyll:build...');
    execSync('npm run jekyll:build', { stdio: 'inherit' });
  }

  const handler = sirv(SITE_DIR, { extensions: ['html'] });
  const server = createServer((req, res) => {
    handler(req, res, () => {
      res.statusCode = 404;
      res.end('Not found');
    });
  });

  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;
  provide('jwtToolUrl', `${baseUrl}/jwt-tool`);

  return async () => {
    await new Promise(r => server.close(r));
  };
}
