---
layout: api-docs
page_title: "Get a Bearer Token"
seo_title: ""
description: ""
in-page-nav: true
---

# {{ page.page_title }}

DPC uses OAuth 2.0 to authorize API access. All API requests require a bearer token in the Authorization header.

## 1. Generate a JSON Web Token

{% include alert.html variant="warning" text="Your JWT must contain an expiration of five minutes." slim="true" classNames="measure-6" %}

Use the following tool to create a JSON Web Token (JWT). A JWT authenticates your organization with DPC. You'll need: 

- Your Private Key (<a href="{{ "/api-documentation/get-sandbox-credentials" | relative_url }}#upload-your-first-public-key">Create Public/Private Keys</a>)
- A registered Client Token (<a href="{{ "/api-documentation/get-sandbox-credentials" | relative_url }}#4-generate-a-client-token">Generate a client token</a>)
- Your Public Key ID (<a href="{{ "/api-documentation/get-bearer-token/manage-credentials" | relative_url }}#show-a-specific-public-key">Show a specific public key</a>)

<a class="usa-button" href="{{ "/jwt-tool.html" | relative_url }}">JWT Creation Tool</a>

## 2. Create a bearer token
A bearer token makes sure every request or interaction with the API can be traced back to the person who created the client token.

{% include alert.html variant="warning" text="The bearer token must be set in the Authorization header in every API request and has a maximum expiration time of 5 minutes." slim="true" classNames="measure-6" %}

**Example header**
{% capture snippet %}
Authorization: Bearer {ACCESS_TOKEN}
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

To create an `ACCESS_TOKEN`, submit a valid JWT to the `/Token/auth` endpoint via a `POST` request. The `POST` request body’s Content Type must be `application/x-www-form-urlencoded`. The body of the request must be URL encoded.

**Example token request**
{% capture snippet %}
POST /api/v1/Token/auth
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

**Example cURL command**
{% capture snippet %}
curl -v "https://sandbox.dpc.cms.gov/api/v1/Token/auth" \
     -H 'Content-Type: application/x-www-form-urlencoded' \
     -H 'Accept: application/json' \
     -X POST \
     -d "grant_type=client_credentials&scope=system%2F*.*&client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&client_assertion={SIGNED_JWT}"
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

The `{SIGNED_JWT}` above is returned from the JWT Tool.

**Bearer token expiration**

Each token request needs its own JWT value. Once your bearer token expires, you will likely need to generate a new JWT to refresh your bearer token.

**Example API response**

The endpoint response is a JSON object which contains the bearer token, the lifetime of the token (in seconds), and the authorized system scopes.

{% capture snippet %}
{
 "access_token": "{access_token value}",
 "token_type": "bearer",
 "expires_in": 300,
 "scope": "system/*.*"
}
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" %}

**Create a bearer token manually**

You can also [create a bearer token manually](?tab=t.hb88a75vf5by) without using the JWT generation tool.

In order to receive a token, the valid JWT must be submitted to the `/Token/auth` endpoint via a `POST` request. The `POST` request body is encoded as `application/x-www-form-urlencoded`.

1. Set the JWT as the `client_assertion` form parameter.
2. Add the remaining fields:

    | Parameters | Parameter Values | Fixed/Dynamic | Notes |
    | :---: | :---: | :---: | :---: |
    | `scope` | "system/\*.\*" | Fixed | The requested scope MUST be equal to or less than the scope originally granted to the authorized accessor. |
    | `grant_type` | "client_credentials" | Dynamic | The format of the assertion as defined by the authorization server. |
    | `client_assertion_type` | "urn:ietf:params:oauth:client-assertion-type:jwt-bearer" | Fixed | The format of the assertion as defined by the authorization server. |
    | `client_assertion` | `{SIGNED_JWT}` | Dynamic | The assertion being used to authenticate the client. |