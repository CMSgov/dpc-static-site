---
layout: api-docs
page_title: "Get an Access Token"
seo_title: ""
description: ""
in-page-nav: true
---

# {{ page.page_title }}

DPC uses OAuth 2.0 to authorize API access. All API requests require a access token in the Authorization header.

## 1. Generate a JSON Web Token

{% include alert.html variant="warning" text="Your JWT must contain an expiration of five minutes." slim="true" classNames="measure-6" %}

Use the following tool to create a JSON Web Token (JWT). A JWT authenticates your organization with DPC. You'll need: 

- Your Private Key ([Create Public/Private Keys]({{ "/api-documentation/get-sandbox-credentials#3-create-a-public-key" | relative_url }}))
- A registered Client Token ([Generate a client token]({{ "/api-documentation/get-sandbox-credentials#2-generate-a-client-token-in-the-sandbox-site" | relative_url }}))
- Your Public Key ID ([Show a specific public key]({{ "/api-documentation/get-access-token/manage-credentials#show-a-specific-public-key" | relative_url }}))

<a class="usa-button" href="{{ "/jwt-tool.html" | relative_url }}" target="_blank">JWT Creation Tool</a>

## 2. Create an Access Token
An access token makes sure every request or interaction with the API can be traced back to the person who created the client token.

{% include alert.html variant="warning" text="The access token must be set in the Authorization header in every API request and has a maximum expiration time of 5 minutes." slim="true" classNames="measure-6" %}

**Example header**
{% capture snippet %}
Authorization: Bearer {ACCESS_TOKEN}
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

To create an `ACCESS_TOKEN`, submit a valid JWT to the `/Token/auth` endpoint via a `POST` request. The `POST` request body’s Content Type must be `application/x-www-form-urlencoded`. The body of the request must be URL encoded.

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

The `{SIGNED_JWT}` above is returned from the JWT Tool.

**Access token expiration**

Each token request needs its own JWT value. Once your access token expires, you will likely need to generate a new JWT to refresh your access token.

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
