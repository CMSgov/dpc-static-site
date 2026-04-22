---
layout: api-docs
page_title: "Get Sandbox Credentials"
seo_title: ""
description: ""
in-page-nav: true
---

# {{ page.page_title }}

## 1. Request access to the DPC Sandbox

You’ll enter info about you and your organization and create a password. Then you’ll receive an email with a confirmation link. It may take a few minutes to receive this email.

<a href="https://sandbox.dpc.cms.gov/users/sign_in"
  class="usa-button usa-button--accent-warm margin-top-1"
  type="button">
  Visit the Sandbox {% include sprite.html icon="launch" size="2" %}
</a>

## 2. Generate a client token in the Sandbox site

Client tokens are issued to your organization and authenticate your access to the API.

<ol>
   <li>Log into the DPC Sandbox.</li>
   <li>Select <b>New Token</b>.</li>
   <li>Label the token with a recognizable name. Then select <b>Create token</b>.</li>
   <li>Copy or download the token displayed on screen.
      {% include alert.html variant="warning" text="This is the only time this client token will be visible. You’ll want to save it for later use." slim="true" classNames="measure-6" %}
      <ul>
         <li>Make sure to <a href="{{ '/api-documentation/get-access-token/manage-credentials#renew-expired-tokens' | relative_url }}">renew your token</a> every year.</li>
         <li>When using production data, you’ll need to create a token for every organization that works with the API.</li>
      </ul>
   </li>
   <li>Choose <b>Back to portal</b> to create your public and private keys.</li>
</ol>

## 3. Create a public key

{% include alert.html variant="info" text="You’ll need your public key ID to get an access token." slim="true" classNames="measure-6" %}

### Why we require a public key

Public keys verify that access token requests come from an authorized application. They ensure the private key used to sign your [JSON Web Token]({{ '/api-documentation/get-access-token#1-generate-a-json-web-token' | relative_url }}) (JWT) matches a public key previously uploaded to DPC. 

{% include alert.html variant="warning" text="Store the files you’ll create in the following steps in one folder. These include a private.pem, public.pem, snippet.txt, snippet.txt.sig, and signature.sig file." slim="true" classNames="measure-6" %}

### Steps to creating a public key

1. Select “Add key” from the DPC Sandbox
2. Follow the sequential steps on screen to:
   1. Generate a **private** key
   1. Generate a **public** key
   1. Create (and verify) a public key snippet
   1. Generate a verified public key signature 


#### 1. Generate a private key

Select **copy** on the DPC Sandbox site or copy the command invocation here:

{% capture snippet %}openssl genrsa -out private.pem 4096{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

#### 2. Generate a public key

Select **copy** on the DPC Sandbox site or copy the command invocation here:

{% capture snippet %}openssl rsa -in private.pem -outform PEM -pubout -out public.pem{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

#### 3a. Download the snippet.txt file

{% capture snippet %}curl -JLO https://raw.githubusercontent.com/CMSgov/dpc-app/main/dpc-web/public/snippet.txt{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

#### 3b. Create your public key snippet

{% capture snippet %}openssl dgst -sign private.pem -sha256 -out snippet.txt.sig snippet.txt{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

#### 4. Generate a verified public key signature  

Select **copy** on the DPC Sandbox site or copy the command invocation below.

{% capture snippet %}openssl base64 -in snippet.txt.sig -out signature.sig{% endcapture %}
{% include copy_snippet.html code=snippet language="shell" can_copy=true %}

## 4. Upload your public key in the DPC Sandbox site

1. Go to the **Upload Your Public Key** section on the **How to Generate a Public Key** page.
2. Create a label for your public key. Make the label easy to recognize.
3. Paste the `public.pem` file you created in step 2 into the “Public Key” field.
4. Include “BEGIN PUBLIC KEY” and “END PUBLIC KEY” before and after your key.  
5. Paste the contents of the `signature.sig` file you created in step 4 into the “Signature Snippet” field.
6. Select **Add key**.

## What's Next?

[Get an access token](/api-documentation/get-access-token)
