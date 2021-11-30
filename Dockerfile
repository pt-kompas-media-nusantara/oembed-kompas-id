FROM node:lts-alpine

RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

RUN apk update && apk upgrade && apk add git

COPY ./package.json ./package-lock.json* ./
RUN npm install

COPY . /usr/src/nuxt-app/
EXPOSE 3003
RUN npm run build
CMD [ "node", "/usr/src/nuxt-app/dist/src/app.js" ]


