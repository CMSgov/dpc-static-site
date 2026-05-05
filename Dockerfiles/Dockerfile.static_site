FROM node:24-alpine AS node-build

WORKDIR /usr/app
COPY package.json package-lock.json ./

RUN --mount=type=cache,target=/root/.npm \
  npm i --omit=dev

COPY ./src/assets ./src/assets
COPY ./src/sass ./src/sass
COPY gulpfile.js ./

RUN npm run assets:build


FROM ruby:3.2.6 AS ruby-build
ARG BASE_PATH

RUN bundle config --global frozen 1
WORKDIR /usr/app
COPY Gemfile Gemfile.lock ./

RUN --mount=type=cache,target=/usr/local/bundle \
  bundle install

RUN bundle install

COPY ./src ./src
COPY --from=node-build /usr/app/src/assets /usr/app/src/assets

RUN bundle exec jekyll build --source ./src ${BASE_PATH:+--baseurl $BASE_PATH}


FROM scratch AS export
COPY --from=ruby-build /usr/app/_site /


FROM nginx:1.29.5-alpine

COPY --from=ruby-build /usr/app/_site /usr/share/nginx/html
EXPOSE 80