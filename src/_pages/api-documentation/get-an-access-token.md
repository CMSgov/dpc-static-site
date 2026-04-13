---
layout: api-docs
page_title: "Get an Access Token"
seo_title: ""
description: ""
in-page-nav: true
---

# {{ page.page_title }}

DPC uses OAuth 2.0 to authorize API access. All API requests require an access token in the Authorization header.

## 1. Generate a JSON Web Token

Use the following tool to create a JSON Web Token (JWT). A JWT authenticates your organization with DPC. You'll need: 

- Your Private Key (<a href="{{ "/api-documentation/get-sandbox-credentials" | relative_url }}#upload-your-first-public-key">Create Public/Private Keys</a>)
- A registered Client Token (<a href="{{ "/api-documentation/get-sandbox-credentials" | relative_url }}#4-generate-a-client-token">Generate a client token</a>)
- Your Public Key ID (<a href="{{ "/api-documentation/get-an-access-token/manage-credentials" | relative_url }}#show-a-specific-public-key">Show a specific public key</a>)

<a class="usa-button" href="{{ "/jwt-tool.html" | relative_url }}">Generate a JWT</a>

**Example decoded header**
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

**Example decoded payload**
{% capture snippet %}
{
  "alg": "RS384",
  "kid": "{PUBLIC_KEY_ID}"
}
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" %}

## 2. Validate a JSON web token for DPC

The DPC API supports a `/Token/validate` endpoint. This endpoint lets you submit your signed JWT for DPC validation.

**Validate request**
{% capture snippet %}
POST /api/v1/Token/validate
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

**cURL command**
{% capture snippet %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Token/validate \
     -H 'Accept: application/json' \
     -H 'Content-Type: text/plain' \
     -X POST \
     -d "{SIGNED_JWT}"
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

**Response**

The API will return an `HTTP 200` if the JWT is valid. If not it will return an error message.

## 3. Create an access token
Obtaining an access token is the final step in connecting to the DPC API. 

An access token makes sure every request or interaction with the API can be traced back to the person who created the client token.

{% include alert.html variant="warning" heading="Important" text="The access token must be set in the Authorization header in every API request and has an expiration time of 5 minutes." %}

**Example header**
{% capture snippet %}
Authorization: Bearer {ACCESS_TOKEN}
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

### Request an access token

To create an access token, submit a valid JWT to the `/Token/auth` endpoint via a `POST` request. The `POST` request body's `Content Type` must be `application/x-www-form-urlencoded`. The body of the request must be urlencoded.

1. Set the JWT as the client_assertion form parameter

2. Add the remaining fields

| Parameters | Parameter Values | Fixed/Dynamic | Notes |
| :---: | :---: | :---: | :---: |
| "scope": | "system/\*.\*" | Fixed | The requested scope MUST be equal to or less than the scope originally granted to the authorized accessor. |
| "grant_type": | "client_credentials" | Dynamic | The format of the assertion as defined by the authorization server. |
| "client_assertion_type": | "urn:ietf:params:oauth:client-assertion-type:jwt-bearer" | Fixed | The format of the assertion as defined by the authorization server. |
| "client_assertion": | `SIGNED_JWT` | Dynamic | The assertion being used to authenticate the client. |

**Example token request**
{% capture snippet %}
POST /api/v1/Token/auth
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

**Example cURL command**
{% capture snippet %}
curl -v "https://sandbox.dpc.cms.gov/api/v1/Token/auth" \
     -H 'Content-Type: application/x-www-form-urlencoded' \
     -H 'Accept: application/json' \
     -X POST \
     -d "grant_type=client_credentials&scope=system%2F*.*&client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&client_assertion={SIGNED_JWT}"
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

The `SIGNED_JWT` above is returned from the JWT Tool.

**Example API response**

The endpoint response is a JSON object which contains the access token, the lifetime of the token (in seconds), and the authorized system scopes.

{% capture snippet %}
{
 "access_token": "{ACCESS_TOKEN}",
 "token_type": "bearer",
 "expires_in": 300,
 "scope": "system/*.*"
}
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" %}

{% include alert.html variant="warning" heading="Important" text="Your JWT must contain an expiration of five minutes." %}

Each token request needs its own JWT. Once your access token expires, you will need to generate a new JWT using the JWT Tool or create your own JWT to refresh your access token.

### Use the access token

Set the `access_token` returned in the previous section as your `bearer_token`. You'll need to set the `access_token` from the previous response as a header in most of your API calls, preceded by the word Bearer and a space.

As access tokens expire, you will need to generate new tokens.

The Postman collection includes an example of this flow in the pre-request scripts. 
