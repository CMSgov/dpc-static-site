---
layout: api-docs
page_title: "Add, View, and List Patients"
seo_title: ""
description: "Add, view, list, update, and remove patients in your organization using the DPC API's Patient endpoints."
in-page-nav: true
---

# {{ page.page_title }}

## Get a specific patient
The GET `/Patient` operation retrieves a single Patient Resource by supplying an MBI. 

**Example request**
{% capture snippet %}
GET /api/v1/Patient?identifier={PATIENT_MBI}
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

**Example cURL command**
{% capture snippet %}
curl -v 'https://sandbox.dpc.cms.gov/api/v1/Patient?identifier={PATIENT_MBI}' \
    -H 'Authorization: Bearer {BEARER_TOKEN}' \
    -H 'Accept: application/fhir+json' \
    -X GET
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
        "resourceType": "Patient",
        "id": "995a1c0f-b6bc-4d16-b6b0-b8a6597c6e1d",
        "meta": {
          "lastUpdated": "2020-06-12T15:39:42.834+00:00",
          "profile": [
            "https://dpc.cms.gov/api/v1/StructureDefinition/dpc-profile-patient"
          ]
        },
        "identifier": [
          {
            "system": "http://hl7.org/fhir/sid/us-mbi",
            "value": "5S41C00AA00"
          }
        ],
        "name": [
          {
            "family": "Wyman904",
            "given": [
              "Cruz300"
            ]
          }
        ],
        "gender": "male",
        "birthDate": "1956-02-08",
        "managingOrganization": {
          "reference": "Organization/351fbb5f-f2f9-4094-bc6f-2b3600bb56e9"
        }
      }
    }
  ]
}
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" %}

## List all patients

The `GET` `/Patient` operation lets you retrieve a bundle of Patient Resources.

**Example request**
{% capture snippet %}
GET /api/v1/Patient
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

**Example cURL command**
{% capture snippet %}
curl -v 'https://sandbox.dpc.cms.gov/api/v1/Patient' \
    -H 'Authorization: Bearer {BEARER_TOKEN}' \
    -H 'Accept: application/fhir+json' \
    -X GET
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

## Paginate patient requests
The GET `/Patient` operation supports FHIR search parameters `_count` (page size) and `_offset` (starting index) for paginating results. Requests for very large patient rosters are prone to timeouts. For organizations with more than 1000 patients, we recommend using `_count` and `_offset` to paginate in batches of a few hundred patients at a time.  

**Example request**
{% capture snippet %}
GET /api/v1/Patient?_count={PAGE_SIZE}&_offset={OFFSET}
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

**Example cURL command**

{% capture snippet %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Patient?_count=100&_offset=0 \
     -H 'Authorization: Bearer {BEARER_TOKEN}' \
     -H 'Accept: application/fhir+json' \
     -H 'Content-Type: application/fhir+json' \
     -X GET
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

**Example response**

{% capture snippet %}
{
  "resourceType": "Bundle",
  "type": "searchset",
  "total": 100,
  "entry": [
    {
      "resource": {
        "resourceType": "Patient",
        "id": "995a1c0f-b6bc-4d16-b6b0-b8a6597c6e1d"
      }
    }
  ]
}
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" %}
