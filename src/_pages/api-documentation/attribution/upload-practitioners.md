---
layout: api-docs
page_title: "Upload Practitioners"
seo_title: ""
description: ""
in-page-nav: true
---

# {{ page.page_title }}

The DPC Team provides a bundle of sample practitioners you can use to create a test organization.    



<a class="usa-button" href="{{ "https://github.com/CMSgov/dpc-app/blob/main/dpc-web/public/practitioner_bundle.json" | relative_url }}" target="_blank">Download sample practitioners</a>

**Minimum practitioner requirements**

Include the following to avoid a `422 - Unprocessable Entity` error.

- First and last name  
- Type 1 National Provider Identifier (NPI)
   
**Note:** If an existing practitioner is found with the same NPI, the `/Practitioner` endpoint will return the same practitioner. 

## Add a practitioner bundle

The `$submit` operation lets you upload a bundle of practitioner resources in a single batch using the `/Practitioner` endpoint. If you don’t include the minimum requirements described above, you’ll receive an error.

**Example request to upload multiple practitioners**

{% capture snippet %}
POST /api/v1/Practitioner/$submit
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

**Example cURL command**
{% capture curlSnippet %}
curl -v 'https://sandbox.dpc.cms.gov/api/v1/Practitioner/$submit' \
     -H 'Authorization: Bearer {access_token}' \
     -H 'Accept: application/fhir+json' \
     -H 'Content-Type: application/fhir+json' \
     -X POST \
     -d @practitioner_bundle.json
{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" can_copy=true %}
