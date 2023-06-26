import { NIcon } from 'naive-ui'
import { RouterLink } from 'vue-router'

export const renderIcon = (icon: Component) => () => h(NIcon, null, { default: () => h(icon) })

export const renderRouterLink = (label: string, to: string) => () => h(RouterLink, { to }, { default: () => label })
