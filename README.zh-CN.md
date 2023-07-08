# Dolphin Admin Web

[English](./README.md) / 简体中文

Dolphin Admin Web 是一个基于 `Vue 3/Vite/TypeScript/Naive UI/Tailwind CSS` 的后台管理系统模板。

## 特性

- [x] 基于 [Vue 3](https://cn.vuejs.org/), [Vite](https://cn.vitejs.dev/), [pnpm](https://pnpm.io/zh/)
- [x] [TypeScript](https://www.typescriptlang.org/)，当然
- [x] 使用 [Naive UI](https://www.naiveui.com/) 作为 UI 框架
- [x] 使用 [Tailwind CSS](https://tailwindcss.com/)，基于原子化 CSS 进行快速开发
- [x] 使用 [Sass](https://sass-lang.com/) 进行 CSS 预处理
- [x] 使用 Vue Router 进行路由管理
- [x] 使用 Pinia 进行全局状态管理
- [x] 使用 Axios 进行请求管理
- [x] 使用 iconify/json 和 unplugin-icons 进行图标管理，可以通过 icones 快速使用
- [x] 使用 unplugin-auto-import 和 unplugin-vue-components 进行自动引入，解放双手
- [x] 使用 [vue-i18n](https://vue-i18n.intlify.dev/)，支持国际化
- [x] 使用 `ESLint` 执行代码检查
- [x] 使用 `Prettier` 执行代码格式化
- [x] 使用 `cspell` 执行代码拼写检查
- [x] 使用 `Husky`，`lint-staged`, `commitlint`, `cz-git` 进行 Git 提交管理
- [ ] 使用 `Docker` 和 `Docker Compose` 进行容器化
- [x] 使用 `@/*` 作为绝对路径
- [x] 使用 `Tauri` 进行桌面应用打包
- [x] 部署在 Vercel 上，零配置

## 技术栈

- [Vue 3](https://cn.vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://cn.vitejs.dev/)
- [Naive UI](https://www.naiveui.com/)
- [Sass](https://sass-lang.com/)

## 代码规范

- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

## 开始使用

### GitHub 模板

> EST 需要 Node 版本 >=14.16.0

[使用这个模板创建仓库](https://github.com/recallwei/dolphin-admin-web/generate)。

### 克隆到本地

如果您更喜欢使用更干净的 Git 历史记录手动执行此操作：

```bash
npx degit recallwei/dolphin-admin-web my-dolphin-admin-app
cd my-dolphin-admin-app
pnpm i
```

## 清单

使用此模板时，请尝试按照清单正确更新您自己的信息：

- [ ] 整理 `README.md`
- [ ] 修改 `LICENSE` 中的作者名
- [ ] 修改 `package.json` 中的项目名称、描述、作者等信息
- [ ] 在 `.env` 中修改环境变量
- [ ] 修改 `index.html` 中的站点元数据
- [ ] 在 `/public` 目录下更改 `favicon.ico`
- [ ] 在 `vite.config.ts` 更改接口代理
- [ ] 更改 `/src/app.config.ts` 中的站点配置

## 注意

- xxx

## 使用

### 环境

- Node.js >=16.14.0
- pnpm

### 配置环境变量

配置 `.env` 文件，参考 [.env.example](./.env.example).

### PC 端应用

#### 安装

```bash
pnpm i
```

#### 启动

```bash
pnpm dev
```

#### 构建

```bash
pnpm build
```

### 桌面端应用

#### 启动

```bash
pnpm dev:desktop
```

## 部署

前往 Vercel 并选择你的仓库，模板选择 Vite，然后点击部署即可。

## 已知问题

- [ ] xxx

## 许可证

[MIT](/LICENSE) License &copy; 2023 [Bruce Song](https://github.com/recallwei)
