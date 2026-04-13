---
layout: api-docs
page_title: "Export Data"
seo_title: ""
description: ""
in-page-nav: true
---

# {{ page.page_title }}

After completing the steps from <a href="{{ "/api-documentation/get-sandbox-credentials" | relative_url }}">getting sandbox credentials</a> to <a href="{{ "/api-documentation/attribution/attestation" | relative_url }}#create-a-patient-group-resource">creating a group</a>, you're ready to access sample DPC claims data.

The FHIR /Group/$export operation is the primary interaction with the DPC Sandbox API. This operation lets you export Patient, Coverage, and Explanation of Benefit data asynchronously and in bulk. Details on the FHIR bulk data operations can be found in the [FHIR Bulk Data Specification](https://build.fhir.org/ig/HL7/bulk-data/OperationDefinition-group-export.html).

**[Specify which resources to download with _type](#specify-which-resources-to-download-with-_type)**

You can specify which resources to download using the **_type query parameter** (e.g., ?_type=Patient,Coverage).

**[Request filtered data with _since](#request-filtered-data-with-_since)**

You can filter data using the _since parameter with either the /Patient or /Group endpoints. Dates and times submitted in _since must be listed in the FHIR [Instant](https://www.hl7.org/fhir/datatypes.html#instant) format.

**Get all data about a patient**

Use the <a href="{{ "/api-documentation/export-data/patient-everything" | relative_url }}">/Patient/{PATIENT_ID}/$everything</a> for 7 years" historical data including Patient, Coverage, and ExplanationOfBenefit Resources. 

## Initiate an export job

1. ### **Locate your Group ID**

     
   In order to start a patient data export job, locate your <a href="{{ "/api-documentation/attribution/attestation" | relative_url }}#how-to-locate-your-group-id">Group ID</a> by referencing the `id` variable in the resource object of your group.

### Example

{% capture snippet %}
"resource": {
  "resourceType": "Group",
  "id": "64d0cd85-7767-425a-a3b8-dcc9bdfd5402"
}
{% endcapture %}
{% include copy_snippet.html code=snippet language="json" %}

2. ### **Make a GET request to the /Group/$export endpoint** 

   

Make a GET request with headers: an access token, an Accept header, and a Prefer header.

### Example GET request

{% capture snippet %}
GET /api/v1/Group/{GROUP_ID}/$export
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

### Example cURL command

{% capture snippet %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Group/{GROUP_ID}/\$export \
     -H 'Authorization: Bearer {ACCESS_TOKEN}' \
     -H 'Accept: application/fhir+json' \
     -H 'Prefer: respond-async'
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

### Response

If the request was successful, a 202 Accepted response code will be returned with a Content-Location header. The value of this header indicates the location to monitor your job status and outcomes. The value of the header also contains the Export Job ID of the Job. There is no BODY to the response, only headers.

### Example

{% capture snippet %}
Content-Location: https://sandbox.dpc.cms.gov/api/v1/Jobs/{EXPORT_JOB_ID}
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

## Specify which resources to download with _type

The _type query parameter allows you to specify which FHIR resources you wish to export. If you do not specify a _type parameter in your request, all three resources will be exported: Explanation of Benefit, Patient, and Coverage. These Resources can be specified individually or as a group using a comma delimited list and the syntax ?_type=ExplanationOfBenefit,Patient,Coverage.

The following request will export the Patient and Coverage Resources, but NOT the Explanation of Benefit Resource.

### Example request; Patient and Coverage

{% capture snippet %}
GET /api/v1/Group/{GROUP_ID}/$export?_type=Patient,Coverage
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

By contrast, the following request will export the Explanation of Benefit Resource but NOT the Patient or Coverage Resources.

### Example request: Explanation of Benefit

{% capture snippet %}
GET /api/v1/Group/{GROUP_ID}/$export?_type=ExplanationOfBenefit
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

## Request filtered data with _since

You can filter data using the _since parameter with either the /Patient or /Group endpoints. You may want to set _since queries as a repeating call or as a way to check for patient updates to avoid downloading duplicate data.

{% include alert.html variant="warning" heading="Download all your data before using _since" text="We recommend running an unfiltered request (without using _since) to all resource types using the /Group/{GROUP_ID}/$export endpoint in order to retrieve all historical data for your associated beneficiaries. You only need to do this once." classNames="measure-6" %}

On subsequent calls you can begin retrieving incremental claims data for your beneficiaries using _since. We suggest using the transactionTime from your last bulk data request as the _since date.

You can make two types of filtered requests for data:

1. Request the most recent data for all beneficiaries: [Use _since within the /Group endpoint](https://dpc.cms.gov/docsV1#requesting-data-using-_since-with-the-group-endpoint).  
2. Request data synchronously for an individual patient: [Use _since within the /Patient endpoint](https://dpc.cms.gov/docsV1#requesting-data-using-_since-with-the-patient-endpoint).

### Steps to request filtered data

1. Obtain an <a href="{{ "/api-documentation/get-an-access-token" | relative_url }}">access token</a>.  
2. Start a job to acquire data (you will input the _since parameter here. Omit _since to download all data).  
3. Check the job status.  
4. Download the data.

Datetimes submitted using _since must follow the FHIR [Instant](https://www.hl7.org/fhir/datatypes.html#instant) format (YYYY-MM-DDThh:mm:sss\[-/+\]zz:zz).

* Sample Date: February 20, 2020 12:00 PM EST  
* Formatted Sample: 2020-02-20T12:00:00.000-05:00


**The value of the _since parameter must be URL encoded**

When using the <a href="{{ "/api-documentation/postman-collection" | relative_url }}">Postman Collection</a>, you'll need to manually encode the _since parameter when it contains a \+ sign since Postman does not automatically encode this character.

You can do this either by replacing the \+ with %2B (e.g., 2020-01-23T04:00:00.000%2B07:00 instead of 2020-01-23T04:00:00.000+07:00), or you can select the value and choose “EncodeURIComponent” from the context menu to have Postman encode the entire parameter automatically.

The Group/{id}/all/$export requires an access token as well as Accept and Prefer headers.  
The Prefer header is NOT required for /Patient/{id}/$everything, but it DOES require an X-Provenance header whereas the /Group/{id}/$export endpoint does not. The format is defined by the FHIR Bulk Data Export spec. Consult the [FHIR Datatypes](https://www.hl7.org/fhir/datatypes.html#instant) page for more information.

**Be wary of requesting data from before 02-12-2020**

Due to limitations in the Beneficiary FHIR Data (BFD) Server, data from before 02-12-2020 is marked with the arbitrary [lastUpdated](https://www.hl7.org/fhir/search.html#lastUpdated) date of 01-01-2020. If you input any dates between 01-01-2020 and 02-11-2020 in the _since parameter, you'll receive all historical data for your beneficiaries. Data loads from 02-12-2020 onwards have been marked with accurate dates.

## Request data using _since with the /Group endpoint

This operation will start a job for filtered data for existing beneficiaries at 8PM ET on May 13th, 2021 and will include all seven years of historical data for all patients in the Group who have a lastUpdated date that falls after the _since date. In the example, we request the Patient Resource Type. The steps and format would work similarly for other resource types.

If the request was successful, a 202 Accepted response code will be returned and the response will include a Content-Location header.

### Example

{% capture snippet %}
GET /api/v1/Group/{GROUP_ID}/$export?_type=Patient&_since=2020-02-13T08:00:00.000-05:00
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

### Request headers

{% capture snippet %}
Authorization: Bearer {ACCESS_TOKEN}
Accept: application/fhir+json
Prefer: respond-async
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

### cURL command using the _since parameter within the /Group endpoint

{% capture snippet %}
curl -X GET 'https://sandbox.dpc.cms.gov/api/v1/Group/{GROUP_ID}/$export?_since=2021-05-13T08:00:00.000-05:00' \
     -H 'Accept: application/fhir+json' \
     -H 'Prefer: respond-async' \
     -H 'Authorization: Bearer {ACCESS_TOKEN}'
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

### Response example: successful request

{% capture snippet %}
202 Accepted
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

## Check status of the export job

You can check the status of your job using the {unique ID of the export job}. This is retrieved from the Content-Location header of the response as shown in the previous section. The status of the job will change from 202 Accepted to 200 OK when the export job is complete and the data is ready to be downloaded.

### Example check status request

{% capture snippet %}
GET https://sandbox.dpc.cms.gov/api/v1/Jobs/{EXPORT_JOB_ID}
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

### Check status cURL command

{% capture snippet %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Jobs/{EXPORT_JOB_ID} \
     -H 'Authorization: Bearer {ACCESS_TOKEN}'
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

### Response

If the request was successful, the status of the job will change from 202 Accepted to 200 OK when the export job is complete and the data is ready to be downloaded.

### Example: Bulk Export Job

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

The output includes file integrity information in an extension array. It contains https://dpc.cms.gov/checksum (a checksum in the format algorithm:checksum) and https://dpc.cms.gov/file_length (the file length in bytes).

The number 42 in the example data file URLs is the same job ID from the Content-Location header URL when you initiate an export job. If some of the data cannot be exported due to errors, details of the errors can be found at the URLs in the error field. The errors are provided in [NDJSON](https://github.com/ndjson/ndjson-spec) files as FHIR [OperationOutcome](http://hl7.org/fhir/STU3/operationoutcome.html) resources.

## Retrieve the NDJSON output file(s)

To obtain the exported Explanation of Benefit data as NDJSON, make a GET request to the output URLs in the job status response when the job reaches the Completed state. The data will be presented as an [NDJSON](https://github.com/ndjson/ndjson-spec) file of ExplanationOfBenefit Resources.

The Data endpoint is not a FHIR resource and doesn't require the Accept header to be set to application/fhir+json.

### Example request for NDJSON files

{% capture snippet %}
GET https://sandbox.dpc.cms.gov/api/v1/Data/{FILE_NAME}
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

### Example cURL command

{% capture snippet %}
curl https://sandbox.dpc.cms.gov/api/v1/Data/{FILE_NAME} \
     -H 'Authorization: Bearer {ACCESS_TOKEN}' \
     -H 'Accept-Encoding: gzip' \
     --compressed
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

### Example: Explanation of Benefit Resource

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
