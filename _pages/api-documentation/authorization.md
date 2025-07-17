---
layout: api-docs
page_title: "Authorization"
seo_title: ""
description: ""
in-page-nav: true
---

# {{ page.page_title }}

## 1. Request Access

Any Fee-for-Service provider organization or Health IT implementer may [request access](https://sandbox.dpc.cms.gov/users/sign_up) to the sandbox environment and obtain synthetic data by signing-up for an account through the [Sandbox Sign Up / Login](https://sandbox.dpc.cms.gov/users/sign_in) page. You will receive a confirmation email from CMS upon account creation.

Once your account has been assigned to an organization, you will be notified with a second email, which will include next steps and an invite to join our [Google Group](https://groups.google.com/g/dpc-api) community. At this time, you may log in to the DPC Portal at [https://dpc.cms.gov](https://dpc.cms.gov) to create your first client token and start your journey with the DPC pilot API!

## 2. Client Tokens

Client tokens help monitor who is accessing the API through your account. A *client* token is required to create an *access* token, which is needed with every request made to the API. This ensures every interaction with the API can be traced back to the person who created the client token.

### Create client token

You MUST create different client tokens for every provider organization that works with the API.

Your first client token must be created through the DPC Portal.

1. **Log in to your account in the [DPC Portal](https://sandbox.dpc.cms.gov/users/sign_in)** and select **+ New Token**.
2. **Add a Label:** Title your token with a recognizable name that includes the environment for which you are requesting access.
3. Click "Create Token" to generate your client token.

This is the only time that this client token will be visible to you. Ensure that the value is recorded in a safe and durable location.

After successfully accessing the API, you may choose to add client tokens through the API or continue using the DPC Portal.

### Create multiple client tokens

You may create as many tokens as you like via your account in the DPC Portal using the instructions above. You can also create multiple client tokens at once by making a POST request to the /Token endpoint.

The /Token endpoint accepts two (optional) query parameters: `label` (sets a human-readable label for the token) and `expiration` (sets a custom expiration for the client_token).

Example request:
```
POST /api/v1/Token
```

Example cURL:
```
curl -d '' -v https://sandbox.dpc.cms.gov/api/v1/Token?label={token label}&expiration={ISO formatted dateTime} \
     -H 'Authorization: Bearer {access_token}' \
     -H 'Accept: application/json' \
     -H 'Content-Type: application/json' \
     -X POST
```

### List all client tokens

All client tokens registered by your organization for a given environment can be listed by making a GET request to the /Token endpoint.

Example request:
```
GET /api/v1/Token
```

Example cURL:
```
curl -v https://sandbox.dpc.cms.gov/api/v1/Token \
     -H 'Authorization: Bearer {access_token}' \
     -H 'Accept: application/json' \
     -H 'Content-Type: application/json' \
     -X GET
```

### Delete client tokens

You may want to delete a client token from the sandbox environment if a Health IT implementer no longer exists or needs access to the API. This can be done by clicking the “x” on the right side of each client token listed in the DPC Portal or by sending a DELETE request to the /Token endpoint using the unique ID of the client_token.

Example request:
```
DELETE /api/v1/Token/{client_token id}
```

Example cURL:
```
curl -v https://sandbox.dpc.cms.gov/api/v1/Token/{client_token id} \
     -H 'Authorization: Bearer {access_token}' \
     -H 'Accept: application/json' \
     -H 'Content-Type: application/json' \
     -X DELETE
```

## 3. Public Keys

Public keys verify that client token requests are coming from an authorized application. This is by verifying that the private key used to sign your JSON Web Token (JWT) also matches a public key previously uploaded to DPC. Please complete the upload of your public key + signature through the DPC Portal.

**ALL files** (e.g., private.pem, public.pem, snippet.txt, snippet.txt.sig, signature.sig files) **in this section must be stored in ONE folder.**

### Upload your first public key

1. Generate a private key:
   ```
   openssl genrsa -out private.pem 4096
   ```

2. Generate a public key:
   ```
   openssl rsa -in private.pem -outform PEM -pubout -out public.pem
   ```

3. Paste the contents of your public key (public.pem file) into the ‘Public Key’ field in the DPC Portal. You must include the “BEGIN PUBLIC KEY” and “END PUBLIC KEY” tags before and after your key.

4. Title your public key with a descriptive name that can be easily recognized for future purposes.

5. Proceed to creating your public key signature.

### Create a public key signature

1. Download the snippet.txt file located in the DPC Portal to create a signature.
   ```
   curl -JLO https://raw.githubusercontent.com/CMSgov/dpc-app/main/dpc-web/public/snippet.txt 
   ```

2. Verify the type of file (Mac/Linux):
   ```
   file snippet.txt 
   ```
   Response must yield: `snippet.txt: ASCII text, with no line terminators`

3. Create your public key snippet:
   ```
   openssl dgst -sign private.pem -sha256 -out snippet.txt.sig snippet.txt
   ```

4. Verify your public key snippet:
   ```
   openssl dgst -verify public.pem -sha256 -signature snippet.txt.sig snippet.txt
   ```
   Response must yield: `Verified Ok`

5. Generate a verified public key signature:
   ```
   openssl base64 -in snippet.txt.sig -out signature.sig
   ```

6. Paste the contents of your verified public key signature (signature.sig file) into the ‘Public Key Signature’ field in your DPC Account.

7. Click "Add Key" to upload your public key.

If you see the error message stating, "Unable to verify your public key" after uploading your public key, re-download the snippet.txt file and re-generate your public key and signature pair.

### List all public keys

All public keys registered by your organization for an environment can be listed by making a GET request to the /Key endpoint.

Example request:
```
GET /api/v1/Key
```

Example cURL:
```
curl -v http://localhost:3002/v1/Key \
     -H 'Authorization: Bearer {access_token}' \
     -H 'Accept: application/json' \
     -H 'Content-Type: application/json' \
     -X GET
```

### List a specific public key

Specific public keys can be listed by making a GET request to the /Key endpoint using the unique id of the public key.

Example request:
```
GET /api/v1/Key/{public key id}
```

Example cURL:
```
curl -v https://sandbox.dpc.cms.gov/api/v1/Key/{public key id} \
     -H 'Authorization: Bearer {access_token}' \
     -H 'Accept: application/json' \
     -H 'Content-Type: application/json' \
     -X GET
```

### Delete public keys

Public keys can be removed by sending a DELETE request to the /Key endpoint using the unique ID of the public key.

Example request:
```
DELETE /api/v1/Key/{public key ID}
```

Example cURL:
```
curl -v https://sandbox.dpc.cms.gov/api/v1/Key/{public key id} \
     -H 'Authorization: Bearer {access_token}' \
     -H 'Accept: application/json' \
     -H 'Content-Type: application/json' \
     -X DELETE
```

## 4. IP Addresses

Note: This step is required only for access to production data. You complete this step in the [DPC Portal](https://dpc.cms.gov).

You'll need to provide a public IP address for your organization. This address is associated with the systems that will be accessing production data. You'll choose a descriptive name for your address and enter it in the Portal in the form XXX.XXX.XX.XX.

Note: You can use a maximum of 8 IP addresses. Only IPv4 addresses are allowed. DPC doesn't support IP address ranges.

## 5. JSON Web Tokens

A JSON Web Token (JWT) authenticates your organization with DPC.

Complete the following steps to generate your JWT via the JWT Tool.

1. Input your Private Key.
2. Input your Client Token.
3. Input your Public Key ID (found under "Public Keys” in your DPC Portal).
4. Click "Generate JWT".
5. Copy "Your JWT" to begin validation for DPC.

To generate your own JWT:

1. Generate your JWT payload:
   ```
   {
     "iss": {client_token},
     "sub": {client_token},
     "aud": "https://sandbox.dpc.cms.gov/api/v1/Token/auth",
     "exp": {current datetime + 5 minutes},
     "jti": {JWT_unique_id}
   }
   ```
2. Generate your JWT header:
   ```
   {
     "alg": "RS384",
     "kid": "{public_key_id}"
   }
   ```
3. Sign your JWT with your header and private key.

### Validate a JSON web token for DPC

The DPC API supports a /Token/validate endpoint, which allows you to submit your signed JWT for DPC validation.

Example request:
```
POST /api/v1/Token/validate
```

Example cURL:
```
curl -v https://sandbox.dpc.cms.gov/api/v1/Token/validate \
     -H 'Accept: application/json' \
     -H 'Content-Type: text/plain' \
     -X POST \
     -d "{Signed JWT}"
```

## 6. Access/Bearer Token

Obtaining an access token is the final step in connecting to the DPC API. **The access token must be set in the Authorization header in EVERY API request and has a maximum expiration time of 5 MINUTES.**

Example header:
```
Authorization: Bearer {access_token}
```

### Obtain an access_token

To receive an access token, the valid JWT must be submitted to the /Token/auth endpoint via a POST request.

Example cURL:
```
curl -v "https://sandbox.dpc.cms.gov/api/v1/Token/auth" \
     -H 'Content-Type: application/x-www-form-urlencoded' \
     -H 'Accept: application/json' \
     -X POST \
     -d "grant_type=client_credentials&scope=system%2F*.*&client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&client_assertion={self-signed JWT}"
```

### Obtain a bearer_token

Set your access_token returned in the previous section as your bearer_token. You will need to set the "{access_token value}" from the previous response as a header in most of your API calls preceded by the word *Bearer* and a space.
