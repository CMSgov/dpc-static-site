---
layout: api-docs
page_title: "Export Data"
seo_title: ""
description: ""
in-page-nav: true
---

# {{ page.page_title }}

## The `/Group/$export` operation 

The FHIR `/Group/$export` operation is the primary interaction with the DPC Sandbox API. It lets you export [Patient, Coverage, and Explanation of Benefit data]({{ "/dpc-data.html" | relative_url }}) asynchronously and in bulk. Details on the FHIR bulk data operations can be found in the [FHIR Bulk Data Specification](https://build.fhir.org/ig/HL7/bulk-data/OperationDefinition-group-export.html). 

### Filtering data with `_type` and `_since`

Use `_type` and `_since` to [filter your results]({{ "/api-documentation/export-data/how-to-filter.html" | relative_url }}) by content, time, and range.

#### Filter by FHIR Resource type with `_type`
Specify which of the FHIR resources to download using the `_type` query parameter (e.g., `?_type=Patient,Coverage`).

#### Exclude data before a specified date with _since
Choose to download data obtained after a certain date by adding the `_since` parameter (e.g., only show Patient data from January 7, 2025 to the present). 

#### Get all of a patient's data  
Use [`/Patient/{PATIENT_ID}/$everything`]({{ "/api-documentation/export-data/patient-everything.html" | relative_url }}) for 7 years' historical data including Patient, Coverage, and ExplanationOfBenefit Resources. 

## Initiating an export job

### 1. Locate your Group ID
    
In order to start a patient data export job, locate your [Group ID]({{ "/api-documentation/attribution/attestation.html#create-a-patient-group-resource" | relative_url }}) by referencing the `id` variable in the resource object of your group.

**Example Group Resource**

{% capture snippet %}
"resource": {
  "resourceType": "Group",
  "id": "64d0cd85-7767-425a-a3b8-dcc9bdfd5402"
}
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" %}

### 2. Make a GET request to the /Group/$export endpoint

Make a GET request with headers: an access token, an Accept header, and a Prefer header.

**Example request**

{% capture snippet %}
GET /api/v1/Group/{GROUP_ID}/$export
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

**Example cURL command**

{% capture snippet %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Group/{GROUP_ID}/\$export \
     -H 'Authorization: Bearer {ACCESS_TOKEN}' \
     -H 'Accept: application/fhir+json' \
     -H 'Prefer: respond-async'
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

The API returns a `202 Accepted` response code for successful requests. The response will be returned with a Content-Location header. The value of this header indicates the location to monitor your job status and outcomes. The value of the header also contains the export `JOB_ID` of the Job. There is no BODY to the response, only headers.

**Example response: Content-Location header**

{% capture snippet %}
Content-Location: https://sandbox.dpc.cms.gov/api/v1/Jobs/{JOB_ID}
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

## Check status of the export job

You can check the status of your job using the `{EXPORT_JOB_ID}` from the Content-Location header of the response as shown in the previous section. The status of the job will change from `202 Accepted` to `200 OK` when the export job is complete and the data is ready to be downloaded.

**Example request**

{% capture snippet %}
GET https://sandbox.dpc.cms.gov/api/v1/Jobs/{EXPORT_JOB_ID}
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

**Example cURL command**

{% capture snippet %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Jobs/{EXPORT_JOB_ID} \
     -H 'Authorization: Bearer {ACCESS_TOKEN}'
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

If the request was successful, the status of the job will change from `202 Accepted` to `200 OK` when the export job is complete and the data is ready to be downloaded.

**Example response: bulk export job**

{% capture snippet %}
{
 "transactionTime": "2018-10-19T14:47:33.975024Z",
 "request": "https://sandbox.dpc.cms.gov/api/v1/Group/64d0cd85-7767-425a-a3b8-dcc9bdfd5402/$export",
 "requiresAccessToken": true,
 "output": [
   {
     "type": "ExplanationOfBenefit",
     "url": "https://sandbox.dpc.cms.gov/api/v1/Data/42/DBBD1CE1-AE24-435C-807D-ED45953077D3.ndjson",
     "extension": [
       {
         "url": "https://dpc.cms.gov/checksum",
         "valueString": "sha256:8b74ba377554fa73de2a2da52cab9e1d160550247053e4d6aba1968624c67b10"
       },
       {
         "url": "https://dpc.cms.gov/file_length",
         "valueDecimal": 2468
       }
     ]
   }
 ],
 "error": [
   {
     "type": "OperationOutcome",
     "url": "https://sandbox.dpc.cms.gov/api/v1/data/42/DBBD1CE1-AE24-435C-807D-ED45953077D3-error.ndjson"
   }
 ]
}
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" %}

Claims data can be found at the URLs within the output field.

The output includes file integrity information in an extension array. It contains `https://dpc.cms.gov/checksum` (a checksum in the format algorithm:checksum) and `https://dpc.cms.gov/file_length` (the file length in bytes).

The number 42 in the example data file URLs is the same job ID from the Content-Location header URL when you initiate an export job. If some of the data cannot be exported due to errors, details of the errors can be found at the URLs in the error field. The errors are provided in [NDJSON](https://github.com/ndjson/ndjson-spec) files as FHIR [OperationOutcome](http://hl7.org/fhir/STU3/operationoutcome.html) resources.

## Retrieve the NDJSON output file(s)

To obtain the exported Explanation of Benefit data as NDJSON, make a GET request to the output URLs in the job status response when the job reaches the Completed state. The data will be presented as an [NDJSON](https://github.com/ndjson/ndjson-spec) file of ExplanationOfBenefit Resources.

The Data endpoint is not a FHIR resource and doesn't require the Accept header to be set to application/fhir+json.

**Example request**

{% capture snippet %}
GET https://sandbox.dpc.cms.gov/api/v1/Data/{FILE_NAME}
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

**Example cURL command**

{% capture snippet %}
curl https://sandbox.dpc.cms.gov/api/v1/Data/{FILE_NAME} \
     -H 'Authorization: Bearer {ACCESS_TOKEN}' \
     -H 'Accept-Encoding: gzip' \
     --compressed
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

**Example response: Explanation of Benefit resource**

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