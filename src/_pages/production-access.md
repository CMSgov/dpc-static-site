---
layout: prod-access
page_title: "Production Access"
seo_title: ""
description: "A checklist for getting production access to the DPC API, covering Medicare enrollment, sandbox testing, the required demo, and production setup."
in-page-nav: true
in-page-nav-levels: "h2"
---

# {{ page.page_title }}

Production access lets your organization request real Medicare claims data for the patients you treat, so their history is available at the point of care.

Production access is available to Original Medicare provider organizations and their assigned Health IT teams. Because the data is real, it carries requirements the [sandbox]({{ '/api-documentation.html' | relative_url }}) does not: every organization demos its integration to the DPC team before going live.

This checklist covers the whole process, from confirming your eligibility through your first production export. Most organizations take several weeks and work through it in stages, so you do not need to finish it in one sitting. If you get stuck at any point, [email the DPC team](mailto:dpcinfo@cms.hhs.gov).

## Confirm your eligibility

Check these before you commit engineering time. Any one of them can disqualify or delay your organization.

- **An approved Medicare enrollment.** Your enrollment must be approved in the Provider Enrollment, Chain, and Ownership System (PECOS), and you need an organizational [National Provider Identifier (NPI)](https://www.cms.gov/Regulations-and-Guidance/Administrative-Simplification/NationalProvIdentStand/). Corrections go through your Medicare Administrative Contractor and can take weeks.
- **An Authorized Official (AO) on that enrollment record.** The AO signs the Terms of Service and must verify their own identity. Nobody can do it for them.
- **A clean Exclusions record.** Your organization and your AO must not appear in the Medicare Exclusions Database.
- **Covered entity status and a treatment purpose** under 45 C.F.R. § 164.506. See the [Terms of Service]({{ '/terms-of-service.html' | relative_url }}).
- **A qualifying security certification**, such as ONC Health IT Certification, HITRUST CSF, SOC 2, ISO 27001, or EHNAC accreditation. The [Terms of Service]({{ '/terms-of-service.html#security' | relative_url }}) lists all accepted standards; you attest to one with every data request.
- **A technical team.** Your team needs to be comfortable with cURL and openssl at a [command line](https://github.com/resources/articles/what-is-a-cli), key pairs, JSON, ISO-8601 dates, and [FHIR STU3](https://www.hl7.org/fhir/STU3/overview.html). See the full [requirements]({{ '/api-documentation.html#requirements' | relative_url }}).

## Build and test in the sandbox

These run in order. Your technical team can start on day one, while eligibility items are still in progress. This is the bulk of the work: expect weeks, not days.

<ol class="usa-process-list" style="margin-top: 2rem;">
  <li class="usa-process-list__item">
    <h3 class="usa-process-list__heading">Get DPC Sandbox credentials</h3>
    <p style="margin-top: 1rem;">
      Request sandbox access, then follow the steps to get <a href="{{ '/api-documentation/get-sandbox-credentials.html' | relative_url }}">DPC Sandbox credentials</a>: a client token and a key pair. They only work in the sandbox.
    </p>
  </li>

  <li class="usa-process-list__item">
    <h3 class="usa-process-list__heading">Authenticate against the sandbox</h3>
    <p style="margin-top: 1rem;">
      <a href="{{ '/api-documentation/get-bearer-token.html' | relative_url }}">Get a bearer token</a> by building a JSON Web Token, signing it with your private key, and exchanging it. Bearer tokens expire after 5 minutes, so build the exchange into each job. The <a href="{{ '/api-documentation/postman-collection.html' | relative_url }}">Postman collection</a> refreshes tokens automatically.
    </p>
  </li>

  <li class="usa-process-list__item">
    <h3 class="usa-process-list__heading">Attribute patients in the sandbox</h3>
    <p style="margin-top: 1rem;">
      Work through the <a href="{{ '/api-documentation/attribution.html' | relative_url }}">attribution</a> workflow with test data:
    </p>
    <ol style="margin-top: 1rem;">
      <li><a href="{{ '/api-documentation/attribution/upload-practitioners.html' | relative_url }}">Upload practitioners</a>.</li>
      <li><a href="{{ '/api-documentation/attribution/upload-patients.html' | relative_url }}">Upload patients</a>.</li>
      <li>Send an <code>X-Provenance</code> header to <a href="{{ '/api-documentation/attribution/attestation.html' | relative_url }}">attest</a> a treatment relationship, then create one Group Resource per practitioner.</li>
    </ol>
    <p style="margin-top: 1rem;">
      A Group Resource is a practitioner's roster. It references patients by DPC <code>id</code>, not Medicare Beneficiary Identifier (MBI), and references the practitioner by NPI. Keep every <code>id</code> the API returns: the <code>X-Provenance</code> header needs your Organization ID and the practitioner's DPC <code>id</code>. Attributions last 90 days, so build the re-attestation cycle in now.
    </p>
  </li>

  <li class="usa-process-list__item">
    <h3 class="usa-process-list__heading">Export sample claims data</h3>
    <p style="margin-top: 1rem;">
      <a href="{{ '/api-documentation/export-data.html' | relative_url }}">Start an export job</a> for a Group ID. Poll the status URL until it completes. Parse the NDJSON (newline-delimited JSON) output. The <a href="{{ '/dpc-data.html' | relative_url }}">DPC data page</a> describes the FHIR Resources. When this works, you are ready to demo.
    </p>
  </li>
</ol>

## Request approval

Submit the form, then demo.

<ol class="usa-process-list" style="margin-top: 2rem;">
  <li class="usa-process-list__item">
    <h3 class="usa-process-list__heading">Submit the production access request form</h3>
    <p style="margin-top: 1rem;">
      The form needs information from several teams, so gather it in advance:
      <!-- TODO: link the production access request form once a public URL exists. -->
    </p>
    <ul style="margin-top: 1rem;">
      <li>Organization name, organizational NPI (NPI-2), primary contact, and AO.</li>
      <li>Technical partner and Credential Delegates, the people who will manage your credentials, if any.</li>
      <li>Technical setup: sandbox testing status, FHIR version, readiness for upcoming DPC API versions.</li>
      <li>Planned use: use model, request frequency and volume, practitioner and patient counts.</li>
      <li>Security certifications.</li>
    </ul>
  </li>

  <li class="usa-process-list__item">
    <h3 class="usa-process-list__heading">Demo your integration to the DPC team</h3>
    <p style="margin-top: 1rem;">
      Book a demo with the DPC team. Review the published questions first. The demo is a live, hour-long walkthrough of your integration in the sandbox.
      <!-- TODO: link the demo booking page and the required demo questions once public URLs exist. -->
    </p>
  </li>
</ol>

{% include alert.html variant="warning" heading="Approval gate" text="The DPC team usually responds within a week of your demo. Nothing below can start until DPC approves your organization." classNames="measure-6 margin-top-2" %}

## Set up production access

The AO does the first three items, in order. A Credential Delegate can do the last three, in any order.

<ol class="usa-process-list" style="margin-top: 2rem;">
  <li class="usa-process-list__item">
    <h3 class="usa-process-list__heading">Create your Portal account and verify the AO's identity</h3>
    <p style="margin-top: 1rem;">
      The AO creates a DPC production Portal account and verifies their identity through <a href="https://www.id.me/" target="_blank" rel="noopener noreferrer">ID.me</a>, <a href="https://www.clearme.com/" target="_blank" rel="noopener noreferrer">CLEAR</a>, or <a href="https://login.gov/" target="_blank" rel="noopener noreferrer">Login.gov</a>. The AO's account with that service, whether existing or new, must use the same email address as their Portal invitation. Confirm this in advance so a mismatched email does not block their login. Expect to need a state-issued photo ID and a Social Security number. This step verifies the person, not the organization, so the AO must do it themselves. It often finishes in one session, but allow a few days for manual review.
    </p>
  </li>

  <li class="usa-process-list__item">
    <h3 class="usa-process-list__heading">Confirm your organization in the Portal</h3>
    <p style="margin-top: 1rem;">
      Enter your organization's NPI. DPC checks that the verified AO is listed as an authorized or delegated official for that NPI in PECOS, and that neither the AO nor your organization appears in the Exclusions Database. Failures usually mean a stale enrollment record. Correct it and retry. Repeated failures temporarily lock the account.
    </p>
  </li>

  <li class="usa-process-list__item">
    <h3 class="usa-process-list__heading">Sign the DPC Terms of Service</h3>
    <p style="margin-top: 1rem;">
      The AO signs the <a href="{{ '/terms-of-service.html' | relative_url }}">Terms of Service</a>, which bind everyone you give access to. If agreements go through counsel, send them early. After signing, your organization can hold production credentials.
    </p>
  </li>

  <li class="usa-process-list__item">
    <h3 class="usa-process-list__heading">Invite your Credential Delegates</h3>
    <p style="margin-top: 1rem;">
      A Credential Delegate (CD) manages credentials so the AO does not have to. Skip this item if your AO will manage credentials directly. The AO invites each CD by name and email, and invitations expire in 48 hours. Each CD verifies their identity the same way the AO did, using the email address their invitation went to. Allow a few days for that, and account for it when you time the invitations. Invite more than one, and remove CDs promptly when they change roles or leave.
    </p>
  </li>

  <li class="usa-process-list__item">
    <h3 class="usa-process-list__heading">Register your public IP addresses</h3>
    <p style="margin-top: 1rem;">
      DPC rejects requests from unregistered IP addresses, even with a valid token. Register the public IP of every system that calls the production API, and label each one. A stable egress address may need your networking team, so start early. Register new addresses before you switch.
    </p>
  </li>

  <li class="usa-process-list__item">
    <h3 class="usa-process-list__heading">Create your production credentials</h3>
    <p style="margin-top: 1rem;">
      A CD or the AO repeats the sandbox credential steps. Your integration code stays the same.
    </p>
    {% include alert.html variant="warning" text="Anyone with your production private key can request real patient data as your organization. Generate it on the system that uses it, store it in a secrets manager or equivalent, and never email it, commit it, or share it with another organization." classNames="measure-6 margin-top-2" %}
    <ol style="margin-top: 1rem;">
      <li><b>Create a client token.</b> Copy it immediately; DPC shows it once. Tokens expire after one year, so plan to <a href="{{ '/api-documentation/get-bearer-token/manage-credentials.html#renew-expired-tokens' | relative_url }}">renew</a> them.</li>
      <li><b>Create a key pair and upload the public key</b> with the same <a href="{{ '/api-documentation/get-sandbox-credentials.html#steps-to-create-a-public-key' | relative_url }}">openssl steps</a> as the sandbox. Keep the public key ID for bearer token requests.</li>
      <li><b>Confirm you can get a bearer token</b> from <code>https://dpc.cms.gov/api/v1</code>. Success confirms your token, keys, and IP registration together.</li>
    </ol>
  </li>
</ol>

## Go live with real data

These run in order: the sandbox workflow with real identifiers.

<ol class="usa-process-list" style="margin-top: 2rem;">
  <li class="usa-process-list__item">
    <h3 class="usa-process-list__heading">Register your practitioners and patients</h3>
    <p style="margin-top: 1rem;">
      <a href="{{ '/api-documentation/attribution/upload-practitioners.html' | relative_url }}">Upload practitioners</a> by NPI and <a href="{{ '/api-documentation/attribution/upload-patients.html' | relative_url }}">upload patients</a> by MBI, with a production bearer token. Keep the returned DPC <code>id</code>s. DPC rejects records with a missing or malformed NPI or MBI, so expect cleanup on the first pass.
    </p>
  </li>

  <li class="usa-process-list__item">
    <h3 class="usa-process-list__heading">Attest and build your rosters</h3>
    <p style="margin-top: 1rem;">
      CMS requires a practitioner to attest to a treatment-related relationship with every patient whose data they access. Send an <code>X-Provenance</code> header (<a href="{{ '/api-documentation/attribution/attestation.html' | relative_url }}">attestation</a>) with each roster change. Then create one Group Resource per practitioner. The header needs your Organization ID and the DPC <code>id</code> of the practitioner you are attesting for. Your production Organization ID differs from sandbox. Find it in the Portal or at <code>/Organization</code>.
    </p>
  </li>

  <li class="usa-process-list__item">
    <h3 class="usa-process-list__heading">Run your first production export</h3>
    <p style="margin-top: 1rem;">
      <a href="{{ '/api-documentation/export-data.html' | relative_url }}">Start an export job</a> for one practitioner's Group ID. Confirm the data lands correctly in your system before you export the whole organization. Pull full history with one unfiltered export per group before using <a href="{{ '/api-documentation/export-data/how-to-filter.html#request-filtered-data-with-_since' | relative_url }}"><code>_since</code></a> for incremental updates. <a href="{{ '/api-documentation/export-data/patient-everything.html' | relative_url }}">/Patient/$everything</a> returns one patient's data and needs an <code>X-Provenance</code> header; <code>$export</code> does not.
    </p>
  </li>
</ol>

## Keep your production access active

Assign each of these to someone on your team:

- Re-attest every 90 days. DPC marks patients with expired attribution `inactive` and drops them from exports without warning.
- Renew client tokens every year. See [manage credentials]({{ '/api-documentation/get-bearer-token/manage-credentials.html' | relative_url }}).
- Rotate keys and delete public keys for retired systems.
- Keep registered IP addresses current. Add new ones before a migration; remove unused ones.
- Remove CDs who change roles or leave. Update your AO if the official on your enrollment record changes.
- Keep security certifications current. The [Terms of Service]({{ '/terms-of-service.html' | relative_url }}) treats them as a continuing attestation.

## Get help

- Email [dpcinfo@cms.hhs.gov](mailto:dpcinfo@cms.hhs.gov) with onboarding questions.
- Join the [DPC Google Group](https://groups.google.com/g/dpc-api) for implementation questions.
- Watch [announcements]({{ '/announcements.html' | relative_url }}) for changes to onboarding and the API.
