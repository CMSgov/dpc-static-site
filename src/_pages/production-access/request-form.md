---
layout: prod-access
page_title: "Production Access Request Form"
seo_title: ""
description: "The information the DPC team asks for when you request production access, covering your organization, use case, technical setup, and security certifications."
in-page-nav: true
in-page-nav-levels: "h2"
---

# {{ page.page_title }}

This form tells the DPC team who your organization is, how you plan to use production data, and how far along your integration is. Gather the information below before you start, then send your responses to [dpcinfo@cms.hhs.gov](mailto:dpcinfo@cms.hhs.gov).

## Your organization

Provide the following for each organization applying for access:

- Organization name
- Type 2 National Provider Identifier (NPI)
- Authorized Official(s): name and email. This is the person with authority to act for your organization and manage its Medicare enrollment.

If a third-party technical partner is building your integration, also provide:

- Company name
- Credential Delegate(s): name and email. These are the people who manage credentials and technical setup on your behalf.

## How you plan to use the data

- Which best describes your use case: point of care, aggregate population reporting, or something else? If something else, describe it.
- How often, and at what volume, do you expect to request data?
- About how many practitioners work at your organization?
- About how many patients does your organization serve?

## Technical setup

- Have you completed testing in the [DPC sandbox]({{ '/api-documentation.html' | relative_url }})?
- Are you ready to show your integration and [answer the demo questions]({{ '/production-access/demo-questions.html' | relative_url }})?
- Can your team migrate before the [API version change]({{ '/production-access.html#keep-your-production-access-active' | relative_url }}) planned for June 2027?
- Which version of Fast Healthcare Interoperability Resources (FHIR) are you using?

## Security and compliance

- Which of the [accepted security certifications]({{ '/terms-of-service.html#security' | relative_url }}) does your organization hold? You must hold at least one.

## Next steps

Once the DPC team reviews your form, you'll [schedule a demo]({{ '/production-access/demo-questions.html' | relative_url }}) of your sandbox integration.
