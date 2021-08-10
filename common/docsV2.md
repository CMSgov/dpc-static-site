---
layout: page-sidenav
title: DPC Documentation
banner_title: Documentation
permalink: /docsV2
id: docsV2
button: Sign Up for Sandbox
button_url: {{ site.sbx_sign_in }}
side_nav: true
---
## Welcome to the Data at the Point of Care pilot API program!

<div class="ds-c-alert ds-c-alert--warn">
  <div class="ds-c-alert__body">
    <p class="ds-c-alert__text">
<p><b>The DPC API is operating in Version 2 (v2) in the sandbox environment only as of August 12, 2021 and is consistent with HL7’s FHIR R4.</b>
</p>
<p>
To support industry alignment, V2 also conforms with the <a href="http://hl7.org/fhir/us/carin-bb/history.html" target="_blank">CARIN Alliance Blue Button® Framework and Common Payer Consumer Data Set (CPCDS) IG</a> and will be deployed to the production environment following an evaluation period in the sandbox environment to identify any necessary changes.
</p>
<p>
In the meantime, the production and sandbox environments <strong>continue to operate in</strong> DPC Version 1 (v1). If you are already working in DPC v1, you may still access the previous <a href="/docsV1" target="_blank">Documentation for DPC v1</a> and <a href="https://sandbox.dpc.cms.gov/users/sign_in" target="_blank">DPC v1 sandbox environment</a> and continue operation as usual.
</p>
However, please note that all new features will only be deployed and maintained in the DPC v2 sandbox environment. Additionally, in order to join the <a href="https://airtable.com/shr3m3BL3IWY5hYnm" target="_blank">DPC Production Pilot Queue</a>, new pilot partners will be expected to upgrade their sandbox solutions to DPC v2 standards and demonstrate compliance with the DPC v2 <a href="/terms-of-service" target="_blank">Terms of Service</a> to be approved for production access. 
    </p>
  </div>
</div>


This documentation covers use of the DPC API in sandbox using synthetic data. Once you’ve tested your implementation in sandbox, you can sign up to join the <a href="https://airtable.com/shr3m3BL3IWY5hYnm" target="_blank">DPC Production Pilot Queue</a>.

# Getting DPC Access

## Step One: Get Access to the DPC API


**The DPC v2 Sandbox Portal is designed for Health IT teams only.**

<p>
If you are a Health IT implementer interested in testing the DPC API in sandbox, please <a href="https://sandbox.dpc.cms.gov/users/sign_in" target="_blank">sign up for an account</a> or reach out to your project lead for an invite to join your team in the DPC sandbox environment if an account has already been created. You will need to be invited to an existing account to work with and test the same implementation as your team. 
</p>
<p>
At this time, you may either log in to the Sandbox Portal via the link provided in your confirmation email or check your email for an invite to create an account password and begin your journey with the Data at the Point of Care pilot API!
</p>


## Step Two: Add a Provider Organization


**Your account must be registered in the DPC Sandbox Portal to add a provider organization.**


In DPC v2, Health IT teams can manage credentials for multiple provider organizations at once from within the DPC Sandbox Portal. In the production environment, Health IT teams will need to provide Provider NPIs for all healthcare customers onboarding DPC; however, for the purpose of keeping out all sensitive PHI/PII information from the Sandbox Portal, DPC will auto-generate fake provider organizations for you in the sandbox environment. You may add as many provider organizations as needed in sandbox for testing purposes.

1. Select the blue “Add New Provider Org” button in the Sandbox Portal home page.

2. Click the "Add Provider Organization" button again to generate a new organization.

    a. A fake Provider NPI will be automatically generated for you in sandbox. This cannot be changed or altered.

3. You will be redirected to the Sandbox Portal home page, where your new organization will be listed under the *Provider Organizations* section.


## Step Three: Generate Public Keys

**You account must be registered in the DPC Sandbox Portal and a provider organization must be added in order to upload a public key.**

Public keys verify that client token requests are coming from an authorized application. This is accomplished by verifying that the private key used to sign your JSON Web Token (JWT) in the following step also matches a public key previously uploaded to DPC. 


1. Select the new organization that was added in the previous step.

2. Follow instructions provided in the yellow dropdown under How to Generate a Public Key and Signature to create them on your personal machine. 

