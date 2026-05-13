---
layout: api-docs
page_title: "Add, View, and List Practitioners"
seo_title: ""
description: "Add, view, list, update, and remove practitioners in your organization using the DPC API's Practitioner endpoints."
in-page-nav: true
---

# {{ page.page_title }}

## List all practitioners

The `GET` `/Practitioner` operation lets you retrieve a [bundle](https://www.hl7.org/fhir/STU3/bundle.html) of Practitioner Resources. 

**Example request**
{% capture snippet %}
GET /api/v1/Practitioner
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

**Example cURL command**
{% capture snippet %}
curl -v 'https://sandbox.dpc.cms.gov/api/v1/Practitioner' \
 -H "Authorization: Bearer $BEARER_TOKEN" \
 -H 'Accept: application/fhir+json'
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

## Get a specific practitioner

Retrieve a single practitioner by providing an NPI number. 

**Example request**
{% capture snippet %}
GET /api/v1/Practitioner?identifier={PRACTITIONER_NPI}
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

**Example cURL command**
{% capture snippet %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Practitioner?identifier={PRACTITIONER_NPI} \
 -H "Authorization: Bearer $BEARER_TOKEN" \
 -H 'Accept: application/fhir+json' \
 -H 'Content-Type: application/fhir+json'
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

**Example response**

{% capture snippet %}
{
  "resourceType": "Bundle",
  "type": "searchset",
  "total": 1,
  "entry": [
    {         
      "resource": {
        "resourceType": "Practitioner",
        "id": "8d80925a-027e-43dd-8aed-9a501cc4cd91",
        "meta": {
          "lastUpdated": "2020-06-10T18:43:14.150+00:00",
          "profile": [
            "https://dpc.cms.gov/api/v1/StructureDefinition/dpc-profile-practitioner"
          ]
        },
        "identifier": [
          {
            "system": "http://hl7.org/fhir/sid/us-npi",
            "value": "2323232225"
          }
        ],
        "name": [
          {
            "family": "Holguín308",
            "given": [
              "Alejandro916"
            ]
          }
        ]
      }
    }
  ]
}

{% endcapture %}
{% include copy_snippet.html code=snippet language="json" %}