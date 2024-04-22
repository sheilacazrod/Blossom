#!/bin/sh

# Check for arguments
if [ $# -ne 2 ]; then
    echo "Use: $0 user_name port"
    exit 1
fi

user="$1"
port="$2"

# Copy streaming-template.html to docker image source
cp /app/Blossom/backend/nginx/streaming-template/streaming-template.html /app/Blossom/backend/nginx/www/streaming.html

# Path to HTML file
file="/app/Blossom/backend/nginx/www/streaming.html"

# Check for file
if [ ! -f "$file" ] || [ ! -r "$file" ]; then
    echo "Can't access to $file or it's not a text file."
    exit 1
fi

# Modifies file to add user to path
sed -i "s|\"/js/hls.js\"|\"$user/js/hls.js\"|g" "$file"
sed -i "s|\"/js/DPlayer.min.js\"|\"$user/js/DPlayer.min.js\"|g" "$file"
sed -i "s|'/hls/stream.m3u8'|'$user/hls/stream.m3u8'|g" "$file"

echo "File content of $file has been changed."

docker build -t nginx-rtmp-$user /app/Blossom/backend/nginx  && docker run -d --network test-red -p $port:1935 nginx-rtmp-$user

echo "Docker container running."

exit
