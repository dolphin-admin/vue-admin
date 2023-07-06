export class FileUtils {
  /**
   * 获取文件在文件服务器的地址
   * @param path 文件存储路径
   */
  static getServerFileUrl(path: string): string {
    return `${GlobalEnvConfig.BASE_API_PROXY}/${path}`
  }
}
