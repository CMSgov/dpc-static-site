---
layout: api-docs
page_title: "Production Access"
seo_title: ""
description: "A checklist for getting production access to the DPC API, covering Medicare enrollment, sandbox testing, the required demo, and production setup."
in-page-nav: true
in-page-nav-levels: "h2"
show-side-nav: false
---

# {{ page.page_title }}

Production access to the DPC API is only available to Original Medicare provider organizations and their assigned Health IT teams. Production data is real Medicare claims data for real patients, so production access has requirements the [sandbox]({{ '/api-documentation.html' | relative_url }}) does not.

Use this page as a checklist. Most organizations work through it over several weeks, so you do not need to finish it all at once. Each group below says which of its items run in order and which you can work on in parallel.

{% include alert.html variant="info" heading="Every organization must demo its integration" text="The DPC team reviews your integration in a live demo before granting production access. Build time for that review into your schedule." classNames="measure-6 margin-top-2" %}

## Confirm your eligibility

Check these before you commit engineering time. These are conditions rather than tasks, none depends on the others, and any one of them can disqualify your organization or block you late in the process.

- **An approved Medicare enrollment and an organizational NPI.** Your enrollment must be approved in the Provider Enrollment, Chain, and Ownership System (PECOS), and DPC identifies your organization by its organizational [National Provider Identifier (NPI)](https://www.cms.gov/Regulations-and-Guidance/Administrative-Simplification/NationalProvIdentStand/). Correcting a stale record goes through your Medicare Administrative Contractor and can take weeks, so check this first.
- **An Authorized Official listed on that enrollment record.** Your Authorized Official (AO) signs the Terms of Service and is accountable for your organization's production access. They must verify their own identity later and nobody can do it for them, so confirm they are available before you go further.
- **A clean Exclusions record.** Your organization and your AO must not appear in the Medicare Exclusions Database. DPC checks this when it confirms your organization.
- **Covered entity status and a treatment purpose.** Only a covered entity, or a business associate acting on behalf of one, may request data through DPC, and only for treatment purposes under 45 C.F.R. § 164.506. See the [Terms of Service]({{ '/terms-of-service.html' | relative_url }}).
- **A qualifying security certification.** Every time your software requests data, you attest that your organization meets at least one accepted security standard. Accepted standards include ONC Health IT Certification, HITRUST CSF, SOC 2, ISO 27001, and EHNAC accreditation. The [Terms of Service]({{ '/terms-of-service.html#security' | relative_url }}) lists all of them. The request form asks which one you hold.
- **A team that can work with the API.** Your team must be comfortable with cURL and openssl at a [command line](https://github.com/resources/articles/what-is-a-cli), cryptographic key pairs, JSON, and ISO-8601 dates. DPC uses [FHIR STU3](https://www.hl7.org/fhir/STU3/overview.html), so an integration built on a later FHIR release needs mapping work. See the full [requirements]({{ '/api-documentation.html#requirements' | relative_url }}).

## Build and test in the sandbox

Each item here builds on the one before it. The sandbox is open to any Original Medicare organization or its Health IT team, so your technical team can start on day one while the eligibility items are still in progress. This group is the bulk of the work: expect weeks, not days.

<ol class="usa-process-list" style="margin-top: 2rem;">
  <li class="usa-process-list__item">
    <h3 class="usa-process-list__heading">Get DPC Sandbox credentials</h3>
    <p style="margin-top: 1rem;">
      Request sandbox access, then follow the steps to get <a href="{{ '/api-documentation/get-sandbox-credentials.html' | relative_url }}">DPC Sandbox credentials</a>: a client token and a key pair.
    </p>
    <p style="margin-top: 1rem;">
      These credentials only work in the sandbox. You create separate production credentials after DPC approves your organization.
    </p>
  </li>

  <li class="usa-process-list__item">
    <h3 class="usa-process-list__heading">Authenticate against the sandbox</h3>
    <p style="margin-top: 1rem;">
      Build a JSON Web Token, sign it with your private key, and exchange it for a bearer token. Follow the steps to <a href="{{ '/api-documentation/get-bearer-token.html' | relative_url }}">get a bearer token</a>. You need the client token and public key ID from your sandbox credentials.
    </p>
    <p style="margin-top: 1rem;">
      Bearer tokens expire after 5 minutes, so build the exchange into each job rather than storing a token. The DPC <a href="{{ '/api-documentation/postman-collection.html' | relative_url }}">Postman collection</a> refreshes tokens automatically if you want to explore endpoints by hand.
    </p>
  </li>

  <li class="usa-process-list__item">
    <h3 class="usa-process-list__heading">Attribute patients in the sandbox</h3>
    <p style="margin-top: 1rem;">
      Work through the full <a href="{{ '/api-documentation/attribution.html' | relative_url }}">attribution</a> workflow with test data. You need a bearer token for each of these requests.
    </p>
    <ol style="margin-top: 1rem;">
      <li><a href="{{ '/api-documentation/attribution/upload-practitioners.html' | relative_url }}">Upload practitioners</a>.</li>
      <li><a href="{{ '/api-documentation/attribution/upload-patients.html' | relative_url }}">Upload patients</a>.</li>
      <li>Send an <code>X-Provenance</code> header to <a href="{{ '/api-documentation/attribution/attestation.html' | relative_url }}">attest</a> a treatment relationship, then create one Group Resource per practitioner.</li>
    </ol>
    <p style="margin-top: 1rem;">
      A Group Resource is a practitioner's roster. It references its patients by their DPC <code>id</code> rather than by Medicare Beneficiary Identifier (MBI), and references the practitioner by NPI. Keep each practitioner's DPC <code>id</code> as well, since the <code>X-Provenance</code> header needs it along with your Organization ID. Attributions last 90 days, so build the re-attestation cycle into your integration here rather than after your first production roster expires.
    </p>
  </li>

  <li class="usa-process-list__item">
    <h3 class="usa-process-list__heading">Export sample claims data</h3>
    <p style="margin-top: 1rem;">
      <a href="{{ '/api-documentation/export-data.html' | relative_url }}">Start an export job</a> for a Group ID from the item above. Poll the status URL until the job completes. Then download and parse the NDJSON (newline-delimited JSON) files it produces. The <a href="{{ '/dpc-data.html' | relative_url }}">DPC data page</a> describes the FHIR Resources you get back.
    </p>
    <p style="margin-top: 1rem;">
      Getting this far means your integration is ready to demo. Nothing in the sandbox affects production, and you make these same API calls later against real data.
    </p>
  </li>
</ol>

## Request approval

Submit the form first, then demo. Both happen before DPC grants access to production data.

<ol class="usa-process-list" style="margin-top: 2rem;">
  <li class="usa-process-list__item">
    <h3 class="usa-process-list__heading">Submit the production access request form</h3>
    <p style="margin-top: 1rem;">
      The form asks for information that comes from several teams, so start gathering it before you fill it in:
      <!-- TODO: link the production access request form once a public URL exists. -->
    </p>
    <ul style="margin-top: 1rem;">
      <li>Your organization's name, organizational NPI (NPI-2), primary contact, and Authorized Official.</li>
      <li>Your technical partner, if one is building your integration: their company name, contacts, and the Credential Delegates who manage your credentials.</li>
      <li>Your technical setup: whether you have finished sandbox testing, which FHIR version you use, and your readiness for upcoming DPC API versions.</li>
      <li>How you plan to use the data: your use model, how often and how much data you plan to request, and how many practitioners and patients your organization has.</li>
      <li>Your organization's security certifications. The <a href="{{ '/terms-of-service.html' | relative_url }}">Terms of Service</a> lists which ones DPC accepts.</li>
    </ul>
  </li>

  <li class="usa-process-list__item">
    <h3 class="usa-process-list__heading">Demo your integration to the DPC team</h3>
    <p style="margin-top: 1rem;">
      Book a demo meeting with the DPC team. Review the published questions beforehand. The demo is a live, virtual meeting that runs about an hour. You walk the team through your integration end to end in the sandbox environment.
      <!-- TODO: link the demo booking page and the required demo questions once public URLs exist. -->
    </p>
  </li>
</ol>

{% include alert.html variant="warning" heading="Approval gate" text="The DPC team usually responds within a week of your demo. Nothing in the two groups below can start until DPC approves your organization, so plan your timeline around this point." classNames="measure-6 margin-top-2" %}

## Set up production access

The first three items are the AO's alone, and they run in that order. A Credential Delegate can handle the last three, and those three can run in parallel with each other.

<ol class="usa-process-list" style="margin-top: 2rem;">
  <li class="usa-process-list__item">
    <h3 class="usa-process-list__heading">Create your Portal account and verify the AO's identity</h3>
    <p style="margin-top: 1rem;">
      Your AO creates an account in the DPC production Portal and verifies their identity through an approved identity service: <a href="https://www.id.me/" target="_blank" rel="noopener noreferrer">ID.me</a>, <a href="https://www.clearme.com/" target="_blank" rel="noopener noreferrer">CLEAR</a>, or <a href="https://login.gov/" target="_blank" rel="noopener noreferrer">Login.gov</a>. Each service has its own requirements, but expect to need a state-issued photo ID and a Social Security number.
    </p>
    <p style="margin-top: 1rem;">
      This step verifies the person, not the organization. The AO must do it themselves and cannot hand it to a technical partner or an office administrator. Verification often finishes in one session, but allow a few days in case the service needs to review their documents by hand.
    </p>
  </li>

  <li class="usa-process-list__item">
    <h3 class="usa-process-list__heading">Confirm your organization in the Portal</h3>
    <p style="margin-top: 1rem;">
      Enter your organization's NPI. DPC checks that the verified AO is listed as an authorized or delegated official for that NPI in PECOS, and that neither the AO nor the organization appears in the Medicare Exclusions Database.
    </p>
    <p style="margin-top: 1rem;">
      If the check fails, it is usually because the AO on file in PECOS is a different person, or because the enrollment record is out of date. Correct the enrollment record first, then try again. If the check fails several times, DPC temporarily locks your account.
    </p>
  </li>

  <li class="usa-process-list__item">
    <h3 class="usa-process-list__heading">Sign the DPC Terms of Service</h3>
    <p style="margin-top: 1rem;">
      The AO signs the <a href="{{ '/terms-of-service.html' | relative_url }}">DPC Terms of Service</a> on behalf of the organization. These terms cover how your organization may use production credentials and production data, and they are binding on everyone you give access to. If your organization routes agreements through counsel, send the terms for review before the AO reaches this point.
    </p>
    <p style="margin-top: 1rem;">
      After the AO signs, your organization exists in production and can hold credentials. The three items below all depend on that.
    </p>
  </li>

  <li class="usa-process-list__item">
    <h3 class="usa-process-list__heading">Invite your Credential Delegates</h3>
    <p style="margin-top: 1rem;">
      A Credential Delegate (CD) manages day-to-day credentials for your organization: client tokens, public keys, and registered IP addresses. Invite your Health IT staff or your technical partner's implementation team as CDs so the AO does not have to approve every credential change. Skip this item if your AO manages credentials directly.
    </p>
    <ol style="margin-top: 1rem;">
      <li>The AO invites each Credential Delegate by name and email address.</li>
      <li>The invitation expires in 48 hours. If it lapses, the AO sends a new one.</li>
      <li>Each CD verifies their own identity, the same way the AO did. Allow a few days for this, and account for it when timing the invitations.</li>
    </ol>
    <p style="margin-top: 1rem;">
      Invite more than one CD so credential management does not stall when someone is unavailable. The AO can remove a CD at any time, and should do so promptly when someone changes roles or leaves.
    </p>
  </li>

  <li class="usa-process-list__item">
    <h3 class="usa-process-list__heading">Register your public IP addresses</h3>
    <p style="margin-top: 1rem;">
      DPC accepts production requests only from IP addresses you have registered. Register the public IP address of every system that calls the production API, including any that route through a technical partner or a gateway. Getting a stable public egress address often means a request to your networking team, so start this early in this group rather than late.
    </p>
    <p style="margin-top: 1rem;">
      Give each address a recognizable label so you can tell environments apart later. If your egress IP changes, register the new address before you switch. DPC rejects requests from an unregistered address even if your token is valid.
    </p>
  </li>

  <li class="usa-process-list__item">
    <h3 class="usa-process-list__heading">Create your production credentials</h3>
    <p style="margin-top: 1rem;">
      A Credential Delegate or the AO creates the credentials your systems need, using the same steps as the sandbox. Your integration code stays the same; you are swapping sandbox credentials for production ones.
    </p>
    {% include alert.html variant="warning" text="Anyone with your production private key can request real patient data as your organization. Generate it on the system that uses it, store it in a secrets manager or equivalent, and never email it, commit it, or share it with another organization." classNames="measure-6 margin-top-2" %}
    <ol style="margin-top: 1rem;">
      <li><b>Create a client token.</b> Label it for the system that uses it. Copy it immediately. DPC shows it only once. Client tokens expire after one year, so plan to <a href="{{ '/api-documentation/get-bearer-token/manage-credentials.html#renew-expired-tokens' | relative_url }}">renew</a> them.</li>
      <li><b>Create a key pair and upload the public key.</b> Follow the same <a href="{{ '/api-documentation/get-sandbox-credentials.html#steps-to-create-a-public-key' | relative_url }}">openssl steps</a> used for the sandbox to generate a private key, public key, and verified signature snippet. Keep the public key ID. You need it for every bearer token request.</li>
      <li><b>Confirm you can get a bearer token.</b> Production requests go to <code>https://dpc.cms.gov/api/v1</code> instead of the sandbox host. A successful token request from a registered IP address confirms your client token, keys, and IP registration all work together.</li>
    </ol>
  </li>
</ol>

## Go live with real data

These run in order against the production API. This is the same workflow you built in the sandbox, with real identifiers.

<ol class="usa-process-list" style="margin-top: 2rem;">
  <li class="usa-process-list__item">
    <h3 class="usa-process-list__heading">Register your practitioners and patients</h3>
    <p style="margin-top: 1rem;">
      Load your real roster data into production using a production bearer token.
    </p>
    <ol style="margin-top: 1rem;">
      <li><a href="{{ '/api-documentation/attribution/upload-practitioners.html' | relative_url }}">Upload practitioners</a> using each practitioner's real NPI.</li>
      <li><a href="{{ '/api-documentation/attribution/upload-patients.html' | relative_url }}">Upload patients</a> using each patient's real MBI.</li>
    </ol>
    <p style="margin-top: 1rem;">
      Keep the DPC <code>id</code> returned for each Practitioner and Patient Resource. DPC rejects a record with a missing or malformed NPI or MBI, so expect to clean up roster data on the first pass.
    </p>
  </li>

  <li class="usa-process-list__item">
    <h3 class="usa-process-list__heading">Attest and build your rosters</h3>
    <p style="margin-top: 1rem;">
      CMS requires a practitioner to attest to a treatment-related relationship with every patient whose data they access. Follow the <a href="{{ '/api-documentation/attribution/attestation.html' | relative_url }}">attestation</a> steps to send an <code>X-Provenance</code> header with each request that creates or modifies a roster. Then create one Group Resource per practitioner from the patients you registered above.
    </p>
    <p style="margin-top: 1rem;">
      The header needs your Organization ID and the DPC <code>id</code> of the practitioner you are attesting for. Your production Organization ID differs from your sandbox one: find it in the production Portal or by requesting <code>/Organization</code> against the production API. Attributions last 90 days, so confirm your re-attestation cycle runs before your first roster expires.
    </p>
  </li>

  <li class="usa-process-list__item">
    <h3 class="usa-process-list__heading">Run your first production export</h3>
    <p style="margin-top: 1rem;">
      <a href="{{ '/api-documentation/export-data.html' | relative_url }}">Start an export job</a> for a practitioner's Group ID. Poll the status URL until the job completes. Then download the NDJSON files it produces. Start with one practitioner's roster and confirm the data lands correctly in your system before you export for the whole organization.
    </p>
    <p style="margin-top: 1rem;">
      DPC recommends one unfiltered export per group to pull full history before you start using <a href="{{ '/api-documentation/export-data/how-to-filter.html#request-filtered-data-with-_since' | relative_url }}"><code>_since</code></a> for incremental updates. You can also request a single patient's data with <a href="{{ '/api-documentation/export-data/patient-everything.html' | relative_url }}">/Patient/$everything</a>, which needs an <code>X-Provenance</code> header even though <code>$export</code> does not.
    </p>
  </li>
</ol>

## Keep your production access active

Production access needs upkeep. Assign each of these to someone on your team:

- Re-attest every 90 days. DPC marks patients with expired attribution `inactive` and drops them from exports without warning.
- Renew client tokens every year. See [manage credentials]({{ '/api-documentation/get-bearer-token/manage-credentials.html' | relative_url }}).
- Rotate keys and delete public keys for systems you have retired.
- Keep registered IP addresses current. Add new addresses before a migration; remove ones you no longer use.
- Remove Credential Delegates when they change roles or leave, and update your AO if the authorized official on your Medicare enrollment record changes.
- Keep your security certifications current. The [Terms of Service]({{ '/terms-of-service.html' | relative_url }}) treats them as a continuing attestation, not a one-time answer on the request form.

## Get help

- Email [dpcinfo@cms.hhs.gov](mailto:dpcinfo@cms.hhs.gov) with questions about your organization's onboarding.
- Join the [DPC Google Group](https://groups.google.com/g/dpc-api) to ask implementation questions and see problems other organizations have solved.
- Watch [announcements]({{ '/announcements.html' | relative_url }}) for changes to onboarding and the API.
