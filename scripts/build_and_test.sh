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
    curl localhost:4000 | grep "Update: what we're working on" || { echo "ERROR: Updates page not found"; exit 1; }

    # Perform accessibility scan
    TARGET_TEST_ENV=http://host.docker.internal:4000
    TARGETS_TO_SCAN="${TARGET_TEST_ENV}"
    TARGETS_TO_SCAN="${TARGETS_TO_SCAN} ${TARGET_TEST_ENV}/faq"
    TARGETS_TO_SCAN="${TARGETS_TO_SCAN} ${TARGET_TEST_ENV}/data"
    TARGETS_TO_SCAN="${TARGETS_TO_SCAN} ${TARGET_TEST_ENV}/pilot"
    TARGETS_TO_SCAN="${TARGETS_TO_SCAN} ${TARGET_TEST_ENV}/docsV1"
    TARGETS_TO_SCAN="${TARGETS_TO_SCAN} ${TARGET_TEST_ENV}/docsV2"
    TARGETS_TO_SCAN="${TARGETS_TO_SCAN} ${TARGET_TEST_ENV}/updates"
    docker run --add-host=host.docker.internal:host-gateway --init --rm --cap-add=SYS_ADMIN orenfromberg/axe-puppeteer-ci:1.0.0@sha256:f83527a3ae8ab74088c001abfe44836946ba73f0afbbf460447f8a0c40281e70 ${TARGETS_TO_SCAN}
}

main() {
    build
    test
}

main
