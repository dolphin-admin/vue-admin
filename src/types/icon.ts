import type { FunctionalComponent, SVGAttributes } from 'vue'

export interface IconItem {
  label: string
  component: FunctionalComponent<SVGAttributes>
}
