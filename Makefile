.PHONY: git-hooks-config
git-hooks-config:
	git config core.hookspath .git-hooks

.PHONY: git-hooks
git-hooks:
	find .git/hooks -type l -exec rm {} \;
	find .git-hooks -type f -exec ln -sf ../../{} .git/hooks/ \;

