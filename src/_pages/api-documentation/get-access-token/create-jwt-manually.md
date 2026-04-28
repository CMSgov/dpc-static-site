---
layout: api-docs
page_title: "Create a JWT Manually"
seo_title: ""
description: ""
in-page-nav: true
---

# {{ page.page_title }}

Review these steps if you'd prefer to create a JWT manually without using the [JWT Tool]({{ "/jwt-tool.html" | relative_url }}).

**Example decoded header**
{% capture snippet %}
{
  "iss": "{CLIENT_TOKEN}",
  "sub": "{CLIENT_TOKEN}",
  "aud": "https://sandbox.dpc.cms.gov/api/v1/Token/auth",
  "exp": {EXPIRATION_DATETIME} // now + 5 minutes,
  "jti": "{JWT_ID}"
}
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" %}

{% include alert.html variant="info" heading="Note" text="JWT_ID is a string that needs to be unique to this request and can only be used once." %}

**Example decoded payload**

The `PUBLIC_KEY_ID` shown in the example is the one you generated while setting up DPC sandbox credentials. See [Create a public key]({{ "/api-documentation/get-sandbox-credentials.html#3-create-a-public-key" | relative_url }}).

{% capture snippet %}
{
  "alg": "RS384",
  "kid": "{PUBLIC_KEY_ID}"
}
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" %}

## Validate your JWT

The `/Token/validate` endpoint lets you submit your Signed JWT for validation.

**Example request**
{% capture snippet %}
POST /api/v1/Token/validate
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

**Example cURL command**
{% capture snippet %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Token/validate \
     -H 'Accept: application/json' \
     -H 'Content-Type: text/plain' \
     -X POST \
     -d "{SIGNED_JWT}"
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

The API will return `200 OK` if the JWT is valid. If not it will return an error message.