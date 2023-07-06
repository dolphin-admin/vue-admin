import '@/assets/main.scss'
import 'vfonts/OpenSans.css'
import 'vfonts/FiraCode.css'
import 'nprogress/nprogress.css'

import router from '@/router'

import App from './App.vue'
import pinia from './pinia'

// 初始化 Vue 应用前执行脚本
faviconLoader()
naiveUILoader()

const app = createApp(App)

app.use(i18n)
app.use(pinia)
app.use(router)

app.mount('#app')
