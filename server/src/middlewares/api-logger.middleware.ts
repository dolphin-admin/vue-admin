import chalk from 'chalk'
import type { Request, Response } from 'express'
import morgan from 'morgan'

import { CustomLogger } from '@/custom.logger'

const API_LOGGER_CONTEXT = 'RESTfulAPI'

/**
 * 获取带颜色的状态文本
 */
const getColoredStatusText = (
  text: string | undefined,
  status: number | undefined
) => {
  if (!text) {
    return ''
  }
  let coloredStatusText = text
  if (!status) {
    coloredStatusText = chalk.white(status)
  } else if (status >= 500) {
    coloredStatusText = chalk.red(status)
  } else if (status >= 400) {
    coloredStatusText = chalk.yellow(status)
  } else if (status >= 300) {
    coloredStatusText = chalk.cyan(status)
  } else if (status >= 200) {
    coloredStatusText = chalk.green(status)
  }
  return coloredStatusText
}

/**
 * Morgan 日志中间件
 */
export const apiLogger = morgan(
  (tokens, req: Request, res: Response) => {
    const status = (
      typeof res.headersSent !== 'boolean'
        ? Boolean(res.header)
        : res.headersSent
    )
      ? res.statusCode
      : undefined

    return [
      tokens.method(req, res),
      tokens.url(req, res),
      getColoredStatusText(tokens.status(req, res), status),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms'
    ].join(' ')
  },
  {
    stream: {
      write: (message) =>
        CustomLogger.customLog(message.replaceAll('\n', ''), API_LOGGER_CONTEXT)
    }
  }
)
