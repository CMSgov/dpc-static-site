---
layout: api-docs
page_title: "Postman Collection"
seo_title: ""
description: ""
in-page-nav: true
---

# {{ page.page_title }}

This collection contains example requests to public endpoints for the DPC API. To use this collection, you must have the Postman app downloaded onto your computer and have your local vault configured as described [here](https://learning.postman.com/docs/sending-requests/postman-vault/postman-vault-secrets/). Use the vault to ensure private information isn't synced to the cloud. This collection includes requests, the sandbox environment, and global variables to be imported into your Postman app.

1. Select the Data at the Point of Care Sandbox environment (top right).
2. Fill in your key_id: This is the DPC ID of your public key, which is returned to you when the public key is uploaded to the DPC Portal. You need this to generate a JSON Web Token (JWT), which will be exchanged for an access token.
3. Add the following values to your vault:
    - client_token: Your client token is generated through the DPC Portal. Be sure to save a copy of your token in a safe place.
    - PRIVATE_KEY: If you do not already have your public and private keys, please generate your public/private key pair through the DPC Portal.
4. Within your vault, go to settings and turn on "Enable support in scripts."

With these three values in place, the JWT and a fresh access token are automatically generated for you before each request in this Postman collection. This prevents you from having to manually refresh the access token every five minutes while using the collection.

You can find additional instructions and details within the description of each request in the postman collection.

## Patient/$everything

Patient/{id}/$everything is an endpoint that allows users to retrieve all resources about a patient using their DPC internal ID (UUID), represented as {id} in the request. Included in the resources will be the Patient, Coverage, and ExplanationOfBenefit Resources for one patient’s historical data from the last seven years, combined into a bundle. It is a synchronous download, so it differs from the Group $export operation in that it does not create a job that needs to be monitored or data files to download. The response body will contain the bundle.

If you only have the Medicare Beneficiary Identifier (MBI) of the patient, you can retrieve the DPC internal ID by first making a GET request for that specific patient as the UUID is returned in that response.

A Patient record must already exist in the DPC database to successfully complete your Patient/$everything request; however, the patient does not need to belong to a group.

This request requires an X-Provenance header for attestation.

Learn more about the HL7 FHIR Specification for:

- [Operation Patient Everything (Release v4)](http://hl7.org/fhir/R4/operation-patient-everything.html)
- [Operation Patient Everything (Release v3)](http://hl7.org/fhir/STU3/operation-patient-everything.html)
