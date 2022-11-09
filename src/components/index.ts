import { App, createApp } from 'vue'
// 导入写好的Loading.vue文件

import JisNavbar from './src/Jis-NavBar.vue'
import JisTabBar from './src/Jis-TabBar.vue'
import Screen from './src/Screen.vue'
import Dialog from './src/Dialog.vue'
import Loading from './src/Loading.vue'
import Empty from './src/Empty.vue'

import DV3Popup from './Sub/Dialog'

export default {
  Loading: null,
  install(app: App) {
    app.component('Jis-NavBar', JisNavbar)
    app.component('Jis-TabBar', JisTabBar)
    app.component('Screen', Screen)
    app.component('Dialog', Dialog)
    app.component('Empty', Empty)

    // 全局loading
    if (this.loading) {
      // 防止多次载入
      app.config.globalProperties.$loading = this.loading
      return
    }
    // 创建Loading实例，用于挂载
    let instance = createApp(Loading)
    // 创建div元素装载Loading对象
    let div = document.createElement('div')
    let body = document.body
    // 导入body中
    body.appendChild(div)
    this.loading = instance.mount(div)
    // 挂载vue身上
    app.config.globalProperties.$loading = this.loading

    // 全局对话框
    DV3Popup(app)
  },
}