3. Copy and paste your Public Key and Public Key Signature in the DPC Sandbox Portal.

4. Click the blue "Add Key" button.

5. You will be redirected to the Provider Organization's home page, where your public key will be listed under the Public Keys section.

After successfully accessing the API, you may view, add, or delete public keys for the sandbox environment using the Sandbox Portal.


## Step Four: Generate Client Tokens

<div class="ds-c-alert ds-c-alert--warn">
  <div class="ds-c-alert__body">
    <p class="ds-c-alert__text">
<strong> You must use unique tokens for each provider organization being served.</strong> For example, if your team is serving five practitioner organizations, you must have five different tokens and use the specific token assigned to the practitioner organization for which you are making the request. This endpoint is token-specific.
<p>
</p>
You may also create multiple client tokens for a given provider organization for the purposes of token rotation, or if you have multiple systems.
    </p>
  </div>
</div>


Client tokens help monitor API access through your account. A client token is required to create the access token, which is mandatory with every export request made to the API. This ensures every interaction with the API can be traced back to the creator of the client token. Your first client token must be created through the Sandbox Portal.

1. Select the provider organization for which you want to create a client token.

2. Click the blue "Add New Token" button at the top of the *Client Tokens* section.

3. Add a Label: You may title your token with a recognizable name that includes the environment for which you are requesting access.

4. Click “Create Token” to generate your client token.

5. Copy and save your DPC-generated client token.

6. You will be redirected to the Provider Organization's home page, where your client token will be listed under the *Client Tokens* section.

After successfully accessing the API, you may view, add, or delete client tokens for the sandbox environment using the Sandbox Portal.



## Step Five: Generate a JSON Web Token (JWT)

**You must have the following to create a JWT:**
* **A registered client token**
* **Your private key**
* **Your public key**
* **Internet access**

A JSON Web Token (JWT) authenticates your organization with DPC. Your client token and public/private key pair must already be generated through the DPC Portal before proceeding.

Next, please download the DPC JWT Tool using the button below to generate your JWT for DPC.

<div class="download_btn--container">
  <a href="{{ site.url }}/assets/downloads/jwt.html" class="ds-u-padding-x--3 ds-u-padding-y--1 ds-c-button--primary ds-u-font-weight--bold download_btn" download>
    JWT Tool Download
  </a>
</div>

**The following instructions are to be completed via the JWT Tool downloaded onto your personal computer.** You must have internet access in order for this tool to use its cryptography library. To ensure your private key and JWT remain confidential, information will not be sent over the network.

1. Input your Private Key.

2. Input your Client Token.

3. Input your Public Key ID

4. Click “Generate JWT”


## Step Six: Generate the Access/Bearer Token

**You must have a valid JWT to obtain an access_token.**

Obtaining an access/bearer token are the final steps in connecting to the DPC API. The access token must be set in the Authorization header in every API request and has a maximum expiration time of 5 minutes.


### Obtain an access_token
In order to receive an access token, the valid JWT must be submitted to the /Token/auth endpoint via a POST request. The POST request body is encoded as application/x-www-form-urlencoded.

1. Set the JWT as the client_assertion form parameter.

2. Add the remaining fields below:
<table cellspacing="0" class="guide__table">
  <tr>
    <th cellspacing="0">Parameters</th>
    <th cellspacing="0">Parameter Values</th>
    <th cellspacing="0">Fixed/Dynamic</th>
    <th cellspacing="0" style="width: 33%">Notes</th>
  </tr>
  <tr>
    <td cellspacing="0">"scope":</td>
    <td cellspacing="0">"system/*.*"</td>
    <td cellspacing="0">Fixed</td>
    <td cellspacing="0">The requested scope MUST be equal to or less than a the scope originally granted to the authorized accessor.</td>
  </tr>
  <tr>
    <td cellspacing="0">"grant_type":</td>
    <td cellspacing="0">"client_credentials"</td>
    <td cellspacing="0">Dynamic</td>
    <td cellspacing="0">The format of the assertion as defined by the authorization server.</td>
  </tr>
  <tr>
    <td cellspacing="0">"client_assertion_type":</td>
    <td cellspacing="0">"urn:ietf:params:oauth:client-assertion-type:jwt-bearer"</td>
    <td cellspacing="0">Fixed</td>
    <td cellspacing="0">The format of the assertion as defined by the authorization server.</td>
  </tr>
  <tr>
    <td cellspacing="0">"client_assertion":</td>
    <td cellspacing="0">"<span style="color: #045E87;">{Signed authentication JWT value}</span>"</td>
    <td cellspacing="0">Dynamic</td>
    <td cellspacing="0">The assertion being used to authenticate the client.</td>
  </tr>
