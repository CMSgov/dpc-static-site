---
layout: api-docs
page_title: "How to Filter Claims Data"
seo_title: ""
description: ""
in-page-nav: true
---

# {{ page.page_title }}

DPC uses `_type` and `_since` parameters to filter your results by content, time, and range.

## Filter claims data by FHIR Resource with `_type`

The `_type` query parameter allows you to specify which FHIR Resources you wish to export. If you do not specify a `_type` parameter in your request, all three resources will be exported: [Explanation of Benefit, Patient, and Coverage]({{ "/dpc-data.html" | relative_url }}). You can specify these Resources individually or as a group using a comma delimited list and the syntax `?_type=ExplanationOfBenefit,Patient,Coverage`.

The following request will export the Patient and Coverage Resources, but NOT the Explanation of Benefit Resource.

**Example request: Patient and Coverage**

{% capture snippet %}
GET /api/v1/Group/{GROUP_ID}/$export?_type=Patient,Coverage
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

By contrast, the following request will export the Explanation of Benefit Resource but **NOT** the Patient or Coverage Resources.

**Example request: Explanation of Benefit**

{% capture snippet %}
GET /api/v1/Group/{GROUP_ID}/$export?_type=ExplanationOfBenefit
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

## Request filtered data with `_since`

You can filter data using the `_since` parameter with either the `/Patient` or `/Group` endpoints. You may want to set `_since` queries as a repeating call or as a way to check for patient updates to avoid downloading duplicate data.

{% include alert.html variant="warning" heading="Download all your data before using _since" text="We recommend running an unfiltered request (without using _since) to all resource types using the /Group/{GROUP_ID}/$export endpoint in order to retrieve all historical data for your associated beneficiaries. You only need to do this once." classNames="measure-6" %}

On subsequent calls you can begin retrieving incremental claims data for your beneficiaries using `_since`. We suggest using the `transactionTime` from your last bulk data request as the `_since` date.

Two ways to use `_since`:

1. Request the most recent data for all beneficiaries: [Use `_since` within the `/Group` endpoint](#request-data-using-_since-with-the-group-endpoint).  
2. Request data synchronously for an individual patient: [Use `_since` within the `/Patient` endpoint]({{ "/api-documentation/export-data/patient-everything.html#requesting-data-using-_since-with-the-patient-endpoint" | relative_url }}).

### Steps to request filtered data

1. Obtain an [access token]({{ "/api-documentation/get-access-token.html" | relative_url }}).  
2. Start a job to acquire data (you will input the `_since` parameter here. Omit `_since` to download all data).  
3. Check the job status.  
4. Download the data.

Datetimes submitted using `_since` must follow the [FHIR Instant format](https://www.hl7.org/fhir/datatypes.html#instant) (e.g. YYYY-MM-DDThh:mm:sss\[-/+\]zz:zz).

* Sample Date: February 20, 2020 12:00 PM EST  
* Formatted Sample: 2020-02-20T12:00:00.000-05:00


#### The value of the `_since` parameter must be URL encoded

When using the [Postman Collection]({{ "/api-documentation/postman-collection.html" | relative_url }}), you'll need to manually encode the `_since` parameter when it contains a `+` since Postman does not automatically encode this character.

You can do this either by replacing the `+` with `%2B` (e.g., 2020-01-23T04:00:00.000%2B07:00 instead of 2020-01-23T04:00:00.000+07:00), or you can select the value and choose "EncodeURIComponent" from the context menu to have Postman encode the entire parameter automatically.

The `/Group/{GROUP_ID}/$export` endpoint requires an access token as well as Accept and Prefer headers.  

The Prefer header is **NOT** required for `/Patient/{PATIENT_ID}/$everything`, but it DOES require an X-Provenance header whereas the `/Group/{GROUP_ID}/$export` endpoint does not. The format is defined by the FHIR Bulk Data Export spec. Consult the [FHIR Datatypes](https://www.hl7.org/fhir/datatypes.html#instant) page for more information.


{% include alert.html variant="warning" heading="Caution" text="Be wary of requesting data from before 02-12-2020" classNames="measure-6" %}

Due to limitations in the Beneficiary FHIR Data (BFD) Server, data from before 02-12-2020 is marked with the arbitrary [lastUpdated](https://www.hl7.org/fhir/search.html#lastUpdated) date of 01-01-2020. If you input any dates between 01-01-2020 and 02-11-2020 in the `_since` parameter, you'll receive all historical data for your beneficiaries. Data loads from 02-12-2020 onwards have been marked with accurate dates.

## Request data using `_since` with the `/Group` endpoint

This operation will start a job for filtered data for existing beneficiaries at 8PM ET on May 13th, 2021 and will include all seven years of historical data for all patients in the Group who have a lastUpdated date that falls after the `_since` date. In the example, we request the Patient Resource Type. The steps and format would work similarly for other resource types.

If the request was successful, a `202 Accepted` response code will be returned and the response will include a Content-Location header.

**Example request**

{% capture snippet %}
GET /api/v1/Group/{GROUP_ID}/$export?_type=Patient&_since=2021-05-13T08:00:00.000-05:00
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

**Request headers**

{% capture snippet %}
Authorization: Bearer {ACCESS_TOKEN}
Accept: application/fhir+json
Prefer: respond-async
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

**Example cURL command**

{% capture snippet %}
curl -X GET 'https://sandbox.dpc.cms.gov/api/v1/Group/{GROUP_ID}/$export?_since=2021-05-13T08:00:00.000-05:00' \
     -H 'Accept: application/fhir+json' \
     -H 'Prefer: respond-async' \
     -H 'Authorization: Bearer {ACCESS_TOKEN}'
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

**Example response**

{% capture snippet %}
202 Accepted
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}
