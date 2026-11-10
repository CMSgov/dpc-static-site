---
layout: api-docs
page_title: "DPC Data"
seo_title: ""
description: "Overview of the Medicare claims data shared through the Data at the Point of Care API, including FHIR Resources and bulk data specifications."
in-page-nav: true
---

# {{ page.page_title }}


DPC uses the <a href="https://hl7.org/fhir/R4/overview.html" target="_blank" rel="noopener noreferrer">HL7® FHIR® (R4)</a> specification to share claims data.

<table class="usa-table usa-table--borderless usa-table--stacked margin-bottom-4">
  <caption class="usa-sr-only">Definitions of Part A, B, and D claims data</caption>
  <thead>
    <tr>
      <th scope="col">Data type</th>
      <th scope="col">Definition</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Medicare Part A claims data</th>
      <td>
        Inpatient hospital stays, care in skilled nursing facilities, and hospice care
      </td>
    </tr>
    <tr>
      <th scope="row">Medicare Part B claims data</th>
      <td>
        Doctors' services, outpatient care, preventive services, and durable medical equipment (DME)
      </td>
    </tr>
    <tr>
      <th scope="row">Medicare Part D claims data</th>
      <td>
         Prescription drugs prescribed by healthcare providers
      </td>
    </tr>
  </tbody>
</table>

<div class="usa-alert usa-alert--info usa-alert--no-icon margin-top-4">
  <div class="usa-alert__body">
    <p class="usa-alert__heading text-bold">Confidentiality and medical data sharing</p>
    <p class="usa-alert__text">
      DPC data does not include clinical notes, lab results, or substance abuse codes. DPC excludes all claims with substance abuse codes (as required by the Confidentiality of Alcohol and Drug Abuse Patient Records Regulations, 42 CFR Part 2).
    </p>
  </div>
</div>

## Resource types

### ExplanationOfBenefit (EOB)
[ExplanationOfBenefit](https://hl7.org/fhir/STU3/explanationofbenefit.html) stores details about episodes of care, including where and when the service was performed, insurance diagnosis codes, who the provider was, and the cost.

### Patient
[Patient](https://hl7.org/fhir/STU3/patient.html) stores enrollees' demographic details and updates to their [Medicare Patient Identifiers](https://www.cms.gov/training-education/partner-outreach-resources/new-medicare-card/medical-beneficiary-identifiers-mbis) (MBI).

### Coverage
[Coverage](https://hl7.org/fhir/STU3/coverage.html) provides high-level descriptors of an insurance plan such as that found in the enrollee's insurance coverage.

## Sample files 

Download sample data files, which share similar content and structure to production data.

<ul>
  <li><a href="{{ '/assets/data/ExplanationOfBenefit.ndjson' | relative_url }}" data-tealium="download">ExplanationOfBenefit.ndjson {% include sprite.html icon="file_download" class="text-middle" size="2" %}</a></li>
  <li><a href="{{ '/assets/data/Patient.ndjson' | relative_url }}" data-tealium="download">Patient.ndjson {% include sprite.html icon="file_download" class="text-middle" size="2" %}</a></li>
  <li><a href="{{ '/assets/data/Coverage.ndjson' | relative_url }}" data-tealium="download">Coverage.ndjson {% include sprite.html icon="file_download" class="text-middle" size="2" %}</a></li>
</ul>