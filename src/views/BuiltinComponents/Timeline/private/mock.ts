import HTMLIcon from '~icons/logos/html-5'
import CSSIcon from '~icons/logos/css-3'
import JavaScriptIcon from '~icons/logos/javascript'
import TypeScriptIcon from '~icons/logos/typescript-icon'
import VueIcon from '~icons/logos/vue'
import ReactIcon from '~icons/logos/react'
import NextjsIcon from '~icons/logos/nextjs-icon'

export const webLearnRoute = [
  {
    time: '2023-01-01',
    content: 'HTML',
    color: 'red',
    icon: RenderUtils.renderIcon(HTMLIcon, 32)
  },
  {
    time: '2023-01-015',
    content: 'CSS',
    color: 'green',
    icon: RenderUtils.renderIcon(CSSIcon, 32)
  },
  {
    time: '2023-02-01',
    content: 'JavaScript / ES6+',
    color: 'pink',
    icon: RenderUtils.renderIcon(JavaScriptIcon, 32)
  },
  {
    time: '2023-04-01',
    content: 'TypeScript',
    color: '#333',
    icon: RenderUtils.renderIcon(TypeScriptIcon, 32)
  },
  {
    time: '2023-05-01',
    content: 'Vue',
    color: '#333',
    icon: RenderUtils.renderIcon(VueIcon, 32)
  },
  {
    time: '2023-05-15',
    content: 'React',
    color: '#333',
    icon: RenderUtils.renderIcon(ReactIcon, 32)
  },
  {
    time: '2023-05-15',
    content: 'Next.js',
    color: '#333',
    icon: RenderUtils.renderIcon(NextjsIcon, 32)
  }
]
