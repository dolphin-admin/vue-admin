---
title: Monorepo
---

## 什么是 Monorepo？

Monorepo 是一种项目代码管理方式，指单个仓库中管理多个项目，有助于简化代码共享、版本控制、构建和部署等方面的复杂性，并提供更好的可重用性和协作性。

### 配置 pnpm workspace

```yaml [pnpm-workspace.yaml]
packages:
  - docs
  - server
  - web
  - packages/*
```

### 通过 --filter 参数为单个项目安装依赖

```bash
pnpm i
pnpm add --filter=web nuxt
```
