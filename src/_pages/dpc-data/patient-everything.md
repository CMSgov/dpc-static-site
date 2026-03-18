---
layout: api-docs
page_title: "/Patient/$everything"
seo_title: ""
description: ""
in-page-nav: true
in-page-nav-levels: "h2"
---

# {{ page.page_title }}

`/Patient/{id}/$everything` is an endpoint that allows users to retrieve all resources about a patient using their DPC internal ID (UUID), represented as `{id}` in the request. Included in the resources will be the Patient, Coverage, and ExplanationOfBenefit Resources for one patient’s historical data from the last seven years, combined into a bundle. It is a synchronous download, so it differs from the Group $export operation in that it does not create a job that needs to be monitored or data files to download. The response body will contain the bundle.

If you only have the patient’s Medicare Beneficiary Identifier (MBI) you can retrieve the DPC internal ID by first making a GET request for that specific patient as the UUID is returned in that response.

A Patient record must already exist in the DPC database to successfully complete your `/Patient/{id}/$everything` request; however, the patient does not need to belong to a group.

This request requires an **X-Provenance** header for attestation.

Learn more about the HL7 FHIR Specification for:

- [Operation Patient Everything (Release v4)](http://hl7.org/fhir/R4/operation-patient-everything.html)
- [Operation Patient Everything (Release v3)](http://hl7.org/fhir/STU3/operation-patient-everything.html)
