---
layout: api-docs
page_title: "Get a Bearer Token"
seo_title: ""
description: "Generate a JSON Web Token and exchange it for an OAuth 2.0 bearer token to authenticate requests to the DPC API."
in-page-nav: true
---

# {{ page.page_title }}

DPC uses OAuth 2.0 to authorize API access. All API requests require a bearer token in the Authorization header.

## 1. Generate a JSON Web Token

{% include alert.html variant="warning" text="Your JWT must contain an expiration of five minutes." slim="true" classNames="measure-6" %}

Use the following tool to create a JSON Web Token (JWT). A JWT authenticates your organization with DPC. You'll need: 

- Your Private Key ([Create Public/Private Keys]({{ "/api-documentation/get-sandbox-credentials.html#3-create-a-public-key" | relative_url }}))
- A registered Client Token ([Generate a client token]({{ "/api-documentation/get-sandbox-credentials.html#2-generate-a-client-token-in-the-sandbox-site" | relative_url }}))
- Your Public Key ID ([Get a specific public key]({{ "/api-documentation/get-bearer-token/manage-credentials.html#get-a-specific-public-key" | relative_url }}))

<a class="usa-button" href="{{ "/jwt-tool.html" | relative_url }}" target="_blank">JWT Creation Tool</a>

## 2. Create a bearer token
A bearer token makes sure every request or interaction with the API can be traced back to the person who created the client token.

{% include alert.html variant="warning" text="The bearer token must be set in the Authorization header in every API request and has a maximum expiration time of 5 minutes." slim="true" classNames="measure-6" %}

**Example header**
{% capture snippet %}
Authorization: Bearer $BEARER_TOKEN
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

To create a `BEARER_TOKEN`, submit a valid JWT to the `/Token/auth` endpoint via a `POST` request. The `POST` request body's Content Type must be `application/x-www-form-urlencoded`. The body of the request must be URL encoded.

**Example request**
{% capture snippet %}
POST /api/v1/Token/auth
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

**Example cURL command**
{% capture snippet %}
curl 'https://sandbox.dpc.cms.gov/api/v1/Token/auth' \
     -H 'Content-Type: application/x-www-form-urlencoded' \
     -H 'Accept: application/json' \
     --data-urlencode 'grant_type=client_credentials' \
     --data-urlencode 'scope=system/*.*' \
     --data-urlencode 'client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer' \
     --data-urlencode 'client_assertion={SIGNED_JWT}'
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

The `{SIGNED_JWT}` above is returned from the JWT Tool.

**Bearer token expiration**

Each token request needs its own JWT value. Once your bearer token expires, you will likely need to generate a new JWT to refresh your bearer token.

**Example response**

The endpoint response is a JSON object which contains the bearer token, the lifetime of the token (in seconds), and the authorized system scopes.

{% capture snippet %}
{
 "access_token": "{BEARER_TOKEN}",
 "token_type": "bearer",
 "expires_in": 300,
 "scope": "system/*.*"
}
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" %}

## Recommended: Extract the token as a variable

You can extract the bearer token and store the token as `$BEARER_TOKEN` from the response body using a tool like `jq` in your command line. 

We'll continue to use the `$BEARER_TOKEN` variable in subsequent cURL examples.

{% capture snippet %}
BEARER_TOKEN=$(curl -s 'https://sandbox.dpc.cms.gov/api/v1/Token/auth' \
     -H 'Content-Type: application/x-www-form-urlencoded' \
     -H 'Accept: application/json' \
     --data-urlencode 'grant_type=client_credentials' \
     --data-urlencode 'scope=system/*.*' \
     --data-urlencode 'client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer' \
     --data-urlencode 'client_assertion={SIGNED_JWT}' \
     | jq -r '.access_token')
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}