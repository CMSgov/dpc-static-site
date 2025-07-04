IG_PUBLISHER = ./.bin/org.hl7.fhir.publisher.jar

${IG_PUBLISHER}:
	-mkdir ./.bin
	curl -L https://github.com/HL7/fhir-ig-publisher/releases/latest/download/publisher.jar -o ${IG_PUBLISHER}

.PHONY: ig/publish
ig/publish: ${IG_PUBLISHER}
	@echo "Building Implementation Guide"
	@java -jar ${IG_PUBLISHER} -ig implementation_guide/ig.json

build:
	docker compose -f docker-compose.yml build static_site
	docker compose -f docker-compose.yml run static_site

serve:
	@docker compose run --publish 4001:4000 --rm --entrypoint "bundle exec jekyll serve -H 0.0.0.0" static_site
