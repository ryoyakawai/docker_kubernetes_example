FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ARG SELF_PORT
ENV SELF_PORT $SELF_PORT
EXPOSE $SELF_PORT

CMD [ "node", "webfront.js" ]
