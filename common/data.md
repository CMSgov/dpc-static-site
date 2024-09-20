---
layout: page-sidenav
title: DPC Data
banner_title: Understanding DPC Data
permalink: /data
id: data
button: Data Dictionary
coming_soon: true
side_nav_items: data_nav
---

The Centers for Medicare and Medicaid Services (CMS) Data at the Point of Care (DPC) API is a RESTful-based web service providing Medicare Parts A, B, and D claims data using the industry-standard HL7 Fast Healthcare Interoperability Resources (FHIR) resources, specifically the Bulk FHIR specification. The DPC API only provides data records for Medicare Fee-For-Service (FFS) beneficiaries and excludes all claims with substance abuse codes (as required by the Confidentiality of Alcohol and Drug Abuse Patient Records Regulations, 42 CFR Part 2).

# What is FHIR?

FHIR (Fast Healthcare Interoperability Resources) is a specification for exchanging healthcare data electronically. DPC sends adjudicated Medicare FFS claims data acquired through the Beneficiary FHIR Data Server (BFD) API and structured using the FHIR standard, making it more available, discoverable, and easy to consume. The FHIR standard is developed by HL7, a group dedicated to creating standardized ways of sharing and structuring health care data.

In FHIR, standardized data is structured using a basic building block called a “Resource.” All “exchangeable” data is defined as a resource. Resources are structured containers of data that systems and computers can easily understand. DPC uses both the FHIR specification and the DPC Bulk FHIR specification. The Bulk FHIR specification allows DPC to send back records on all of a provider's patients.

# What is in DPC data?

CMS provides beneficiary claims data to providers for treatment purposes permitted by HIPAA. The data may be used to develop a service to notify, search, display, analyze, retrieve, view, and otherwise obtain certain information or data about Medicare beneficiaries or synthetic data from CMS, specifically: Part A (Hospital Insurance), Part B (Supplemental Medical Insurance), and Part D beneficiary claims information, such as providers seen, diagnoses, medications, and procedures. The earliest record of claims data that is available dates back to 5/27/2014.

For the appropriate beneficiaries, the data provided to providers through DPC includes claims for all services covered by Part A and Part B that were provided and processed during the prior month. Claims data also includes prescriptions covered by a Part D Prescription Drug Program in which the beneficiary is enrolled.


<div class="ds-c-alert ds-c-alert--warn">
  <div class="ds-c-alert__body">
    <p class="ds-c-alert__text">
      Data from DPC does not  include clinical notes, lab results, or substance abuse codes. DPC excludes all claims with substance abuse codes (as required by the Confidentiality of Alcohol and Drug Abuse Patient Records Regulations, 42 CFR Part 2).
    </p>
  </div>
</div>

## Sample DPC Files 
In order to aid in users' understanding of DPC file data and structure, we provide sample Explanation of Benefit (EoB), Patient, and Coverage files to download and view. These files contain synthetic data, but the structure of the files is similar to production data provided by DPC.

1. [Explanation of Benefit](https://bcda.cms.gov/assets/data/ExplanationOfBenefit.ndjson)
2. [Patient](https://bcda.cms.gov/assets/data/Patient.ndjson)
3. [Coverage](https://bcda.cms.gov/assets/data/Coverage.ndjson)

## Additional Resources

1. [FHIR/HL7](https://www.hl7.org/fhir/)
2. [Bulk FHIR specification](https://hl7.org/fhir/uv/bulkdata/)
3. [Beneficiary FHIR Data Server (BFD)/ Blue Button API](https://bluebutton.cms.gov/developers/)
4. [Beneficiary FHIR Data Server (BFD)/ Blue Button Implementation Guide](https://bluebutton.cms.gov/assets/ig/index.html)
5. [Intro to JSON Format](https://www.json.org/json-en.html) and [NDJSON](https://github.com/ndjson/ndjson-spec)
6. [JSON format viewer/validator (raw text/JSON format converter)](https://jsonlint.com/)
7. [Intro to valid FHIR formats](http://hl7.org/fhir/STU3/validation.html)
