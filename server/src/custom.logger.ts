import type { LoggerService } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import chalk from 'chalk'
import { stdout } from 'process'

import { AppConfig } from '@/app.config'
import { getCurrentTime } from '@/utils'

enum LoggerType {
  LOG = 'LOG',
  ERROR = 'ERROR',
  WARN = 'WARN',
  DEBUG = 'DEBUG',
  VERBOSE = 'VERBOSE'
}

const getLoggetTypeText = (type: LoggerType) => {
  switch (type) {
    case LoggerType.LOG:
      return chalk.green(type)
    case LoggerType.ERROR:
      return chalk.red(type)
    case LoggerType.WARN:
      return chalk.yellow(type)
    case LoggerType.DEBUG:
      return chalk.magenta(type)
    case LoggerType.VERBOSE:
      return chalk.blue(type)
    default:
      return ''
  }
}

@Injectable()
export class CustomLogger implements LoggerService {
  log(message: any, context?: string) {
    let content = `${
      chalk.green(`[${AppConfig.APP_NAME}] - `) +
      getCurrentTime('YYYY/MM/DD HH:mm:ss')
    }  `
    content += `${getLoggetTypeText(LoggerType.LOG)} `
    content += context ? `${chalk.yellow(`[${context}]`)} ` : ''
    content += `${chalk.green(message)} \n`
    stdout.write(content)
  }

  error(message: any, stack?: string, context?: string) {
    let content = `${
      chalk.red(`[${AppConfig.APP_NAME}] - `) +
      getCurrentTime('YYYY/MM/DD HH:mm:ss')
    }  `
    content += `${getLoggetTypeText(LoggerType.ERROR)} `
    content += context ? `${chalk.yellow(`[${context}]`)} ` : ''
    content += `${chalk.red(message)}\n`
    if (stack) {
      content += `${stack}\n`
    }
    stdout.write(content)
  }

  warn(message: any, context?: string) {
    let content = `${
      chalk.yellow(`[${AppConfig.APP_NAME}] - `) +
      getCurrentTime('YYYY/MM/DD HH:mm:ss')
    }  `
    content += `${getLoggetTypeText(LoggerType.WARN)} `
    content += context ? `${chalk.yellow(`[${context}]`)} ` : ''
    content += `${chalk.yellow(message)} \n`
    stdout.write(content)
  }

  debug?(message: any, context?: string) {
    let content = `${
      chalk.magenta(`[${AppConfig.APP_NAME}] - `) +
      getCurrentTime('YYYY/MM/DD HH:mm:ss')
    }  `
    content += `${getLoggetTypeText(LoggerType.DEBUG)} `
    content += context ? `${chalk.yellow(`[${context}]`)} ` : ''
    content += `${chalk.magenta(message)} \n`
    stdout.write(content)
  }

  verbose?(message: any, context?: string) {
    let content = `${
      chalk.blue(`[${AppConfig.APP_NAME}] - `) +
      getCurrentTime('YYYY/MM/DD HH:mm:ss')
    }  `
    content += `${getLoggetTypeText(LoggerType.VERBOSE)} `
    content += context ? `${chalk.yellow(`[${context}]`)} ` : ''
    content += `${chalk.blue(message)} \n`
    stdout.write(content)
  }

  static customLog(
    message: string,
    context?: string,
    type: LoggerType = LoggerType.LOG
  ) {
    let content = `${
      chalk.green(`[${AppConfig.APP_NAME}] - `) +
      getCurrentTime('YYYY/MM/DD HH:mm:ss')
    }  `
    content += `${getLoggetTypeText(type)} `
    content += context ? `${chalk.yellow(`[${context}]`)} ` : ''
    content += `${message} \n`
    stdout.write(content)
  }
}
