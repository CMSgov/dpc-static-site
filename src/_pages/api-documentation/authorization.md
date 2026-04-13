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

You may create as many tokens as you like via your account in the DPC Portal using the instructions above. You can also create multiple client tokens at once by making a POST request to the `/Token` endpoint.

The `/Token` endpoint accepts two (optional) query parameters: 
- `label` (sets a human-readable label for the token) and 
- `expiration` (sets a custom expiration for the client_token).

**Example request**
{% capture snippet %}
POST /api/v1/Token
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

**Example cURL command**

{% capture snippet %}
curl -d '' -v https://sandbox.dpc.cms.gov/api/v1/Token?label={TOKEN_LABEL}&expiration={ISO_DATETIME} \
   -H 'Authorization: Bearer {ACCESS_TOKEN}' \
   -H 'Accept: application/json' \
   -H 'Content-Type: application/json' \
   -X POST
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

### List all client tokens

All client tokens registered by your organization for a given environment can be listed by making a GET request to the /Token endpoint.

**Example request**
{% capture snippet %}
GET /api/v1/Token
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

**Example cURL command**
{% capture snippet %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Token \
   -H 'Authorization: Bearer {ACCESS_TOKEN}' \
   -H 'Accept: application/json' \
   -H 'Content-Type: application/json' \
   -X GET
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

### Delete client tokens

You may want to delete a client token from the sandbox environment if a Health IT implementer no longer exists or needs access to the API. This can be done by clicking the “x” on the right side of each client token listed in the DPC Portal or by sending a DELETE request to the /Token endpoint using the unique ID of the client_token.

**Example request**
{% capture snippet %}
DELETE /api/v1/Token/{CLIENT_TOKEN_ID}
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

**Example cURL command**
{% capture snippet %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Token/{CLIENT_TOKEN_ID} \
   -H 'Authorization: Bearer {ACCESS_TOKEN}' \
   -H 'Accept: application/json' \
   -H 'Content-Type: application/json' \
   -X DELETE
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

## 3. Public Keys

Public keys verify that client token requests are coming from an authorized application. This is by verifying that the private key used to sign your JSON Web Token (JWT) also matches a public key previously uploaded to DPC. Please complete the upload of your public key + signature through the DPC Portal.

**ALL files** (e.g., private.pem, public.pem, snippet.txt, snippet.txt.sig, signature.sig files) **in this section must be stored in ONE folder.**

### Upload your first public key

<ol>
   <li>Generate a private key:
      {% capture snippet %}openssl genrsa -out private.pem 4096{% endcapture %}
      {% include copy_snippet.html code=snippet language="shell" can_copy=true %}
   </li>
   <li>Generate a public key:
      {% capture snippet %}openssl rsa -in private.pem -outform PEM -pubout -out public.pem{% endcapture %}
      {% include copy_snippet.html code=snippet language="shell" can_copy=true %}
   </li>
   <li>Paste the contents of your public key (public.pem file) into the ‘Public Key’ field in the DPC Portal. You must include the “BEGIN PUBLIC KEY” and “END PUBLIC KEY” tags before and after your key.</li>
   <li>Title your public key with a descriptive name that can be easily recognized for future purposes.</li>
   <li>Proceed to creating your public key signature.</li>
</ol>

### Create a public key signature
<ol>
   <li>
      Download the snippet.txt file located in the DPC Portal to create a signature.
      {% capture snippet %}curl -JLO https://raw.githubusercontent.com/CMSgov/dpc-app/main/dpc-web/public/snippet.txt {% endcapture %}
      {% include copy_snippet.html code=snippet language="shell" can_copy=true %}
   </li>
   <li>
      Verify the type of file (Mac/Linux):
      {% capture snippet %}file snippet.txt {% endcapture %}
      {% include copy_snippet.html code=snippet language="shell" can_copy=true %}

      <p>Response must yield: <code>snippet.txt: ASCII text, with no line terminators</code></p>
   </li>
   <li>
      Create your public key snippet:
      {% capture snippet %}openssl dgst -sign private.pem -sha256 -out snippet.txt.sig snippet.txt{% endcapture %}
      {% include copy_snippet.html code=snippet language="shell" can_copy=true %}
   </li>
   <li>
      Verify your public key snippet:
      {% capture snippet %}openssl dgst -verify public.pem -sha256 -signature snippet.txt.sig snippet.txt{% endcapture %}
      {% include copy_snippet.html code=snippet language="shell" can_copy=true %}

      <p>Response must yield: <code>Verified OK</code></p>
   </li>
   <li>
      Generate a verified public key signature:
      {% capture snippet %}openssl base64 -in snippet.txt.sig -out signature.sig{% endcapture %}
      {% include copy_snippet.html code=snippet language="shell" can_copy=true %}
   </li>
   <li>Paste the contents of your verified public key signature (<code>signature.sig</code> file) into the <b>Public Key Signature</b> field in your DPC Account.</li>
   <li>Click "Add Key" to upload your public key.</li>
</ol>

If you see the error message stating, "Unable to verify your public key" after uploading your public key, re-download the <code>snippet.txt</code> file and re-generate your public key and signature pair.

### List all public keys

All public keys registered by your organization for an environment can be listed by making a GET request to the /Key endpoint.

**Example request**
{% capture snippet %}
GET /api/v1/Key
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

**Example cURL command**
{% capture snippet %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Key \
     -H 'Authorization: Bearer {ACCESS_TOKEN}' \
     -H 'Accept: application/json' \
     -H 'Content-Type: application/json' \
     -X GET
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

### List a specific public key

Specific public keys can be listed by making a GET request to the /Key endpoint using the unique id of the public key.

**Example request**
{% capture snippet %}
GET /api/v1/Key/{PUBLIC_KEY_ID}
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

**Example cURL command**
{% capture snippet %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Key/{PUBLIC_KEY_ID} \
     -H 'Authorization: Bearer {ACCESS_TOKEN}' \
     -H 'Accept: application/json' \
     -H 'Content-Type: application/json' \
     -X GET
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

### Delete public keys

Public keys can be removed by sending a DELETE request to the /Key endpoint using the unique ID of the public key.

**Example request**
{% capture snippet %}
DELETE /api/v1/Key/{PUBLIC_KEY_ID}
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}


**Example cURL command**
{% capture snippet %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Key/{PUBLIC_KEY_ID} \
     -H 'Authorization: Bearer {ACCESS_TOKEN}' \
     -H 'Accept: application/json' \
     -H 'Content-Type: application/json' \
     -X DELETE
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

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
{% capture snippet %}
   {
     "iss": "{CLIENT_TOKEN}",
     "sub": "{CLIENT_TOKEN}",
     "aud": "https://sandbox.dpc.cms.gov/api/v1/Token/auth",
     "exp": {EXPIRATION},
     "jti": "{JWT_ID}"
   }
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" %}

{% include alert.html variant="info" heading="Note" text="EXPIRATION is a Unix timestamp set to the current datetime plus 5 minutes. JWT_ID is a string that needs to be unique to this request and can only be used once." %}

2. Generate your JWT header:
   {% capture snippet %}
   {
     "alg": "RS384",
     "kid": "{PUBLIC_KEY_ID}"
   }
   {% endcapture %}
   {% include copy_snippet.html code=snippet language="json" %}

3. Sign your JWT with your header and private key.

### Validate a JSON web token for DPC

The DPC API supports a /Token/validate endpoint, which allows you to submit your signed JWT for DPC validation.

**Example request**
{% capture snippet %}
POST /api/v1/Token/validate
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

**Example cURL command**
{% capture snippet %}
curl -i https://sandbox.dpc.cms.gov/api/v1/Token/validate \
     -H 'Accept: application/json' \
     -H 'Content-Type: text/plain' \
     -X POST \
     -d "{SIGNED_JWT}"
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}


## 6. Access/Bearer Token

Obtaining an access token is the final step in connecting to the DPC API. **The access token must be set in the Authorization header in EVERY API request and has a maximum expiration time of 5 MINUTES.**

**Example header**
{% capture snippet %}
Authorization: Bearer {ACCESS_TOKEN}
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

### Obtain an access_token

To receive an access token, the valid JWT must be submitted to the /Token/auth endpoint via a POST request.

**Example cURL command**
{% capture snippet %}
curl -v "https://sandbox.dpc.cms.gov/api/v1/Token/auth" \
     -H 'Content-Type: application/x-www-form-urlencoded' \
     -H 'Accept: application/json' \
     -X POST \
     -d "grant_type=client_credentials&scope=system%2F*.*&client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&client_assertion={SIGNED_JWT}"
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

### Obtain a bearer_token

Set your access_token returned in the previous section as your bearer_token. You will need to set the `ACCESS_TOKEN` from the previous response as a header in most of your API calls preceded by the word *Bearer* and a space.
