/**
 * @description 根据站点元数据动态加载 favicon
 */
export const faviconLoader = () => {
  const { favicon } = AppConfig
  const DEFAULT_FAVICON_URL = '/favicon.ico'

  // NOTE: If not set a favicon, use the default favicon.
  const faviconUrl = favicon ?? DEFAULT_FAVICON_URL

  // NOTE: Link element should use `HTMLLinkElement` type.
  let faviconElement = document.querySelector(
    'link[rel="icon"]'
  ) as HTMLLinkElement

  if (faviconElement !== null) {
    faviconElement.href = faviconUrl
  } else {
    faviconElement = document.createElement('link')
    faviconElement.rel = 'icon'
    faviconElement.href = faviconUrl
    document.head.appendChild(faviconElement)
  }
}
