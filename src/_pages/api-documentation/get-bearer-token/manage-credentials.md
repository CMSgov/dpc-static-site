---
layout: api-docs
page_title: "Manage Credentials"
seo_title: ""
description: ""
in-page-nav: true
---

# {{ page.page_title }}

How to view, delete, and modify existing credentials. 

## Renew expired tokens 

Rotate (renew) credentials before they expire every year. You have the option to create a new token via the API (link to “Create additional client tokens” on the Manage Credentials page) or in the DPC Sandbox on the Manage Credentials page.

The expiration will appear as `"expiresAt": "2020-11-04T11:49:55.095-05:00"` in your token list [link to List all client tokens on the Manage Credentials page]

## Create additional client tokens
Client tokens expire after one year. We recommend you generate a new client token via the API as part of your ongoing maintenance.

1. Use this method [Client tokens #2 on Get a Bearer Token page]. 
2. Make a `POST` request to the `/Token` endpoint.

The `/Token` endpoint accepts two (optional) query parameters: 

1. `label` (sets a human-readable label for the token)
2. `expiration` (sets a custom expiration for the client_token)

**Example token request**
{% capture snippet %}
POST /api/v1/Token
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

**Example cURL command**
{% capture snippet %}
curl -d '' -v https://sandbox.dpc.cms.gov/api/v1/Token?label={TOKEN_LABEL}&expiration={EXPIRATION_DATETIME} \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json' \
    -X POST
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

**Example API response**
{% capture snippet %}
{
  "id": "3c308f6e-0223-42f8-80c2-cab242d68afc",
  "tokenType": "MACAROON",
  "label": "Token for organization 46ac7ad6-7487-4dd0-baa0-6e2c8cae76a0.",
  "createdAt": "2019-11-04T11:49:55.126-05:00",
  "expiresAt": "2020-11-04T11:49:55.095-05:00",
  "token:": "{CLIENT_TOKEN}"
}
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" %}

## List all client tokens

Make a `GET` request to the `/Token` endpoint to list all the client tokens registered by your organization. The list will tell you when they were created, when they expire, and the label associated with each.

**Token list API request**

{% capture snippet %}
GET /api/v1/Token
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

**Example cURL command**
{% capture snippet %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Token \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json' \
    -X GET
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

**API response**
{% capture snippet %}
{
  "created_at": "2019-11-04T11:49:55.126-05:00",
  "count": 3,
  "entities": [
    {
      "id": "3c308f6e-0223-42f8-80c2-cab242d68afc",
      "tokenType": "MACAROON",
      "label": "Token for organization 46ac7ad6-7487-4dd0-baa0-6e2c8cae76a0.",
      "createdAt": "2019-11-04T11:49:55.126-05:00",
      "expiresAt": "2020-11-04T11:49:55.095-05:00"
    },
    {
      "id": "eef87627-db4b-4c08-8a27-e88a8343099d",
      "tokenType": "MACAROON",
      "label": "Token for organization 46ac7ad6-7487-4dd0-baa0-6e2c8cae76a0.",
      "createdAt": "2019-11-04T11:50:06.101-05:00",
      "expiresAt": "2020-11-04T11:50:06.096-05:00"
    },
  ]
}

{% endcapture %}
{% include copy_snippet.html code=snippet language="json" %}

## Delete client tokens

You may want to delete a client token if a Health IT implementer no longer exists or needs access to the API.

**Example DELETE request**
{% capture snippet %}
DELETE /api/v1/Token/{TOKEN_ID}
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

**Example cURL command**
{% capture snippet %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Token/{TOKEN_ID} \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json' \
    -X DELETE
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

## List all public keys

Make a `GET` request to the `/Key` endpoint to list all the public keys registered by your organization. This lets you reference IDs, check expiration dates, or delete specific public keys.

**Example request to list public keys**

{% capture snippet %}
GET /api/v1/Key
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

**Example cURL command**
{% capture snippet %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Key \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json' \
    -X GET
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

**Example API response**

{% capture snippet %}
{
  "created_at": "2019-11-04T13:16:29.008-05:00",
  "count": 1,
  "entities": [
    {
      "id": "b296f9d2-1aae-4c59-b6c7-c759b9db5226",
      "publicKey": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmyI+y8vAAFcV4deNdyKC\nH16ZPU7tgwnUzvtEYOp6s0DFjzgaqWmYZd/CNlb1psi+J0ChtcL9+Cx3v+HwDqVx\nToQrEqJ8hMavtXnxm2jPoRaxmbIGjHZ6jfyMot5+CdP8Vr5o9G2WIUgzjhFwMEXh\nlYg97uZadLLVKVXYTl4HtluVX5y7p1Wh4vkyJFBiqrX7qAJXvr6PK7OUeZDeVsse\nOMm33VwgbQSGRw7yWNOw+H/RbpGQkAUtHvGYvo/qLeb+iJsF2zBtjnkTmk5I8Vlo\n4xzbqaoqZqsHp4NgCw+bq0Y6AWLE2yUYi/DOatOdIBfLxlpf/FAY3f5FbNjISUuL\nmwIDAQAB\n-----END PUBLIC KEY-----\n",
      "createdAt": "2019-11-04T13:16:29.008-05:00",
      "label": "my-test-key"
    }
  ]
}
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" %}

## Show a specific public key

Make a `GET` request to the `/Key/{KEY_ID}`. 

**Example request to show a specific public key**

{% capture snippet %}
GET /api/v1/Key/{KEY_ID}
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

**Example cURL command**

{% capture snippet %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Key/{KEY_ID} \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'Accept: application/json' \    
    -H 'Content-Type: application/json' \
    -X GET
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

**Example API response**

{% capture snippet %}
{
  "id": "b296f9d2-1aae-4c59-b6c7-c759b9db5226",
  "publicKey": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmyI+y8vAAFcV4deNdyKC\nH16ZPU7tgwnUzvtEYOp6s0DFjzgaqWmYZd/CNlb1psi+J0ChtcL9+Cx3v+HwDqVx\nToQrEqJ8hMavtXnxm2jPoRaxmbIGjHZ6jfyMot5+CdP8Vr5o9G2WIUgzjhFwMEXh\nlYg97uZadLLVKVXYTl4HtluVX5y7p1Wh4vkyJFBiqrX7qAJXvr6PK7OUeZDeVsse\nOMm33VwgbQSGRw7yWNOw+H/RbpGQkAUtHvGYvo/qLeb+iJsF2zBtjnkTmk5I8Vlo\n4xzbqaoqZqsHp4NgCw+bq0Y6AWLE2yUYi/DOatOdIBfLxlpf/FAY3f5FbNjISUuL\nmwIDAQAB\n-----END PUBLIC KEY-----\n",
  "createdAt": "2019-11-04T13:16:29.008-05:00",
  "label": "my-test-key"
}
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" %}

## Delete public keys

Public keys can be removed by sending a `DELETE` request to the `/Key/{KEY_ID}` endpoint, which is returned either at creation, or as the result of listing the public keys.

**Example request to delete a public key**

{% capture snippet %}
DELETE /api/v1/Key/{KEY_ID}
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

**Example cURL command**

{% capture snippet %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Key/{KEY_ID} \
     -H 'Authorization: Bearer {ACCESS_TOKEN}' \
     -H 'Accept: application/json' \
     -H 'Content-Type: application/json' \
     -X DELETE
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

**Example API response**

On success, the API returns `HTTP 200` with an empty body.      

{% capture snippet %}
HTTP/2 200
content-length: 0          
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}