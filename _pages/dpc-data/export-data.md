---
layout: api-docs
page_title: "Export Data"
seo_title: ""
description: ""
in-page-nav: true
in-page-nav-levels: "h2"
---

# {{ page.page_title }}

The primary interaction with the DPC pilot API is via the FHIR /Group/$export operation. This allows an organization to export Patient, Coverage, and Explanation of Benefit data in an asynchronous and bulk manner. Details on the FHIR bulk data operations can be found in the [FHIR Bulk Data Specification](https://build.fhir.org/ig/HL7/bulk-data/OperationDefinition-group-export.html).

To initiate an export job, locate your Group.id and make a GET request to the /Group/$export endpoint with the required headers.

You can specify which resources to download using the `_type` query parameter (e.g., `?_type=Patient,Coverage`).

You can filter data using the `_since` parameter with either the /Patient or /Group endpoints. Dates and times submitted in `_since` must be listed in the FHIR [Instant](https://www.hl7.org/fhir/datatypes.html#instant) format.
