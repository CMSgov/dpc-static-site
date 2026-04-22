---
layout: api-docs
page_title: "Upload Patients"
seo_title: ""
description: ""
in-page-nav: true
---

# {{ page.page_title }}

The Beneficiary FHIR Data Server (BFD) maintains a list of fictitious patients that match synthetic sandbox data.

<a class="usa-button" href="{{ "/assets/downloads/patient_bundle.json" | relative_url }}">Download sample patients</a>

Minimum patient requirements

Include the following to avoid a `422 - Unprocessable Entity` error.

- First and last name
- Birth date in YYYY-MM-DD
- Gender<sup><a href="#fn1">*</a></sup>
- Medicare Beneficiary Identifier (MBI)<sup><a href="#fn2">**</a></sup>

<sup id="fn1">*</sup> DPC uses the `Patient.gender` property to represent the sex of the patient as maintained on record at CMS. When registering a patient to your organization, you’ll need to submit the `Patient.gender` property following the corresponding value set. The input provided may be used by DPC to match and validate the patient against CMS records.

<sup id="fn2">**</sup> [Medicare Beneficiary Identifier](https://www.cms.gov/training-education/partner-outreach-resources/new-medicare-card/medical-beneficiary-identifiers-mbis), an 11-character code assigned to all Medicare beneficiaries. 

**Note:** If an existing patient is found with the same MBI, the `/patient` endpoint will return that same patient.

## Add a patient bundle
The `$submit` operation lets you upload a bundle of patients for registration in a single batch using the `/patient` endpoint.

Example to add multiple patient request
{% capture snippet %}
POST /api/v1/Patient/$submit
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}

Example cURL command
{% capture snippet %}
curl -v https://sandbox.dpc.cms.gov/api/v1/Patient/\$submit \
     -H 'Authorization: Bearer {ACCESS_TOKEN}' \
     -H 'Accept: application/fhir+json' \
     -H 'Content-Type: application/fhir+json' \
     -X POST \
     -d @patient_bundle.json
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" %}