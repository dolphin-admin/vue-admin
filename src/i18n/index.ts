import type { Lang } from '@dolphin-admin/utils'
import { createI18n } from 'vue-i18n'

import type { MessageSchema } from '@/types'

const i18n = createI18n<[MessageSchema], Lang, false>({
  legacy: false, // 默认是 true，使用 composition API 时，需要设置为 false，同时上面的泛型也是必须的
  locale: 'en-US',
  fallbackLocale: 'en-US'
})

// i18n 实例声明后，读取 /locales 下的资源文件
dynamicLoadTrans().forEach(([lang, ns, resource]) =>
  i18n.global.mergeLocaleMessage(lang, { [ns]: resource })
)

/**
 * 动态加载 i18n 资源文件
 * @description 读取 /locales 下的全部 JSON 文件
 * - 转化成 i18n 资源数组，格式如 [语言 key, 命名空间 key, 资源文件内容]
 * - 通过 import.meta.glob 实现
 * @see {@link https://vitejs.dev/guide/features.html#glob-import}
 */
function dynamicLoadTrans() {
  return Object.entries(
    import.meta.glob<string>('../locales/**/*.json', {
      eager: true,
      import: 'default',
      as: 'raw'
    })
  ).map<[string, string, MessageSchema]>(([path, resource]) => [
    path.match(/([^/]+)\.json$/)![1], // 语言 key
    path.split('/')[2].replaceAll('-', '_').toUpperCase(), // 命名空间 key
    JSON.parse(resource) // 资源文件内容
  ])
}

export default i18n
