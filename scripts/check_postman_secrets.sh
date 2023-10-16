#!/usr/bin/env sh

# Audits Postman variable files for any secret values that might be set automatically during local usage.

keys='"macaroon","PRIVATE_KEY","key_id","jwt_token","access_token","job-id","file_name","patient_npi"'
values1=$(
    cat postman/Data_at_the_Point_of_Care_Sandbox.postman_environment.json |
        jq ".values[] | select(.key | IN($keys)) | select(.value != \"\")"
)

if [ ! -z "$values1" ]; then
    echo "Values must be empty: $values1"
fi

keys='"organization_id","attribution_group"'
values2=$(
    cat postman/DPC_API.postman_globals.json |
        jq ".values[] | select(.key | IN($keys)) | select(.value != \"\")"
)

if [ ! -z "$values2" ]; then
    echo "Values must be empty: $values2"
    exit 1
fi

if [ ! -z "$values1" ]; then
    exit 1
fi
