---
layout: api-docs
page_title: "Attestation & Attribution"
seo_title: ""
description: ""
in-page-nav: true
---

# {{ page.page_title }}

## Data Sources

DPC provides you with a set of sample practitioners to complete attestation and attribution in the sandbox.

Attestation/Attribution is when DPC establishes that you have a valid patient-practitioner relationship with Medicare and Medicaid beneficiaries. 

Required steps include:
- Register practitioners. 
- Register patients in your care.
- Attribute patients to their practitioners. 

You need to keep attributions up-to-date by submitting an attestation with each submission testifying these are valid relationships.

{% include alert.html variant="warning" text="The DPC sandbox does not preload any test data." classNames="measure-6" %}

## Load sample data

The DPC team has created a collection of sample Practitioner, Patient, and Group Resources to use with the sandbox. These resources can be found in our public GitHub repository as JSON files. 

### Uploading practitioners

We include four generic Practitioner Resources to add to your organization.

### Uploading Patients

The Beneficiary FHIR Data Server (BFD) maintains a list of 101 patients, along with their Medicare Beneficiary Identifiers (MBI), that match synthetic sandbox data. More details and the corresponding data files can be found on the Blue Button 2.0 API's documentation under <a href="https://bluebutton.cms.gov/developers/#sample-beneficiaries" target="_blank" rel=noopener>Sample Beneficiaries</a>.

You also provide your own sample FHIR resources. These will need to fulfill the required FHIR profiles. All Patient Resources need an MBI that matches a record in BFD.

#### Request

{% capture curlSnippet %}{% raw %}
GET /api/v1/Organization
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" %}

#### cURL command

{% capture curlSnippet %}{% raw %}
Authorization: Bearer {access_token}
Accept: application/fhir+json
Prefer: respond-async
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" %}

#### cURL command

{% capture curlSnippet %}{% raw %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Organization \
     -H 'Authorization: Bearer {access_token}' \
     -H 'Accept: application/fhir+json' \
     -H 'Content-Type: application/fhir+json' \
     -X GET
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" %}

#### Response

{% capture jsonSnippet %}{% raw %}
{
    "resourceType": "Bundle",
    "type": "collection",
    "total": 1,
    "entry": [
        {
            "resource": {
                "resourceType": "Organization",
                "id": "351fbb5f-f2f9-4094-bc6f-2b3600bb56e9",
                "identifier": [
                    {
                        "system": "http://hl7.org/fhir/sid/us-npi",
                        "value": "3905293015"
                    }
                ],
                "name": "Happy Healthcare",
                "address": [
                    {
                        "use": "work",
                        "type": "postal",
                        "line": [
                            "1 Main Street"
                        ],
                        "city": "Baltimore",
                        "state": "MD",
                        "postalCode": "21224",
                        "country": "US"
                    }
                ],
                "endpoint": [
                    {
                        "reference": "Endpoint/ccf649dd-5258-4c97-a378-449693e73997"
                    }
                ]
            }
        }
    ]
}
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=jsonSnippet language="json" %}

It's still possible to retrieve your organization using `/Organization/{id}`. If you do so you'll receive a single resource instead of a bundle.

#### Request

{% capture curlSnippet %}{% raw %}
GET /api/v1/Organization/{id}
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" %}

#### cURL command

{% capture curlSnippet %}{% raw %}
Authorization: Bearer {access_token}
Accept: application/fhir+json
Prefer: respond-async
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" %}

#### cURL command

{% capture curlSnippet %}{% raw %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Organization/{id} \
  -H 'Authorization: Bearer {access_token}' \
  -H 'Accept: application/fhir+json' \
  -H 'Content-Type: application/fhir+json' \
  -X GET
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" %}

#### Response

{% capture jsonSnippet %}{% raw %}
{
  "resourceType": "Organization",
  "id": "351fbb5f-f2f9-4094-bc6f-2b3600bb56e9",
  "identifier": [
    {
      "system": "http://hl7.org/fhir/sid/us-npi",
      "value": "3905293015"
    }
  ],
  "name": "Happy Healthcare",
  "address": [
    {
      "use": "work",
      "type": "postal",
      "line": [
        "1 Main Street"
      ],
      "city": "Baltimore",
      "state": "MD",
      "postalCode": "21224",
      "country": "US"
    }
  ],
  "endpoint": [
    {
      "reference": "Endpoint/ccf649dd-5258-4c97-a378-449693e73997"
    }
  ]
}
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=jsonSnippet language="json" %}

