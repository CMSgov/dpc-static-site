---
layout: api-docs
page_title: "Production Access"
seo_title: ""
description: "The end-to-end process for a provider organization to get production access to the DPC API, from sandbox practice through your first production export."
in-page-nav: true
show-side-nav: false
---

# {{ page.page_title }}

This is the process for requesting production access to the DPC API. Production access is only available to Original Medicare provider organizations and their assigned Health IT teams.

Production data is real Medicare claims data for real patients. Because of that, production access has requirements the [sandbox]({{ '/api-documentation.html' | relative_url }}) doesn't. Work through the steps below in order.

## Before you begin

Your organization needs:

- **An active Medicare enrollment** 
- **An organizational [National Provider Identifier (NPI)](https://www.cms.gov/Regulations-and-Guidance/Administrative-Simplification/NationalProvIdentStand/)** 
- **An Authorized Official (AO)** 
- **A technical team** 

<ol class="usa-process-list" style="margin-top: 4rem;">
  <li class="usa-process-list__item">
    <h2 class="usa-process-list__heading">Practice in the DPC Sandbox</h2>
  </li>

  <li class="usa-process-list__item">
    <h2 class="usa-process-list__heading">Sign in to the DPC Portal</h2>
  </li>

  <li class="usa-process-list__item">
    <h2 class="usa-process-list__heading">Verify your identity</h2>
  </li>

  <li class="usa-process-list__item">
    <h2 class="usa-process-list__heading">Confirm your organization</h2>
  </li>

  <li class="usa-process-list__item">
    <h2 class="usa-process-list__heading">Sign the DPC Terms of Service</h2>
  </li>

  <li class="usa-process-list__item">
    <h2 class="usa-process-list__heading">Invite your Credential Delegates</h2>
  </li>

  <li class="usa-process-list__item">
    <h2 class="usa-process-list__heading">Register your public IP addresses</h2>
  </li>

  <li class="usa-process-list__item">
    <h2 class="usa-process-list__heading">Create production credentials</h2>
  </li>

  <li class="usa-process-list__item">
    <h2 class="usa-process-list__heading">Get a production bearer token</h2>
  </li>

  <li class="usa-process-list__item">
    <h2 class="usa-process-list__heading">Register your practitioners and patients</h2>
  </li>

  <li class="usa-process-list__item">
    <h2 class="usa-process-list__heading">Attest and build your rosters</h2>
  </li>

  <li class="usa-process-list__item">
    <h2 class="usa-process-list__heading">Run your first production export</h2>
  </li>
</ol>

## Keep your production access active

Production access needs upkeep. Assign each of these to someone on your team:

- Re-attest every 90 days. DPC marks patients with expired attribution `inactive` and drops them from exports without warning.
- Renew client tokens every year. See [manage credentials]({{ '/api-documentation/get-bearer-token/manage-credentials.html' | relative_url }}).
- Rotate keys and delete public keys for systems you've retired.
- Keep registered IP addresses current. Add new addresses before a migration; remove ones you no longer use.
- Remove Credential Delegates when they change roles or leave, and update your AO if the authorized official on your Medicare enrollment record changes.

## Get help

- Email [dpcinfo@cms.hhs.gov](mailto:dpcinfo@cms.hhs.gov) with questions about your organization's onboarding.
- Join the [DPC Google Group](https://groups.google.com/g/dpc-api) to ask implementation questions and see problems other organizations have solved.
- Watch [announcements]({{ '/announcements.html' | relative_url }}) for changes to onboarding and the API.
