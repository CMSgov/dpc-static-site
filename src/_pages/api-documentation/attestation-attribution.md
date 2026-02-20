---
layout: api-docs
page_title: "Attestation & Attribution"
seo_title: ""
description: ""
in-page-nav: true
in-page-nav-levels: "h2"
---

# {{ page.page_title }}

Before accessing patient data, DPC must establish that you have a valid patient-practitioner relationship with CMS Medicare and Medicaid Beneficiaries. This process is referred to as Attestation/Attribution in the DPC API.

You will need to register practitioners in your organization, register patients in your care, and attribute patients to the practitioners treating them. You must also keep these attributions up-to-date by submitting an attestation that testifies these relationships are valid with each submission.

The DPC Sandbox Environment does not contain any preloaded test data.

## Load sample data

The DPC Team has created a collection of sample Practitioner, Patient, and Group Resources which can be used to get started in the sandbox environment. These resources can be found in our public [GitHub repository](https://github.com/CMSgov/dpc-app/tree/main/src/main/resources) as JSON files. More details included in this [README](https://github.com/CMSgov/dpc-app/blob/main/src/main/resources/README.md) file.

**Uploading Practitioners:** Four Practitioner Resources are included as examples.

**Uploading Patients:** The Beneficiary FHIR Data Server (BFD) maintains a list of 101 patients, along with their MBIs, that can be used for matching existing synthetic data in the sandbox environment. More details and the corresponding data files can be found on the Blue Button 2.0 API’s documentation under [Sample Beneficiaries](https://bluebutton.cms.gov/developers/#sample-beneficiaries).

Users can provide their own sample FHIR resources that fulfill the required FHIR profiles to DPC, but will need to ensure that all Patient Resources have a Medicare Beneficiary Identifier (MBI) that matches a record in BFD.

### Find Organization ID

You will need your Organization ID to create an Attribution Group for Attestation. The Organization endpoint supports a GET /Organization operation, which allows the user to retrieve their Organization ID.

To find your Organization ID, sign-in to your account in the DPC Portal and locate your Organization ID underneath the Organization name. You can also make a request to `/Organization` via the sandbox API and retrieve your Organization ID from the response.
