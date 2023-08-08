import { App } from 'vue'

import { hasPermission } from './permissions'
import { watermark } from './watermark'

const directivesList: any = {
  hasPermission,
  watermark
}

const directives = {
  install: function (app: App<Element>) {
    Object.keys(directivesList).forEach((key) => {
      // 注册自定义指令
      app.directive(key, directivesList[key])
    })
  }
}

export default directives
