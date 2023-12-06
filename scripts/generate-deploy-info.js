const dayjs = require('dayjs')
const fs = require('fs')
const { stdout } = require('process')

const date = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
const FILE_PATH = './public/deploy.txt'

fs.writeFile(FILE_PATH, date, (err) => {
  if (err) {
    throw err
  }
  stdout.write('部署时间已生成\n')
  stdout.write('正在上传静态资源\n')
})
