ARG NODE_VERSION=24.6
ARG RUBY_VERSION=3.2.6


# -------------------------------------------------------------------------------------------------
FROM node:${NODE_VERSION}-alpine AS node-build

WORKDIR /usr/app

# install node dependencies
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

COPY ./src/assets ./src/assets
COPY ./src/sass ./src/sass

# compile assets
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=bind,source=gulpfile.js,target=gulpfile.js \
    --mount=type=cache,target=/root/.npm \
    npm run assets:build


# -------------------------------------------------------------------------------------------------
FROM ruby:${RUBY_VERSION} AS ruby-build

# throw errors if Gemfile has been modified since Gemfile.lock
RUN bundle config --global frozen 1

WORKDIR /usr/app

# install gems
RUN --mount=type=bind,source=Gemfile,target=Gemfile \
    --mount=type=bind,source=Gemfile.lock,target=Gemfile.lock \
    bundle install

# copy and source code and overwrite assets with compiled assets from previous stage
COPY ./src ./src
COPY --from=node-build /usr/app/src/assets /usr/app/src/assets

# build site
RUN --mount=type=bind,source=Gemfile,target=Gemfile \
    --mount=type=bind,source=Gemfile.lock,target=Gemfile.lock \
    JEKYLL_ENV=production bundle exec jekyll build --source ./src


# -------------------------------------------------------------------------------------------------
FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/app/_site

RUN npm install serve

# copy only compiled static site from previous stage and serve
COPY --from=ruby-build /usr/app/_site /usr/app/_site

USER node

EXPOSE 4000

ENTRYPOINT [ "npx", "serve" ]
CMD [ "-l", "4000" ]
