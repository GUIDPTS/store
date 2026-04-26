FROM nginx:alpine
COPY frontend/public/marketpro /usr/share/nginx/html/marketpro
COPY frontend-static/html /usr/share/nginx/html
COPY frontend-static/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
