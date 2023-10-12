# Data at the Point of Care

A static Jekyll site for the DPC welcome, FAQ, and documentation pages.

[https://dpc.cms.gov](https://dpc.cms.gov)

## Pre-requisite: Installing and Using Pre-commit

Anyone committing to this repo must use the pre-commit hook to lower the likelihood that secrets will be exposed.

### Step 1: Install pre-commit

You can install pre-commit using the MacOS package manager Homebrew:

```sh
brew install pre-commit
```

Other installation options can be found in the [pre-commit documentation](https://pre-commit.com/#install).

### Step 2: Install the hooks

Run the following command to install the gitleaks hook:

```sh
pre-commit install
```

This will download and install the pre-commit hooks specified in `.pre-commit-config.yaml`.

## Development

### Docker Development

It is recommended to run the site using Docker. This standardizes the build process for all developers and avoids complex conflicts with library versioning.

Prerequisites:

- [Docker](https://docs.docker.com/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

To run the website with file updates reflected automatically at `http://localhost:4001/`:

```
make serve
```

To do a one-time build of the static website files directly into the `_site` directory:

```
make build
```

## Native Installation

If you'd like to run the site natively without Docker, follow the instructions below.

### Requirements

It is assumed that the environment already has these installed:

- [ruby](https://www.ruby-lang.org/en/) currently using 2.7.1
  - Recommend managing this using [rbenv](https://github.com/rbenv/rbenv), [rvm](https://rvm.io/), or [asdf](https://asdf.sh)
- [jekyll](https://jekyllrb.com/) currently using 4.2.0
- [npm](https://www.npmjs.com/) currently using 6.13.4

Navigate to the repository and install the appropriate Gem file and `package.json` file.

1. `gem install bundler` <— install Gem bundler
2. `bundle install` <— install Gem bundles
3. `npm install` <— install `package.json` dependencies
4. `make install-git-hooks` <— install git-hook(s)

### Running or Building the Application

Jekyll builds the CSS and HTML pages. Run `bundle exec jekyll serve` from the project root for a local build. By default, the site will run in `http://localhost:4000/`. You can also run `bundle exec jekyll build` to compile the site files into the `_site` directory.
