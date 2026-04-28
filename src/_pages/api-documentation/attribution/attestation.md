---
layout: api-docs
page_title: "Attestation"
seo_title: ""
description: "Attestation requirements for attributing patients to a provider group, including how to submit Provenance Resources via the X-Provenance header."
in-page-nav: true
---

# {{ page.page_title }}

CMS requires practitioners to attest that they have a treatment-related relationship with each patient. You'll need to submit an attestation with every API request to create a group. The first step is creating a Group ("Group Resource" or "roster") of patients. 

Attestations are posted as a [Provenance Resource](https://www.hl7.org/fhir/provenance.html) via the X-Provenance header.

**Attestation requirements**

At a minimum, each attestation must include:

- **Timestamp:** Time when attestation was made  
- **Reason:** Reason for the attestation (currently only: http://hl7.org/fhir/v3/ActReason#TREAT is supported)  
- **Organization ID:** The agent making the attestation referenced by their Organization Resource ID  
- **Practitioner ID:** The practitioner attached to the attestation referenced by their Practitioner ID

The attestation is then included in the X-Provenance header as part of any operations which add patients to the [Group Resource](https://build.fhir.org/group.html). For more about Provenance Resources reference the [FHIR implementation guide](https://www.hl7.org/fhir/implementationguide.html). 

## Locate your Organization ID

Log into the [DPC Sandbox](https://sandbox.dpc.cms.gov/users/sign_in) and locate your Organization ID underneath the Organization name. You can also make a request to /Organization via the sandbox API.

## Locate your Practitioner ID

Find your Practitioner ID by referencing the {id} variable in the resource object of your practitioner.

### Example attestation for X-Provenance header

{% capture snippet %}
{
 "resourceType":"Provenance",
 "meta":{
   "profile":[
     "https://dpc.cms.gov/api/v1/StructureDefinition/dpc-profile-attestation"
   ]
 },
 "recorded":"1990-01-01T00:00:00.000-05:00",
 "reason":[
   {
     "system":"http://hl7.org/fhir/v3/ActReason",
     "code":"TREAT"
   }
 ],
 "agent":[
   {
     "role":[
       {
         "coding":[
           {
             "system":"http://hl7.org/fhir/v3/RoleClass",
             "code":"AGNT"
           }
         ]
       }
     ],
     "whoReference":{
       "reference":"Organization/{ORGANIZATION_ID}"
     },
     "onBehalfOfReference":{
       "reference":"Practitioner/{PRACTITIONER_ID}"
     }
   }
 ]
}
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" can_copy=true %}

## Create a patient Group Resource 

You'll need to create a Group Resource to link a list of registered [patients]({{ "/api-documentation/attribution/upload-patients.html" | relative_url }}) to a registered [practitioner]({{ "/api-documentation/attribution/upload-practitioners.html" | relative_url }}). 

**Group Resource requirements**

- [National Provider Identity (NPI)](https://www.cms.gov/Regulations-and-Guidance/Administrative-Simplification/NationalProvIdentStand/) for the practitioner that patients will be attributed to  
- The DPC ID of the patient(s) that are members of the group. This value is the alphanumeric DPC ID of the Patient Resource in DPC.

### Steps to create a Group Resource

1. Create a JSON file with a list of patients and a single practitioner to be attributed to.  
2. Upload the JSON file via a POST request to the /Group endpoint.

{% include alert.html variant="warning" text="Don't use Parameter and Bundle Resources when adding, updating, or overwriting groups." classNames="measure-6" %}

**DPC response elements**

The group response returned by DPC includes additional "period" and "inactive" elements for each patient. These indicate the time period for which the patient has an active relationship with the practitioner. If the relationship has expired, the time period for which the patient was active will be shown.

{% include alert.html variant="warning" text="Attribution groups must be updated every 90 days." classNames="measure-6" %}

### Example request

{% capture snippet %}
POST /api/v1/Group
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

### Example cURL command

{% capture snippet %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Group \
     -H 'Authorization: Bearer {ACCESS_TOKEN}' \
     -H 'Accept: application/fhir+json' \
     -H 'Content-Type: application/fhir+json' \
     -H 'X-Provenance: {PROVENANCE_JSON}' \
     -X POST \
     -d @group.json
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

### Example response

{% capture snippet %}
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
       "reference": "Patient/74af8018-f3a1-469c-9bfa-1dfd8a646874"
     }
   }
 ]
}
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" %}

### When do attestations expire?

Every 90 days practitioners will need to update their Provenance (attestation) and Group Resources by re-attributing the patient to the practitioner's group.

When an attribution relationship between a patient and practitioner has expired, either due to exceeding the 90-day threshold or being manually removed, the patient's "inactive" flag will be set to "true." Patients who are attributed to a practitioner but have their inactive flag set to "true," will not be included in bulk data exports.

### Identify expired patients

Use a GET request to the /Group endpoint to identify expired patients. This will return a JSON file with all the patients attributed to the group. Evaluate this JSON for patients with attribution dates greater than 90 days.

### Example request

{% capture snippet %}
GET /api/v1/Group?characteristic-value=attributed-to%24{PRACTITIONER_NPI}
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

### Example cURL command

{% capture snippet %}
curl -v 'https://sandbox.dpc.cms.gov/api/v1/Group?characteristic-value=attributed-to%24{PRACTITIONER_NPI}' \
     -H 'Authorization: Bearer {ACCESS_TOKEN}' \
     -H 'Accept: application/fhir+json'
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

### Example response

{% capture snippet %}
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
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" %}

## Add patients to group

Use $add to add new patients to a group.

### Example request

{% capture snippet %}
POST /api/v1/Group/{GROUP_ID}/$add
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

### Example cURL command

{% capture snippet %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Group/{GROUP_ID}/\$add \
     -H 'Authorization: Bearer {ACCESS_TOKEN}' \
     -H 'Accept: application/fhir+json' \
     -H 'X-Provenance: {PROVENANCE_JSON}' \
     -X POST \
     -d @group_addition.json
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

### Example response

{% capture snippet %}
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
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" %}

## Remove patients from a group

Use a custom $remove operation on the /Group endpoint to remove a patient from a group. The patient's inactive parameter will then be set to true.

### Example request

{% capture snippet %}
POST /api/v1/Group/{GROUP_ID}/$remove
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

### Example cURL command

{% capture snippet %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Group/{GROUP_ID}/\$remove \
     -H 'Authorization: Bearer {ACCESS_TOKEN}' \
     -H 'Accept: application/fhir+json' \
     -X POST \
     -d @group_removal.json
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

### Example response

{% capture snippet %}
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
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" %}

## Overwrite a group membership

You can submit a Group Resource which overwrites the existing group with members of a different resource.

{% include alert.html variant="warning" text="This endpoint does not merge with the existing membership state, but replaces it." classNames="measure-6" %}

### Example request

{% capture snippet %}
PUT /api/v1/Group/{GROUP_ID}
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

### Example cURL command

{% capture snippet %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Group/{GROUP_ID} \
     -H 'Authorization: Bearer {ACCESS_TOKEN}' \
     -H 'Accept: application/fhir+json' \
     -H 'X-Provenance: {PROVENANCE_JSON}' \
     -X PUT \
     -d @updated_group.json
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

### Example response

{% capture snippet %}
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
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" %}

## How to locate your Group ID

You can only pull data for one practitioner's patient group at a time. Do this by sending a GET request to the Group endpoint to retrieve the practitioner's [Attribution Group](https://hl7.org/fhir/STU3/group.html). Use their NPI number as a parameter.

{% include alert.html variant="info" text="DPC supports the standard <a href='https://www.hl7.org/fhir/search.html'>FHIR search protocol</a>. Searching for patients associated with a given practitioner makes use of <a href='https://www.hl7.org/fhir/search.html#combining'>composite search parameters</a>." classNames="measure-6" %}

The response will return a [Bundle](https://www.hl7.org/fhir/STU3/bundle.html) Resource which contains attribution Groups for the given practitioner. 

You can use the Group ID value of the returned resources to [initiate an export job]({{ "/api-documentation/export-data.html#initiate-an-export-job" | relative_url }}). Find your Group ID by referencing the `id` variable in your group's resource object.

### Example Group Resource

{% capture snippet %}
"resource": {
  "resourceType": "Group",
  "id": "64d0cd85-7767-425a-a3b8-dcc9bdfd5402"
}
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" %}

### Example request

{% capture snippet %}
GET /api/v1/Group?characteristic-value=attributed-to%24{PRACTITIONER_NPI}
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

### Example cURL command

{% capture snippet %}
curl -v 'https://sandbox.dpc.cms.gov/api/v1/Group?characteristic-value=attributed-to%24{PRACTITIONER_NPI}' \
     -H 'Authorization: Bearer {ACCESS_TOKEN}' \
     -H 'Accept: application/fhir+json'
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

### Example response

{% capture snippet %}
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
               "code": "{PRACTITIONER_NPI}"
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
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" %}
