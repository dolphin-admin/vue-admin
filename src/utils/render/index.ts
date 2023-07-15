import type { MessageKeySchema } from '@/types'

const { t } = i18n.global

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
          },
          class: 'select-none'
        },
        {
          default: label
        }
      )
  }

  /**
   * 渲染菜单图标
   * @param icon 图标
   * @param size 图标大小
   */
  static renderMenuIcon(icon: any, size: number = 16) {
    return () =>
      h(
        NIcon,
        {
          size
        },
        {
          default: () => h(icon)
        }
      )
  }

  /**
   * 渲染国际化文本
   * @param key 国际化 key
   */
  static renderT(key: MessageKeySchema) {
    return () => t(key)
  }
}
