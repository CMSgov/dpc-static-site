---
layout: api-docs
page_title: "Get DPC sandbox credentials"
seo_title: ""
description: ""
in-page-nav: true
sidebar-links: 
  - name: API Documentation
    url: /api-documentation.html
    
    children:
    - name: Authorization
      url: /authorization
      
    - name: Attestation & Attribution
      url: /attestation-attribution

    - name: Export Data
      url: /export-data

    - name: Postman Collection
      url: /postman-collection

---

# {{ page.page_title }}

Welcome to the Data at the Point of Care (DPC) pilot API program! This documentation covers using the API in the sandbox environment with synthetic data.

## Getting started

<ol class="usa-process-list margin-top-1 docs-process-list">
  <li class="usa-process-list__item">
    <p class="usa-process-list__heading">Request access to the DPC sandbox</p>
    <p>
    Enter basic contact information and create a password. You’ll receive an email with a confirmation link within a few minutes.
    </p>
    <a href="https://sandbox.dpc.cms.gov/users/sign_in"
      class="usa-button usa-button--accent-warm margin-top-1"
      type="button">
      Visit the Sandbox {% include sprite.html icon="launch" size="2" %}
    </a>
  </li>
  <li class="usa-process-list__item docs-final-item">
    <p class="usa-process-list__heading">Create Public/Private Keys</p>
    <p>
    Public keys verify that access token requests come from an authorized application. They make sure the private key used to sign your <a href="{{ "/api-documentation/get-an-access-token" | relative_url }}">JSON Web Token (JWT)</a> matches a public key previously uploaded to DPC. 
    </p>
  </li>
</ol>

{% include alert.html variant="info" heading="Note" text="You need to store all files in this section (e.g., private.pem, public.pem, snippet.txt, snippet.txt.sig, signature.sig files) in one folder." %}

### Upload your first public key

<ol>
   <li>Generate a private key using this command invocation:
      {% capture snippet %}openssl genrsa -out private.pem 4096{% endcapture %}
      {% include copy_snippet.html code=snippet language="shell" can_copy=true %}
   </li>
   <li>Generate a public key:
      {% capture snippet %}openssl rsa -in private.pem -outform PEM -pubout -out public.pem{% endcapture %}
      {% include copy_snippet.html code=snippet language="shell" can_copy=true %}
   </li>
   <li>Save this key. You will enter it into the DPC Sandbox site.</li>
</ol>

### Create a public key signature

<ol>
   <li>Download the snippet.txt file from the DPC Sandbox, or by using this command invocation:
      {% capture snippet %}curl -JLO https://raw.githubusercontent.com/CMSgov/dpc-app/main/dpc-web/public/snippet.txt{% endcapture %}
      {% include copy_snippet.html code=snippet language="shell" can_copy=true %}
   </li>
   <li>Create your public key snippet:
      {% capture snippet %}openssl dgst -sign private.pem -sha256 -out snippet.txt.sig snippet.txt{% endcapture %}
      {% include copy_snippet.html code=snippet language="shell" can_copy=true %}
   </li>
   <li>Verify your public key snippet:
      {% capture snippet %}openssl dgst -verify public.pem -sha256 -signature snippet.txt.sig snippet.txt{% endcapture %}
      {% include copy_snippet.html code=snippet language="shell" can_copy=true %}

      <p>Response must say <code>Verified OK</code>. If you receive an <code>Unable to verify your public key</code> message, download the snippet.txt file again and re-generate your public key and signature pair.</p>
   </li>
   <li>Generate a verified public key signature:
      {% capture snippet %}openssl base64 -in snippet.txt.sig -out signature.sig{% endcapture %}
      {% include copy_snippet.html code=snippet language="shell" can_copy=true %}
   </li>
</ol>

  
## 3. Log into the DPC Sandbox

You’ll complete the remaining steps on the DPC Sandbox site.

## 4. Generate a client token 

Client tokens are issued to your organization and authenticate your access to the API.

1. Select **New token** in the DPC Sandbox.  
2. Label your token with a recognizable name that includes the environment you’re requesting access for.  
3. Select **Create token**.

You need to create a token for every provider organization that works with the API.

{% include alert.html variant="warning" heading="Important" text="This is the only time this client token will be visible. You’ll want to save it for later use." %}

Make sure to renew your token every year.

## 5. Enter your public key 

Paste the entire contents of the public key you created earlier (`public.pem`) into the **Public key** field. Include the “BEGIN PUBLIC KEY” and “END PUBLIC KEY” tags before and after your key.    

{% include alert.html variant="info" heading="Note" text="You’ll need your public key ID to get an access token." %}

## 6. Enter your public key signature 

1. Paste the contents of your verified public key signature (signature.sig file) into the **Public key signature** field.  
2. Click **Add Key**.