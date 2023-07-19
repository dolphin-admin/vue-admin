# Dolphin Admin Web

[English](./README.md) / 简体中文

Dolphin Admin Web 是一个基于 Vue 3 + Vite + Naive UI + TypeScript + TailwindCSS 的开源、轻量级、开箱即用、优雅精致、支持国际化的后台管理模板。

## 特性

- [x] 基于 [Vue 3](https://cn.vuejs.org/), [Vite](https://cn.vitejs.dev/)
- [x] [TypeScript](https://www.typescriptlang.org/)，当然
- [x] 使用 [Naive UI](https://www.naiveui.com/)，美观、易用、可扩展
- [x] 使用 [Tailwind CSS](https://tailwindcss.com/)，基于原子化 CSS 进行快速开发
- [x] 使用 [pnpm](https://pnpm.io/zh/) 作为包管理器
- [x] 使用 [Sass](https://sass-lang.com/) 进行 CSS 预处理
- [x] 使用 [Vue Router](https://router.vuejs.org/zh/) 进行路由管理
- [x] 使用 [Pinia](https://pinia.vuejs.org/zh/) 进行全局状态管理
- [x] 使用 [Axios](https://axios-http.com/zh/) 进行请求，且高度封装
- [x] 使用 [iconify/json](https://iconify.design/) 和 [unplugin-icons](https://github.com/antfu/unplugin-icons)
      进行图标管理，可以通过 [icones](https://icones.js.org/) 快速使用
- [x] 使用 [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) 和
      [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) 自动引入组件、Hook、工具类，解放双手
- [x] 使用 [vue-i18n](https://vue-i18n.intlify.dev/)，支持国际化
- [x] 使用 [ECharts](https://echarts.apache.org/zh/index.html) 进行封装图表组件
- [x] 使用 [xlsx](https://www.npmjs.com/package/xlsx) 进行 Excel 文件导入、导出
- [x] 使用 [Socket.IO](https://socket.io/zh-CN/) 进行实时通信
- [x] 使用 [ESLint](https://eslint.org/) 执行代码检查
- [x] 使用 [Prettier](https://prettier.io/) 执行代码格式化
- [x] 使用 [CSpell](https://cspell.org/) 执行代码拼写检查
- [x] 使用 [Husky](https://typicode.github.io/husky/)，[lint-staged](https://github.com/okonet/lint-staged),
      [commitlint](https://commitlint.js.org/#/), [cz-git](https://cz-git.qbb.sh/) 进行 Git 提交管理
- [x] 支持绝对路径引入，使用 `@/*`
- [x] 支持第三方登录，例如 GitHub、Google 等
- [x] 支持桌面端，使用 [Tauri](https://tauri.app/) 进行桌面应用打包
- [x] ~~部署在 [Vercel](https://vercel.com/) 上，零配置~~（Vercel 不支持 WebSocket，请自主部署）

## TODO

- [ ] 使用 [Docker](https://www.docker.com/) 和 [Docker Compose](https://docs.docker.com/compose/) 进行容器化

## 技术栈

- [Vue 3](https://cn.vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://cn.vitejs.dev/)
- [Naive UI](https://www.naiveui.com/)
- [Sass](https://sass-lang.com/)

## 代码规范

- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [内部开发规范](./docs/dev-standard.md)

## 开始使用

## 清单

使用此模板时，请尝试按照清单正确更新您自己的信息：

- [ ] 整理 `README.md`
- [ ] 修改 `LICENSE` 中的作者名
- [ ] 修改 `package.json` 中的项目名称、描述、作者等信息
- [ ] 在 `.env` 中修改环境变量
- [ ] 修改 `index.html` 中的站点元数据
- [ ] 在 `/public` 目录下更改 `favicon.ico`
- [ ] 更改 `/src/app.config.ts` 中的站点配置

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

前往 Vercel 并选择你的 Git 仓库，模板选择 Vite，添加生产环境变量，然后点击部署即可。

## 许可证

[MIT](/LICENSE) License &copy; 2023 [Bruce Song](https://github.com/recallwei) from [Bit Ocean](https://github.com/bit-ocean-studio)
