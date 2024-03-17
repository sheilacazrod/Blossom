#FROM node:18.13-alpine as build
#
#WORKDIR /app
#
#COPY ./frontend/package*.json .
#
#RUN npm install
#
#COPY ./frontend .
#
#RUN npm install
#
#ARG configuration=production
#
## Modificar el comando para que los archivos compilados se guarden en /app/output
#RUN npm run build -- --output-path=/tmp --configuration=$configuration

FROM ubuntu:focal as server
# Tiangolo image

LABEL Description = "Servidor Nginx con protocolo RTMP."

ENV NGINX_VERSION nginx-1.24.0
ENV NGINX_RTMP_VERSION 1.2.2

RUN apt-get update \
    && apt-get install -y build-essential libpcre3 libpcre3-dev libssl-dev zlib1g-dev ca-certificates openssl wget\
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Descarga el código fuente de nginx
RUN mkdir -p /tmp/build/nginx && \
     cd /tmp/build/nginx && \
     wget -O ${NGINX_VERSION}.tar.gz https://nginx.org/download/${NGINX_VERSION}.tar.gz && \
     tar -zxf ${NGINX_VERSION}.tar.gz

# Descargar el módulo RTMP
RUN mkdir -p /tmp/build/nginx-rtmp-module && \
    cd /tmp/build/nginx-rtmp-module && \
    wget -O nginx-rtmp-module-${NGINX_RTMP_VERSION}.tar.gz https://github.com/arut/nginx-rtmp-module/archive/v${NGINX_RTMP_VERSION}.tar.gz && \
    tar -zxf nginx-rtmp-module-${NGINX_RTMP_VERSION}.tar.gz && \
    cd nginx-rtmp-module-${NGINX_RTMP_VERSION}

# Compila nginx
RUN cd /tmp/build/nginx/${NGINX_VERSION} && \
    ./configure \
        --sbin-path=/usr/local/sbin/nginx \
        --conf-path=/etc/nginx/nginx.conf \
        --error-log-path=/var/log/nginx/error.log \
        --pid-path=/var/run/nginx/nginx.pid \
        --lock-path=/var/lock/nginx/nginx.lock \
        --http-log-path=/var/log/nginx/access.log \
        --http-client-body-temp-path=/tmp/nginx-client-body \
        --with-http_ssl_module \
        --with-threads \
        --with-ipv6 \
        --add-module=/tmp/build/nginx-rtmp-module/nginx-rtmp-module-${NGINX_RTMP_VERSION} --with-debug && \
    make -j $(getconf _NPROCESSORS_ONLN) && \
    make install && \
    mkdir /var/lock/nginx && \
    rm -rf /tmp/build

# Redirige los logs a Docker
RUN ln -sf /dev/stdout /var/log/nginx/access.log && \
    ln -sf /dev/stderr /var/log/nginx/error.log

# Copia archivos de config para nginx, las contraseñas \
# y el streaming.html con el JS para el reproductor
COPY backend/nginx/conf/nginx.conf /etc/nginx/nginx.conf
COPY backend/nginx/conf/passwords.conf /etc/nginx/passwords.conf
COPY frontend/dist/blossom/browser /usr/local/nginx/html
COPY backend/nginx/www /usr/local/nginx/html/

#COPY --from=build /tmp /usr/local/nginx/html

RUN mkdir /usr/local/nginx/html/hls

# Copia la aplicación angular compilada en el servidor nginx

EXPOSE 1935
EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]
