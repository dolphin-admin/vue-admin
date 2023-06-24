import '@/assets/main.scss'
import 'vfonts/OpenSans.css'
import 'vfonts/FiraCode.css'
import 'nprogress/nprogress.css'

import { i18n } from '@/i18n'
import router from '@/router'
import pinia from '@/store'
import { faviconLoader, naiveUILoader } from '@/tools'

import App from './App.vue'

const app = createApp(App)

app.use(i18n)
app.use(pinia)
app.use(router)

app.mount('#app')

faviconLoader()
naiveUILoader()
