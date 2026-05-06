---
layout: api-docs
page_title: "Attestation"
seo_title: ""
description: "Attestation requirements for attributing patients to a provider group, including how to submit Provenance Resources via the X-Provenance header."
in-page-nav: true
---

# {{ page.page_title }}

CMS requires practitioners to attest that they have a treatment-related relationship with every patient they share data on. DPC enforces this by requiring an attestation (a [Provenance Resource](https://www.hl7.org/fhir/provenance.html) in the `X-Provenance` HTTP header) on any request that adds patients to a [Group Resource](https://build.fhir.org/group.html) (or "roster"). 

The Group Resource is the FHIR object representing a practitioner's roster of attributed patients.

## Attestation requirements

At a minimum, each attestation must include:

- `recorded`: An ISO 8601 timestamp for when the attestation was made.
- `reason`: Why the attestation is being submitted. Only `http://hl7.org/fhir/v3/ActReason#TREAT` is currently supported.
- `agent.whoReference`: A reference to the Organization making the attestation, in the form `Organization/{ORGANIZATION_ID}`.
- `agent.onBehalfOfReference`: A reference to the Practitioner the attestation is on behalf of, in the form `Practitioner/{PRACTITIONER_ID}`.

## Attestation workflow

The rest of this page walks through the steps for attributing patients to a practitioner: looking up your Organization and Practitioner IDs, building the `X-Provenance` header, and creating or modifying a Group Resource.

### Locate your Organization ID

Log into the [DPC Sandbox](https://sandbox.dpc.cms.gov/users/sign_in) and locate your Organization ID underneath the Organization name. You can also make a request to `/Organization` via the sandbox API. The `id` field on the returned **Organization Resource** is your Organization ID.

**Example request**

{% capture snippet %}
GET /api/v1/Organization
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

**Example cURL command**

{% capture snippet %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Organization \
     -H 'Authorization: Bearer {BEARER_TOKEN}' \
     -H 'Accept: application/fhir+json'
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

**Example response** (`200 OK`)

{% capture snippet %}
{
  "resourceType": "Bundle",
  "type": "collection",
  "total": 1,
  "entry": [
    {
      "resource": {
        "resourceType": "Organization",
        "id": "8b5d5e85-f81a-4da7-9ae6-9b56d23e4e1e",
        "identifier": [
          {
            "system": "http://hl7.org/fhir/sid/us-npi",
            "value": "1234567893"
          }
        ],
        "name": "Sample Healthcare Organization"
      }
    }
  ]
}
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" %}

### Locate your Practitioner ID

Send a GET request to `/Practitioner` to retrieve a Bundle of Practitioner Resources for your organization. Find your Practitioner ID by referencing the `id` field in your practitioner's resource object.

**Example request**

{% capture snippet %}
GET /api/v1/Practitioner
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

**Example cURL command**

{% capture snippet %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Practitioner \
     -H 'Authorization: Bearer {BEARER_TOKEN}' \
     -H 'Accept: application/fhir+json'
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

**Example response** (`200 OK`)

{% capture snippet %}
{
  "resourceType": "Bundle",
  "type": "searchset",
  "total": 1,
  "entry": [
    {
      "resource": {
        "resourceType": "Practitioner",
        "id": "a8f8e1c9-3d7b-4a2f-9c8e-1f5b6d7e8a9b",
        "identifier": [
          {
            "system": "http://hl7.org/fhir/sid/us-npi",
            "value": "9941339108"
          }
        ],
        "name": [
          {
            "family": "Smith",
            "given": [
              "Jane"
            ]
          }
        ]
      }
    }
  ]
}
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" %}

### Build the X-Provenance header

Combine the Organization ID from the [Organization response](#locate-your-organization-id) and the Practitioner ID from the [Practitioner response](#locate-your-practitioner-id) into a Provenance Resource. This Resource is sent as the value of the `X-Provenance` header on every request that creates or modifies a Group Resource.

**Provenance Resource template**

{% capture snippet %}
{
  "resourceType": "Provenance",
  "meta": {
    "profile": [
      "https://dpc.cms.gov/api/v1/StructureDefinition/dpc-profile-attestation"
    ]
  },
  "recorded": "{TIMESTAMP}",
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
        "reference": "Organization/{ORGANIZATION_ID}"
      },
      "onBehalfOfReference": {
        "reference": "Practitioner/{PRACTITIONER_ID}"
      }
    }
  ]
}
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" can_copy=true %}

Replace the placeholders before sending:

- `{TIMESTAMP}`: an ISO 8601 timestamp for when the attestation is being made.
- `{ORGANIZATION_ID}`: the `id` of the Organization Resource in your response.
- `{PRACTITIONER_ID}`: the `id` of the Practitioner Resource you want to attest for.

### Sending the header

HTTP headers can't contain newlines, so for this example you'll need to flatten the JSON to a single line before using it as the `X-Provenance` value. Save the JSON to `provenance.json` and strip whitespace with `tr`:

{% capture snippet %}
X_PROVENANCE=$(cat provenance.json | tr -d '\n ')
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

With `X_PROVENANCE` set, reference it in the cURL header on requests that modify a Group Resource:

{% capture snippet %}
-H "X-Provenance: $X_PROVENANCE"
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

You'll use this header in the next steps when creating and modifying Group Resources.

## Create a Group Resource

You'll need to create a Group Resource to link a list of [registered patients]({{ "/api-documentation/attribution/upload-patients.html" | relative_url }}) to a [registered practitioner]({{ "/api-documentation/attribution/upload-practitioners.html" | relative_url }}). POST a Group Resource that lists the practitioner the patients are being attributed to and the patients themselves.

### Group Resource requirements

- [National Provider Identity (NPI)](https://www.cms.gov/Regulations-and-Guidance/Administrative-Simplification/NationalProvIdentStand/) of the practitioner that patients will be attributed to.
  - Refer to the example below for how to include the NPI in the request body.
- The DPC `id` for each patient, **not** the patient's MBI.
  - Retrieve each patient's `id` using the [/Patient endpoint]({{ "/api-documentation/attribution/upload-patients/add-view-list-patients.html#list-all-patients" | relative_url }}).

{% include alert.html variant="warning" text="Don't use Parameter and Bundle Resources when adding, updating, or overwriting groups." classNames="measure-6" %}

**Example request**

{% capture snippet %}
POST /api/v1/Group
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

**Example `group.json` request body**

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
            "code": "{PRACTITIONER_NPI}"
          }
        ]
      }
    }
  ],
  "member": [
    {
      "entity": {
        "reference": "Patient/{PATIENT_DPC_ID}"
      }
    }
  ]
}
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" can_copy=true %}

