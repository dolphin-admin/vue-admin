import type { FrameworkItem } from './types'
const { t, renderIcon } = RenderUtils

export const columns: DataTableBaseColumn<FrameworkItem>[] = [
  {
    title: t('Print.Icon'),
    key: 'icon',
    render: (row) => renderIcon(row.icon)
  },
  {
    title: t('Print.Framework'),
    key: 'framework'
  },
  {
    title: t('Print.Description'),
    key: 'description'
  },
  {
    title: t('Print.Stars'),
    key: 'stars'
  }
]

export const data = [
  {
    icon: '',
    framework: 'React',
    description: 'React 17.0',
    stars: 100
  },
  {
    icon: '',
    framework: 'Vue',
    description: 'Vue 3.0',
    stars: 100
  },
  {
    icon: '',
    framework: 'Angular',
    description: 'Angular 12.0',
    stars: 100
  },
  {
    icon: '',
    framework: 'Svelte',
    description: 'Svelte 3.0',
    stars: 100
  },
  {
    icon: '',
    framework: 'Solid.js',
    description: 'Ember 3.0',
    stars: 100
  },
  {
    icon: '',
    framework: 'Next.js',
    description: 'Ember 3.0',
    stars: 100
  },
  {
    icon: '',
    framework: 'Nuxt.js',
    description: 'Ember 3.0',
    stars: 100
  },
  {
    icon: '',
    framework: 'Gatsby',
    description: 'Ember 3.0',
    stars: 100
  },
  {
    icon: '',
    framework: 'Docusaurus',
    description: 'Ember 3.0',
    stars: 100
  },
  {
    icon: '',
    framework: 'Astro',
    description: 'Ember 3.0',
    stars: 100
  }
]
