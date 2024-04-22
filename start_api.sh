#!/bin/sh

java -jar backend/Api/target/blossom_api.jar >> /var/log/springboot/api.log 2>&1 &

