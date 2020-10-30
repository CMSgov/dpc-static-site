#!/usr/bin/env bash

set -eo pipefail

docker_cleanup()
{
    docker-compose down
}

build() {
    docker-compose -f docker-compose.yml build static_site
}

test() {
    trap docker_cleanup EXIT
    docker-compose run -u "$(id -u "${USER}")":"$(id -g "${USER}")" --publish 4001:4000 --rm --entrypoint "bundle exec jekyll serve -H 0.0.0.0" -d static_site
    sleep 45
    curl localhost:4001 | grep "Join the Production Pilot Onboarding Queue"
}

main() {
    build
    test
}

main
