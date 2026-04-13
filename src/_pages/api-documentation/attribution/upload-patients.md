---
layout: api-docs
page_title: "Upload Patients"
seo_title: ""
description: ""
in-page-nav: true
---

# {{ page.page_title }}

Every organization is required to maintain a list of patients which represent the patient population currently being treated at your facilities.

The Beneficiary FHIR Data Server (BFD) maintains a list of 101 patients, along with their Medicare Beneficiary Identifiers (MBI), that match synthetic sandbox data. 

More details and the corresponding data files can be found on the Blue Button 2.0 API’s documentation under [Sample Beneficiaries](https://bluebutton.cms.gov/developers/#sample-beneficiaries).

You also provide your own sample FHIR resources. These will need to fulfill the required FHIR profiles. All Patient Resources need an MBI that matches a record in BFD.

## Add a patient

To register a patient at your organization, you must create a [Patient](https://dpc.cms.gov/ig/StructureDefinition-dpc-profile-patient.html) Resource as a JSON file in FHIR format. The JSON file must be in the body of your request with no encoding (raw) when uploading via a POST request to the /Patient endpoint.

To create the Patient Resource, the JSON file may include additional attributes detailed in the FHIR Implementation Guide within the [DPC Practitioner Profile](https://dpc.cms.gov/ig/StructureDefinition-dpc-profile-patient.html). 

### Minimum requirements

* First and last name  
* Birth date in YYYY-MM-DD  
* Gender  
* Medicare Beneficiary Identifier (MBI)


When sharing data, DPC uses the `Patient.gender` property to represent the sex of the patient as maintained on record at CMS. When registering a patient to your organization, DPC will require you to submit the `Patient.gender` property following the corresponding value set. The input provided may be used by DPC to match and validate the patient against CMS records.

**Note:** If an existing patient is found with the same MBI, the `/patient` endpoint will return that same patient.

**Example**

{% capture snippet %}
{
  system: "https://bluebutton.cms.gov/resources/variables/bene_id",
  value: "Value of the MBI number"
}
// or
{
  "system": "http://hl7.org/fhir/sid/us-mbi",
  "value": "Value of the MBI number"
}
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" can_copy=true %}


   
Managing Organization ID:  
 

{% capture snippet %}
{
  "managingOrganization": {
    "reference": "Organization/{ORGANIZATION_ID}"
  }
}
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" can_copy=true %}


**Request**

{% capture snippet %}
POST /api/v1/Patient
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

**cURL command**

{% capture snippet %}
{% raw %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Patient \
     -H 'Authorization: Bearer {ACCESS_TOKEN}' \
     -H 'Accept: application/fhir+json' \
     -H 'Content-Type: application/fhir+json' \
     -X POST \
     -d @patient.json
{% endraw %}
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}


**Response**

{% capture snippet %}
{
  "resourceType": "Parameters",
  "parameter": [
    {
      "name": "resource",
      "resource": {
        "resourceType": "Bundle",
        "id": "synthetic-roster-bundle",
        "type": "collection",
        "entry": [
          {
            "resource": {
              "resourceType": "Patient",
              "id": "728b270d-d7de-4143-82fe-d3ccd92cebe4",
              "meta": {
                "versionId": "MTU1NDgxMjczNTM5MjYwMDAwMA",
                "lastUpdated": "2019-04-09T12:25:35.392600+00:00",
                "profile": [
                  "https://dpc.cms.gov/api/v1/StructureDefinition/dpc-profile-patient"
                ]
              },
              "identifier": [
                {
                  "system": "https://bluebutton.cms.gov/resources/variables/bene_id",
                  "value": "1SQ3F00AA00"
                }
              ],
              "name": [
                {
                  "use": "official",
                  "family": "Prosacco716",
                  "given": [
                    "Jonathan639"
                  ],
                  "prefix": [
                    "Mr."
                  ]
                }
              ],
              "birthDate": "1943-06-08"
            }
          }
        ]
      }
    }
  ]
}
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" %}


## Add multiple patients

The Patient endpoint supports a `/$submit` operation, which allows you to upload a bundle of resources for registration in a single batch operation.  
Each Patient Resource in your bundle may include additional attributes detailed in the FHIR Implementation Guide within the [DPC Patient Profile](https://dpc.cms.gov/ig/StructureDefinition-dpc-profile-patient.html), but at a minimum must satisfy the requirements on how to [add a Patient](#add-a-patient) Resource; otherwise, a `422 - Unprocessable Entity` error will be returned.  

- [Sample patient_bundle.json](https://dpc.cms.gov/assets/downloads/patient_bundle.json)

**Request**

{% capture snippet %}
POST /api/v1/Patient/$submit
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

**cURL command**

{% capture snippet %}
{% raw %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Patient/\$submit \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Accept: application/fhir+json' \
  -H 'Content-Type: application/fhir+json' \
  -X POST \
  -d @patient_bundle.json
{% endraw %}
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}


## List all patients

The `/Patient` endpoint supports a `GET` operation, which allows you to retrieve a bundle of Patient Resources. You will need to retrieve the DPC ID of patients when you get to the Attribution section.

**Request**

{% capture snippet %}
GET /api/v1/Patient
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

**cURL command**

{% capture snippet %}
{% raw %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Patient \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Accept: application/fhir+json' \
  -H 'Content-Type: application/fhir+json' \
  -X GET
{% endraw %}
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}


## List a specific patient

The `/Patient` endpoint supports a `GET` operation where you can supply the Patient MBI and receive the Patient Resource. You may use this to identify a Patient’s DPC ID based off of an MBI.

**Request**

{% capture snippet %}
GET /api/v1/Patient?identifier={PATIENT_MBI}
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

**cURL command**

{% capture snippet %}
{% raw %}
curl -v 'https://sandbox.dpc.cms.gov/api/v1/Patient?identifier={PATIENT_MBI}' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Accept: application/fhir+json' \
  -H 'Content-Type: application/fhir+json' \
  -X GET
{% endraw %}
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}


**Response**

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

