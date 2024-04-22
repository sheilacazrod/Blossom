FROM nginx:latest

WORKDIR /app

COPY . /app

RUN rm /usr/share/nginx/html/index.html
RUN cp -r /app/dist/browser/* /usr/share/nginx/html 

CMD ["nginx", "-g", "daemon off;"]
