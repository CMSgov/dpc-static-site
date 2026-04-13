---
layout: api-docs
page_title: "Upload Practitioners"
seo_title: ""
description: ""
in-page-nav: true
---

# {{ page.page_title }}

Every organization is required to keep a list of [Practitioner](https://dpc.cms.gov/ig/StructureDefinition-dpc-profile-practitioner.html) Resources who are authorized to have access to DPC data. The DPC Team has included four Practitioner Resources that represent fictitious practitioners that can be added to your organization.

## Add a practitioner

To register a practitioner at your organization, you must send a FHIR-formatted [Practitioner](https://dpc.cms.gov/ig/StructureDefinition-dpc-profile-practitioner.html) Resource in the body of your request. Don’t use encoding (raw) when uploading via a `POST` request to the `/Practitioner` endpoint.

The Practitioner Resource may include additional attributes detailed in the FHIR Implementation Guide within [DPC Practitioner Profile](https://dpc.cms.gov/ig/StructureDefinition-dpc-profile-practitioner.html).

### Minimum practitioner requirements

*  First and last name  
*  Type 1 National Provider Identifier (NPI)
   
**Note:** If an existing practitioner is found with the same NPI, the `/Practitioner` endpoint will return that same practitioner.

### Request

{% capture snippet %}
POST /api/v1/Practitioner
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

### cURL command

{% capture snippet %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Practitioner \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Accept: application/fhir+json' \
  -H 'Content-Type: application/fhir+json' \
  -X POST \
  -d @practitioner.json
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

## Add Multiple Practitioners

The Practitioner endpoint supports a `/$submit` operation. This operation lets you upload a bundle of resources for registration in a single batch operation.  
   
Each individual Practitioner Resource in your bundle must satisfy the requirements on how to add a Practitioner Resource. Otherwise a `422-Unprocessable Entity` error will be returned.

Download: [Sample practitioner_bundle.json](https://dpc.cms.gov/assets/downloads/practitioner_bundle.json)

### Request

{% capture snippet %}
POST /api/v1/Practitioner/$submit
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

### cURL command

{% capture snippet %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Practitioner/\$submit \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Accept: application/fhir+json' \
  -H 'Content-Type: application/fhir+json' \
  -X POST \
  -d @practitioner_bundle.json
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

## List all practitioners

The `/Practitioner` endpoint supports a `GET` operation. This operation lets you retrieve a [bundle](https://www.hl7.org/fhir/STU3/bundle.html) of Practitioner Resources. You’ll need to retrieve a practitioner’s NPI when you get to the Attribution section.

### Request

{% capture snippet %}
GET /api/v1/Practitioner
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

### cURL command

{% capture snippet %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Practitioner \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Accept: application/fhir+json' \
  -H 'Content-Type: application/fhir+json' \
  -X GET
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

## List a specific practitioner

The Practitioner endpoint also supports a GET /Practitioner operation. This operation lets you supply an NPI number and receive the Practitioner Resource. You will use this to identify a practitioners’ DPC ID based off of an NPI when adding a practitioner and/or creating a group.

### Request

{% capture snippet %}
GET /api/v1/Practitioner?identifier={PRACTITIONER_NPI}
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

### cURL command

{% capture snippet %}
curl -v 'https://sandbox.dpc.cms.gov/api/v1/Practitioner?identifier={PRACTITIONER_NPI}' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Accept: application/fhir+json' \
  -H 'Content-Type: application/fhir+json' \
  -X GET
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

### Response

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
