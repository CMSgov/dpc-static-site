---
layout: prod-access
page_title: "Demo Questions"
seo_title: ""
description: "What to expect in the DPC production access demo, including the questions the DPC team asks about your use case, data access, and operational readiness."
in-page-nav: true
in-page-nav-levels: "h2"
---

# {{ page.page_title }}

The demo is a virtual meeting, about an hour long. You give a live, complete demonstration of your implementation in the sandbox. The Credential Delegate usually leads it and must be prepared to walk through the integration and answer the questions below.

## Use case and implementation

Show the DPC team what you're building and how it works end to end.

1. Explain your use cases. How will you use the data? For example: giving a clinician a patient's recent visits and medications before a visit, reconciling medications across providers, identifying care gaps or overdue screenings across your patients, or aggregate reporting for your patient population.
2. In the sandbox, walk through your live end-to-end workflow. Trace one request's full path through your system: authenticating to the DPC API, making the request, and displaying the returned data to an end user.
3. Show what the practitioner sees: where DPC data appears in their workflow and how they act on it.

## Data access and usage

Be ready to explain how you control access to patient data and how much data you expect to request.

- How does your system determine which patients a given user can request data for, and how do you enforce that restriction?
- What request patterns do you expect, in both volume and frequency?
- How does your provider organization handle consent for data sharing, and how do patients know their data is being shared?

## Operational readiness

- How will your team handle the [API version change]({{ '/production-access.html#keep-your-production-access-active' | relative_url }}) planned for June 2027?

## Next steps

After the demo, the DPC team follows up about [setting up your production account]({{ '/production-access.html#set-up-your-production-account' | relative_url }}). If you have questions before then, send them to [dpcinfo@cms.hhs.gov](mailto:dpcinfo@cms.hhs.gov).
