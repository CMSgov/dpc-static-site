---
layout: api-docs
page_title: "Support"
seo_title: ""
description: ""
show-side-nav: false
---

# {{ page.page_title }}

<div class="grid-row grid-gap-4 desktop:grid-gap-6 padding-y-4 flex-align-center">
  <div class="tablet:grid-col tablet:order-2">
    <img src="{{ '/assets/img/hero-heart.svg' | relative_url }}" alt="" />
  </div>
  <div class="tablet:grid-col tablet:order-1 padding-top-2">
    <h2>We're here to help</h2>
    <p> As CMS continues to gather feedback from users on the Data at the Point of Care (DPC) pilot, we will likely add more FAQs to this page. If you have a question that is not listed below, please reach out through the [DPC Google Group](https://groups.google.com/d/forum/dpc-api).
    </p>
    <a href="https://groups.google.com/g/dpc" target="_blank" rel="noopener noreferrer" class="usa-button margin-top-2">Join the Google Group</a>
  </div>
</div>


### About DPC

<div class="margin-y-2"></div>

{% capture a1AccordionContent %}
<p>
  We've paused on taking applications for production data and onboarding existing applicants. This is temporary while we make improvements to our ID verification and onboarding process. We'll refresh our [updates page](/updates) when onboarding and applications resume. We'll also post an announcement in our Google Group. In the meantime, the <a href="https://sandbox.dpc.cms.gov/users/sign_in">sandbox environment</a> is still available for testing.
</p>
{% endcapture %}

{% include accordion.html
    id="a1"
    expanded=true
    heading="When will onboarding and new applications start again?"
    accordionContent=a1AccordionContent
%}

{% capture a2AccordionContent %}
<p>
  <ul>
    <li>Technical documentation is available in the <a href="/docsV1">API Documentation</a>.</li>
    <li>A DPC Google Group has been created to provide answers to questions and to support providers and developers who are implementing Data at the Point of Care.</li>
  </ul></p>
{% endcapture %}

{% include accordion.html
    id="a2"
    expanded=false
    heading="How can I get more information?"
    accordionContent=a2AccordionContent
%}

{% capture a3AccordionContent %}
<p>
  <ul>
    <li>Blue Button 2.0 provides FHIR-formatted data for one individual Medicare beneficiary at a time, to registered applications with beneficiary authorization. See <a href="https://bluebutton.cms.gov/">https://bluebutton.cms.gov/</a>.</li>
    <li>BCDA provides FHIR-formatted bulk data files to Medicare Shared Savings Program Accountable Care Organizations (MSSP ACOs) for all of the beneficiaries assigned to a given ACO. See <a href="https://bcda.cms.gov/">https://bcda.cms.gov/</a>.</li>
    <li>Data at the Point of Care provides FHIR-formatted bulk data files to fee-for-service providers for their active patients as needed for treatment purposes under HIPAA. With DPC, providers identify their own rosters of patients to track, and no action is required from the beneficiary to authorize sharing of data. Data is shared between covered entities for treatment purposes as defined under HIPAA.</li>
  </ul>
</p>
{% endcapture %}

{% include accordion.html
    id="a3"
    expanded=false
    heading="How is the Data at the Point of Care pilot program different from Blue Button 2.0 and Beneficiary Claims Data API (BCDA)?"
    accordionContent=a3AccordionContent
%}


{% capture a4AccordionContent %}
<p>
  <ul>
    <li>Usefulness of the data to evaluate how helpful CMS claims data is for impacting treatment, provider burden, and quality of care for Fee-for-Service (FFS) providers at the point of care</li>
    <li>Ease of implementation for vendors and providers to evaluate how easy it is to configure and get started with requesting and receiving claims data</li>
    <li>Practicality and effectiveness of attribution logic that determines which providers can request and receive claims data for which patients and for how long</li>
    <li>Ease and effectiveness of ways that vendors and providers can collaborate to access the data</li>
    <li>Measure of the frequency of use and an evaluation of performance in different use cases to determine infrastructure decisions</li>
    <li>Any other feedback, additions, or changes</li>
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
<p>
  <ul>
    <li>Data at the Point of Care secures Protected Health Information (PHI) and Personally Identifiable Information (PII) and has multiple layers of protection, such as encryption in transit and at rest, security certification requirements of connecting vendors, auditing and analytics to look for suspicious activity, terms of service restrictions, public and private security keys, and IP address restriction.</li>
    <li>Data at the Point of Care is built based on privacy requirements defined by HIPAA.</li>
  </ul>
</p>
{% endcapture %}

{% include accordion.html
    id="a5"
    expanded=false
    heading="How will CMS make sure that the data is secure and protected?"
    accordionContent=a5AccordionContent
%}

{% capture a6AccordionContent %}
<p>There is no cost for the data.</p>
{% endcapture %}

{% include accordion.html
    id="a6"
    expanded=false
    heading="Is there a cost to get the claims information in the Data at the Point of Care pilot?"
    accordionContent=a6AccordionContent
%}

### About the Sandbox 

<div class="margin-y-2"></div>

{% capture a7AccordionContent %}
<p>
  <ul>
    <li>Fee-for-Service (FFS) providers who treat Medicare patients</li>
    <li>Providers who already receive claims from other payers and who have successfully integrated the information into existing clinical workflows</li>
    <li>Providers who have experience using Blue Button 2.0 or the Beneficiary Claims Data API project</li>
    <li>Providers who already use or test with FHIR, especially Bulk FHIR</li>
  </ul>
</p>
{% endcapture %}

{% include accordion.html
    id="a7"
    expanded=false
    heading="What types of providers is CMS looking for to join the synthetic sandbox?"
    accordionContent=a7AccordionContent
%}

{% capture a8AccordionContent %}
<p>
  <ul>
    <li>Any Fee-for-Service provider or Health IT vendor can request access to synthetic data via <a href="{{ site.sbx_register }}">our sandbox</a></li>
  </ul>
</p>
{% endcapture %}

{% include accordion.html
    id="a8"
    expanded=false
    heading="How can I access the synthetic sandbox and begin testing workflows?"
    accordionContent=a8AccordionContent
%}