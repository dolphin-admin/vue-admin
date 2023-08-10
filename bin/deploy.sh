#!/usr/bin/env sh
git checkout main &&
  git pull &&
  pnpm i &&
  pnpm server:build &&
  pnpm server:deploy &&
  exit