**Example cURL command**

{% capture snippet %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Group \
     -H 'Authorization: Bearer {BEARER_TOKEN}' \
     -H 'Accept: application/fhir+json' \
     -H 'Content-Type: application/fhir+json' \
     -H "X-Provenance: $X_PROVENANCE" \
     -X POST \
     -d @group.json
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

**Example response** (`201 Created`)

The Group Resource response includes `period` and `inactive` elements for each patient. These indicate the time period for which the patient has an active relationship with the practitioner. If the relationship has expired, the time period for which the patient _was active_ will be shown.

When creating a group, DPC sets each member's `period.start` to the time of attribution and `period.end` to 90 days later.

{% capture snippet %}
{
  "resourceType": "Group",
  "id": "64d0cd85-7767-425a-a3b8-dcc9bdfd5402",
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
      },
      "exclude": false
    }
  ],
  "member": [
    {
      "entity": {
        "reference": "Patient/4d72ad76-fbc6-4525-be91-7f358f0fea9d"
      },
      "period": {
        "start": "2026-04-28T17:44:27+00:00",
        "end": "2026-07-27T17:44:27+00:00"
      },
      "inactive": false
    },
    {
      "entity": {
        "reference": "Patient/74af8018-f3a1-469c-9bfa-1dfd8a646874"
      },
      "period": {
        "start": "2026-04-28T17:44:27+00:00",
        "end": "2026-07-27T17:44:27+00:00"
      },
      "inactive": false
    }
  ]
}
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" %}

<!-- #### Common errors

