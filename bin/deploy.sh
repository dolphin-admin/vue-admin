#!/usr/bin/env sh
cd /home/repo/dolphin-admin/ || exit
pnpm i
pnpm server:build
pm2 restart server/dist/main.js --name dolphin-admin-api
