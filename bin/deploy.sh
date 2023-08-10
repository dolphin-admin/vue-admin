#!/usr/bin/env sh
git checkout main &&
  git pull &&
  pnpm i &&
  pnpm server:build &&
  pnpm pm2 restart server/dist/main.js --name dolphin-admin-api &&
  exit
