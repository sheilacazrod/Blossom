FROM node:18.13-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install

ARG configuration=production

# Modificar el comando para que los archivos compilados se guarden en /app/output
RUN npm run build -- --output-path=/tmp --configuration=$configuration

