#!/bin/bash

set -o allexport
source .env.staging
set +o allexport

set -e
node scripts/generate-deploy-info.js

pnpm i
pnpm build:staging
scp -r dist "$SERVER_USER"@"$SERVER_IP":/usr/share/nginx/html/dolphin-admin-vue/

echo "成功部署至 $SERVER_IP"
