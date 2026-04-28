---
layout: api-docs
page_title: "Postman Collection"
seo_title: ""
description: "Use the DPC Postman Collection to test API requests against the public endpoints and sandbox environment with auto-generated JWTs and access tokens."
in-page-nav: true
---

# {{ page.page_title }}

DPC provides a collection of example requests to public DPC endpoints, the sandbox environment, and global variables. 

<a class="usa-button" href="{{ "/assets/downloads/postman.zip" | relative_url }}">Download Postman Collection</a>

## Setting up the Postman collection

1. Log into the DPC Sandbox and copy the `PUBLIC_KEY_ID` you created when setting up your [DPC Sandbox credentials]({{ '/api-documentation/get-sandbox-credentials.html' | relative_url }}).
   - This is the DPC ID of your public key, which is returned to you when the public key is [uploaded to the DPC Sandbox]({{ '/api-documentation/get-sandbox-credentials.html#4-upload-your-public-key-in-the-dpc-sandbox-site' | relative_url }}). You need this to generate a JSON Web Token (JWT) which will be exchanged for an access token.
2. Open the DPC collection in Postman  
3. Paste the `PUBLIC_KEY_ID` into the corresponding variable in Postman  
4. Add the following values to your vault:
   - **client_token:** Your [client token]({{ '/api-documentation/get-sandbox-credentials.html#2-generate-a-client-token-in-the-sandbox-site' | relative_url }}) is generated through the DPC Sandbox. Be sure to save a copy of your token in a safe place.  
   - **Private Key:** If you do not already have your [public and private keys]({{ '/api-documentation/get-sandbox-credentials.html#3-create-a-public-key' | relative_url }}), generate your public/private key pair through the DPC Sandbox.  
       
5. Within your vault, go to settings and turn on **Enable support in scripts**.

The JWT and access token are automatically generated before each request vs. having to manually refresh the access token every 5 minutes as described in [Get an access token]({{ '/api-documentation/get-access-token.html' | relative_url }}).