- **`500` with `Roster MUST have attributed Provider`** usually means a `Patient/...` reference is using an MBI instead of the patient's DPC FHIR `id`. The same error can also surface if you send `valueReference` instead of `valueCodeableConcept` for the practitioner.
- **`403` with `Could not create a roster for this provider as they already have one`** means this practitioner already has a Group Resource. Either [locate the existing Group ID](#locate-your-group-id) and update it, or delete it first.
- **`401 Unauthorized` with a token that looks valid** is most often a truncated paste (the token is missing leading characters) or an expired token (5-minute TTL). -->

## Locate your Group ID

You can only pull data for one practitioner's patient group at a time. Send a GET request to the `/Group` endpoint to retrieve the practitioner's [attribution group](https://hl7.org/fhir/STU3/group.html). Use their NPI number as a parameter.

The response will return a [Bundle](https://www.hl7.org/fhir/STU3/bundle.html) Resource which contains attribution groups for the given practitioner.

You can use the Group ID value of the returned resources to [initiate an export job]({{ "/api-documentation/export-data.html#initiating-an-export-job" | relative_url }}). Find your Group ID by referencing the `id` variable in your group's resource object.

**Example Group Resource**

{% capture snippet %}
"resource": {
  "resourceType": "Group",
  "id": "64d0cd85-7767-425a-a3b8-dcc9bdfd5402"
}
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" %}

**Example request**

{% capture snippet %}
GET /api/v1/Group?characteristic-value=attributed-to%24{PRACTITIONER_NPI}
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

**Example cURL command**

{% capture snippet %}
curl -v 'https://sandbox.dpc.cms.gov/api/v1/Group?characteristic-value=attributed-to%24{PRACTITIONER_NPI}' \
     -H 'Authorization: Bearer {BEARER_TOKEN}' \
     -H 'Accept: application/fhir+json'
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

**Example response** (`200 OK`)

To identify patients with expired attributions, evaluate the response for members whose `inactive` flag is `true` or whose `period.end` is more than 90 days in the past.

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
                  "code": "{PRACTITIONER_NPI}"
                }
              ]
            },
            "exclude": false
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
    }
  ]
}
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" %}

## Add patients to a group

Use the `$add` operation to add new patients to a group.

**Example request**

{% capture snippet %}
POST /api/v1/Group/{GROUP_ID}/$add
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

**Example `group_addition.json` request body**

When adding patients to a group, the body must include the same `characteristic` array that was used when the group was created.

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
            "code": "{PRACTITIONER_NPI}"
          }
        ]
      }
    }
  ],
  "member": [
    {
      "entity": {
        "reference": "Patient/{PATIENT_DPC_ID}"
      }
    }
  ]
}
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" can_copy=true %}

**Example cURL command**

{% capture snippet %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Group/{GROUP_ID}/\$add \
     -H 'Authorization: Bearer {BEARER_TOKEN}' \
     -H 'Accept: application/fhir+json' \
     -H 'Content-Type: application/fhir+json' \
     -H "X-Provenance: $X_PROVENANCE" \
     -X POST \
     -d @group_addition.json
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

**Example response** (`200 OK`)

{% capture snippet %}
{
  "resourceType": "Group",
  "id": "64d0cd85-7767-425a-a3b8-dcc9bdfd5402",
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
      },
      "exclude": false
    }
  ],
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
    }
  ]
}
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" %}

## Remove patients from a group

Use a custom `$remove` operation on the `/Group` endpoint to remove a patient from a group. The patient stays in the `member` array but their `inactive` flag is set to `true` and their `period.end` is set to the time of the request. They will not be included in subsequent exports.

**Example request**

{% capture snippet %}
POST /api/v1/Group/{GROUP_ID}/$remove
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

**Example `group_removal.json` request body**

Like `$add`, the body must include the practitioner `characteristic`.

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
            "code": "{PRACTITIONER_NPI}"
          }
        ]
      }
    }
  ],
  "member": [
    {
      "entity": {
        "reference": "Patient/{PATIENT_DPC_ID}"
      }
    }
  ]
}
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" can_copy=true %}

**Example cURL command**

