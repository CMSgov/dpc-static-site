---
layout: api-docs
page_title: "API Documentation"
seo_title: ""
description: "Learn how to use the DPC API to access Medicare claims data, including authentication, attribution, and exporting data from the DPC Sandbox."
in-page-nav: true
---

# {{ page.page_title }}

Data at the Point of Care (DPC) API is a RESTful web service that shares Medicare claims data with Original Medicare provider organizations. It uses [HL7® FHIR® resources](https://www.hl7.org/fhir/) to share this data in a standard format.

This documentation explains how to connect to realistic test data in the <a href="https://sandbox.dpc.cms.gov/users/sign_in" target="_blank">DPC Sandbox</a>. The sandbox is available to any Original Medicare provider organization or their assigned Health IT team.

<ol class="usa-process-list margin-top-1">
  <li class="usa-process-list__item">
    <p class="usa-process-list__heading">Sign up for the DPC Sandbox</p>
    <p style="margin-top: 1rem;">
      Request access to the DPC Sandbox and follow the steps to get <a href="{{ '/api-documentation/get-sandbox-credentials.html' | relative_url }}">DPC Sandbox credentials</a>.
    </p>
  </li>
  <li class="usa-process-list__item">
    <p class="usa-process-list__heading">Use the sandbox</p>
    <p>
      Learn how to authenticate, attribute patients, and export DPC data. You can also use the DPC <a href="{{ '/api-documentation/postman-collection.html' | relative_url }}">Postman collection</a> to explore public endpoints with sample requests.
    </p>
    <ol style="margin-top: 1rem;">
      <li>Get a <a href="{{ '/api-documentation/get-bearer-token.html' | relative_url }}">bearer token</a>.</li>
      <li>Complete <a href="{{ '/api-documentation/attribution.html' | relative_url }}">attribution</a> by creating patient rosters.</li>
      <li>Initiate a job to <a href="{{ '/api-documentation/export-data.html' | relative_url }}">export sample claims data</a> with DPC.</li>
    </ol>
  </li>
</ol>

## Requirements

To complete these steps, you’ll need to:

- Use cURL and openssl with a [command-line interface](https://github.com/resources/articles/what-is-a-cli).
- Create cryptographic key pairs.
- Construct and interpret JSON.
- Understand ISO-8601 date format.

## Reference
DPC uses <a href="https://www.hl7.org/fhir/STU3/overview.html" target="_blank">Fast Healthcare Interoperability Resources (FHIR)</a>, which introduces unique terminology and commands.