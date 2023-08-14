import '@/assets/main.scss'
import 'vfonts/OpenSans.css'
import 'vfonts/FiraCode.css'
import 'nprogress/nprogress.css'

import { sendNotification } from '@tauri-apps/api/notification'

import { directives } from '@/directive'
import pinia from '@/pinia'
import router from '@/router'

import App from './App.vue'

// 初始化 Vue 应用前执行脚本
faviconLoader()
naiveUILoader()

const app = createApp(App)

app.use(i18n)
app.use(pinia)
app.use(router)
app.use(directives)

app.mount('#app')

// PC 端调用系统弹窗
if (GlobalEnvConfig.IS_DEV) {
  sendNotification({
    title: `🐬${i18n.global.t('App.Name')}`,
    body: i18n.global.t('Notification.Desktop.EnterSystem'),
    icon: siteMetaData.favicon
  })
}