## Practitioners

### Add a practitioner

To register a practitioner at your organization, you must send a FHIR-formatted <a href="https://dpc.cms.gov/ig/StructureDefinition-dpc-profile-practitioner.html" target="_blank" rel=noopener>Practitioner</a> Resource in the body of your request. Don't use encoding (raw) when uploading via a POST request to the /Practitioner endpoint.

The Practitioner Resource may include additional attributes detailed in the FHIR Implementation Guide within <a href="https://dpc.cms.gov/ig/StructureDefinition-dpc-profile-practitioner.html" target="_blank" rel=noopener>DPC Practitioner Profile</a>.

#### Minimum practitioner requirements 

- First and last name
- Type 1 National Provider Identifier (NPI)
 
Note: If an existing practitioner is found with the same NPI, the `/practitioner` endpoint will return that same practitioner.

#### Request

{% capture curlSnippet %}{% raw %}
POST /api/v1/Practitioner
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" %}

#### cURL command

{% capture curlSnippet %}{% raw %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Practitioner \
  -H 'Authorization: Bearer {access_token}' \
  -H 'Accept: application/fhir+json' \
  -H 'Content-Type: application/fhir+json' \
  -X POST \
  -d @practitioner.json
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" %}

### Add Multiple Practitioners

The Practitioner endpoint supports a $submit operation. This operation lets you upload a bundle of resources for registration in a single batch operation.
 
Each individual Practitioner Resource in your bundle must satisfy the requirements on how to add a [Practitioner Resource](#add-a-practitioner). Otherwise a 422-Unprocessable Entity error will be returned.


<a href="{{ site.url }}/assets/downloads/practitioner_bundle.json">Sample practitoner_bundle.json</a>


#### Request

{% capture curlSnippet %}{% raw %}
POST /api/v1/Practitioner/$submit
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" %}

#### cURL command

{% capture curlSnippet %}{% raw %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Practitioner/$submit \
  -H 'Authorization: Bearer {access_token}' \
  -H 'Accept: application/fhir+json' \
  -H 'Content-Type: application/fhir+json' \
  -X POST \
  -d @practitioner_bundle.json
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" %}

### List all practitioners

The Practitioner endpoint supports a GET /Practitioner operation. This operation lets you retrieve a <a href="https://www.hl7.org/fhir/STU3/bundle.html" target="_blank" rel=noopener>bundle</a> of Practitioner Resources. You'll need to retrieve a practitioner's NPI when you get to the Attribution section.
#### Request

{% capture curlSnippet %}{% raw %}
GET /api/v1/Practitioner
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" %}

#### cURL command

{% capture curlSnippet %}{% raw %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Practitioner \
     -H 'Authorization: Bearer {access_token}' \
     -H 'Accept: application/fhir+json' \
     -H 'Content-Type: application/fhir+json' \
     -X GET
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" %}

### List a specific practitioner

The Practitioner endpoint also supports a GET /Practitioner operation. This operation lets you supply an NPI number and receive the Practitioner Resource. You will use this to identify a practitioners' DPC ID based off of an NPI when adding a practitioner and/or creating a group.

#### Request

{% capture curlSnippet %}{% raw %}
GET /api/v1/Practitioner?identifier={practitioner_npi}
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" %}

#### cURL command:

{% capture curlSnippet %}{% raw %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Practitioner \
     -H 'Authorization: Bearer {access_token}' \
     -H 'Accept: application/fhir+json' \
     -H 'Content-Type: application/fhir+json' \
     -X GET
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" %}

#### Response:

{% capture jsonSnippet %}{% raw %}
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
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=jsonSnippet language="json" %}

## Make Practitioner/Provenance 

CMS requires practitioners to attest that they have a treatment-related purpose for adding a patient to their group each time they make a group addition. This is accomplished by submitting an attestation with every request. Attestations are posted as a <a href="https://www.hl7.org/fhir/provenance.html" target="_blank" rel=noopener>Provenance</a> Resource via the X-Provenance header, as outlined in the <a href="https://www.hl7.org/fhir/implementationguide.html" target="_blank" rel=noopener>FHIR specification</a>.

The attestation is then included in the X-Provenance header as part of any operations which add patients to the Group Resource.

#### Example attestation for X-Provenance header

{% capture jsonSnippet %}{% raw %}
{
  "resourceType": "Provenance",
  "meta": {
    "profile": [
      "https://dpc.cms.gov/api/v1/StructureDefinition/dpc-profile-attestation"
    ]
  },
  "recorded": "1990-01-01T00:00:00.000-05:00",
  "reason": [
    {
      "system": "http://hl7.org/fhir/v3/ActReason",
      "code": "TREAT"
    }
  ],
  "agent": [
    {
      "role": [
        {
          "coding": [
            {
              "system": "http://hl7.org/fhir/v3/RoleClass",
              "code": "AGNT"
            }
          ]
        }
      ],
      "whoReference": {
        "reference": "Organization/{organization_id}"
      },
      "onBehalfOfReference": {
        "reference": "Practitioner/{practitioner_id}"
      }
    }
  ]
}
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=jsonSnippet language="json" %}

## Patients

Every organization is required to maintain a list of patients representing the population currently being treated at your facilities. 

Since there is not any preloaded data in DPC's sandbox, the Beneficiary FHIR Data Server (BFD) maintains a list of 101 Patients, along with their MBIs, that can be used for matching existing synthetic data in the sandbox environment. More details and the corresponding data files can be found on the Blue Button 2.0 API's documentation under <a href="https://bluebutton.cms.gov/developers/#sample-beneficiaries" target="_blank" rel=noopener>Sample Beneficiaries</a>.

### Add a patient

To register a patient at your organization, you must create a <a href="https://dpc.cms.gov/ig/StructureDefinition-dpc-profile-patient.html" target="_blank" rel=noopener>Patient</a> Resource as a JSON file in FHIR format. The JSON file must be in the body of your request with no encoding (raw) when uploading via a POST request to the /Patient endpoint.

To create the Patient Resource, the JSON file may include additional attributes detailed in the FHIR Implementation Guide within the <a href="https://dpc.cms.gov/ig/StructureDefinition-dpc-profile-patient.html" target="_blank" rel=noopener>DPC Practitioner Profile</a>. 

#### Minimum requirements 

- First and last name
- Birth date in YYYY-MM-DD
- Gender
- Medicare Beneficiary Identifier (MBI)

When sharing data, DPC uses the Patient.gender property to represent the sex of the patient as maintained on record at CMS. When registering a patient to your organization, DPC will require you to submit the Patient.gender property following the corresponding value set. The input provided may be used by DPC to match and validate the patient against CMS records.

Note: If an existing patient is found with the same MBI, the /patient endpoint will return that same patient.

#### Example

{% capture jsonSnippet %}{% raw %}
{
  "system": "https://bluebutton.cms.gov/resources/variables/bene_id",
  "value": "Value of the MBI number"
}
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=jsonSnippet language="json" %}

or

{% capture jsonSnippet %}{% raw %}
{
  "system": "http://hl7.org/fhir/sid/us-mbi",
  "value": "Value of the MBI number"
}
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=jsonSnippet language="json" %}

- Managing Organization ID:

{% capture jsonSnippet %}{% raw %}
{
  "managingOrganization": {
    "reference": "Organization/{id}"
  }
}
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=jsonSnippet language="json" %}

