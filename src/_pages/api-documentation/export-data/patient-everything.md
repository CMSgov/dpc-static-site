---
layout: api-docs
page_title: "/Patient/$everything"
seo_title: ""
description: "Retrieve all FHIR resources for a single patient, including 7 years of historical data, using the DPC API's /Patient/$everything endpoint."
in-page-nav: true
---

# {{ page.page_title }}

The `/Patient/{PATIENT_ID}/$everything` endpoint lets you retrieve all resources about a patient using their DPC internal ID (UUID), represented as `{PATIENT_ID}` in the request. They'll receive a bundle with 7 years' historical data including:

- Patient  
- Coverage  
- ExplanationOfBenefit 

This is a synchronous download. `/Patient/{PATIENT_ID}/$everything` doesn't create a job that needs to be monitored or data files to download. The response body will contain the bundle. This is how it differs from a `/Group/$export` operation.


**Note:** A Patient record must already exist in the DPC database to complete your request. However, the patient does not need to belong to [a group]({{ "/api-documentation/attribution/attestation.html#create-a-group-resource" | relative_url }}).

## Find a patient's DPC ID

If you only have the patient's Medicare Beneficiary Identifier (MBI) you can retrieve the DPC internal ID by first [making a GET request for that specific patient]({{ "/api-documentation/attribution/upload-patients/add-view-list-patients.html#get-a-specific-patient" | relative_url }}). The UUID is returned in that response.

Learn more about the HL7 FHIR Specification for:

- [Operation Patient Everything (Release v4)](http://hl7.org/fhir/R4/operation-patient-everything.html)  
- [Operation Patient Everything (Release v3)](http://hl7.org/fhir/STU3/operation-patient-everything.html)  
- [Provenance Resource](https://www.hl7.org/fhir/provenance.html)

## Request data using _since with the /Patient endpoint

Request data synchronously for an individual patient using the `_since` parameter within the `/Patient/{PATIENT_ID}/$everything` endpoint. 

This operation will return all data for the specified patient since the selected date: May 13, 2021. Notice that we are seeking data from the `/Patient/{PATIENT_ID}/$everything` endpoint. This is a synchronous request for an individual patient referenced by the internal ID (UUID) and would behave differently if it was made from the `/Group/$export` endpoint as data is returned immediately.

### Successful request

If the request was successful, a `200 OK` response code will be returned and the response will not include a Content-Location header. Instead, it contains the data in the body of the response.

**Example request**

{% capture snippet %}
GET /api/v1/Patient/{PATIENT_ID}/$everything?_since=2021-05-13T08:00:00.000-05:00
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

**Request headers**

{% capture snippet %}
Authorization: Bearer {ACCESS_TOKEN}
Accept: application/fhir+json
X-Provenance: {"resourceType":"Provenance","recorded":"...","reason":[...],"agent":[...]}
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

The cURL example below uses the `$X_PROVENANCE` shell variable set up in [Build the X-Provenance header]({{ "/api-documentation/attribution/attestation.html#build-the-x-provenance-header" | relative_url }}).

**Example cURL command**

{% capture snippet %}
curl -X GET 'https://sandbox.dpc.cms.gov/api/v1/Patient/{PATIENT_ID}/$everything?_since=2021-05-13T08:00:00.000-05:00' \
     -H 'Accept: application/fhir+json' \
     -H "X-Provenance: $X_PROVENANCE" \
     -H 'Authorization: Bearer {ACCESS_TOKEN}'
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

**Example response**

{% capture snippet %}
200 OK
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}