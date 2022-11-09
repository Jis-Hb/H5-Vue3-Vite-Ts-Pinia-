import { createApp } from 'vue'
import router from '@/router/index'
import Pinia from '@/Pinia'
import App from './App.vue'
import Varlet from '@varlet/ui'
import '@varlet/ui/es/style.js'
import Vant from 'vant'
// 全局路由监听
import '@/permission.ts'

// 自定义组件
import Jis from '@/components'

import '@varlet/ui/es/style.js'
import '@/static/SCSS/Common.css'

// Icon
import '@/static/Icon/iconfont.css'

// vant主题变量
import 'vant/lib/index.less'

// i18
import Vue3I18n from '@/Lang'

// 根字体大小
import './utils/FlexBile'

const app = createApp(App)

app.use(router)
app.use(Pinia)
app.use(Jis)
app.use(Varlet)
app.use(Vant)
app.use(Vue3I18n)

app.mount('#app')

export default app
