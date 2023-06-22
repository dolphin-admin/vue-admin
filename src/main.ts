import '@/assets/main.scss'
import 'vfonts/OpenSans.css'
import 'vfonts/FiraCode.css'
import 'nprogress/nprogress.css'

import { createPinia } from 'pinia'

import { i18n } from '@/i18n'
import router from '@/router'
import { faviconLoader, naiveUILoader } from '@/tools'

import App from './App.vue'

const app = createApp(App)

app.use(i18n)
app.use(createPinia())
app.use(router)

app.mount('#app')

faviconLoader()
naiveUILoader()
