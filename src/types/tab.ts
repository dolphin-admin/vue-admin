import type { VNodeChild } from 'vue'

export interface Tab {
  href: string
  label: string | (() => VNodeChild)
  icon: any
}
