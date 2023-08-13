/* eslint-disable no-console */
import chalk from 'chalk'
import figlet from 'figlet'
import gradient from 'gradient-string'
import { stdout } from 'process'

import { AppConfig } from '@/app.config'
import { CustomLogger } from '@/custom.logger'

const BOOTSTRAP_LOGGER_CONTEXT = 'Bootstrap'

export const bootstrapLog = (port: number) => {
  figlet(AppConfig.APP_NAME, (err, data) => {
    if (err) {
      stdout.write('Something went wrong...')
      console.dir(err)
      return
    }

    stdout.write(`\n${gradient.rainbow(data)}\n\n`)
    CustomLogger.customLog(
      `${AppConfig.APP_NAME}🐬 v${AppConfig.APP_VERSION}`,
      BOOTSTRAP_LOGGER_CONTEXT
    )
    CustomLogger.customLog(
      `Author: ${AppConfig.APP_AUTHOR}`,
      BOOTSTRAP_LOGGER_CONTEXT
    )
    CustomLogger.customLog(
      `API Server is running on ${chalk.underline.green(
        `http://localhost:${port}`
      )}`,
      BOOTSTRAP_LOGGER_CONTEXT
    )
    CustomLogger.customLog(
      `Swagger Docs is available at ${chalk.underline.green(
        `http://localhost:${port}/api`
      )}`,
      BOOTSTRAP_LOGGER_CONTEXT
    )
  })
}
