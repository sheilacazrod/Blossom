FROM 0xmguerra/nginx-rtmp-base:1.0 as nginx-rtmp-base

# Copia archivos de config para nginx, las contraseñas \
# y el streaming.html con el JS para el reproductor
COPY ./conf/nginx.conf /etc/nginx/nginx.conf
COPY ./conf/passwords.conf /etc/nginx/passwords.conf
COPY ./www /usr/local/nginx/html/

RUN mkdir /usr/local/nginx/html/hls

EXPOSE 1935

CMD ["nginx", "-g", "daemon off;"]

