---
layout: api-docs
page_title: "DPC Data"
seo_title: ""
description: "Overview of the Medicare beneficiary claims data shared through the Data at the Point of Care API, including FHIR Resources and bulk data specifications."
in-page-nav: true
---

# {{ page.page_title }}

Data at the Point of Care (DPC) API is a RESTful-based web service that shares Medicare beneficiary claims data with provider organizations. It uses HL7 Fast Healthcare Interoperability Resources (FHIR) to share the data in a standard format. 

## What kind of beneficiary data is shared through DPC?

CMS provides beneficiary claims data to providers for treatment purposes permitted by HIPAA. Use DPC to develop a service to notify, search, display, analyze, retrieve, view, and otherwise obtain certain information or data about Medicare beneficiaries or synthetic data from CMS. DPC shares large volumes of enrollee data from Medicare Parts A, B, and D claims.


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

DPC data does not include clinical notes, lab results, or substance abuse codes. DPC excludes all claims with substance abuse codes (as required by the Confidentiality of Alcohol and Drug Abuse Patient Records Regulations, 42 CFR Part 2).

## How the data is structured: FHIR resource types

DPC uses FHIR (Fast Healthcare Interoperability Resources) as a standard, compliant way to share Medicare beneficiary data. In FHIR, data is structured into basic building blocks called "Resources." DPC also has its own bulk FHIR specification to securely handle large numbers of Medicare beneficiary files. 

## Applicable FHIR Resources

### ExplanationOfBenefit (EOB)
[ExplanationOfBenefit](https://hl7.org/fhir/R4/explanationofbenefit.html) stores details about episodes of care, including where and when the service was performed, insurance diagnosis codes, who the provider was, and the cost.

### Patient
[Patient](https://hl7.org/fhir/R4/patient.html) stores enrollees' demographic details and updates to their [Medicare Patient Identifiers](https://www.cms.gov/training-education/partner-outreach-resources/new-medicare-card/medical-beneficiary-identifiers-mbis) (MBI).

### Coverage
[Coverage](https://hl7.org/fhir/R4/coverage.html) provides high-level descriptors of an insurance plan such as that found on an insurance card. 

## Download sample files 

These sample DPC data files have similar content and structure to production (real patient) data. Try the DPC sandbox to access test data from the API.

- [Explanation of Benefit](https://bcda.cms.gov/assets/data/ExplanationOfBenefit.ndjson)
- [Patient](https://bcda.cms.gov/assets/data/Patient.ndjson)
- [Coverage](https://bcda.cms.gov/assets/data/Coverage.ndjson)

## FHIR and JSON resources

- [FHIR/HL7](https://www.hl7.org/fhir/)
- [Bulk FHIR specification](https://hl7.org/fhir/uv/bulkdata/)
- [Beneficiary FHIR Data Server (BFD)/ Blue Button API](https://bluebutton.cms.gov/developers/)
- [Intro to JSON Format](https://www.json.org/json-en.html) and [NDJSON](https://github.com/ndjson/ndjson-spec)
- [JSON format viewer/validator (raw text/JSON format converter)](https://jsonlint.com/)
- [Intro to valid FHIR formats](http://hl7.org/fhir/STU3/validation.html)