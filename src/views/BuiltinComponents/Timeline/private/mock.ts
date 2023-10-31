import CSSIcon from '~icons/logos/css-3'
import HTMLIcon from '~icons/logos/html-5'
import JavaScriptIcon from '~icons/logos/javascript'
import NextjsIcon from '~icons/logos/nextjs-icon'
import ReactIcon from '~icons/logos/react'
import TypeScriptIcon from '~icons/logos/typescript-icon'
import VueIcon from '~icons/logos/vue'

export const webLearnRoute = [
  {
    time: '2023-01-01',
    title: 'HTML',
    icon: RenderUtils.renderIcon(HTMLIcon, 28)
  },
  {
    time: '2023-01-015',
    title: 'CSS',
    icon: RenderUtils.renderIcon(CSSIcon, 28)
  },
  {
    time: '2023-02-01',
    title: 'JavaScript / ES6+',
    icon: RenderUtils.renderIcon(JavaScriptIcon, 28)
  },
  {
    time: '2023-04-01',
    title: 'TypeScript',
    icon: RenderUtils.renderIcon(TypeScriptIcon, 28)
  },
  {
    time: '2023-05-01',
    title: 'Vue',
    icon: RenderUtils.renderIcon(VueIcon, 28)
  },
  {
    time: '2023-05-15',
    title: 'React',
    icon: RenderUtils.renderIcon(ReactIcon, 28)
  },
  {
    time: '2023-05-15',
    title: 'Next.js',
    icon: RenderUtils.renderIcon(NextjsIcon, 28)
  }
]
