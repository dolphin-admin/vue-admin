#!/usr/bin/env sh
cd /home/repo/dolphin-admin/ &&
  git checkout main &&
  git pull &&
  pnpm i &&
  pnpm server:build &&
  pm2 restart server/dist/main.js --name dolphin-admin-api &&
  exit