</table>

The endpoint response will be a JSON object, which contains:

* Your access_token

* The lifetime of your token (in seconds)

* Authorized system scopes

**Request**
~~~
POST /api/v2/Token/auth
~~~

**cURL command:**
~~~
curl -v "https://sandbox.dpc.cms.gov/api/v1/Token/auth" \
     -H 'Content-Type: application/x-www-form-urlencoded' \
     -H 'Accept: application/json' \
     -X POST
     -d "grant_type=client_credentials&scope=system%2F*.*&client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&client_assertion={self-signed JWT}"
~~~

**Response**
~~~
{

 "access_token": "{access_token value}",

 "token_type": "bearer",

 "expires_in": 300,

 "scope": "system/*.*"

}
~~~

<div class="ds-c-alert ds-c-alert--warn">
  <div class="ds-c-alert__body">
    <p class="ds-c-alert__text">
Your access token and JWT will expire every five minutes.
    </p>
  </div>
</div>


You can create multiple access tokens with the same valid JWT. However, once your access token expires, you will likely need to generate a new JWT to refresh your access token.

### Obtain a bearer_token
To use the API, use the access_token returned in the previous step as the bearer token in an Authorization header. You will need to set the “{access_token value}” from the previous response as a header in most of your API calls preceded by the word Bearer and a space.

As access tokens expire, you will need to generate new tokens.


# Getting DPC Data

**The DPC sandbox environment does not contain any preloaded test data.**

Therefore, the DPC team has created a collection of <a href="https://github.com/CMSgov/dpc-app/tree/master/dpc-go/sample_data/groups" target="_blank">sample Group resources</a> that you can upload to get started in the sandbox environment.


## Step One: Find Organization ID

You will need the Organization ID with every API request. The Organization endpoint supports a GET /Organization operation, which allows users to retrieve the Organization ID of the practitioner organization being managed. You can also find the Organization ID by signing-in to the DPC Portal and locating the “Org ID” listed under each organization name.


## Step Two: Create a Group

You must create a new Group for every export request by posting a list of patients, the associated practitioner for each patient, and an Attestation using the <a href="https://sandbox.dpc.cms.gov/ig/StructureDefinition-dpc-profile-attestation.html" target="_blank">X-Provenance header</a>. A unique Group ID will be automatically generated each time.

**To create a Group, you will need:**
* **Organization ID**
* **Patient MBI**
* **Practitioner NPI**


**Request**
~~~
POST /api/v2/Group
~~~

**cURL command**
~~~
curl -v https://sandbox.dpc.cms.gov/api/v2/Group
     -H 'Authorization: Bearer {access_token}' \
     -H 'Accept: application/fhir+json' \
     -H 'Content-Type: application/fhir+json' \
     -H 'X-Provenance: {FHIR Provenance resource} \
     -X POST \
     -d @group.json
~~~

**Response**
~~~
{
    "actual": true,
    "id": "719cf174-ec46-4122-90c9-0f5244a5a3bd",
    "managingEntity": {
        "reference": "Organization/52bbad3d-c765-4c58-a900-4559f2f09efa"
    },
    "member": [
        {
            "entity": {
                "identifier": {
                    "system": "http://hl7.org/fhir/sid/us-mbi",
                    "value": "2SW4N00AA00"
                },
                "type": "Patient"
            },
            "extension": [
                {
                    "url": "http://hl7.org/fhir/us/davinci-atr/StructureDefinition/ext-attributedProvider",
                    "valueReference": {
                        "identifier": {
                            "system": "http://hl7.org/fhir/sid/us-npi",
                            "value": "9941339108"
                        },
                        "type": "Practitioner"
                    }
                }
            ]
        }
    ],
    "meta": {
        "id": "Group/719cf174-ec46-4122-90c9-0f5244a5a3bd",
        "lastUpdated": "2021-08-05T14:31:04.441+00:00",
        "versionId": "0"
    },
    "name": "Sample Group",
    "resourceType": "Group",
    "type": "person"
}
~~~

