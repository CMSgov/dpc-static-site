---
layout: api-docs
page_title: "Create a JWT Manually"
seo_title: ""
description: "Step-by-step instructions for creating a JSON Web Token (JWT) manually for DPC API authentication, without using the JWT Tool."
in-page-nav: true
---

# {{ page.page_title }}

Review these steps if you'd prefer to create a JWT manually without using the [JWT Tool]({{ "/jwt-tool.html" | relative_url }}).

**Example decoded header**

The `PUBLIC_KEY_ID` shown in the example is the one you generated while setting up DPC sandbox credentials. See [Create a public key]({{ "/api-documentation/get-sandbox-credentials.html#3-create-a-public-key" | relative_url }}).

{% capture snippet %}
{
  "alg": "RS384",
  "kid": "{PUBLIC_KEY_ID}"
}
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" %}

**Example decoded payload**
{% capture snippet %}
{
  "iss": "{CLIENT_TOKEN}",
  "sub": "{CLIENT_TOKEN}",
  "aud": "https://sandbox.dpc.cms.gov/api/v1/Token/auth",
  "exp": {EXPIRATION_TIMESTAMP},
  "jti": "{JWT_ID}"
}
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" %}


{% capture alertContent %}
<ul class="padding-left-0">
  <li><code class="language-plaintext highlighter-rouge">EXPIRATION_TIMESTAMP</code> is a Unix timestamp in seconds, not an ISO 8601 string. Cannot be more than 5 minutes in the future.</li>
  <li><code class="language-plaintext highlighter-rouge">JWT_ID</code> can be any string, but needs to be unique for every JWT you create.</li>
</ul>
{% endcapture %}

{% include alert.html variant="info" heading="Note" text=alertContent classNames="measure-6" %}

## Validate your JWT

The `/Token/validate` endpoint lets you submit your Signed JWT for validation.

**Example request**
{% capture snippet %}
POST /api/v1/Token/validate
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

**Example cURL command**
{% capture snippet %}
curl 'https://sandbox.dpc.cms.gov/api/v1/Token/validate' \
    -H 'Accept: application/json' \
    -H 'Content-Type: text/plain' \
    -d '{SIGNED_JWT}'
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

The API will return `200 OK` if the JWT is valid. If not it will return an error message.