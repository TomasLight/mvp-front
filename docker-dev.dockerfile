FROM nginx:1.18.0 AS frontend
COPY nginx-dev.conf /etc/nginx/nginx.conf
WORKDIR /www
EXPOSE 80
