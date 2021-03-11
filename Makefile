.PHONY: install-git-hooks
install-git-hooks:
	git config core.hookspath .git-hooks

build-redirects:
	ruby ./scripts/build_redirect_pages.rb
