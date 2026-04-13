---
layout: api-docs
page_title: "API Documentation"
seo_title: ""
description: ""
in-page-nav: true
sidebar-links: 
  - name: API Documentation
    url: /api-documentation.html
    
    children:
    - name: Authorization
      url: /authorization
      
    - name: Attestation & Attribution
      url: /attestation-attribution

    - name: Export Data
      url: /export-data

    - name: Postman Collection
      url: /postman-collection

---

# {{ page.page_title }}

Data at the Point of Care (DPC) is a pilot program where providers access patient data from Medicare claims.

This documentation shows you how to connect to synthetic data in the <a href="https://sandbox.dpc.cms.gov/users/sign_in" target="_blank">DPC Sandbox</a>. The sandbox is available to any Fee-for-Service provider or Health IT implementer.

<ol class="usa-process-list margin-top-1 docs-process-list">
  <li class="usa-process-list__item">
    <p class="usa-process-list__heading">Sign up for the DPC Sandbox</p>
    <p>Request access to the DPC Sandbox. Follow the steps to get <a href="{{ '/api-documentation/get-sandbox-credentials' | relative_url }}">DPC Sandbox credentials</a></p>
  </li>
  <li class="usa-process-list__item docs-final-item">
    <p class="usa-process-list__heading">Try the API </p>
    <ol>    
      <li>Get an  <a href="{{ '/api-documentation/get-an-access-token' | relative_url }}">access token</a>.</li>
      <li>Complete <a href="{{ '/api-documentation/attribution' | relative_url }}">attribution</a> by creating patient rosters.</li>
      <li>Initiate a job to <a href="{{ '/api-documentation/export-data' | relative_url }}">export data</a>. </li>
    </ol>
  </li>
</ol>

DPC also offers a Postman collection with sample requests to public endpoints.

## Requirements

To complete these steps you’ll need to:

- Sign up for the DPC Sandbox  
- Use a [command-line interface](https://github.com/resources/articles/what-is-a-cli) (e.g., Terminal)  
- Create cryptographic key pairs  
- Construct and interpret JSON  
- Understand date formats, including ISO