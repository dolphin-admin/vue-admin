import type { App } from 'vue'

import { auth } from './auth'
import { watermark } from './watermark'

const directivesList: any = {
  auth,
  watermark
}

export const directives = {
  install(app: App<Element>) {
    Object.keys(directivesList).forEach((key) =>
      app.directive(key, directivesList[key])
    )
  }
}
