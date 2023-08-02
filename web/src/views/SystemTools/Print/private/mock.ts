import type { DataTableBaseColumn } from 'naive-ui'

import StarIcon from '~icons/line-md/star-pulsating-filled-loop'
import AngularIcon from '~icons/logos/angular-icon'
import AstroIcon from '~icons/logos/astro-icon'
import DocusaurusIcon from '~icons/logos/docusaurus'
import NextjsIcon from '~icons/logos/nextjs-icon'
import NuxtjsIcon from '~icons/logos/nuxt-icon'
import ReactIcon from '~icons/logos/react'
import SolidjsIcon from '~icons/logos/solidjs-icon'
import SvelteIcon from '~icons/logos/svelte-icon'
import VueIcon from '~icons/logos/vue'
import GatsbyIcon from '~icons/vscode-icons/file-type-gatsby'

import type { FrameworkItem } from './types'
const { t, renderIcon } = RenderUtils

export const columns: DataTableBaseColumn<FrameworkItem>[] = [
  {
    title: t('Print.Icon'),
    key: 'icon',
    width: 80,
    align: 'center',
    titleAlign: 'center',
    render: (row) =>
      h(
        'div',
        {
          class: 'flex items-center justify-center'
        },
        renderIcon(row.icon, 24)()
      )
  },
  {
    title: t('Print.Framework'),
    key: 'framework',
    width: 120,
    align: 'center',
    titleAlign: 'center'
  },
  {
    title: t('Print.Type'),
    key: 'type',
    width: 80,
    align: 'center',
    titleAlign: 'center'
  },
  {
    title: t('Print.Stars'),
    key: 'stars',
    width: 100,
    align: 'center',
    titleAlign: 'center',
    render: (row) =>
      h(
        'div',
        {
          class: 'flex items-center justify-center space-x-1'
        },
        [
          h('span', row.stars),
          renderIcon(StarIcon, 20, {
            class: 'text-yellow-500'
          })()
        ]
      )
  },
  {
    title: t('Print.Description'),
    key: 'description',
    minWidth: 200,
    resizable: true,
    render: (row) =>
      typeof row.description === 'function'
        ? row.description()
        : row.description
  }
]

export const data = [
  {
    icon: ReactIcon,
    framework: 'React',
    type: 'SPA',
    description: t('Print.React'),
    stars: '210k'
  },
  {
    icon: VueIcon,
    framework: 'Vue',
    type: 'SPA',
    description: t('Print.Vue'),
    stars: '204k'
  },
  {
    icon: NextjsIcon,
    framework: 'Next.js',
    type: 'SSR',
    description: t('Print.Nextjs'),
    stars: '109k'
  },
  {
    icon: AngularIcon,
    framework: 'Angular',
    type: 'SPA',
    description: t('Print.Angular'),
    stars: '89.2k'
  },
  {
    icon: SvelteIcon,
    framework: 'Svelte',
    type: 'SPA',
    description: t('Print.Svelte'),
    stars: '71k'
  },
  {
    icon: GatsbyIcon,
    framework: 'Gatsby',
    type: 'SSG',
    description: t('Print.Gatsby'),
    stars: '54.6k'
  },
  {
    icon: NuxtjsIcon,
    framework: 'Nuxt.js',
    type: 'SSR',
    description: t('Print.Nuxtjs'),
    stars: '46.4k'
  },
  {
    icon: DocusaurusIcon,
    framework: 'Docusaurus',
    type: 'SSG',
    description: t('Print.Docusaurus'),
    stars: '46.1k'
  },
  {
    icon: AstroIcon,
    framework: 'Astro',
    type: 'MPA',
    description: t('Print.Astro'),
    stars: '31.9k'
  },
  {
    icon: SolidjsIcon,
    framework: 'Solid.js',
    type: 'SPA',
    description: t('Print.Solidjs'),
    stars: '28.4k'
  }
]

export const DefaultHTMLStr = `<ul class='m-4 bg-slate-400 text-white'>
  <li>React</li>
  <li>Vue</li>
  <li>Angular</li>
</ul>`
