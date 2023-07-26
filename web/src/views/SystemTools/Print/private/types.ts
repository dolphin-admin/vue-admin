export interface FrameworkItem {
  icon: any
  framework: string
  type: 'SPA' | 'SSR' | 'SSG' | 'MPA'
  description: string | (() => string)
  stars: string
}
