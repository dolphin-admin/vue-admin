import type { SiteMetaData } from '@/types'

/**
 * 站点元数据
 * @description 用于配置站点的基本信息
 * - `appName`: 站点名称
 * - `version`: 站点版本
 * - `favicon`: 站点图标
 * - `teamName`: 团队名称
 * - `teamGitHubURL`: 团队 GitHub 地址
 * - `repoGitHubURL`: 仓库 GitHub 地址
 * - `docsURL`: 文档地址
 * - `discordURL`: Discord 地址
 */
export const siteMetaData: SiteMetaData = Object.freeze({
  appName: 'Dolphin Admin',
  version: '0.0.1',
  favicon: '/favicon.ico',
  teamName: 'Bit Ocean',
  teamGitHubURL: 'https://github.com/bit-ocean-studio',
  repoGitHubURL: 'https://github.com/bit-ocean-studio/dolphin-admin-web',
  docsURL: 'https://dolphin-admin-docs.bit-ocean.studio',
  discordURL: 'https://discord.gg/UKhpUQgwCT'
})
