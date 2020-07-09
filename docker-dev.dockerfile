FROM nginx:1.18.0

COPY nginx-selfsigned.crt /etc/nginx/certs/nginx-selfsigned.crt
COPY nginx-selfsigned.key /etc/nginx/certs/nginx-selfsigned.key

COPY nginx-dev.conf /etc/nginx/nginx.conf
