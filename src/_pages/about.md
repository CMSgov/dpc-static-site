---
layout: api-docs
page_title: "About DPC"
seo_title: ""
description: ""
show-side-nav: false
---

<div class="grid-row grid-gap-4 flex-align-center">
 
  <div class="grid-col-auto display-flex flex-align-center desktop:flex-justify-center desktop:order-2">
    <div class="position-absolute display-flex flex-align-center flex-justify-center width-full">
      <img
        src="{{ '/assets/img/blob-1.svg' | relative_url }}"
        aria-hidden="true"
        alt=""
      />
    </div>
    <img
      class="position-relative"
      src="{{ '/assets/img/person-2.png' | relative_url }}"
      aria-hidden="true"
      alt=""
      style="height:400px;padding: 0 40px;"
    />
  </div>
  <div class="desktop:grid-col desktop:order-1">
    <h1 class="margin-top-5 desktop:margin-top-0">{{ page.page_title }}</h1>
    <p>Medicare patients move through a landscape of separate health systems without a continuous record of their care.</p>
    <p>The Data at the Point of Care (DPC) pilot program puts patients at the center of this system, using a secure, standardized method to share health information across providers. </p>
  </div>
</div>

## Cultivating valuable data from Medicare claims

Provider claims submitted to Medicare contain valuable historical health information. In 2010, Centers for Medicare & Medicaid Services (CMS) created Blue Button as a way for beneficiaries to access their own health information. In 2019, CMS expanded this tool to create DPC, a new application programming interface (API) that extends this information to Medicare fee-for-service (FFS) providers. DPC:

- **Informs providers** of a new patient’s past medical history.
- **Removes the burden on patients** to remember every detail in these histories.
- **Updates providers** on new procedures, prescriptions, and other services offered to their patients by other providers between visits. 
- **Gives providers medication insights** including prescription changes and adherence.
- **Builds patient relationships** by freeing providers to spend more time talking to patients and less time on paperwork.
- **Tracks preventive services** such as flu and shingles vaccines.

## DPC is currently a pilot program

Right now a limited number of customers can access DPC data. CMS is not currently bringing new users into this pilot program. We’re finalizing a new authentication and onboarding portal with feedback from pilot participants now. We’ll announce general availability of production data when the portal launches. Meanwhile you can access realistic test data in the [DPC Sandbox](https://sandbox.dpc.cms.gov/users/sign_up).

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