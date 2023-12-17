#!/bin/bash

set -o allexport
source .env.production
set +o allexport

pnpm i
pnpm build:prod
echo "正在上传静态资源至 $SERVER_IP"
scp -r dist "$SERVER_USER"@"$SERVER_IP":/usr/share/nginx/html/dolphin-admin-vue/
echo "成功部署至 $SERVER_IP"
