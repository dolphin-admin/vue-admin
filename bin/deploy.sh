#!/usr/bin/env sh
git checkout main &&
  git pull &&
  pnpm i &&
  pnpm web:build &&
  mv web/dist /usr/share/nginx/html -f &&
  pnpm server:build &&
  pnpm server:deploy &&
  exit
