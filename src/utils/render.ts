export class RenderUtils {
  /**
   * 渲染菜单文本
   * @param label 文本值
   */
  static renderMenuLabel(label: string | (() => string)) {
    return () =>
      h(
        NEllipsis,
        {
          tooltip: {
            placement: 'right',
            showArrow: false
          }
        },
        {
          default: label
        }
      )
  }

  /**
   * 渲染图标
   * @param icon 图标
   * @param size 图标大小
   */
  static renderIcon(icon: any, size: number = 16, options?: any) {
    return () =>
      h(
        NIcon,
        {
          size,
          ...options
        },
        {
          default: () => h(icon)
        }
      )
  }
}
