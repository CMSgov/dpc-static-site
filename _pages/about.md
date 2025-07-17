---
layout: default
page_title: "About DPC"
seo_title: ""
description: ""
show-side-nav: false
---

<div class="grid-row grid-gap-4 flex-align-center">
  <div class="tablet:grid-col-5 tablet:order-2 margin-y-2">
    <img src="{{ '/assets/img/hero-heart.svg' | relative_url }}" alt="data consult illustration" class="padding-x-4"/>
  </div>
  <div class="tablet:grid-col tablet:order-1" >
    <h1>{{ page.page_title }}</h1>
    <p>
       The Centers for Medicare & Medicaid Services (CMS) Data at the Point of Care (DPC) API is currently in a pilot phase in which a limited number of customers can access Medicare Fee-For-Service claims data through the API once their solution has been approved for production. This pilot program promotes the industry-standard HL7 Fast Healthcare Interoperability Resources (FHIR), specifically the Bulk FHIR specification.
    </p>
  </div>
</div>


## What are the other CMS claims-based FHIR APIs?

<ul class="usa-card-group flex-justify-center padding-y-4">
    <li class="usa-card tablet:grid-col-6 desktop:grid-col-4">
      <div class="usa-card__container">
        <div class="usa-card__header">
          <h4 class="usa-card__heading">Claims Data to Part D Sponsors</h4>
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
            The AB2D API provides stand-alone Prescription Drug Plan sponsors with claims data to enhance the use of medications and improve the long term health of enrollees.
          </p>
        </div>
        <div class="usa-card__footer">
          <a href="https://ab2d.cms.gov/" target="_blank" rel="noopener noreferrer" class="usa-button">Visit AB2D</a>
        </div>
      </div>
  </li>
      <li class="usa-card tablet:grid-col-6 desktop:grid-col-4">
      <div class="usa-card__container">
        <div class="usa-card__header">
          <h4 class="usa-card__heading">Blue Button 2.0</h4>
        </div>
        <div class="usa-card__media usa-card__media--inset">
          <div class="usa-card__img text-center">
            <img
              src="{{ '/assets/img/logo-bluebutton.svg' | relative_url }}"
              alt="AB2D logo"
              class="maxw-15 margin-x-auto"
            />
          </div>
        </div>
        <div class="usa-card__body">
          <p>
            The Blue Button 2.0 (BB2.0) API enables enrollees to connect their Medicare claims data to the applications, services, and research programs they trust.
          </p>
        </div>
        <div class="usa-card__footer">
          <a href="https://bluebutton.cms.gov/" target="_blank" rel="noopener noreferrer" class="usa-button">Visit BB2.0</a>
        </div>
      </div>
  </li>
      <li class="usa-card tablet:grid-col-6 desktop:grid-col-4">
      <div class="usa-card__container">
        <div class="usa-card__header">
          <h4 class="usa-card__heading">Beneficiary Claims Dta API</h4>
        </div>
        <div class="usa-card__media usa-card__media--inset">
          <div class="usa-card__img text-center">
            <img
              src="{{ '/assets/img/logo-dpc.svg' | relative_url }}"
              alt="DPC logo"
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
          <a href="https://dpc.cms.gov/" target="_blank" rel="noopener noreferrer" class="usa-button">Visit BCDA</a>
        </div>
      </div>
  </li>
</ul>
