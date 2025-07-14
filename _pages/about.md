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
       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in lectus leo. Mauris non vehicula risus, vitae pretium ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tortor lectus, luctus id nulla id, gravida porta mi. Fusce vel cursus purus, quis cursus risus.
    </p>
  </div>
</div>

<div class="padding-y-4">
  <table class="usa-table usa-table--borderless usa-table--stacked">
    <caption class="usa-sr-only">Definitions of Part A, Part B, and Part D claims data</caption>
    <thead>
      <tr>
        <th scope="col">Data type</th>
        <th scope="col">Definition</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Medicare Part A claims data</th>
        <td>
          Inpatient hospital stays, care in skilled nursing facilities, and hospice care
        </td>
      </tr>
      <tr>
        <th scope="row">Medicare Part B claims data</th>
        <td>
          Various doctors' services, outpatient care, medical supplies, and preventive services
        </td>
      </tr>
      <tr>
        <th scope="row">Medicare Part D claims data</th>
        <td>
          Prescription drugs prescribed by healthcare providers
        </td>
      </tr>
    </tbody>
  </table>
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
          <h4 class="usa-card__heading">Data at the Point of Care</h4>
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
            The Data at the Point of Care (DPC) API enables healthcare providers with claims data to fill in gaps in patient history at the point of care and deliver high-quality care to Medicare enrollees.
          </p>
        </div>
        <div class="usa-card__footer">
          <a href="https://dpc.cms.gov/" target="_blank" rel="noopener noreferrer" class="usa-button">Visit DPC</a>
        </div>
      </div>
  </li>
</ul>
