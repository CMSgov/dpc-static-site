name: 'Deploy Static Site'

on:
  workflow_dispatch:
    inputs:
      target_environment:
        description: Deploy where?
        required: false
        default: 'staging'
        type: choice
        options:
          - staging
          - prod
      static_repo_ref:
        description: Which branch or tag?
        required: true
        default: 'main'
        type: 'string'

    workflow_on:
      target_environment:
        description: Deploy where?
        required: false
        default: 'staging'
      static_repo_ref:
        description: Which branch or tag?
        required: true
        default: 'main'
        type: 'string'
jobs:
  deploy_static_site:
    name: Deploy Static Site
    runs-on: self-hosted
