FROM node:10

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY index.js ./

EXPOSE 8080

CMD [ "npm", "start" ]
