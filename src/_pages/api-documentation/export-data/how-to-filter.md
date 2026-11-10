---
layout: api-docs
page_title: "How to Filter Claims Data"
seo_title: "How to Filter Claims Data"
description: "Learn how to filter Medicare claims data requests using the _since, _type, and _typeFilter parameters."
in-page-nav: true
---

# {{ page.page_title }}

DPC offers 3 query parameters to filter or specify the resources returned:
- **_since:** applies a date boundary to your request
- **_type:** limits your request to 1 or more specific resource types
- **_typeFilter:** limits your request to resources matching the provided criteria

Use parameters in the sandbox or production environment to speed up download times and reduce file size.

## The _since parameter

The `_since` parameter lets you filter for claims data last updated after a specified date. Dates must use the [FHIR instant format](https://hl7.org/fhir/R4/datatypes.html#instant). 

- Sample date: July 1, 2026 12:00 PM EST
- Formatted sample: `2026-07-01T12:00:00.000-05:00`

<div class="usa-alert usa-alert--warning usa-alert--no-icon">
    <div class="usa-alert__body">
                <p class="usa-alert__text text-bold">Requesting data from before 03/26/2026</p>
        <p class="usa-alert__text">The FHIR resources available using DPC were first created in March 2026. Regardless of the service date, no resources from DPC will have a lastUpdated date earlier than March 2026.</p>
        <p>If you specify a date prior to 03/26/2026 with the _since parameter, your request will include a large amount of additional historical data for your enrollees. Your request using _since with a date on or later than 03/26/2026 will include resources marked with appropriate lastUpdated dates.</p>
        <p>If you wish to filter claims based on the date of service, use the _typeFilter parameter with service-date in your request.</p>
    </div>
</div>


We recommend new model entities run an unfiltered request for all historical data before using _since subsequently for incremental exports of new data. You can use `transactionTime` from your most recent job as the specified date.

The `_since` parameter can be used with `/Group` or `/Patient`, but each endpoint will return data for newly attributed enrollees differently.

### Using _since with /Patient 

Using `_since` with `/Patient` will return resources updated after the date provided for existing and newly attributed enrollees. 

Newly attributed enrollees are those who’ve been assigned to your model entity since your last attribution date. If you don’t apply `_since`, BCDA will return data as early as March 1, 2021.

#### Example request using _since with /Patient

<!-- snippet -->
{% capture curlSnippet %}{% raw %}
GET /api/v3/Patient/$export?_type=Patient&_since=2026-07-01T08:00:00.000-05:00
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" %}

#### Example curl command using _since with /Patient

This command combines the `GET` request and request header. The dollar sign `$` before `export` in the URL indicates the endpoint is an action, not a resource.

<!-- snippet -->
{% capture curlSnippet %}{% raw %}
curl -X GET "https://sandbox.dpc.cms.gov/api/v3/Patient/\$export?_type=Patient&_since=2026-07-01T08:00:00.000-05:00" \
    -H "Accept: application/fhir+json" \
    -H "Prefer: respond-async" \
    -H "Authorization: Bearer {bearer_token}" \
    -i
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" can_copy=true %}

### Using _since with /Group 

Using `_since` with `/Group` will return resources updated after the date provided for existing enrollees and all resources for newly attributed enrollees. 

This lets you retrieve all new claims data with a single request. If you don't apply `_since`, data as early as March 1, 2021 will be returned. 

#### Example request using _since with /Group

The request below will return: 

- Claims data last updated since July 1, 2026 for existing enrollees 
- Claims data as far back as 2014 for all new enrollees attributed to your organization in the last month

{% capture curlSnippet %}{% raw %}
GET /api/v3/Group/all/$export?_type=Patient&_since=2026-07-01T08:00:00.000-05:00
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" %}

#### Example curl command using _since with /Group

{% capture curlSnippet %}{% raw %}
curl -X GET "https://sandbox.dpc.cms.gov/api/v3/Group/all/\$export?_type=Patient&_since=2026-07-01T08:00:00.000-05:00" \
    -H "Accept: application/fhir+json" \
    -H "Prefer: respond-async" \
    -H "Authorization: Bearer {bearer_token}" \
    -i
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" can_copy=true %}

## The _type parameter 

The `_type` parameter lets you specify which resource types you'd like returned. Otherwise, making a `GET` request to start a job with the `/Group` or `/Patient` endpoint will return all resource types.

### Using _type

You'll need to use commas when specifying multiple resource types. The examples below are curl requests to `/Group` using `_type`. 

#### Example request for 1 resource type

{% capture curlSnippet %}{% raw %}
GET /api/v3/Group/all/$export?_type=Patient
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" %}

#### Example request for 2 resource types

{% capture curlSnippet %}{% raw %}
GET /api/v3/Group/all/$export?_type=ExplanationOfBenefit,Patient
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" %}

#### Example curl command using _type

{% capture curlSnippet %}{% raw %}
curl -X GET "https://sandbox.dpc.cms.gov/api/v3/Group/all/\$export?_type=ExplanationOfBenefit,Patient" \
    -H "Accept: application/fhir+json" \
    -H "Prefer: respond-async" \
    -H "Authorization: Bearer {bearer_token}" \
    -i
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" can_copy=true %}

## The _typeFilter parameter

The `_typeFilter` parameter lets you use resource metadata to create finer-grained filtering criteria. DPC will only return claims data that meets the specified criteria provided as a URL Encoded FHIR REST API query.

### Using _typeFilter

Currently, `_typeFilter` supports queries using the `_tag`, `outcome`, and `service-date` search parameters for the ExplanationOfBenefit resource:

- **_tag:**  filters the export based on the `meta.tag` element. Pass a full token as `<system>|<code>`.
  * Supported codes in the `https://bluebutton.cms.gov/fhir/CodeSystem/System-Type` system are:
    - `SharedSystem`
    - `NationalClaimsHistory`
    - `DDPS`
  - If you do not specify a System-Type `_tag` filter, the export will include only `NationalClaimsHistory` and `DDPS` claims by default.

- **outcome:** filters the export based on the processing status of the claim. The two values for this param, `partial` and `complete`, represent the "Partially Adjudicated" and "Fully Adjudicated" claim statuses.

- **service-date:** filters the export based on the claim's service date. The service date is the date that the care occurred within a billable period. This is a FHIR date param format (ex. `gt2026-01-14`)


#### Example request using _typeFilter

The request below will return:
- All Patient and Coverage resources
- ExplanationOfBenefit resources of fully adjudicated claims only

{% capture curlSnippet %}{% raw %}
GET /api/v3/Group/all/$export?_typeFilter=ExplanationOfBenefit%3Foutcome%3Dcomplete
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" %}

#### Example curl command using _typeFilter

{% capture curlSnippet %}{% raw %}
curl -X GET "https://sandbox.dpc.cms.gov/api/v3/Group/all/\$export?_typeFilter=ExplanationOfBenefit%3Foutcome%3Dcomplete" \
    -H "Accept: application/fhir+json" \
    -H "Prefer: respond-async" \
    -H "Authorization: Bearer {bearer_token}" \
    -i
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" can_copy=true %}

## The `runout` identifier

The `runout` identifier lets you request runouts data for enrollees attributed to your model entity the previous year, but not the current year. Claims data returned will have a service date no later than December 31 of the previous year.

### Using the `runout` identifier

The examples below are `GET` requests made to the /Group endpoint. 

#### Example request for 1 resource type using `runout`

{% capture curlSnippet %}{% raw %}
GET /api/v3/Group/runout/$export?_type=Patient
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" %}

{% capture curlSnippet %}{% raw %}
curl -X GET "https://sandbox.dpc.cms.gov/api/v3/Group/runout/\$export?_type=Patient" \
    -H "accept: application/fhir+json" \
    -H "Prefer: respond-async" \
    -H "Authorization: Bearer {bearer_token}" \
    -i
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" can_copy=true %}

#### Example request for 2 resource types using `runout` 

{% capture curlSnippet %}{% raw %}
GET /api/v3/Group/runout/$export?_type=ExplanationOfBenefit,Patient
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" %}

{% capture curlSnippet %}{% raw %}
curl -X GET "https://sandbox.dpc.cms.gov/api/v3/Group/runout/\$export?_type=ExplanationOfBenefit,Patient" \
    -H "accept: application/fhir+json" \
    -H "Prefer: respond-async" \
    -H "Authorization: Bearer {bearer_token}" \
    -i
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" can_copy=true %}

#### Request for all resources using `runout`

{% capture curlSnippet %}{% raw %}
GET /api/v3/Group/runout/$export
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" %}

{% capture curlSnippet %}{% raw %}
curl -X GET "https://sandbox.dpc.cms.gov/api/v3/Group/runout/\$export" \
    -H "accept: application/fhir+json" \
    -H "Prefer: respond-async" \
    -H "Authorization: Bearer {bearer_token}" \
    -i
{% endraw %}{% endcapture %}
{% include copy_snippet.html code=curlSnippet language="shell" can_copy=true %}
