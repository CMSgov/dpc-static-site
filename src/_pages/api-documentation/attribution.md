---
layout: api-docs
page_title: "Attribution"
seo_title: ""
description: "Establish a valid patient-practitioner relationship with CMS by attributing patients to practitioners in a Group Resource before accessing patient data."
in-page-nav: true
---

# {{ page.page_title }}

Before accessing patient data, DPC must establish that you have a valid patient-practitioner relationship with CMS Medicare and Medicaid Beneficiaries. This is called attribution. You will "attribute" each patient to a practitioner in a Group Resource.

DPC provides you with a bundle of [sample practitioners](https://github.com/CMSgov/dpc-app/blob/main/dpc-web/public/practitioner_bundle.json){:target="_blank"} and [sample patients](https://github.com/CMSgov/dpc-app/blob/main/dpc-web/public/patient_bundle.json){:target="_blank"} to complete attribution in the DPC Sandbox.

1. [Upload practitioners]({{ "/api-documentation/attribution/upload-practitioners.html" | relative_url }}) in your organization.  
2. [Upload patients]({{ "/api-documentation/attribution/upload-patients.html" | relative_url }}) in your care.  
3. Attribute patients to their practitioners by [creating a group]({{ "/api-documentation/attribution/attestation.html#create-a-patient-group-resource" | relative_url }}) in the Attestation stage.

## Attestation

You'll need to submit an [Attestation]({{ "/api-documentation/attribution/attestation.html" | relative_url }}) each time you attribute a patient to a provider group. 

{% include alert.html variant="warning" text="The DPC sandbox does not preload any test data." classNames="measure-6" %}