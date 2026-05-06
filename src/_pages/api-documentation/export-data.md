---
layout: api-docs
page_title: "Export Data"
seo_title: ""
description: "Use the FHIR /Group/$export operation to asynchronously export Patient, Coverage, and Explanation of Benefit data in bulk from the DPC API."
in-page-nav: true
---

# {{ page.page_title }}

## The /Group/$export operation 

The`/Group/$export` operation is how you export bulk claims data from the DPC API. It returns [Patient, Coverage, and Explanation of Benefit data]({{ "/dpc-data.html" | relative_url }}) asynchronously.

Details on the FHIR bulk data operations can be found in the [FHIR Bulk Data Specification](https://build.fhir.org/ig/HL7/bulk-data/OperationDefinition-group-export.html). 

### Filtering data with _type and _since

Use `_type` and `_since` to [filter your results]({{ "/api-documentation/export-data/how-to-filter.html" | relative_url }}) by content, time, and range:

- `_type` restricts the export to specific FHIR Resources (e.g., `?_type=Patient,Coverage`).
- `_since` excludes data older than a given date (e.g., `?_since=2025-01-07T00:00:00Z`).
- For a single patient's full 7-year history including Patient, Coverage, and ExplanationOfBenefit, use [`/Patient/{PATIENT_ID}/$everything`]({{ "/api-documentation/export-data/patient-everything.html" | relative_url }}) instead of `$export`.

## Initiating an export job

### Locate your Group ID

Each export job operates on a single attribution group. The Group ID is the `id` field of the Group Resource, get it from the [POST /Group response]({{ "/api-documentation/attribution/attestation.html#create-a-group-resource" | relative_url }}) when you create the group, or from a [GET /Group lookup]({{ "/api-documentation/attribution/attestation.html#locate-your-group-id" | relative_url }}) by practitioner NPI.

**Example Group Resource**

{% capture snippet %}
"resource": {
  "resourceType": "Group",
  "id": "64d0cd85-7767-425a-a3b8-dcc9bdfd5402"
}
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" %}

### Initiate the export

Make a GET request to `/Group/{GROUP_ID}/$export` with `Authorization`, `Accept: application/fhir+json`, and `Prefer: respond-async` headers.

**Example request**

{% capture snippet %}
GET /api/v1/Group/{GROUP_ID}/$export
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

**Example cURL command**

{% capture snippet %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Group/{GROUP_ID}/\$export \
     -H 'Authorization: Bearer {BEARER_TOKEN}' \
     -H 'Accept: application/fhir+json' \
     -H 'Prefer: respond-async'
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

The API returns `202 Accepted` for successful requests. The response body is empty; the Job URL is returned in the `Content-Location` response header.

**Example response header** (`202 Accepted`)

{% capture snippet %}
Content-Location: https://sandbox.dpc.cms.gov/api/v1/Jobs/{JOB_ID}
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

## Check status of the export job

{% include alert.html variant="warning" text="Don't send <code>Accept: application/fhir+json</code> to the Jobs endpoint, it returns <code>406 Not Acceptable</code>. Either omit the <code>Accept</code> header or use <code>application/json</code>." classNames="measure-6" %}

Export jobs are asynchronous. While the job is still running, the same URL returns `202 Accepted` with no body. When the job completes, it returns `200 OK` with a JSON body listing the output files.

**Example cURL command** (use the URL directly from `Content-Location`)

{% capture snippet %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Jobs/{JOB_ID} \
     -H 'Authorization: Bearer {BEARER_TOKEN}'
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

**Example response**

{% capture snippet %}
{
 "transactionTime": "2026-04-28T21:07:46.876+00:00",
 "request": "https://sandbox.dpc.cms.gov/api/v1/Group/64d0cd85-7767-425a-a3b8-dcc9bdfd5402/$export",
 "requiresAccessToken": true,
 "output": [
   {
     "type": "ExplanationOfBenefit",
     "url": "https://sandbox.dpc.cms.gov/api/v1/Data/06abfdd3-dc05-43aa-b07a-361651576c3b-0.explanationofbenefit.ndjson",
     "count": 45,
     "extension": [
       {
         "url": "https://dpc.cms.gov/checksum",
         "valueString": "sha256:39d130b14dab19ffde88b577b8e422839ba6471426be10405431c2c3fd4cab83"
       },
       {
         "url": "https://dpc.cms.gov/file_length",
         "valueDecimal": 14692
       }
     ]
   }
 ],
 "error": [],
 "extension": [
   {
     "url": "https://dpc.cms.gov/submit_time",
     "valueDateTime": "2026-04-28T21:07:46.876+00:00"
   },
   {
     "url": "https://dpc.cms.gov/complete_time",
     "valueDateTime": "2026-04-28T21:07:47.488+00:00"
   }
 ]
}
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" %}

Each `output` item contains a `count` (the number of records in the NDJSON file) and a checksum/length for integrity verification. The `error` array (empty when there are no errors) lists URLs to NDJSON files containing per-resource [OperationOutcome](http://hl7.org/fhir/STU3/operationoutcome.html) failures.

## Retrieve the NDJSON output file(s)

{% include alert.html variant="warning" text="The Data endpoint is not a FHIR resource. Don't send <code>Accept: application/fhir+json</code> or <code>application/fhir+ndjson</code>, both return <code>406 Not Acceptable</code>. Omit the <code>Accept</code> header." classNames="measure-6" %}

Fetch each URL in `output[].url` with your bearer token to download an [NDJSON](https://github.com/ndjson/ndjson-spec) file of FHIR resources (Patient, Coverage, or ExplanationOfBenefit, depending on the entry).

**Example request**

{% capture snippet %}
GET https://sandbox.dpc.cms.gov/api/v1/Data/{NDJSON_FILE}
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

**Example cURL command**

{% capture snippet %}
curl https://sandbox.dpc.cms.gov/api/v1/Data/{NDJSON_FILE} \
     -H 'Authorization: Bearer {BEARER_TOKEN}' \
     -H 'Accept-Encoding: gzip' \
     --compressed
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

**Example response**

{% capture snippet %}
{
 "status":"active",
 "diagnosis":[
   {
    "diagnosisCodeableConcept":{
       "coding":[
         {
           "system":"http://hl7.org/fhir/sid/icd-9-cm",
           "code":"2113"
         }
       ]
     },
     "sequence":1,
     "type":[
       {
         "coding":[
           {
             "system":"https://bluebutton.cms.gov/resources/codesystem/diagnosis-type",
             "code":"principal",
             "display":"The single medical diagnosis that is most relevant to the patient's chief complaint or need for treatment."
           }
         ]
       }
     ]
   }
 ],
 "id":"carrier-10300336722",
 "payment":{
   "amount":{
     "system":"urn:iso:std:iso:4217",
     "code":"USD",
     "value":250.0
   }
 },
 "resourceType":"ExplanationOfBenefit",
 "billablePeriod":{
   "start":"2000-10-01",
   "end":"2000-10-01"
 },
 "extension":[
   {
     "valueMoney":{
       "system":"urn:iso:std:iso:4217",
       "code":"USD",
       "value":0.0
     },
     "url":"https://bluebutton.cms.gov/resources/variables/prpayamt"
   },
   {
     "valueIdentifier":{
       "system":"https://bluebutton.cms.gov/resources/variables/carr_num",
       "value":"99999"
     },
     "url":"https://bluebutton.cms.gov/resources/variables/carr_num"
   },
   {
     "valueCoding":{
       "system":"https://bluebutton.cms.gov/resources/variables/carr_clm_pmt_dnl_cd",
       "code":"1",
       "display":"Physician/supplier"
     },
     "url":"https://bluebutton.cms.gov/resources/variables/carr_clm_pmt_dnl_cd"
   }
 ],
 "type":{
   "coding":[
     {
       "system":"https://bluebutton.cms.gov/resources/variables/nch_clm_type_cd",
       "code":"71",
       "display":"Local carrier non-durable medical equipment, prosthetics, orthotics, and supplies (DMEPOS) claim"
     },
     {
       "system":"https://bluebutton.cms.gov/resources/codesystem/eob-type",
       "code":"CARRIER"
     },
     {
       "system":"http://hl7.org/fhir/ex-claimtype",
       "code":"professional",
       "display":"Professional"
     },
     {
       "system":"https://bluebutton.cms.gov/resources/variables/nch_near_line_rec_ident_cd",
       "code":"O",
       "display":"Part B physician/supplier claim record (processed by local carriers; can include DMEPOS services)"
     }
   ]
 },
 "patient":{
   "reference":"Patient/20000000000001"
 },
 "identifier":[
   {
     "system":"https://bluebutton.cms.gov/resources/variables/clm_id",
     "value":"10300336722"
   },
   {
     "system":"https://bluebutton.cms.gov/resources/identifier/claim-group",
     "value":"44077735787"
   }
 ],
 "insurance":{
   "coverage":{
     "reference":"Coverage/part-b-20000000000001"
   }
 },
 "item":[
   {
     "locationCodeableConcept":{
       "extension":[
         {
           "valueCoding":{
             "system":"https://bluebutton.cms.gov/resources/variables/prvdr_state_cd",
             "code":"99",
             "display":"With 000 county code is American Samoa; otherwise unknown"
           },
           "url":"https://bluebutton.cms.gov/resources/variables/prvdr_state_cd"
         },
         {
           "valueCoding":{
             "system":"https://bluebutton.cms.gov/resources/variables/prvdr_zip",
             "code":"999999999"
           },
           "url":"https://bluebutton.cms.gov/resources/variables/prvdr_zip"
         },
         {
           "valueCoding":{
             "system":"https://bluebutton.cms.gov/resources/variables/carr_line_prcng_lclty_cd",
             "code":"99"
           },
           "url":"https://bluebutton.cms.gov/resources/variables/carr_line_prcng_lclty_cd"
         }
       ],
       "coding":[
         {
           "system":"https://bluebutton.cms.gov/resources/variables/line_place_of_srvc_cd",
           "code":"99",
           "display":"Other Place of Service. Other place of service not identified above."
         }
       ]
     },
     "service":{
       "coding":[
         {
           "system":"https://bluebutton.cms.gov/resources/codesystem/hcpcs",
           "code":"45384",
           "version":"0"
         }
       ]
     },
     "extension":[
       {
         "valueCoding":{
           "system":"https://bluebutton.cms.gov/resources/variables/carr_line_mtus_cd",
           "code":"3",
           "display":"Services"
         },
         "url":"https://bluebutton.cms.gov/resources/variables/carr_line_mtus_cd"
       },
       {
         "valueQuantity":{
           "value":1
         },
         "url":"https://bluebutton.cms.gov/resources/variables/carr_line_mtus_cnt"
       }
     ],
     "servicedPeriod":{
       "start":"2000-10-01",
       "end":"2000-10-01"
     },
     "quantity":{
       "value":1
     },
     "category":{
       "coding":[
         {
           "system":"https://bluebutton.cms.gov/resources/variables/line_cms_type_srvc_cd",
           "code":"2",
           "display":"Surgery"
         }
       ]
     },
     "sequence":1,
     "diagnosisLinkId":[
       2
     ],
     "adjudication":[
       {
         "category":{
           "coding":[
             {
               "system": "https://bluebutton.cms.gov/resources/codesystem/adjudication",
               "code": "https://bluebutton.cms.gov/resources/variables/carr_line_rdcd_pmt_phys_astn_c",
               "display":"Carrier Line Reduced Payment Physician Assistant Code"
             }
           ]
         },
         "reason":{
           "coding":[
             {
               "system":"https://bluebutton.cms.gov/resources/variables/carr_line_rdcd_pmt_phys_astn_c",
               "code":"0",
               "display":"N/A"
             }
           ]
         }
       },
       {
         "extension":[
           {
             "valueCoding":{
               "system":"https://bluebutton.cms.gov/resources/variables/line_pmt_80_100_cd",
               "code":"0",
               "display":"80%"
             },
             "url":"https://bluebutton.cms.gov/resources/variables/line_pmt_80_100_cd"
           }
         ],
         "amount":{
           "system":"urn:iso:std:iso:4217",
           "code":"USD",
           "value":250.0
         },
         "category":{
           "coding":[
             {
               "system":"https://bluebutton.cms.gov/resources/codesystem/adjudication",
               "code":"https://bluebutton.cms.gov/resources/variables/line_nch_pmt_amt",
               "display":"Line NCH Medicare Payment Amount"
             }
           ]
         }
       },
       {
         "category":{
           "coding":[
             {
               "system":"https://bluebutton.cms.gov/resources/codesystem/adjudication",
               "code":"https://bluebutton.cms.gov/resources/variables/line_bene_pmt_amt",
               "display":"Line Payment Amount to Beneficiary"
             }
           ]
         },
         "amount":{
           "system":"urn:iso:std:iso:4217",
           "code":"USD",
           "value":0.0
         }
       }
     ]
   }
 ]
}
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" %}