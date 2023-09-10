# Dolphin Admin Web

English / [简体中文](./README.zh-CN.md)

Dolphin Admin Web is an open source, lightweight, out-of-the-box, elegant and exquisite, internationalized
backend management template based on Vue 3 + Vite + Naive UI + TypeScript + TailwindCSS.

## Features

- [x] Based on [Vue 3](https://vuejs.org/), [Vite](https://vitejs.dev/)
- [x] [TypeScript](https://www.typescriptlang.org/), of course
- [x] [Naive UI](https://www.naiveui.com/), a Vue 3-based UI library
- [x] [TailwindCSS](https://tailwindcss.com/), a utility-first CSS framework
- [x] [pnpm](https://pnpm.io/) as package manager
- [x] [Sass](https://sass-lang.com/) as CSS preprocessor
- [x] [Vue Router](https://router.vuejs.org/) for routing management
- [x] [Pinia](https://pinia.vuejs.org/) for global state management
- [x] [Axios](https://axios-http.com/) for request, and highly encapsulated
- [x] [iconify/json](https://iconify.design/) and [unplugin-icons](https://github.com/antfu/unplugin-icons)
      for icon management, you can use [icones](https://icones.js.org/) to use it quickly
- [x] [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) and
      [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) for automatic import
      of components, hooks, and utility classes, freeing your hands
- [x] [vue-i18n](https://vue-i18n.intlify.dev/), support internationalization
- [x] [ECharts](https://echarts.apache.org/) for data visualization
- [x] [xlsx](https://www.npmjs.com/package/xlsx) for Excel file import and export
- [x] [Socket.IO](https://socket.io/) for real-time communication
- [x] [ESLint](https://eslint.org/) for code checking
- [x] [Prettier](https://prettier.io/) for code formatting
- [x] [CSpell](https://cspell.org/) for code spelling checking
- [x] [Husky](https://typicode.github.io/husky/), [lint-staged](https://github.com/okonet/lint-staged),
      [commitlint](https://commitlint.js.org/#/), [cz-git](https://cz-git.qbb.sh/) for Git commit management
- [x] [taze](https://github.com/antfu/taze) for dependency version management
- [x] Support absolute path import, use `@/*`
- [x] Support third-party login like GitHub, Google, etc.
- [x] Support desktop, use [Tauri](https://tauri.app/) for desktop application packaging
- [x] ~~Deploy on [Vercel](https://vercel.com/), zero configuration~~ (Vercel does not support WebSocket, please deploy byself)

## TODO

- [ ] Use [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) for containerization

## Tech Stack

- [Vue 3](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Naive UI](https://www.naiveui.com/)
- [Sass](https://sass-lang.com/)

## Code Style

- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Dev Standard](./DEVELOPMENT_STANDARD.md)

## Getting Started

## Checklist

When using this template, please try to update your own information correctly according to the checklist:

- [ ] Organize `README.md`
- [ ] Modify the author name in `LICENSE`
- [ ] Modify the project name, description, author and other information in `package.json`
- [ ] Modify the environment variables in `.env`
- [ ] Modify the site metadata in `index.html`
- [ ] Change `favicon.ico` in the `/public` directory
- [ ] Modify the app metadata in `/src/app.config.ts`

## Usage

### Environment

- Node.js >=16.20.1
- pnpm

### Configuration Environment Variables

Configure `.env` file, refer to [.env.example](./.env.example).

### PC App

#### Installation

```bash
pnpm i
```

#### Development

```bash
pnpm web:dev
```

#### Build

```bash
pnpm web:build
```

### Desktop App

#### Development

```bash
pnpm desktop:dev
```

## Deploy

Go to Vercel and select your Git repository, choose Vite as template, add production environment variables, and click deploy.

## License

[MIT](/LICENSE) License &copy; 2023 [Bruce Song](https://github.com/recallwei) from [Bit Ocean](https://github.com/bit-ocean-studio)
