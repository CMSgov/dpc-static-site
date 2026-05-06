---
layout: api-docs
page_title: "API Documentation"
seo_title: ""
description: "Learn how to use the DPC API to access Medicare claims data, including authentication, attribution, and exporting data from the DPC Sandbox."
in-page-nav: true
---

# {{ page.page_title }}

Data at the Point of Care (DPC) is a pilot program where providers access patient data from Medicare claims.

This documentation shows you how to connect to synthetic data in the <a href="https://sandbox.dpc.cms.gov/users/sign_in" target="_blank">DPC Sandbox</a>. The sandbox is available to any Original Medicare provider or Health IT implementer.

<ol class="usa-process-list margin-top-1 docs-process-list">
  <li class="usa-process-list__item">
    <p class="usa-process-list__heading">Sign up for the DPC Sandbox</p>
    <ol style="margin-top: 1rem;">
      <li>Request access to the DPC Sandbox. </li>
      <li>Follow the steps to get <a href="{{ '/api-documentation/get-sandbox-credentials.html' | relative_url }}">DPC Sandbox credentials</a></li>
    </ol>
  </li>
  <li class="usa-process-list__item docs-final-item">
    <p class="usa-process-list__heading">Use the sandbox</p>
    <div class="usa-alert usa-alert--info usa-alert--slim margin-top-2">
      <div class="usa-alert__body">
        <p class="usa-alert__text">
          DPC also offers a <a href="{{ '/api-documentation/postman-collection.html' | relative_url }}">Postman collection</a> with sample requests to public endpoints.
        </p>
      </div>
    </div>
    <ol style="margin-top: 1rem;">
      <li>Get a <a href="{{ '/api-documentation/get-bearer-token.html' | relative_url }}">bearer token</a>.</li>
      <li>Complete <a href="{{ '/api-documentation/attribution.html' | relative_url }}">attribution</a> by creating patient rosters.</li>
      <li>Initiate a job to <a href="{{ '/api-documentation/export-data.html' | relative_url }}">export data</a>. </li>
    </ol>
  </li>
</ol>

## Requirements

To complete these steps you'll need to:

- Sign up for the DPC Sandbox  
- Use a [command-line interface](https://github.com/resources/articles/what-is-a-cli) (e.g., Terminal)  
- Create cryptographic key pairs  
- Construct and interpret JSON  
- Understand date formats, including ISO