## Step Three: Add Attestation

As part of creating a Group, CMS requires an attestation stating data exports are for treatment related purposes only. Attestations are posted as a Provenance Resource via the X-Provenance header, as outlined in the <a href="https://www.hl7.org/fhir/implementationguide.html" target="_blank">FHIR implementation guide</a>, with every export request.

At a minimum, each attestation must include:

* Timestamp: Time when attestation was made.
    * Example:  "recorded": "2021-07-22T10:04:45.008Z"
* Reason: Reason for the attestation (currently only: http://hl7.org/fhir/v3/ActReason#TREAT is supported).
* Organization ID: The agent making the attestation referenced by their Organization Resource ID.
* Your Organization ID

Please reference the <a href="https://build.fhir.org/ig/HL7/davinci-atr/Group-fullexample.html" target="_blank">Da Vinci Group Member Attribution List</a> for more information surrounding structure and the following code example for the DPC specifics for this standard.

The attestation is then set as the value of the X-Provenance header to the Group resource.

**Example of an Attestation:**
~~~
{
	"resourceType": "Provenance",
	"recorded": "2020-01-02T15:04:05-07:00",
	"reason": [{
		"coding": [{
			"system": "http://hl7.org/fhir/v3/ActReason",
			"code": "TREAT"
		}]
	}],
	"agent": [{
		"role": [{
			"coding": [{
				"system": "http://hl7.org/fhir/v3/RoleClass",
				"code": "AGNT"
			}]
		}],
		"who": {
			"reference": "Organization/c5a40867-011a-43f9-996e-aa92207fbbe2"
		}
	}]
}
~~~



<a class="guide_top_link" href="#attestation--attribution">Back to Start of Section</a><br />
<a class="guide_top_link" href="#">Back to Top of Page</a>

# Exporting DPC Data
------------
The primary interaction with the DPC pilot API is via the FHIR /Group/$export operation.This allows an organization to export Patient. Coverage, and Explanation of Benefit data in an asynchronous and bulk manner. Details on the FHIR bulk data operations can be found in the [FHIR Bulk Data Specification](https://build.fhir.org/ig/HL7/bulk-data/OperationDefinition-group-export.html).

**Prerequisites:**
- Completion of the Authorization section
- Access to the API: active Bearer <span style="color: #045E87;">{access_token}</span>
- Completion of the Attestation & Attribution section

## Initiate an export job
In order to start a Patient data export job, you will need to locate your Group.id. Locate your Group.id by referencing the {id} variable in the resource object of your Group.

**Example:**

~~~
"resource": {
  "resourceType": "Group",
  "id": "64d0cd85-7767-425a-a3b8-dcc9bdfd5402"
}
~~~

Next, make a GET request to the /Group/$export endpoint with three required headers: an access token, an Accept header, and a Prefer header.

The dollar sign (‘$’) before the word “export” in the URL indicates that the endpoint is an action rather than a resource. The format is defined by the [FHIR Bulk Data Specification](https://build.fhir.org/ig/HL7/bulk-data/OperationDefinition-group-export.html).

### Request:

<pre class="highlight"><code>GET /api/v2/Group/<span style="color: #045E87;">{attribution group ID}</span>/$export</code></pre>

### cURL command:

<pre class="highlight"><code>curl -v https://sandbox.DPC.cms.gov/api/v2/Group/<span style="color: #045E87;">{attribution Group.id}</span>/\$export \
     -H 'Authorization: Bearer <span style="color: #045E87;">{access_token}</span>' \
     -H 'Accept: application/fhir+json' \
     -H 'Prefer: respond-async'</code></pre>

### Response:
If the request was successful, a 202 Accepted response code will be returned with a Content-Location header. The value of this header indicates the location to monitor your job status and outcomes. The value of the header also contains the Export Job ID of the Job. There is no BODY to the Response, only headers.

**Example:**
<pre class="highlight"><code>Content-Location: https://sandbox.dpc.cms.gov/api/v2/Jobs/<span style="color: #045E87;">{unique ID of export job}</span></code></pre>

## Specify which Resources to Download
The _type query parameter allows you to specify which FHIR resources you wish to export. If you do not specify a _type parameter in your request, all three resources will be exported. Currently, DPC makes Explanation of Benefit, Patient, and Coverage resources available, which can be specified individually or as a group using a comma delimited list and the syntax `?_type=ExplanationOfBenefit,Patient,Coverage`. 

The following request will export the Patient and Coverage esources, but NOT the Explanation of Benefit Resource.

### Request:
<pre class="highlight"><code>GET /api/v2/Group/<span style="color: #045E87;">{attribution group ID}</span>/$export?_type=Patient,Coverage</code></pre>

The following request, by contrast, will export the Explanation of Benefit resource, but NOT the Patient or Coverage resources.

### Request:
<pre class="highlight"><code>GET /api/v2/Group/<span style="color: #045E87;">{attribution group ID}</span>/$export?_type=ExplanationOfBenefit</code></pre>

## Request Filtered Data

You may want to obtain filtered data for all of your beneficiaries in order to reduce file size and download time. 

You can filter data using the _since parameter with the /Group endpoint. You may want to set  _since queries as a repeating call or as a way to check for patient updates to avoid downloading duplicate data. 

<div class="ds-c-alert ds-c-alert--warn">
  <div class="ds-c-alert__body"> 
    <h3 class="ds-c-alert__heading">Before using _since, download all of your data.</h3>
    <p class="ds-c-alert__text">
      Before using _since for the first time, we recommend that you run an unfiltered request (without using _since) to all resource types using the  /Group/{id}/$export endpoint in order to retrieve all historical data for your associated beneficiaries. You only need to do this once. <br /><br />
      On subsequent calls you can begin retrieving incremental claims data for your beneficiaries using _since. We suggest using the transactionTime from your last bulk data request as the _since date.
    </p>
  </div>
</div>

*Are you using _since with Patient and Coverage records, and not getting results for all your patients?  With the _since parameter, you will only get Patient or Coverage records that have changed.*

**You can make one type of filtered request for data at this time:**
1. Request the most recent data for all beneficiaries: [Use _since within the /Group endpoint](#requesting-data-using-_since-with-the-group-endpoint)


### Steps

The request will follow the following four-step process as an unfiltered request:

1. Obtain an access token
2. Start a job to acquire data (you will input the _since parameter here)
3. Check the job status
4. Download the data


**Dates and times submitted in _since must be listed in the FHIR [Instant](https://www.hl7.org/fhir/datatypes.html#instant) format** (YYYY-MM-DDThh:mm:sss[-/+]zz:zz).

* Sample Date: February 20, 2020 12:00 PM EST
* Instant Format: YYYY-MM-DDThh:mm:sss[-/+]zz:zz
* Formatted Sample: 2020-02-20T12:00:00.000-05:00

<div class="ds-c-alert ds-c-alert--warn">
  <div class="ds-c-alert__body"> 
    <h3 class="ds-c-alert__heading">The value of the _since parameter must be URL encoded.</h3>
    <p class="ds-c-alert__text">
      When using the <a href="https://dpc.cms.gov/docsV1#postman-collection" target="_blank">Postman Collection</a>, you will need to manually encode the <strong>_since</strong> parameter when it contains a <strong>+</strong> sign since Postman does not automatically encode this character. 
      <br /><br />
      You can do this either by replacing the + with <strong>%2B</strong> (e.g., 2020-01-23T04:00:00.000%2B07:00 instead of 2020-01-23T04:00:00.000+07:00), or you can select the value and choose “EncodeURIComponent” from the context menu to have Postman encode the entire parameter automatically.
    </p>
  </div>
</div>

![alt](/assets/images/since-example.png)

An access token as well as Accept and Prefer headers are required for the Group/{id}/$export. The format is defined by the FHIR Bulk Data Export spec. Consult the [FHIR Datatypes](https://www.hl7.org/fhir/datatypes.html#instant) page for more information.

<div class="ds-c-alert ds-c-alert--warn">
  <div class="ds-c-alert__body"> 
    <h3 class="ds-c-alert__heading">Be wary of requesting data from before 02-12-2020</h3>
    <p class="ds-c-alert__text">
      Due to limitations in the Beneficiary FHIR Data (BFD) Server, data from before 02-12-2020 is marked with the arbitrary <a href="https://www.hl7.org/fhir/search.html#lastUpdated">lastUpdated</a> date of 01-01-2020. If you input dates between 01-01-2020 and 02-11-2020 in the _since parameter, you will receive all historical data for your beneficiaries. Data loads from 02-12-2020 onwards have been marked with accurate dates.
    </p>
  </div>
</div>

### Requesting data using _since with the /Group endpoint

**Start a job using the _since parameter within the /Group endpoint**

<pre class="highlight"><code>GET /api/v2/Group/<span style="color: #045E87;">{id}</span>/$export?_type=Patient&_since=2020-02-13T08:00:00.000-05:00
</code></pre>

**Request Headers:**
<pre class="highlight"><code>Authorization: Bearer <span style="color: #045E87;">{access_token}</span>
Accept: application/fhir+json
Prefer: respond-async
</code></pre>

**cURL Command using the _since parameter within the /Group endpoint:**
<pre class="highlight"><code>curl -X GET 'https://sandbox.dpc.cms.gov/api/v2/Group/{id}/$export?_since=2021-05-13T08:00:00.000-05:00' \
	-H "Accept: application/fhir+json" \
	-H "Prefer: respond-async" \
	-H "Authorization: Bearer <a href="#obtain-an-access-token">{access token}</a>
</code></pre>

**Response Example: Successful Request**
  <pre class="highlight"><code>202 Accepted</code></pre>

This operation will start a job for filtered data for existing beneficiaries since 8PM EST on May 13th, 2021 and will include all 7 years of historical data for all patients in the Group who have a `lastUpdated` date that falls after the `_since` date. In the example, we request the Patient resource type. The steps and format would work similarly for other resource types.
<br />

If the request was successful, a 202 Accepted response code will be returned and the response will include a Content-Location header.
<br />


## Check status of the export job
You can check the status of your job using the {unique ID of the export job}. This is retrieved from the Content-Location header of the response as shown in the previous section. The status of the job will change from 202 Accepted to 200 OK when the export job is complete and the data is ready to be downloaded.

**Request:**
<pre class="highlight"><code>GET https://sandbox.dpc.cms.gov/api/v2/Jobs/<span style="color: #045E87;">{unique ID of export job}</span></code></pre>

**cURL command:**
<pre class="highlight"><code>curl -v https://sandbox.dpc.cms.gov/api/v2/Jobs/<span style="color: #045E87;">{unique ID of export job}</span> \
     -H 'Authorization: Bearer <span style="color: #045E87;">{access_token}</span>'</code></pre>

**Response:**
If the request was successful, the status of the job will change from 202 Accepted to 200 OK when the export job is complete and the data is ready to be downloaded.

**Example of a Bulk Export Job:**

~~~
{
 "transactionTime": "2018-10-19T14:47:33.975024Z",
 "request": "https://sandbox.dpc.cms.gov/api/v2/Group/64d0cd85-7767-425a-a3b8-dcc9bdfd5402/$export",
 "requiresAccessToken": true,
 "output": [
   {
     "type": "ExplanationOfBenefit",
     "url": "https://sandbox.dpc.cms.gov/api/v2/data/42/DBBD1CE1-AE24-435C-807D-ED45953077D3.ndjson",
     "extension": [
       {
         "url": "https://dpc.cms.gov/checksum",
         "valueString": "sha256:8b74ba377554fa73de2a2da52cab9e1d160550247053e4d6aba1968624c67b10"
       },
       {
         "url": "https://dpc.cms.gov/file_length",
         "valueDecimal": 2468
       }
     ]
   }
 ],
 "error": [
   {
     "type": "OperationOutcome",
     "url": "https://sandbox.dpc.cms.gov/api/v2/data/42/DBBD1CE1-AE24-435C-807D-ED45953077D3-error.ndjson"
   }
 ]
}
~~~

Claims data can be found at the URLs within the output field.

The output includes file integrity information in an extension array. It contains https://dpc.cms.gov/checksum (a checksum in the format algorithm:checksum) and https://dpc.cms.gov/file_length (the file length in bytes).

The number 42 in the example data file URLs is the same job ID from the Content-Location header URL when you initiate an export job. If some of the data cannot be exported due to errors, details of the errors can be found at the URLs in the error field. The errors are provided in [NDJSON](http://ndjson.org/) files as FHIR [OperationOutcome](http://hl7.org/fhir/STU3/operationoutcome.html) resources.



## Retrieve the NDJSON output file(s)
To obtain the exported explanation of benefit data, a GET request is made to the output URLs in the job status response when the job reaches the Completed state. The data will be presented as an [NDJSON](http://ndjson.org/) file of ExplanationOfBenefit resources.

<div class="ds-c-alert ds-c-alert--warn">
  <div class="ds-c-alert__body">
    <p class="ds-c-alert__text">
      The Data endpoint is not a FHIR resource and doesn’t require the Accept header to be set to application/fhir+json.
    </p>
  </div>
</div>

**Request:**

<pre class="highlight"><code>GET https://sandbox.dpc.cms.gov/api/v2/data/<span style="color: #045E87;">{job_id}</span>/<span style="color: #045E87;">{file_name}</span></code></pre>

**cURL command**

<pre class="highlight"><code>curl https://sandbox.dpc.cms.gov/api/v2/data/<span style="color: #045E87;">{job_id}</span>/<span style="color: #045E87;">{file_name}</span> \
     -H 'Authorization: Bearer <span style="color: #045E87;">{access_token}</span>'</code></pre>

**Response: Explanation of Benefit Resource (example)**

~~~
{
 "status":"active",
 "diagnosis":[
   {
    "diagnosisCodeableConcept":{
       "coding":[
         {
           "system":"http://hl7.org/fhir/sid/icd-9-cm",
           "code":"2113"
         }
       ]
     },
     "sequence":1,
     "type":[
       {
         "coding":[
           {
             "system":"https://bluebutton.cms.gov/resources/codesystem/diagnosis-type",
             "code":"principal",
             "display":"The single medical diagnosis that is most relevant to the patient's chief complaint or need for treatment."
           }
         ]
       }
     ]
   }
 ],
 "id":"carrier-10300336722",
 "payment":{
   "amount":{
     "system":"urn:iso:std:iso:4217",
     "code":"USD",
     "value":250.0
   }
 },
 "resourceType":"ExplanationOfBenefit",
 "billablePeriod":{
   "start":"2000-10-01",
   "end":"2000-10-01"
 },
 "extension":[
   {
     "valueMoney":{
       "system":"urn:iso:std:iso:4217",
       "code":"USD",
       "value":0.0
     },
     "url":"https://bluebutton.cms.gov/resources/variables/prpayamt"
   },
   {
     "valueIdentifier":{
       "system":"https://bluebutton.cms.gov/resources/variables/carr_num",
       "value":"99999"
     },
     "url":"https://bluebutton.cms.gov/resources/variables/carr_num"
   },
   {
     "valueCoding":{
       "system":"https://bluebutton.cms.gov/resources/variables/carr_clm_pmt_dnl_cd",
       "code":"1",
       "display":"Physician/supplier"
     },
     "url":"https://bluebutton.cms.gov/resources/variables/carr_clm_pmt_dnl_cd"
   }
 ],
 "type":{
   "coding":[
     {
       "system":"https://bluebutton.cms.gov/resources/variables/nch_clm_type_cd",
       "code":"71",
       "display":"Local carrier non-durable medical equipment, prosthetics, orthotics, and supplies (DMEPOS) claim"
     },
     {
       "system":"https://bluebutton.cms.gov/resources/codesystem/eob-type",
       "code":"CARRIER"
     },
     {
       "system":"http://hl7.org/fhir/ex-claimtype",
       "code":"professional",
       "display":"Professional"
     },
     {
       "system":"https://bluebutton.cms.gov/resources/variables/nch_near_line_rec_ident_cd",
       "code":"O",
       "display":"Part B physician/supplier claim record (processed by local carriers; can include DMEPOS services)"
     }
   ]
 },
 "patient":{
   "reference":"Patient/20000000000001"
 },
 "identifier":[
   {
     "system":"https://bluebutton.cms.gov/resources/variables/clm_id",
     "value":"10300336722"
   },
   {
     "system":"https://bluebutton.cms.gov/resources/identifier/claim-group",
     "value":"44077735787"
   }
 ],
 "insurance":{
   "coverage":{
     "reference":"Coverage/part-b-20000000000001"
   }
 },
 "item":[
   {
     "locationCodeableConcept":{
       "extension":[
         {
           "valueCoding":{
             "system":"https://bluebutton.cms.gov/resources/variables/prvdr_state_cd",
             "code":"99",
             "display":"With 000 county code is American Samoa; otherwise unknown"
           },
           "url":"https://bluebutton.cms.gov/resources/variables/prvdr_state_cd"
         },
         {
           "valueCoding":{
             "system":"https://bluebutton.cms.gov/resources/variables/prvdr_zip",
             "code":"999999999"
           },
           "url":"https://bluebutton.cms.gov/resources/variables/prvdr_zip"
         },
         {
           "valueCoding":{
             "system":"https://bluebutton.cms.gov/resources/variables/carr_line_prcng_lclty_cd",
             "code":"99"
           },
           "url":"https://bluebutton.cms.gov/resources/variables/carr_line_prcng_lclty_cd"
         }
       ],
       "coding":[
         {
           "system":"https://bluebutton.cms.gov/resources/variables/line_place_of_srvc_cd",
           "code":"99",
           "display":"Other Place of Service. Other place of service not identified above."
         }
       ]
     },
     "service":{
       "coding":[
         {
           "system":"https://bluebutton.cms.gov/resources/codesystem/hcpcs",
           "code":"45384",
           "version":"0"
         }
       ]
     },
     "extension":[
       {
         "valueCoding":{
           "system":"https://bluebutton.cms.gov/resources/variables/carr_line_mtus_cd",
           "code":"3",
           "display":"Services"
         },
         "url":"https://bluebutton.cms.gov/resources/variables/carr_line_mtus_cd"
       },
       {
         "valueQuantity":{
           "value":1
         },
         "url":"https://bluebutton.cms.gov/resources/variables/carr_line_mtus_cnt"
       }
     ],
     "servicedPeriod":{
       "start":"2000-10-01",
       "end":"2000-10-01"
     },
     "quantity":{
       "value":1
     },
     "category":{
       "coding":[
         {
           "system":"https://bluebutton.cms.gov/resources/variables/line_cms_type_srvc_cd",
           "code":"2",
           "display":"Surgery"
         }
       ]
     },
     "sequence":1,
     "diagnosisLinkId":[
       2
     ],
     "adjudication":[
       {
         "category":{
           "coding":[
             {
               "system": "https://bluebutton.cms.gov/resources/codesystem/adjudication",
               "code": "https://bluebutton.cms.gov/resources/variables/carr_line_rdcd_pmt_phys_astn_c",
               "display":"Carrier Line Reduced Payment Physician Assistant Code"
             }
           ]
         },
         "reason":{
           "coding":[
             {
               "system":"https://bluebutton.cms.gov/resources/variables/carr_line_rdcd_pmt_phys_astn_c",
               "code":"0",
               "display":"N/A"
             }
           ]
         }
       },
       {
         "extension":[
           {
             "valueCoding":{
               "system":"https://bluebutton.cms.gov/resources/variables/line_pmt_80_100_cd",
               "code":"0",
               "display":"80%"
             },
             "url":"https://bluebutton.cms.gov/resources/variables/line_pmt_80_100_cd"
           }
         ],
         "amount":{
           "system":"urn:iso:std:iso:4217",
           "code":"USD",
           "value":250.0
         },
         "category":{
           "coding":[
             {
               "system":"https://bluebutton.cms.gov/resources/codesystem/adjudication",
               "code":"https://bluebutton.cms.gov/resources/variables/line_nch_pmt_amt",
               "display":"Line NCH Medicare Payment Amount"
             }
           ]
         }
       },
       {
         "category":{
           "coding":[
             {
               "system":"https://bluebutton.cms.gov/resources/codesystem/adjudication",
               "code":"https://bluebutton.cms.gov/resources/variables/line_bene_pmt_amt",
               "display":"Line Payment Amount to Beneficiary"
             }
           ]
         },
         "amount":{
           "system":"urn:iso:std:iso:4217",
           "code":"USD",
           "value":0.0
         }
       }
     ]
   }
 ]
}
~~~ 

<a class="guide_top_link" href="#export-data">Back to Start of Section</a><br />
<a class="guide_top_link" href="#">Back to Top of Page</a>