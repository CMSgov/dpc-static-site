---
layout: api-docs
page_title: "Upload Practitioners"
seo_title: ""
description: ""
in-page-nav: true
---

# {{ page.page_title }}

The DPC Team provides a bundle of sample practitioners you can use to create a test organization.    

<a class="usa-button" href="{{ "/assets/downloads/practitioner_bundle.json" | relative_url }}">Download sample practitioners</a>

**Minimum practitioner requirements**

Include the following to avoid a `422 - Unprocessable Entity` error.

- First and last name  
- Type 1 National Provider Identifier (NPI)
   
**Note:** If an existing practitioner is found with the same NPI, the `/Practitioner` endpoint will return the same practitioner. 