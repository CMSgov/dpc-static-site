FROM node:24-alpine AS node-build

WORKDIR /usr/app
COPY package.json package-lock.json ./
RUN npm install

COPY gulpfile.js ./
COPY ./src/assets ./src/assets
COPY ./src/sass ./src/sass
RUN npm run assets:build

FROM ruby:3.2.6 AS ruby-build
ARG BASE_PATH

RUN bundle config --global frozen 1
WORKDIR /usr/app
COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY ./src ./src
COPY --from=node-build /usr/app/src/assets /usr/app/src/assets
RUN bundle exec jekyll build --source ./src ${BASE_PATH:+--baseurl $BASE_PATH}


FROM scratch AS export
COPY --from=ruby-build /usr/app/_site /


FROM nginx:alpine

COPY --from=ruby-build /usr/app/_site /usr/share/nginx/html
EXPOSE 80