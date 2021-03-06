FROM node:12.18.2 AS build
WORKDIR /build
COPY . ./
COPY .env-staging ./.env
RUN npm i
RUN npm run prod

FROM nginx:1.18.0
COPY nginx-staging.conf /etc/nginx/nginx.conf
COPY nginx-selfsigned.crt /etc/nginx/certs/lets-encrypt.crt
COPY nginx-selfsigned.key /etc/nginx/certs/lets-encrypt.key
WORKDIR /www
COPY --from=build /build/public ./
