import type { ScrollOptions } from './private'

export class BrowserUtils {
  /**
   * 复制到剪切板
   * @param text 需要复制的文本
   */
  static setClipBoardText(text: string): Promise<void> {
    return navigator.clipboard.writeText(text)
  }

  /**
   * 打开新窗口
   * @param url 目标地址 URL
   */
  static openNewWindow(url: string) {
    const w: Window | null = window.open('about:blank')
    if (w) {
      w.opener = null
      w.location.href = url
    }
  }

  /**
   * 下载文件
   * @param imgURL 图片地址
   * @param fileName 下载后的文件名
   */
  static downloadFile(imgURL: string, fileName: string) {
    const aElement = document.createElement('a')
    aElement.href = imgURL
    aElement.setAttribute('download', fileName)
    aElement.click()
  }

  /**
   * 判定是否是移动端
   * @description 响应式请使用 useMediaQuery
   */
  static isMobileDevice() {
    return window.matchMedia('only screen and (max-width: 640px)').matches
  }

  /**
   * 平滑滚动
   * @description 借助 requestAnimationFrame 实现平滑滚动
   * @param scrollOptions 滚动配置项
   * @returns requestAnimationFrame 的 id
   */
  static smoothScroll(scrollOptions: ScrollOptions): number | null {
    const startTime = performance.now()
    const start = scrollOptions.element.scrollLeft
    const distance = scrollOptions.target - start

    let currentFrameId: number | null = null

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / (scrollOptions.duration ?? 200), 1)
      // eslint-disable-next-line no-param-reassign
      scrollOptions.element.scrollLeft = start + distance * progress

      if (!scrollOptions.animationFrameId) {
        if (progress < 1) {
          requestAnimationFrame(step)
        }
      } else if (progress < 1) {
        currentFrameId = requestAnimationFrame(step)
      } else {
        currentFrameId = null
      }
    }

    requestAnimationFrame(step)
    return currentFrameId
  }
}
