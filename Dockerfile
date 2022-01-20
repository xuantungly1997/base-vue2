FROM node:14.17.1-alpine

LABEL description="Install node for vue development"
LABEL build_date="2021-06-20"
LABEL version="0.1.1"

WORKDIR /web

COPY package*.json ./

RUN yarn install

EXPOSE 8080

CMD ["yarn", "serve"]