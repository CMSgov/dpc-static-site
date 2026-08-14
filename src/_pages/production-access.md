---
layout: prod-access
page_title: "Production Access"
seo_title: ""
description: "A checklist for getting production access to the DPC API, covering Medicare enrollment, sandbox testing, the required demo, and production setup."
in-page-nav: true
in-page-nav-levels: "h2"
---

# {{ page.page_title }}

DPC production access is available for eligible Medicare provider organizations. Because production data is real, it carries requirements that the sandbox does not. This checklist covers the whole process – from confirming your eligibility through your first production export.

Two roles are required for this process:

* [**Authorized Official (AO)**](https://pecos.cms.hhs.gov/pecos/help-main/glossary.jsp#:~:text=your%20Medicare%20contractor.-,Authorized%20Official,-An%20appointed%20official):  an appointed official (e.g., CEO, CFO) whom the organization has given legal authority to enroll it in Medicare, make changes to its Medicare status, and commit it to abide by Medicare statutes, regulations, and program instructions. The AO is accountable for the Terms of Service and for the organization's access to production data.  
* **Credential Delegate (CD)**: a technical point of contact –  usually someone other than the AO, though the AO can fill this role — whom the AO authorizes to complete the technical steps in sandbox and production. The CD typically owns the integration and leads the demo.

## Confirm the provider organization is eligible 

* An approved Medicare enrollment  
  * Your provider organization must be have an approved enrollment in the [Provider Enrollment, Chain, and Ownership System (PECOS)](https://pecos.cms.hhs.gov/pecos/login.do#headingLv1) and a Type-2 [National Provider Identifier ID (NPI)](https://nppes.cms.hhs.gov/help/npi-application-help-page)  
  * Neither the provider organization nor the AO can be in the [Medicare Exclusions Database](https://oig.hhs.gov/exclusions/)  
* An Authorized Official (AO) is on that enrollment record  
  * Your organization needs an AO listed on the Medicare annulment record. This is the person who will verify their identity, register the organization for production access, and sign/ensure compliance to the [Terms of Service](https://dpc.cms.gov/terms-of-service#:~:text=In%20order%20to%20access%20DPC,in%20response%20to%20your%20request.) later in the process. We recommend reading the Terms of Service in advance. 

## Build and test in the sandbox

You can set up the sandbox at any time — it doesn't require eligibility approval. Production access, however, requires demoing your sandbox implementation with the DPC team, so build here first. This work is typically led by the CD.

Follow the developer [instructions](https://dpc.cms.gov/api-documentation.html) and:

1. Create a sandbox account  
2. Get sandbox credentials  
3. Authenticate against the sandbox  
4. Export claims data for test patients

## Request production access and demo

Once your sandbox integration works end to end, request production access. The CD, who owns the technical setup, should be prepared to walk through the integration and answer the DPC team's questions.

1. Submit the [production access form](/production-access/request-form.html).
2. Schedule a demo with the DPC team. Demos allow us to better understand your needs and answer any questions you may have. You’ll be expected to walk through your sandbox integration and [answer questions](/production-access/demo-questions.html) about your implementation.

## Set up production account

You'll need your AO and at least one CD to complete these steps in DPC’s production portal application. 

Note: every user verifies their identity the same way – using the exact email address from their DPC invitation. This applies to the AO and to each CD. Before starting, make sure each person either:

- Associates that invitation email with an existing account, or  
- Creates an account with one of the approved authentication providers (ID.me, CLEAR, or Login.gov) using that email address. Creating a new account with an authentication provider requires a state-issued photo ID, a Social Security number, and a mobile device. Allow time for this step.

1. **The AO must create an account in the DPC portal and verify their identity**. *The DPC team will send an invitation to the AO’s email.*   
2. **The AO must complete registration for the organization in the Portal.** Once your identity is verified, you’ll register the organization. We’ll then review your organization’s NPI-2 ID, ensure the AO is authorized for that NPI in PECOS, and check that neither the organization nor AO appears in the Exclusions Database.
3. **The AO must sign the DPC Terms of Service**  
4. **Invite your Credential Delegates**  
  - A Credential Delegate (CD) manages credentials so the AO does not have to. You can skip this item if your AO will manage credentials directly.   
  - The AO invites each CD by name and email, and invitations expire in 48 hours.   
  - Each CD verifies their identity the same way the AO did, using the email address their invitation went to.  
5. **Register your public IP addresses**  
  - DPC rejects requests from unregistered IP addresses. Register the public IP of every system that calls the production API, and label each one.  
6. **Create your production credentials and swap replace your sandbox credentials**  
  - A CD or the AO repeats the sandbox credential steps  
  - Your integration code should stay the same

## Go live with real data	

This process mirrors your sandbox setup

1. Register your practitioners and patients  
2. Attest and build your patient rosters  
  - CMS requires a practitioner to attest to a treatment-related relationship with every patient whose data they access  
3. Run your first production export  
  - Start small: For first your export, we recommend starting with one practitioner’s Group ID before pulling data for the whole organization  
  - Once you’re ready to make your first complete export, we recommend running an unfiltered export to backfill data for your associated patients  
  - All future exports should use the _since parameter to only retrieve the latest, fresh data

## Keep your production access active

Keep the following current to avoid losing access to the API

1. You must re-attest every 90 days  
  - DPC marks patients with expired attribution inactive and drops them from exports.
2. Renew client tokens every year.   
3. Rotate keys and delete public keys for retired systems  
4. Keep registered IP addresses current  
5. Keep contact information up-to-date – Update your AO if the official on your enrollment record changes. Remove CDs who change roles or leave.

## Need help?

Send your questions to [dpcinfo@cms.hhs.gov](mailto:dpcinfo@cms.hhs.gov). You can also join the [DPC Google Community](https://groups.google.com/g/dpc-api?pli=1) to ask questions and give and get feedback from other users. Watch announcements for changes to onboarding and the API. 
