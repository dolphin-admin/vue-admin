import '@/assets/styles/main.scss'
import 'nprogress/nprogress.css'

import { sendNotification } from '@tauri-apps/api/notification'
import { MotionPlugin } from '@vueuse/motion'

import { directives } from '@/directives'
import router from '@/router'

import App from './App.vue'

const { APP_NAME, FAVICON_URL } = AppMetadata

// 初始化 Vue 应用前执行脚本
BrowserUtils.loadFavicon(FAVICON_URL) // 加载 favicon
BrowserUtils.disableGestureScale() // 禁止手势缩放
BrowserUtils.resolveNaiveStyle() // 解决 Naive UI 样式冲突问题

const app = createApp(App)
const pinia = createPinia()

app.use(i18n)
app.use(pinia)
app.use(router)
app.use(directives)
/**
 * VueUse Motion
 * @see https://motion.vueuse.org/
 */
app.use(MotionPlugin)
app.mount('#app')

// PC 端调用系统弹窗
if (GlobalEnvConfig.IS_DEV) {
  sendNotification({
    title: `🐬${APP_NAME}`,
    body: i18n.global.t('Notification.Desktop.EnterSystem'),
    icon: FAVICON_URL
  })
}
