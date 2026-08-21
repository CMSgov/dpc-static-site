---
layout: prod-access
page_title: "Production Access"
seo_title: ""
description: "A checklist for getting production access to the DPC API, covering Medicare enrollment, sandbox testing, the required demo, and production setup."
in-page-nav: true
in-page-nav-levels: "h2"
---

# {{ page.page_title }}

DPC production access is available for eligible Medicare provider organizations. Because production data is real, it carries requirements that the sandbox does not. This checklist covers the whole process, from confirming your eligibility through your first production export.

It is expected that most organizations will work through this checklist in stages, so you don’t need to finish it in one sitting. If you get stuck at any point, [email the DPC team](mailto:dpcinfo@cms.hhs.gov).


This process requires two roles:

- **Authorized Official (AO).** An appointed official, often a CEO or CFO, named on your Medicare enrollment. The AO verifies their identity, registers the organization, and signs the [Terms of Service]({{ '/terms-of-service.html' | relative_url }}). See the [PECOS glossary](https://pecos.cms.hhs.gov/pecos/help-main/glossary.jsp#b:~:text=your%20Medicare%20contractor.-,Authorized%20Official,-An%20appointed%20official) for the formal definition.
- **Credential Delegate (CD).** The person who owns the integration and leads the demo. The AO can act as their own CD.

## Confirm your organization's eligibility

Before you request production access, confirm that your provider organization meets both of these requirements.

- An approved Medicare enrollment
  - Your provider organization must have an approved enrollment in the [Provider Enrollment, Chain, and Ownership System (PECOS)](https://pecos.cms.hhs.gov/pecos/login.do) and a Type 2 [National Provider Identifier (NPI)](https://nppes.cms.hhs.gov/help/npi-application-help-page).
  - Neither the provider organization nor the AO can appear in the [Medicare Exclusions Database](https://oig.hhs.gov/exclusions/).
- An Authorized Official on that enrollment record
  - Your provider organization must have an AO listed on its Medicare enrollment record. This is the person who verifies their identity, registers the organization for production access, and agree to the [Terms of Service]({{ '/terms-of-service.html' | relative_url }}). 

## Build and test in the sandbox

Sandbox access doesn't require eligibility approval, so you can start before your eligibility is confirmed.

Complete these steps in the sandbox, because this is what you'll demo to the DPC team:

<ol class="usa-process-list margin-top-1">
  <li class="usa-process-list__item">
    <p class="usa-process-list__heading">Create a sandbox account</p>
    <p><a href="{{ '/api-documentation/get-sandbox-credentials.html#1-create-a-dpc-sandbox-login' | relative_url }}">Create a DPC Sandbox login</a>.</p>
  </li>
  <li class="usa-process-list__item">
    <p class="usa-process-list__heading">Get sandbox credentials</p>
    <p><a href="{{ '/api-documentation/get-sandbox-credentials.html' | relative_url }}">Create a client token and upload a public key</a>.</p>
  </li>
  <li class="usa-process-list__item">
    <p class="usa-process-list__heading">Authenticate against the sandbox</p>
    <p><a href="{{ '/api-documentation/get-bearer-token.html' | relative_url }}">Exchange a signed JSON Web Token for a bearer token</a>.</p>
  </li>
  <li class="usa-process-list__item">
    <p class="usa-process-list__heading">Export claims data for test patients</p>
    <p><a href="{{ '/api-documentation/export-data.html' | relative_url }}">Run a bulk export and retrieve the output files</a>.</p>
  </li>
</ol>

## Request production access and demo

Once your sandbox integration works end-to-end, request production access.

<ol class="usa-process-list margin-top-1">
  <li class="usa-process-list__item">
    <p class="usa-process-list__heading">Submit the production access form</p>
    <p>Complete and send the <a href="{{ '/production-access/request-form.html' | relative_url }}">production access form</a>.</p>
  </li>
  <li class="usa-process-list__item">
    <p class="usa-process-list__heading">Schedule a demo with the DPC team</p>
    <p>Demos allow us to better understand your needs and answer any questions you may have. The CD should be prepared to walk through your sandbox integration and <a href="{{ '/production-access/demo-questions.html' | relative_url }}">answer questions</a> about your implementation.</p>
  </li>
</ol>

## Set up your production account

You'll need your AO and, if applicable, at least one CD to complete the following steps.

{% capture content %}
<p>All users' identity provider emails <b>must match</b> the email on their DPC invitation. Before starting, every user should do one of the following:</p>
<ul>
  <li>Associate their invitation email with their existing identity account</li>
  <li>Create an account with ID.me, CLEAR, or Login.gov using that email</li>
</ul>
{% endcapture %}

{% include alert.html variant="warning" heading="Important" text=content classNames="measure-6" %}

<ol class="usa-process-list margin-top-1">
  <li class="usa-process-list__item">
    <p class="usa-process-list__heading">The AO must create an account in the DPC portal and verify their identity</p>
    <p>The DPC team will send the initial email invitation to the AO, after the demo.</p>
  </li>
  <li class="usa-process-list__item">
    <p class="usa-process-list__heading">The AO must complete registration for the organization in the portal</p>
    <p>We'll review your organization's Type 2 NPI, confirm the AO is authorized for that NPI in PECOS, and check that neither the organization nor the AO appears in the Medicare Exclusions Database.</p>
  </li>
  <li class="usa-process-list__item">
    <p class="usa-process-list__heading">The AO must sign the DPC Terms of Service</p>
  </li>
  <li class="usa-process-list__item">
    <p class="usa-process-list__heading">Optional: Invite your Credential Delegate(s)</p>
    <ul>
      <li>A CD manages credentials so the AO doesn't have to. You can skip this step if your AO and CD are the same person.</li>
      <li>The AO invites each CD by name and email. Invitations expire after 48 hours.</li>
      <li>Each CD verifies their identity using the email address their invitation went to, the same way as the AO.</li>
    </ul>
  </li>
  <li class="usa-process-list__item">
    <p class="usa-process-list__heading">Register your public IP addresses</p>
    <p>DPC rejects requests from unregistered IP addresses. Register the public IP of every system that calls the production API and label each one. Register every address before your first production request.</p>
  </li>
  <li class="usa-process-list__item">
    <p class="usa-process-list__heading">Create your production credentials and replace your sandbox credentials</p>
    <ul>
      <li>A CD repeats the <a href="{{ '/api-documentation/get-sandbox-credentials.html' | relative_url }}">credential steps</a> in production.</li>
      <li>Your integration code stays the same.</li>
      <li>To confirm the new token is active, <a href="{{ '/api-documentation/get-bearer-token/manage-credentials.html' | relative_url }}">list your client tokens</a> and check its label and expiration date.</li>
    </ul>
  </li>
</ol>

## Go live with real data

This mirrors your sandbox integration, now against real patient data.

<ol class="usa-process-list margin-top-1">
  <li class="usa-process-list__item">
    <p class="usa-process-list__heading">Register your practitioners and patients</p>
    <p>Upload your <a href="{{ '/api-documentation/attribution/upload-practitioners.html' | relative_url }}">practitioners</a> and <a href="{{ '/api-documentation/attribution/upload-patients.html' | relative_url }}">patients</a>.</p>
  </li>
  <li class="usa-process-list__item">
    <p class="usa-process-list__heading">Attest and build your patient rosters</p>
    <p>CMS requires a practitioner to attest to a treatment-related relationship with every patient whose data they access. Follow the <a href="{{ '/api-documentation/attribution/attestation.html' | relative_url }}">attestation workflow</a> to create a Group Resource for each practitioner.</p>
  </li>
  <li class="usa-process-list__item">
    <p class="usa-process-list__heading">Run your first production export</p>
    <ul>
      <li>For your first export, we recommend exporting a single practitioner's <a href="{{ '/api-documentation/export-data.html#locate-your-group-id' | relative_url }}">Group ID</a> so a mistake affects one roster instead of your whole organization.</li>
      <li>Once you've verified your first export, run your complete export unfiltered. Because filtered exports return only data added since a given time, an unfiltered run gives you the baseline history for your attributed patients.</li>
      <li>Use the <a href="{{ '/api-documentation/export-data/how-to-filter.html#request-filtered-data-with-_since' | relative_url }}"><code>_since</code> parameter</a> on all later exports to retrieve only new data.</li>
      <li>A successful export returns <code>202 Accepted</code> with a job URL in the <code>Content-Location</code> header. <a href="{{ '/api-documentation/export-data.html#check-status-of-the-export-job' | relative_url }}">Poll that URL</a> until it returns <code>200 OK</code> with the list of output files.</li>
    </ul>
  </li>
</ol>

## Keep your production access active

Once you're live, keep the following current so you don't lose access to the API.

- Re-attest every 90 days. DPC drops patients with [expired attribution]({{ '/api-documentation/attribution/attestation.html#attestation-expiration' | relative_url }}) from your exports.
- [Renew client tokens]({{ '/api-documentation/get-bearer-token/manage-credentials.html#renew-expired-tokens' | relative_url }}) before they expire each year.
- Rotate keys and delete public keys for retired systems.
- Keep your registered IP addresses current.
- Keep contact information up to date. Update your AO if the official on your enrollment record changes and remove CDs who change roles or leave.

## Need help?

Send your questions to [dpcinfo@cms.hhs.gov](mailto:dpcinfo@cms.hhs.gov). You can also join the [DPC Google Community](https://groups.google.com/g/dpc-api) to ask questions and trade feedback with other users. Watch [announcements]({{ '/announcements.html' | relative_url }}) for changes to onboarding and the API.
