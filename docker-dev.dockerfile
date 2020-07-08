FROM node:12.18.2 AS build
WORKDIR /build
COPY . ./
RUN npm i
RUN npm run dev

FROM nginx:1.18.0 AS frontend
COPY nginx-dev.conf /etc/nginx/nginx.conf
WORKDIR /app
COPY --from=build /build/public ./
EXPOSE 80
