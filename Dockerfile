FROM node:lts-alpine

RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

RUN apk update && apk upgrade && apk add git

COPY ./package.json ./package-lock.json* ./
RUN npm install

COPY . /usr/src/nuxt-app/

RUN npm run dev

EXPOSE 3003
