// 忽略的用户
export const IGNORED_USERS = new Set([
  'dependabot[bot]',
  'eslint[bot]',
  'greenkeeper[bot]',
  'semantic-release-bot'
])

// 最小贡献次数
export const COMPLETELY_ARBITRARY_CONTRIBUTION_COUNT = 3

// 每页数量
export const PAGE_LIMIT = 100

// GitHub 获取贡献者 API
export const ContributorsApiUrl = `https://api.github.com/repos/bit-ocean-studio/dolphin-admin/contributors?per_page=${PAGE_LIMIT}`

/**
 * GitHub token
 * @description 当 GitHub API 调用次数上限时，可以使用此 token 继续调用
 * 注意：此 token 仅用于开发，请不要提交至 Git 仓库
 */
export const GitHubToken = 'ghp_*'
