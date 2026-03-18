---
layout: api-docs
page_title: "Postman Collection"
seo_title: ""
description: ""
in-page-nav: true
in-page-nav-levels: "h2"
---

# {{ page.page_title }}

This collection contains example requests to public endpoints for the DPC API. You must have the Postman app downloaded to use this collection, and have your [local vault configured](https://learning.postman.com/docs/sending-requests/postman-vault/postman-vault-secrets/).

Use the vault to ensure private information isn't synced to the cloud. This collection includes requests, the sandbox environment, and global variables to import into your Postman app.
## Get Postman collection

Log into the DPC sandbox portal. 
Fill in your `key_id`. This is the DPC ID of your public key, which is returned to you when the public key is uploaded to the sandbox portal. You need this to generate a JSON Web Token (JWT) which will be exchanged for an access token.

Add the following values to your vault:
- `client_token`: Your client token is generated through the sandbox portal. Be sure to save a copy of your token in a safe place.
- `private_key`: If you do not already have your public and private keys, please generate your public/private key pair through the sandbox portal.
Within your vault, go to settings and turn on **"Enable support in scripts"**.

With these values in place, the JWT and a fresh access token are automatically generated for you before each request in the Postman collection. This prevents you from having to manually refresh the access token every five minutes while using the collection.

You can find additional instructions and details within the description of each request in the Postman collection.