{% capture snippet %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Group/{GROUP_ID}/\$remove \
     -H 'Authorization: Bearer {BEARER_TOKEN}' \
     -H 'Accept: application/fhir+json' \
     -H 'Content-Type: application/fhir+json' \
     -X POST \
     -d @group_removal.json
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

**Example response** (`200 OK`)

The removed patient stays in `member` with `inactive: true` and `period.end` set to the request time.

{% capture snippet %}
{
  "resourceType": "Group",
  "id": "64d0cd85-7767-425a-a3b8-dcc9bdfd5402",
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
      },
      "exclude": false
    }
  ],
  "member": [
    {
      "entity": {
        "reference": "Patient/4d72ad76-fbc6-4525-be91-7f358f0fea9d"
      },
      "period": {
        "start": "2020-06-17T17:44:27+00:00",
        "end": "2020-09-15T17:44:27+00:00"
      },
      "inactive": false
    },
    {
      "entity": {
        "reference": "Patient/74af8018-f3a1-469c-9bfa-1dfd8a646874"
      },
      "period": {
        "start": "2020-06-17T17:44:27+00:00",
        "end": "2020-09-15T17:44:27+00:00"
      },
      "inactive": true
    }
  ]
}
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" %}

## Overwrite group membership

You can submit a Group Resource which overwrites the existing group with members of a different resource.

{% include alert.html variant="warning" text="This endpoint does not merge with the existing membership state, but replaces it." classNames="measure-6" %}

Patients in the existing group that you omit from the PUT body are not deleted, they're retained in the response with `inactive: true` and a shortened `period.end`, just like an explicit `$remove`. Filter by `inactive: false` on subsequent reads to get only currently-attributed patients.

**Example request**

{% capture snippet %}
PUT /api/v1/Group/{GROUP_ID}
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

**Example `updated_group.json` request body**

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
            "code": "{PRACTITIONER_NPI}"
          }
        ]
      }
    }
  ],
  "member": [
    {
      "entity": {
        "reference": "Patient/{PATIENT_DPC_ID}"
      }
    }
  ]
}
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" can_copy=true %}

**Example cURL command**

{% capture snippet %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Group/{GROUP_ID} \
     -H 'Authorization: Bearer {BEARER_TOKEN}' \
     -H 'Accept: application/fhir+json' \
     -H 'Content-Type: application/fhir+json' \
     -H "X-Provenance: $X_PROVENANCE" \
     -X PUT \
     -d @updated_group.json
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

**Example response** (`200 OK`)

The response shows the group's full member history. Patients newly listed in the PUT body get a fresh 90-day `period`.

{% capture snippet %}
{
  "resourceType": "Group",
  "id": "64d0cd85-7767-425a-a3b8-dcc9bdfd5402",
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
      },
      "exclude": false
    }
  ],
  "member": [
    {
      "entity": {
        "reference": "Patient/4d72ad76-fbc6-4525-be91-7f358f0fea9d"
      },
      "period": {
        "start": "2026-04-28T17:44:27+00:00",
        "end": "2026-07-27T17:44:27+00:00"
      },
      "inactive": false
    },
    {
      "entity": {
        "reference": "Patient/bb151edf-a8b5-4f5c-9867-69794bcb48d1"
      },
      "period": {
        "start": "2026-04-28T17:44:27+00:00",
        "end": "2026-07-27T17:44:27+00:00"
      },
      "inactive": false
    },
    {
      "entity": {
        "reference": "Patient/74af8018-f3a1-469c-9bfa-1dfd8a646874"
      },
      "period": {
        "start": "2026-04-28T17:44:27+00:00",
        "end": "2026-04-28T18:30:00+00:00"
      },
      "inactive": true
    }
  ]
}
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" %}

## Attestation expiration

Every 90 days, practitioners need to update their **Provenance Resources** and **Group Resources** by re-attributing patients to the practitioner's group.

When an attribution relationship between a patient and practitioner has expired (either due to exceeding the 90-day threshold or being manually removed), the patient's `inactive` flag will be set to `true`. Patients who are attributed to a practitioner but have their `inactive` flag set to `true` will not be included in bulk data exports.
