FROM node:22-alpine

WORKDIR /app

ARG USER_ID=${USER_ID:-1000}
ARG GH_TOKEN=""

ENV GH_TOKEN=${GH_TOKEN:-}


RUN corepack enable
RUN apk add --no-cache git
RUN apk add --no-cache openssh-client
RUN apk add --no-cache python3

USER node

RUN if [ -n "$GH_TOKEN" ]; then \
      echo "@bussola-social:registry=https://npm.pkg.github.com/" > ~/.npmrc && \
      echo "//npm.pkg.github.com/:_authToken=${GH_TOKEN}" >> ~/.npmrc && \
      git config --global url."https://${GH_TOKEN}@github.com/".insteadOf "ssh://git@github.com/" && \
      git config --global url."https://${GH_TOKEN}@github.com/".insteadOf "git@github.com:" && \
      git config --global user.email "ci@example.com" && \
      git config --global user.name "CI" ; \
    fi

USER node