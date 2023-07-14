import router from '@/router'
import type { MessageKeySchema } from '@/types'

const { t } = i18n.global

export const renderLabel = (label: () => string) => {
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
 * 渲染链接菜单
 * @param label 文本
 * @param to 链接
 */
export const renderLink = (label: () => string, to: string) => {
  return () =>
    h(
      NEllipsis,
      {
        tooltip: {
          placement: 'right',
          showArrow: false
        },
        class: 'select-none',
        onClick: () => router.push(to)
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
export const renderIcon = (icon: any, size: number = 16) => {
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
 */
export const renderT = (key: MessageKeySchema) => () => t(key)
