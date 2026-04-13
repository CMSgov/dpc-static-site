---
layout: api-docs
page_title: "/Patient/$everything"
seo_title: ""
description: ""
in-page-nav: true
---

# {{ page.page_title }}

The /Patient/{id}/$everything endpoint lets you retrieve all resources about a patient using their DPC internal ID (UUID), represented as {id} in the request. They"ll receive a bundle with 7 years" historical data including:

- Patient  
- Coverage  
- ExplanationOfBenefit 

This is a synchronous download. `/Patient/{id}/$everything` doesn't create a job that needs to be monitored or data files to download. The response body will contain the bundle. This is how it differs from a Group $export operation.

If you only have the patient"s Medicare Beneficiary Identifier (MBI) you can retrieve the DPC internal ID by first making a GET request for that <a href=”{{ "/api-documentation/attribution/upload-patients" | relative_url }}#list-a-specific-patient”>specific patient</a> as the UUID is returned in that response.

A Patient record must already exist in the DPC database to successfully complete your `/Patient/{id}/$everything` request; however, the patient doesn't need to belong to a group.

This request requires an X-Provenance header for attestation. See the <a href=”{{ "/api-documentation/attribution/attestation" | relative_url }}#example-attestation-for-x-provenance-header”>example attestation for X-Provenance header</a>.

Learn more about the HL7 FHIR Specification for:

- [Operation Patient Everything (Release v4)](http://hl7.org/fhir/R4/operation-patient-everything.html)  
- [Operation Patient Everything (Release v3)](http://hl7.org/fhir/STU3/operation-patient-everything.html)  
- [Provenance Resource](https://www.hl7.org/fhir/provenance.html)

## Requesting data using `_since` with the /Patient endpoint

Request data synchronously for an individual patient using the `_since` parameter within the `/Patient/{id}/$everything` endpoint. 

This operation will return all data for the specified patient since the selected date: May 13, 2021. Notice that we are seeking data from the `/Patient/{id}/$everything` endpoint. This is a synchronous request for an individual patient referenced by the internal ID (UUID) and would behave differently if it was made from the /Group endpoint as data is returned immediately.

If the request was successful, a 200 Success response code will be returned and the response will not include a Content-Location header. Instead, it contains the data in the body of the response.

{% capture snippet %}
GET /api/v1/Patient/{PATIENT_ID}/$everything?_since=2020-02-13T08:00:00.000-05:00
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

### Request headers

{% capture snippet %}
Authorization: Bearer {ACCESS_TOKEN}
Accept: application/fhir+json
X-Provenance: {PROVENANCE_JSON}
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

### cURL command using the _since parameter within the /Patient endpoint

{% capture snippet %}
curl -X GET 'https://sandbox.dpc.cms.gov/api/v1/Patient/{PATIENT_ID}/$everything?_since=2021-05-13T08:00:00.000-05:00' \
     -H 'Accept: application/fhir+json' \
     -H 'X-Provenance: {PROVENANCE_JSON}' \
     -H 'Authorization: Bearer {ACCESS_TOKEN}'
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

### Response example: successful request

{% capture snippet %}
200 Success
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}