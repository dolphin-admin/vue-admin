/**
 * @description Resolve the style conflict between Tailwind CSS and Naive UI.
 */
export const naiveUILoader = () => {
  const meta = document.createElement('meta')
  meta.name = 'naive-ui-style'
  document.head.appendChild(meta)
}
