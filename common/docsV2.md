---
layout: page-sidenav
title: DPC Documentation
banner_title: Documentation
permalink: /docsV2
id: docsV2
button: Sign Up for Sandbox
button_url: {{ site.sbx_sign_in }}
side_nav: true
---

# Attestation & Attribution

<div class="ds-c-alert ds-c-alert--hide-icon ds-c-alert--warn">
  <div class="ds-c-alert__body">
    <p class="ds-c-alert__text">
      The DPC API is operating in Version 2 (v2) in the sandbox environment only as of [date] and is consistent with HL7’s FHIR R4. V2 also conforms with the <a href="http://hl7.org/fhir/us/carin-bb/history.html" target="_blank">CARIN Alliance Blue Button® Framework and Common Payer Consumer Data Set (CPCDS) IG</a>. DPC v2 will be deployed to the production environment following an evaluation period in the sandbox environment to identify any necessary changes.
    </p><br />
    <p class="ds-c-alert__text">
      The production environment is currently operating in DPC Version 1 (v1). If you are already working in DPC v1, you may still access the previous Documentation for <a href="/docsV1" target="_blank">DPC v1</a> and <a href="{{ site.sbx_sign_in }}">DPC v1 sandbox environment</a> and continue operation as usual. However, please note that all new features, updates, and capabilities will only be deployed and maintained in the DPC v2 sandbox environment until further notice.
    </p>
  </div>
</div>

## Load Sample Data
**The DPC sandbox environment does not contain any preloaded test data.**

The DPC team has created a collection of sample Group resources which can be used to get started in the sandbox environment. These Resources can be found in our public GitHub repository (link new repo here) as JSON files.

Would you like to customize the sample data?  Make sure that you are using Medicare Beneficiary Identifiers (MBIs) that match synthetic records in the Beneficiary FHIR Data Server (BFD).

## Find Organization ID

You will need the Organization ID with every API request. The Organization endpoint supports a GET /Organization operation, which allows users to retrieve the Organization ID of the practitioner organization being managed. You can also find the Organization ID by signing-in to the DPC Portal and locating the “Org ID” listed under each organization name.
Implementers must use unique tokens for each practitioner organization being served.

<div class="ds-c-alert ds-c-alert--hide-icon">
  <div class="ds-c-alert__body">
    <strong>Example:</strong> If your team is serving five practitioner organizations, you must have five different tokens and use the specific token assigned to the practitioner organization for which you are making the request. This endpoint is token-specific.
  </div>
</div>

## Groups

You must create a new Group with every request. A unique Group ID is automatically generated each time.

**Prerequisites:**
* A registered account in the DPC Portal
* At least one Patient MBI from your the Organization
* At least one Practitioner NPI from the Organization

### Create a Group

A Group resource is created by posting a list of patients and the Practitioner associated with each one. Please reference the Da Vinci Group Member Attribution List (link within DPC UG) for more information surrounding structure but, at a minimum, each Group resource must include:

* Organization ID
* Patient MBI
* Practitioner NPI

<a class="guide_top_link" href="#attestation--attribution">Back to Start of Section</a><br />
<a class="guide_top_link" href="#">Back to Top of Page</a>