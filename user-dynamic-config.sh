#!/bin/sh

# Check for arguments
if [ $# -ne 1 ]; then
    echo "Uso: $0 user_name"
    exit 1
fi

# Get user
user="$1"

container_name="nginx-rtmp-$user"

nginx_conf_user="/etc/nginx/streamings_conf.d/nginx_rtmp_$user.conf"

if [ -f "$nginx_conf_user" ]; then
	rm "$nginx_conf_user"
fi

container_id=$(docker ps -qf ancestor=$container_name)

container_ip=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $container_id)

location_string_user="location /$user {
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-Proto \$scheme;

    add_header Cache-Control \"no-cache, no-store, must-revalidate\";
    add_header Pragma \"no-cache\";
    add_header Expires \"0\";
   
    proxy_pass http://$container_ip/streaming.html?\$args;
}"

hls_string_user="location /$user/hls/ {
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header Host \$host;

    add_header Cache-Control \"no-cache, no-store, must-revalidate\";
    add_header Pragma \"no-cache\";
    add_header Expires \"0\";
   
    proxy_pass http://$container_ip/hls/;
}"

js_string_user="location /$user/js/ {
    proxy_pass http://$container_ip/js/;

    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header Host \$host;
}"

echo "$location_string_user" > "$nginx_conf_user"
echo "$hls_string_user" >> "$nginx_conf_user"
echo "$js_string_user" >> "$nginx_conf_user"

nginx -t && nginx -s reload

exit
