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
    docker-compose run -u "$(id -u "${USER}")":"$(id -g "${USER}")" --publish 4000:4000 --rm --entrypoint "bundle exec jekyll serve -H 0.0.0.0" --name static_site -d static_site
    sleep 20
    docker logs static_site
    curl localhost:4000 | grep "Join the Production Pilot Onboarding Queue"

    # Perform accessibility scan
    TARGET_TEST_ENV=http://host.docker.internal:4000
    TARGETS_TO_SCAN="${TARGET_TEST_ENV}"
    TARGETS_TO_SCAN="${TARGETS_TO_SCAN} ${TARGET_TEST_ENV}/docs.html"
    TARGETS_TO_SCAN="${TARGETS_TO_SCAN} ${TARGET_TEST_ENV}/faq.html"
    TARGETS_TO_SCAN="${TARGETS_TO_SCAN} ${TARGET_TEST_ENV}/data.html"
    TARGETS_TO_SCAN="${TARGETS_TO_SCAN} ${TARGET_TEST_ENV}/pilot.html"
    TARGETS_TO_SCAN="${TARGETS_TO_SCAN} ${TARGET_TEST_ENV}/docsV1.html"
    TARGETS_TO_SCAN="${TARGETS_TO_SCAN} ${TARGET_TEST_ENV}/docsV2.html"
    TARGETS_TO_SCAN="${TARGETS_TO_SCAN} ${TARGET_TEST_ENV}/updates.html"
    docker run --add-host=host.docker.internal:host-gateway --init --rm --cap-add=SYS_ADMIN orenfromberg/axe-puppeteer-ci:1.0.0@sha256:f83527a3ae8ab74088c001abfe44836946ba73f0afbbf460447f8a0c40281e70 ${TARGETS_TO_SCAN}
}

main() {
    build
    test
}

main
