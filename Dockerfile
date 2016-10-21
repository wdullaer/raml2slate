FROM mhart/alpine-node:4

RUN mkdir app

RUN adduser node -D
RUN chown node:node app
WORKDIR app
USER node

ADD package.json package.json
RUN npm install

ADD lib/ lib/
ADD test/ test/
ADD theme/ theme/
ADD templates/ templates/
ADD README.md README.md

USER root
RUN chown node:node *
USER node

RUN npm run mocha
ENTRYPOINT node /lib/cli.js
