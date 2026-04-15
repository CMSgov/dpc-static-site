#!/usr/bin/env bash

set -eo pipefail

docker_cleanup()
{
    docker compose down --remove-orphans
    return 0
}

build() {
    docker compose -f docker-compose.yml build static_site
    return 0
}

scan() {
    trap docker_cleanup EXIT
    docker compose run --publish 4000:4000 --entrypoint "bundle exec jekyll serve -H 0.0.0.0" --name static_site -d static_site
    sleep 30
    docker logs static_site
    ls
    find _site -type f
    curl localhost:4000 | grep "Update: what we're working on" || { echo "ERROR: Updates page not found" >&2; exit 1; }

    # Perform accessibility scan
    TARGET_TEST_ENV=http://host.docker.internal:4000
    TARGETS_TO_SCAN="${TARGET_TEST_ENV}"
    TARGETS_TO_SCAN="${TARGETS_TO_SCAN} ${TARGET_TEST_ENV}/faq"
    TARGETS_TO_SCAN="${TARGETS_TO_SCAN} ${TARGET_TEST_ENV}/data"
    TARGETS_TO_SCAN="${TARGETS_TO_SCAN} ${TARGET_TEST_ENV}/pilot"
    TARGETS_TO_SCAN="${TARGETS_TO_SCAN} ${TARGET_TEST_ENV}/docsV1"
    TARGETS_TO_SCAN="${TARGETS_TO_SCAN} ${TARGET_TEST_ENV}/docsV2"
    TARGETS_TO_SCAN="${TARGETS_TO_SCAN} ${TARGET_TEST_ENV}/updates"
    docker run --add-host=host.docker.internal:host-gateway --init --rm --cap-add=SYS_ADMIN mcp/puppeteer:latest@sha256:11bacd79778b42ebe041a9e2fc18a8c3500bf1362e5bca5bf2ae9dd011be5847 ${TARGETS_TO_SCAN}
    return 0
}

main() {
    build
    scan
    return 0
}

main
