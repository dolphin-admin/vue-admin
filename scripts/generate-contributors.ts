import chalk from 'chalk'
import fetch from 'cross-fetch'
import fs from 'fs'
import path from 'path'

// 忽略的用户，机器人
const IGNORED_USERS = new Set([
  'dependabot[bot]',
  'eslint[bot]',
  'greenkeeper[bot]',
  'semantic-release-bot'
])

// 项目最少贡献次数
const COMPLETELY_ARBITRARY_CONTRIBUTION_COUNT = 3
// 每页最大贡献人数
const PAGE_LIMIT = 100
// GitHub 获取贡献者列表 API 地址
const ContributorsApiUrl = `https://api.github.com/repos/bit-ocean-studio/dolphin-admin/contributors?per_page=${PAGE_LIMIT}`
// GitHub token
const GitHubToken = 'ghp_*'

interface Contributor {
  contributions: number
  type: string
  login?: string
  url?: string
  avatar_url?: string
  html_url?: string
}

interface User {
  login: string
  name: string
  avatar_url: string
  html_url: string
}

/**
 * 获取数据
 * @param url 接口地址
 */
async function getData<T>(url: string | undefined): Promise<T | null> {
  if (url == null) {
    return null
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: GitHubToken
    }
  })

  return (await response.json()) as Promise<T>
}

async function* fetchUsers(page = 1): AsyncIterableIterator<Contributor[]> {
  let lastLength = 0
  do {
    // eslint-disable-next-line no-await-in-loop
    const contributors = await getData<Contributor[] | { message: string }>(
      `${ContributorsApiUrl}&page=${page}`
    )

    if (!Array.isArray(contributors)) {
      throw new Error(contributors?.message ?? 'An error occurred')
    }

    const thresholdContributors = contributors.filter(
      (user) => user.contributions >= COMPLETELY_ARBITRARY_CONTRIBUTION_COUNT
    )
    yield thresholdContributors

    lastLength = thresholdContributors.length
  } while (
    /*
      If the filtered list wasn't 100 long, that means that either:
      - there wasn't 100 users in the page, or
      - there wasn't 100 users with > threshold commits in the page.

      In either case, it means that there's no need to fetch any more pages
    */
    lastLength === PAGE_LIMIT
  )
}

function writeTable(contributors: User[], perLine = 5): void {
  const columns = contributors.length > perLine ? perLine : contributors.length

  const lines = [
    '<!---------------------------------------------',
    ' |      DO NOT MODIFY THIS FILE MANUALLY      |',
    ' |                                            |',
    ' | THIS FILE HAS BEEN AUTOMATICALLY GENERATED |',
    ' |                                            |',
    ' |     YOU CAN REGENERATE THIS FILE USING     |',
    ' |         pnpm generate:contributors         |',
    ' ---------------------------------------------->',
    '',
    '# Contributors',
    '',
    'Thanks goes to these wonderful people:',
    '',
    '<!-- prettier-ignore-start -->',
    '<!-- markdownlint-disable -->',
    '<table>'
  ]

  let i = 0
  // eslint-disable-next-line no-restricted-syntax
  for (const usr of contributors) {
    if (i % columns === 0) {
      if (i !== 0) {
        lines.push('  </tr>')
      }
      lines.push('  <tr>')
    }

    const image = `<img src="${usr.avatar_url}&size=100" width="100px;" alt=""/>`
    const name = `<sub><b>${usr.name || usr.login}</b></sub>`

    lines.push(
      `    <td align="center"><a href="${usr.html_url}">${image}<br />${name}</a></td>`
    )
    // eslint-disable-next-line no-plusplus
    ++i
  }
  if (i % columns !== 0) {
    lines.push('  </tr>')
  }

  lines.push('</table>')
  lines.push('')
  lines.push('<!-- markdownlint-restore -->')
  lines.push('<!-- prettier-ignore-end -->')
  lines.push('')
  lines.push(
    `This list is auto-generated using \`pnpm generate:contributors\`. It shows the top ${PAGE_LIMIT} contributors with > ${COMPLETELY_ARBITRARY_CONTRIBUTION_COUNT} contributions.`
  )
  lines.push('')

  fs.writeFileSync(path.join(__dirname, '../CONTRIBUTORS.md'), lines.join('\n'))
}

async function main(): Promise<void> {
  const githubContributors: Contributor[] = []

  // eslint-disable-next-line no-restricted-syntax
  for await (const lastUsers of fetchUsers()) {
    githubContributors.push(...lastUsers)
  }

  const users = await Promise.allSettled(
    githubContributors
      .filter(
        (usr) =>
          usr.login && usr.type !== 'Bot' && !IGNORED_USERS.has(usr.login)
      )
      .map((c) => getData<User>(c.url))
  )

  writeTable(
    users
      .map((result) => {
        if (result.status === 'fulfilled') {
          return result.value
        }
        return null
      })
      .filter((c): c is User => c?.login != null),
    5
  )
}

main()
  .then(() =>
    console.log(
      `${chalk.bgBlue(' 🐬 Dolphin Admin ')} ${chalk.greenBright(
        'Generate contributors successfully!'
      )}`
    )
  )
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
