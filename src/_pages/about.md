---
layout: api-docs
page_title: "About DPC"
seo_title: ""
description: "Data at the Point of Care (DPC) is a CMS pilot program that shares Medicare claims data with Original Medicare providers to support coordinated care."
show-side-nav: false
---

<div class="grid-row grid-gap-4 flex-align-center">
 
  <div class="grid-col-auto display-flex flex-align-center desktop:flex-justify-center desktop:order-2">
    <!-- <img
      class="position-relative"
      src="{{ '/assets/img/person-5.png' | relative_url }}"
      aria-hidden="true"
      alt=""
      style="height:400px;padding: 0 40px;"
    /> -->
  </div>
  <div class="desktop:grid-col desktop:order-1">
    <h1 class="margin-top-5 desktop:margin-top-0">{{ page.page_title }}</h1>
    <h2>Creating continuity for people with Medicare</h2>
    <p>People with Medicare can receive care from multiple providers and care settings. As a result, providers may not have a complete picture of a patient's care history when making clinical decisions. The Data at the Point of Care (DPC) pilot program securely shares Medicare claims data in a standardized format, the HL7® FHIR® standard. This helps providers fill information gaps, make more informed clinical decisions, and coordinate care more effectively. By giving care teams a more complete picture of their patients, DPC supports better, more connected care for people with Medicare.</p>
  </div>
</div>

## Completing the picture with Medicare claims

Medicare claims tell a continuous story about visits, admissions, screenings, services, and medications. The Centers for Medicare & Medicaid Services (CMS) created the DPC pilot program to securely share this information with Original Medicare providers. DPC can:

- Keep providers informed about services patients receive between visits.
- Reduce the need for patients to repeatedly share their health histories.
- Provide insights into prescription refills, medication changes, and adherence.
- Highlight preventive services such as flu and shingles vaccines.

## DPC is currently a pilot program

DPC is currently available to a limited number of pilot participants. We’re finalizing a new authentication and onboarding portal created based on feedback from pilot participants. During this time, CMS won’t be onboarding new production users. We'll announce general availability of production data when the portal launches. In the meantime, developers can continue exploring DPC using realistic test data in the sandbox.

## What are the other CMS claims-based FHIR APIs?

<ul class="usa-card-group flex-justify-center padding-y-4">
  <li class="usa-card tablet:grid-col-6 desktop:grid-col-4">
    <div class="usa-card__container">
      <div class="usa-card__header">
        <h3 class="usa-card__heading">Beneficiary Claims Data API</h3>
      </div>
      <div class="usa-card__media usa-card__media--inset">
        <div class="usa-card__img text-center">
          <img
            src="{{ '/assets/img/logo-bcda.svg' | relative_url }}"
            alt="BCDA logo"
            class="maxw-15 margin-x-auto"
          />
        </div>
      </div>
      <div class="usa-card__body">
        <p>
          The Beneficiary Claims Data API (BCDA) helps Alternative Payment Model participants provide high-quality, coordinated care by making it easier to access bulk Medicare Parts A, B, and D claims data.
        </p>
      </div>
      <div class="usa-card__footer">
        <a href="https://bcda.cms.gov/" target="_blank" rel="noopener noreferrer" class="usa-button">Visit BCDA</a>
      </div>
    </div>
  </li>
  <li class="usa-card tablet:grid-col-6 desktop:grid-col-4">
    <div class="usa-card__container">
      <div class="usa-card__header">
        <h3 class="usa-card__heading">Blue Button</h3>
      </div>
      <div class="usa-card__media usa-card__media--inset">
        <div class="usa-card__img text-center">
          <img
            src="{{ '/assets/img/logo-bluebutton.svg' | relative_url }}"
            alt="Blue button logo"
            class="maxw-15 margin-x-auto"
          />
        </div>
      </div>
      <div class="usa-card__body">
        <p>
          The Blue Button API enables enrollees to connect their Medicare claims data to the applications, services, and research programs they trust.
        </p>
      </div>
      <div class="usa-card__footer">
        <a href="https://bluebutton.cms.gov/" target="_blank" rel="noopener noreferrer" class="usa-button">Visit Blue Button</a>
      </div>
    </div>
  </li>
  <li class="usa-card tablet:grid-col-6 desktop:grid-col-4">
    <div class="usa-card__container">
      <div class="usa-card__header">
        <h3 class="usa-card__heading">Claims Data to Part D Sponsors</h3>
      </div>
      <div class="usa-card__media usa-card__media--inset">
        <div class="usa-card__img text-center">
          <img
            src="{{ '/assets/img/logo-ab2d-sm.svg' | relative_url }}"
            alt="AB2D logo"
            class="maxw-15 margin-x-auto"
          />
        </div>
      </div>
      <div class="usa-card__body">
        <p>
          The AB2D API provides stand-alone Prescription Drug Plan sponsors with claims data to enhance the use of medication and improve the long term health of enrollees.
        </p>
      </div>
      <div class="usa-card__footer">
        <a href="https://ab2d.cms.gov/" target="_blank" rel="noopener noreferrer" class="usa-button">Visit AB2D</a>
      </div>
    </div>
  </li>
</ul>