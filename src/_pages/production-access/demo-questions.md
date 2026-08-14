---
layout: prod-access
page_title: "Demo Questions"
seo_title: ""
description: ""
---

# {{ page.page_title }}

A ~1-hour virtual meeting: a live and complete demonstration of your implementation using the sandbox environment. This is typically led by the Credential Delegate, who owns the technical setup and should be prepared to walk through the integration to answer the questions below.

## Use case and implementation

1. Explain your use case(s). How will the data be used? For example: giving a clinician a patient’s recent visits and medications before their visit;  reconciling medications across providers; identifying care gaps or overdue screenings across your patients; aggregate reporting for your patient population  
2. Using the sandbox, demonstrate your live end-to-end workflow and trace one request's full path through your system – authenticating to the DPC API, making the request, and displaying the returned data to an end user.  
3. Show what the practitioner actually sees: where DPC data appears in their workflow and how they act on it.

## Data access and usage 

1. How does your system determine which patients a given user can request data for, and how is that limit enforced?  
2. What are your expected request patterns: volume, frequency?  
3. How does your provider organization handle consent for data sharing? How do patients know their data is being shared?

## Operational readiness

4. Our current API version will be updated by June 2027\. Will your team be able to migrate by then?
