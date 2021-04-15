IG_PUBLISHER = ./.bin/org.hl7.fhir.publisher.jar

.PHONY: install-git-hooks
install-git-hooks:
	git config core.hookspath .git-hooks

${IG_PUBLISHER}:
	-mkdir ./.bin
	curl https://storage.googleapis.com/ig-build/org.hl7.fhir.publisher.jar -o ${IG_PUBLISHER}

.PHONY: ig/publish
ig/publish: ${IG_PUBLISHER}
	@echo "Building Implementation Guide"
	@java -jar ${IG_PUBLISHER} -ig implementation_guide/ig.json
