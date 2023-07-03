export class IconUtils {
  /**
   * @description 获取动态图标
   * @param iconSeries 图标系列
   * @param iconKey 图标键
   */
  static getDynamicIcon(iconSeries: string, iconKey: string): string {
    return `~icons/${iconSeries}/${iconKey}`
  }
}
