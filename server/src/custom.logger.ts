import type { LoggerService } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import chalk from 'chalk'
import { stdout } from 'process'

import { AppConfig } from '@/app.config'
import { getCurrentTime } from '@/utils'

// 日志类型
export enum LoggerType {
  LOG = 'LOG',
  ERROR = 'ERROR',
  WARN = 'WARN',
  DEBUG = 'DEBUG',
  VERBOSE = 'VERBOSE'
}

/**
 * 获取日志类型文本
 */
const getLoggerTypeText = (type: LoggerType) => {
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
  private static lastTimestampAt?: number = new Date().getTime()

  /**
   * 更新时间戳差值
   */
  protected updateAndGetTimestampDiff(): string {
    if (
      !CustomLogger.lastTimestampAt ||
      Date.now() - CustomLogger.lastTimestampAt > 10000
    ) {
      CustomLogger.lastTimestampAt = Date.now()
      return ''
    }
    const result = CustomLogger.lastTimestampAt
      ? this.formatTimestampDiff(Date.now() - CustomLogger.lastTimestampAt)
      : ''
    CustomLogger.lastTimestampAt = Date.now()
    return result
  }

  /**
   * 格式化时间戳差值
   */
  protected formatTimestampDiff(timestampDiff: number) {
    return chalk.yellow(` +${timestampDiff}ms`)
  }

  log(message: any, context?: string) {
    let content = `${
      chalk.green(`[${AppConfig.APP_NAME}] ${process.pid} - `) +
      getCurrentTime('YYYY/MM/DD HH:mm:ss')
    }  `
    content += `${getLoggerTypeText(LoggerType.LOG)} `
    content += context ? `${chalk.yellow(`[${context}]`)} ` : ''
    content += `${chalk.green(message)} `
    content += `${this.updateAndGetTimestampDiff()}\n`
    stdout.write(content)
  }

  error(message: any, stack?: string, context?: string) {
    let content = `${
      chalk.red(`[${AppConfig.APP_NAME}] ${process.pid} - `) +
      getCurrentTime('YYYY/MM/DD HH:mm:ss')
    }  `
    content += `${getLoggerTypeText(LoggerType.ERROR)} `
    content += context ? `${chalk.yellow(`[${context}]`)} ` : ''
    content += `${chalk.red(message)} `
    content += `${this.updateAndGetTimestampDiff()}\n`
    if (stack) {
      content += `${stack}\n`
    }
    stdout.write(content)
  }

  warn(message: any, context?: string) {
    let content = `${
      chalk.yellow(`[${AppConfig.APP_NAME}] ${process.pid} - `) +
      getCurrentTime('YYYY/MM/DD HH:mm:ss')
    }  `
    content += `${getLoggerTypeText(LoggerType.WARN)} `
    content += context ? `${chalk.yellow(`[${context}]`)} ` : ''
    content += `${chalk.yellow(message)} `
    content += `${this.updateAndGetTimestampDiff()}\n`
    stdout.write(content)
  }

  debug?(message: any, context?: string) {
    let content = `${
      chalk.magenta(`[${AppConfig.APP_NAME}] ${process.pid} - `) +
      getCurrentTime('YYYY/MM/DD HH:mm:ss')
    }  `
    content += `${getLoggerTypeText(LoggerType.DEBUG)} `
    content += context ? `${chalk.yellow(`[${context}]`)} ` : ''
    content += `${chalk.magenta(message)} `
    content += ` ${this.updateAndGetTimestampDiff()}\n`
    stdout.write(content)
  }

  verbose?(message: any, context?: string) {
    let content = `${
      chalk.blue(`[${AppConfig.APP_NAME}] ${process.pid} - `) +
      getCurrentTime('YYYY/MM/DD HH:mm:ss')
    }  `
    content += `${getLoggerTypeText(LoggerType.VERBOSE)} `
    content += context ? `${chalk.yellow(`[${context}]`)} ` : ''
    content += `${chalk.blue(message)} `
    content += ` ${this.updateAndGetTimestampDiff()}\n`
    stdout.write(content)
  }

  /**
   * 自定义日志
   * @description 用于自定义日志输出
   * - 目前不支持输出时间戳差值
   */
  static customLog(
    message: string,
    context?: string,
    type: LoggerType = LoggerType.LOG,
    stack?: string
  ) {
    let content = `${
      chalk.green(`[${AppConfig.APP_NAME}] ${process.pid} - `) +
      getCurrentTime('YYYY/MM/DD HH:mm:ss')
    }  `
    content += `${getLoggerTypeText(type)} `
    content += context ? `${chalk.yellow(`[${context}]`)} ` : ''
    content += `${message}\n`
    if (stack) {
      content += `${stack}\n`
    }
    stdout.write(content)
  }
}
