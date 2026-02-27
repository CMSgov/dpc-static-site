---
layout: api-docs
page_title: "About Data at the Point of Care"
seo_title: ""
description: ""
show-side-nav: false
in-page-nav: true
---

<div class="grid-row grid-gap-4 flex-align-center">
  <div class="tablet:grid-col tablet:order-1" >
    <h1>{{ page.page_title }}</h1>
    <h2>Medicare beneficiaries: at the center of a complex healthcare ecosystem</h2>
  </div>
  <div class="tablet:grid-col-5 tablet:order-2 margin-y-2">
    [placeholder]
  </div>
</div>

Medicare patients move through a landscape of separate health systems without a continuous record of their care. The Data at the Point of Care (DPC) pilot program puts patients at the center of this system, using a secure, standardized method to share health information across providers. 

## Missing information: a burden on patients and providers

Siloed health systems put the burden on patients to remember and relate every test, treatment, diagnosis, and prescription. 

Providers are equally burdened with finding missing moments in their patients’ histories. Nurses, doctors, specialists, and other professionals lose valuable time trying to fill these gaps rather than simply consulting and treating the people in their care. 

## DPC: cultivating valuable data from Medicare claims

Provider claims submitted to Medicare contain valuable historical health information. In 2010, Centers for Medicare & Medicaid Services (CMS) created [Blue Button](https://bluebutton.cms.gov/) as a way for beneficiaries to access their own health information. In 2019, CMS expanded this tool to create DPC, a new application programming interface (API) that extends this information to Medicare fee-for-service (FFS) providers. DPC:

- **Informs providers** of a new patient’s past medical history.
- **Removes the burden on patients** to remember every detail in these histories.
- **Updates providers** on new procedures, prescriptions, and other services offered to their patients by other providers between visits.
- **Gives providers medication insights** including prescription changes and adherence.
- **Tracks preventive services** such as flu and shingles vaccines.

## DPC is currently a pilot program

Right now a limited number of customers can access Medicare Fee-For-Service claims data through the API. This pilot’s goal is to refine the API until it’s ready for general release and the availability of production data. 

You can request access to the [DPC Sandbox](https://sandbox.dpc.cms.gov/users/sign_up) at any time.

The pilot promotes the industry-standard HL7 Fast Healthcare Interoperability Resources (FHIR), specifically the Bulk FHIR specification. As a learning experience for CMS and customers, participants may see breaking changes to code and regulations and participate in research sessions.

CMS is not currently bringing new users into the pilot. 

We will update the community on our [announcements](/announcements.html) page when that changes. We’ll also be excited to announce general availability of DPC once the pilot is complete.

## Frequently asked questions

<div class="margin-y-2">

{% capture a1AccordionContent %}
<p>
  Any fee-for-service provider or Health IT vendor can request access to synthetic data through the <a href="https://sandbox.dpc.cms.gov/users/sign_up">DPC sandbox</a>.
</p>
{% endcapture %}

{% include accordion.html
    id="a1"
    expanded=false
    heading="How can I access the synthetic sandbox and begin testing workflows?"
    accordionContent=a1AccordionContent
%}

{% capture a2AccordionContent %}
<p>
  DPC isn’t taking requests for production credentials or onboarding new organizations right now. This is a temporary pause while we make improvements to our ID verification and onboarding process. We’ll post an <a href="/announcements.html">announcement</a> here and in our <a href="https://groups.google.com/g/dpc-api" target="_blank" rel="noopener noreferrer">Google Group</a> when onboarding and applications resume. Meanwhile the DPC sandbox is always fully available for testing. 
</p>
{% endcapture %}

{% include accordion.html
    id="a2"
    expanded=false
    heading="When will onboarding and new production requests start again?"
    accordionContent=a2AccordionContent
%}

{% capture a3AccordionContent %}
<p>
  Bulk claims APIs from Centers for Medicare & Medicaid Services (CMS) help healthcare organizations provide informed, coordinated, patient-focused care to Medicare beneficiaries. The bulk APIs offer patient insights to providers, private insurers, and other healthcare organizations through data found in Medicare Parts A and B claims. The data is shared in a standardized format through <a href="https://www.hl7.org/fhir/" target="_blank" rel="noopener noreferrer">Fast Healthcare Interoperability Resources</a> (FHIR) which make it easy to integrate with a variety of organization-specific systems.
</p>


<table>
  <thead>
    <th>API</th>
    <th>Built for</th>
    <th>Purpose</th>
  </thead>
  <tbody>
    <tr>
      <td>Beneficiary Claims Data API (BCDA)</td>
      <td>Providers who participate in CMS Alternative Payment Models</td>
      <td>Support health interventions across large patient populations; track systemwide performance, utilization, and shared cost savings</td>
    </tr>
    <tr>
      <td>Blue Button 2.0</td>
      <td>App developers</td>
      <td>Give beneficiaries access to their own data by enabling organizations to create beneficiary-focused apps and portals</td>
    </tr>
    <tr>
      <td>Claims Data to Part D Sponsors (AB2D)</td>
      <td>Private insurers</td>
      <td>Help Part D plan sponsors identify risk, fraud, and abuse and support personalized medication therapy management</td>
    </tr>
    <tr>
      <td>Data at the Point of Care (DPC)</td>
      <td>Healthcare providers</td>
      <td>Give clinicians a deeper understanding of every Medicare patient by filling gaps in beneficiaries’ health records</td>
    </tr>
  </tbody>
</table>
  
{% endcapture %}

{% include accordion.html
    id="a3"
    expanded=false
    heading="How is DPC different from other CMS bulk claims APIs?"
    accordionContent=a3AccordionContent
%}

{% capture a4AccordionContent %}
<p>We’d love to know:

<ul>
  <li>How CMS claims data impacts treatment, reduces burden on providers, and improves quality at the point of care</li>
  <li>Ease of implementation for vendors and providers to configure the API and request and receive claims data</li>
  <li>The practicality and effectiveness of attribution logic that determines which providers can request and receive claims data for which patients and for how long</li>
  <li>How easy and effective it is for vendors and providers to collaborate </li>
  <li>The frequency of use and an evaluation of performance in different cases to determine infrastructure decisions</li>
  <li>Other feedback, questions, or suggestions</li>
</ul>

</p>
{% endcapture %}

{% include accordion.html
    id="a4"
    expanded=false
    heading="What type of information does CMS want as feedback?"
    accordionContent=a4AccordionContent
%}

{% capture a5AccordionContent %}
<p>DPC is built on privacy requirements defined by HIPAA. It safeguards Protected Health Information (PHI) and Personally Identifiable Information (PII) with multiple layers of protection, such as encryption in transit and at rest, security certification requirements of connecting vendors, auditing and analytics to look for suspicious activity, terms of service restrictions, public and private security keys, and IP address restriction.</p>
{% endcapture %}

{% include accordion.html
    id="a5"
    expanded=false
    heading="How does CMS make sure the data is secure and protected?"
    accordionContent=a5AccordionContent
%}

{% capture a6AccordionContent %}
<p>DPC is a free CMS service. Organizations are responsible for setting up and maintaining their integration with DPC.</p>
{% endcapture %}

{% include accordion.html
    id="a6"
    expanded=false
    heading="Does it cost anything to use the API and get claims information?"
    accordionContent=a6AccordionContent
%}

</div>