#### Request

{% capture curlSnippet %}{% raw %}
POST /api/v1/Patient
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" %}

#### cURL command

{% capture curlSnippet %}{% raw %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Patient \
  -H 'Authorization: Bearer {access_token}' \
  -H 'Accept: application/fhir+json' \
  -H 'Content-Type: application/fhir+json' \
  -X POST \
  -d @patient.json
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" %}

#### Response

{% capture jsonSnippet %}{% raw %}
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
             "birthDate": "1943-06-08",
           }
         }

       ]
     }
   }
 ]
}
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=jsonSnippet language="json" %}

#### Request

{% capture curlSnippet %}{% raw %}
POST /api/v1/Patient/$submit
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" %}

#### cURL command

{% capture curlSnippet %}{% raw %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Patient/\$submit \
  -H 'Authorization: Bearer {access_token}' \
  -H 'Accept: application/fhir+json' \
  -H 'Content-Type: application/fhir+json' \
  -X POST \
  -d @patient_bundle.json
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" %}

### List all patients

The Patient endpoint supports a GET /Patient operation. This operation lets you retrieve a bundle of Patient Resources. You'll need to retrieve the DPC ID of patients when you get to the Attribution section.

#### Request

{% capture curlSnippet %}{% raw %}
GET /api/v1/Patient
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" %}

#### cURL command

{% capture curlSnippet %}{% raw %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Patient \
  -H 'Authorization: Bearer {access_token}' \
  -H 'Accept: application/fhir+json' \
  -H 'Content-Type: application/fhir+json' \
  -X GET
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" %}

### List a specific patient

The Patient endpoint also supports a GET /Patient operation. This operations lets you supply the Patient MBI and receive the Patient Resource. You may use this to identify a Patient's DPC ID based off on an MBI.

#### Request

{% capture curlSnippet %}{% raw %}
GET /api/v1/Patient?identifier={patient_mbi}
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" %}

#### cURL command

{% capture curlSnippet %}{% raw %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Patient \
  -H 'Authorization: Bearer {access_token}' \
  -H 'Accept: application/fhir+json' \
  -H 'Content-Type: application/fhir+json' \
  -X GET
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" %}

#### Response

{% capture jsonSnippet %}{% raw %}
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
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=jsonSnippet language="json" %}

## Attestation

### Create an attestation

Details on Provenance Resources are given in the <a href="https://www.hl7.org/fhir/implementationguide.html" target="_blank" rel=noopener>FHIR implementation guide</a>.

#### Minimum attestation requirements 

Timestamp. Time when attestation was made
Reason. Reason for the attestation (currently only: <a href="http://hl7.org/fhir/v3/ActReason#TREAT">http://hl7.org/fhir/v3/ActReason#TREAT</a> is supported)
Organization ID. The agent making the attestation referenced by their Organization Resource ID 
 _Your Organization ID can be found in the DPC Portal._
Practitioner ID. The practitioner attached to the attestation referenced by their Practitioner ID. _Your Practitioner ID can be found by referencing the `{id}` variable in the resource object of your practitioner._

The attestation is then included in the X-Provenance header as part of any operations which add patients to the Group Resource.

#### Example attestation for X-Provenance header

{% capture jsonSnippet %}{% raw %}
{
  "resourceType": "Provenance",
  "meta": {
    "profile": [
      "https://dpc.cms.gov/api/v1/StructureDefinition/dpc-profile-attestation"
    ]
  },
  "recorded": "1990-01-01T00:00:00.000-05:00",
  "reason": [
    {
      "system": "http://hl7.org/fhir/v3/ActReason",
      "code": "TREAT"
    }
  ],
  "agent": [
    {
      "role": [
        {
          "coding": [
            {
              "system": "http://hl7.org/fhir/v3/RoleClass",
              "code": "AGNT"
            }
          ]
        }
      ],
      "whoReference": {
        "reference": "Organization/{organization_id}"
      },
      "onBehalfOfReference": {
        "reference": "Practitioner/{practitioner_id}"
      }
    }
  ]
}
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=jsonSnippet language="json" %}

### Update a group

Patient/practitioner relationships automatically expire after 90 days and must be re-attested by the practitioner. This is accomplished by re-attributing the patient to the practitioner's group.

### Identifying expired patients

Patient attributions expire and must be renewed after 90 days. You can identify these patients through a GET request to the /Group endpoint. This will return a JSON file with all the patients attributed to the group. Evaluate this JSON for patients with attribution dates greater than 90 days.

#### Request

{% capture curlSnippet %}{% raw %}
GET api/v1/Group?characteristic-value=attributed-to${group_id}
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" %}

#### cURL command:

{% capture curlSnippet %}{% raw %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Group?characteristic-value=attributed-to${group_id}
  -H 'Authorization: Bearer {access_token}' \
  -H 'Accept: application/fhir+json'
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" %}

#### Response:

{% capture jsonSnippet %}{% raw %}
{
 "resourceType": "Group",
 "type": "person",
 "actual": true,
 "characteristic": [
   {
     "code": {
       "coding": [
         {
           "code": "attributed-to"
         }
       ]
     },
     "valueCodeableConcept": {
       "coding": [
         {
           "system": "http://hl7.org/fhir/sid/us-npi",
           "code": "110001029483"
         }
       ]
     }
   }
 ],
 "member": [
   {
     "entity": {
       "reference": "Patient/bb151edf-a8b5-4f5c-9867-69794bcb48d1"
     }
   }
 ]
}
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=jsonSnippet language="json" %}

### Add patients to group

#### cURL command

{% capture curlSnippet %}{% raw %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Group/{group_id}/\$add
  -H 'Authorization: Bearer {access_token}' \
  -H 'Accept: application/fhir+json' \
  -H 'X-Provenance: {FHIR provenance resource}</span> \
  -X POST \
  -d @group_addition.json
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" %}

#### Response

{% capture jsonSnippet %}{% raw %}
{
  "member": [
    {
      "entity": {
        "reference": "Patient/871c83f5-5674-450b-a3b6-be3bbcf8a095"
      },
      "period": {
        "start": "2020-06-17T17:44:27+00:00",
        "end": "2020-09-15T17:44:27+00:00"
      },
      "inactive": false
    },
    {
      "entity": {
        "reference": "Patient/ef25ddf1-615e-43d5-b539-6af200ae7da4"
      },
      "period": {
        "start": "2020-06-17T17:53:42+00:00",
        "end": "2020-09-15T17:53:42+00:00"
      },
      "inactive": false
    }
  ]
}
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=jsonSnippet language="json" %}

### Remove patients from a group

Removals are handled through a custom remove operation on the /Group endpoint. This takes the members listed into a given resource and removes them from the existing group.

{% include alert.html variant="warning" text="The remove function does not delete the resources, but sets the inactive parameter to true." classNames="measure-6" %}

#### Request

{% capture curlSnippet %}{% raw %}
POST /api/v1/Group/{group_id}/$remove
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" %}

#### cURL command

{% capture curlSnippet %}{% raw %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Group/{group_id}/\$remove \
  -H 'Authorization: Bearer {access_token}' \
  -H 'Accept: application/fhir+json' \
  -X POST \
  -d @group_removal.json
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" %}

#### Response

{% capture jsonSnippet %}{% raw %}
{
  "resourceType": "Group",
  "type": "person",
  "actual": true,
  "characteristic": [
    {
      "code": {
        "coding": [
          {
            "code": "attributed-to"
          }
        ]
      },
      "valueCodeableConcept": {
        "coding": [
          {
            "system": "http://hl7.org/fhir/sid/us-npi",
            "code": "110001029483"
          }
        ]
      }
    }
  ],
  "member": [
    {
      "entity": {
        "reference": "Patient/4d72ad76-fbc6-4525-be91-7f358f0fea9d"
      }
    }
  ]
}
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=jsonSnippet language="json" %}

### Overwrite a group membership

You can submit a Group Resource which overwrites the existing group with the members listed in the given resource.

{% include alert.html variant="warning" text="This endpoint does not merge with the existing membership state, but replaces it." classNames="measure-6" %}

#### Request

{% capture curlSnippet %}{% raw %}
PUT /api/v1/Group/{group_id}
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" %}

#### cURL command

{% capture curlSnippet %}{% raw %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Group/{group_id} \
  -H 'Authorization: Bearer {access_token}' \
  -H 'Accept: application/fhir+json' \
  -H 'X-Provenance: {FHIR provenance resource}</span> \
  -X PUT \
  -d @updated_group.json
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" %}

#### Response

{% capture jsonSnippet %}{% raw %}
{
  "resourceType": "Group",
  "type": "person",
  "actual": true,
  "characteristic": [
    {
      "code": {
        "coding": [
          {
            "code": "attributed-to"
          }
        ]
      },
      "valueCodeableConcept": {
        "coding": [
          {
            "system": "http://hl7.org/fhir/sid/us-npi",
            "code": "110001029483"
          }
        ]
      }
    }
  ],
  "member": [
    {
      "entity": {
        "reference": "Patient/4d72ad76-fbc6-4525-be91-7f358f0fea9d"
      }
    },
    {
      "entity": {
        "reference": "Patient/bb151edf-a8b5-4f5c-9867-69794bcb48d1"
      }
    }
  ]
}
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=jsonSnippet language="json" %}

### Locate your Group ID

You may only pull data for one practitioner's roster at a time.

Do this by sending a GET request to the Group endpoint to retrieve the <a href="https://hl7.org/fhir/STU3/group.html" target="_blank" rel=noopener>Attribution Group</a> of the practitioner. Use the practitioner's <a href="https://www.cms.gov/Regulations-and-Guidance/Administrative-Simplification/NationalProvIdentStand/" target="_blank" rel=noopener>National Provider Identity (NPI)</a> number as a parameter in this request.

{% capture alertText %}
DPC supports the standard <a href="https://www.hl7.org/fhir/search.html" target="_blank" rel=noopener>FHIR search protocol</a>. Searching for patients associated with a given practitioner makes use of <a href="https://www.hl7.org/fhir/search.html#combining" target="_blank" rel=noopener>composite search parameters</a>.
{% endcapture %}

{% include alert.html variant="warning" text=alertText classNames="measure-6" %}


The response will return a <a href="https://www.hl7.org/fhir/STU3/bundle.html" target="_blank" rel=noopener>Bundle</a> Resource which contains the Attribution Groups for the given practitioner. 

You can use the `Group.id` value of the returned resources to initiate an export job. Find your Group ID by referencing the `{id}` variable in your group's resource object.

#### Example

{% capture jsonSnippet %}{% raw %}
{
  "resource": {
    "resourceType": "Group",
    "id": "64d0cd85-7767-425a-a3b8-dcc9bdfd5402"
  }
}
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=jsonSnippet language="json" %}

#### Request

{% capture curlSnippet %}{% raw %}
GET /api/v1/Group?characteristic-value=attributed-to${practitioner_npi}
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" %}

#### cURL command

{% capture curlSnippet %}{% raw %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Group/{group_id} \
  -H 'Authorization: Bearer {access_token}' \
  -H 'Accept: application/fhir+json' \
  -H 'X-Provenance: {FHIR provenance resource}
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" %}

#### Response

{% capture jsonSnippet %}{% raw %}
{
  "resourceType": "Bundle",
  "type": "searchset",
  "total": 1,
  "entry": [
    {
      "resource": {
        "resourceType": "Group",
        "id": "64d0cd85-7767-425a-a3b8-dcc9bdfd5402",
        "type": "person",
        "actual": true,
        "characteristic": {
          "code": {
            "coding": [
              {
                "code": "attributed-to"
              }
            ]
          },
          "valueCodeableConcept": {
            "coding": [
              {
                "system": "http://hl7.org/fhir/sid/us-npi",
                "code": "{Practitioner NPI}"
              }
            ]
          }
        },
        "member": [
          {
            "entity": {
              "reference": "Patient/4d72ad76-fbc6-4525-be91-7f358f0fea9d"
            }
          },
          {
            "entity": {
              "reference": "Patient/74af8018-f3a1-469c-9bfa-1dfd8a646874"
            }
          }
        ]
      }
    }
  ]
}
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=jsonSnippet language="json" %}
