#!/bin/bash

set -o allexport
source .env.production
set +o allexport

pnpm i
pnpm build
scp -r dist "$SERVER_USER"@"$SERVER_IP":/usr/share/nginx/html/dolphin-admin-vue/
