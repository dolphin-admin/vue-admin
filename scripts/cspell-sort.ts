import chalk from 'chalk'
import fs from 'fs'
import os from 'os'
/**
 * 根据字母 a-z 顺序对 /.cspell/custom-words 中的单词进行排序
 */

// 读取文件内容
const file = fs.readFileSync('.cspell/custom-words.txt', 'utf8')

// 按行分割
const words = file.replace(/\r/g, '').split('\n')

// 去重、过滤、排序
const sortedWords = [...new Set(words)]
  .filter((w) => w)
  .sort((a, b) => a.localeCompare(b))

// 按行合并
const writeContent = sortedWords.join(os.EOL)

// 写入文件
fs.writeFileSync('.cspell/custom-words.txt', writeContent)

console.log(
  `${chalk.bgBlue(' 🐬 Dolphin Admin ')} ${chalk.greenBright(
    'The dictionary is sorted successfully according to A-Z!'
  )}`
)
