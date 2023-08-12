/* eslint-disable no-console */
import chalk from 'chalk'
import figlet from 'figlet'
import gradient from 'gradient-string'
import { stdout } from 'process'

import { AppConfig } from '@/app.config'

import { getCurrentTime } from './time'

const getAppLogPrefix = () =>
  `${
    chalk.green(`[${AppConfig.APP_NAME}] - `) +
    getCurrentTime('YYYY/MM/DD HH:mm:ss')
  }  `

export const bootstrapLog = (port: number) => {
  figlet(AppConfig.APP_NAME, (err, data) => {
    if (err) {
      stdout.write('Something went wrong...')
      console.dir(err)
      return
    }

    stdout.write(`\n${gradient.rainbow(data)}\n\n`)
    stdout.write(
      `${getAppLogPrefix()} ${AppConfig.APP_NAME} v${AppConfig.APP_VERSION}\n`
    )
    stdout.write(`${getAppLogPrefix()} Author: ${AppConfig.APP_AUTHOR}\n`)
    stdout.write(
      `${getAppLogPrefix()} API Server is running on ${chalk.green(
        `http://localhost:${port}`
      )}\n`
    )
    stdout.write(
      `${getAppLogPrefix()} Swagger Docs is available at ${chalk.green(
        `http://localhost:${port}/api`
      )}\n`
    )
  })
}
