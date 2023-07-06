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
}
