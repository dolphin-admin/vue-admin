/**
 * @description 解决样式冲突问题
 * @see
 * - [Naive UI](https://www.naiveui.com/en-US/os-theme/docs/style-conflict)
 */
export const naiveUILoader = () => {
  const meta = document.createElement('meta')
  meta.name = 'naive-ui-style'
  document.head.appendChild(meta)
}
