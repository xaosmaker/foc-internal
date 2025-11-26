FROM node:24-alpine3.22

WORKDIR /client
RUN npm install -g pnpm

COPY ./package.json  ./pnpm-lock.yaml ./

RUN pnpm i


COPY . .

CMD ["pnpm","dev"]

