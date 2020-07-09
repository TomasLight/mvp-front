FROM nginx:1.18.0
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 -subj "/C=RU/ST=RU/O=Bizarre/CN=bizarre-dev.rest/CN=*.bizarre-dev.rest" -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt
COPY nginx-dev.conf /etc/nginx/nginx.conf
