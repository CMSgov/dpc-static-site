---
layout: api-docs
page_title: "Upload Patients"
seo_title: ""
description: "Upload sample patient bundles to your organization in the DPC Sandbox to set up attribution test data."
in-page-nav: true
---

# {{ page.page_title }}

The Beneficiary FHIR Data Server (BFD) maintains a list of fictitious patients that match synthetic sandbox data.

<a class="usa-button" href="https://github.com/CMSgov/dpc-app/blob/main/dpc-web/public/patient_bundle.json" target="_blank">Download sample patients</a>

**Minimum patient requirements**

Include the following to avoid a `422 - Unprocessable Entity` error.

- First and last name
- Birth date in YYYY-MM-DD format
- Gender
  - DPC uses the `Patient.gender` property to represent the sex of the patient as maintained on record at CMS. When registering a patient to your organization, you'll need to submit the `Patient.gender` property following the corresponding value set. The input provided may be used by DPC to match and validate the patient against CMS records.
- Medicare Beneficiary Identifier (MBI)
  - [Medicare Beneficiary Identifier](https://www.cms.gov/training-education/partner-outreach-resources/new-medicare-card/medical-beneficiary-identifiers-mbis), an 11-character code assigned to all Medicare beneficiaries. 

**Note:** If an existing patient is found with the same MBI, the `/Patient` endpoint will return that same patient.

## Add a patient bundle
The `$submit` operation lets you upload a bundle of patients for registration in a single batch using the `/Patient` endpoint.

**Example request**
{% capture snippet %}
POST /api/v1/Patient/$submit
{% endcapture %}
{% include copy_snippet.html code=snippet language="http" %}

**Example cURL command**
{% capture snippet %}
curl 'https://sandbox.dpc.cms.gov/api/v1/Patient/$submit' \
    -H "Authorization: Bearer $BEARER_TOKEN" \
    -H 'Accept: application/fhir+json' \
    -H 'Content-Type: application/fhir+json' \
    -d @patient_bundle.json
{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}