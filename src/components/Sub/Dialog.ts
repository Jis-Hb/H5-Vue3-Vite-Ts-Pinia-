import SubDialog from '../src/Dialog.vue'
import { createApp } from 'vue'

let mountNode: any = null
let createMount = (opts: any) => {
  if (mountNode) {
    //确保只存在一个弹框
    document.body.removeChild(mountNode)
    mountNode = null
  }
  mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  const app = createApp(SubDialog, {
    ...opts,
    modelValue: true,
  })

  return {
    app: app.mount(mountNode),
    mountNode,
  }
}
function V3Popup(options: any = {}) {
  options.id = options.id || 'v3popup_' + 1 //唯一id 删除组件时用于定位
  let { app, mountNode } = createMount(options)
  let $inst: any = app
  return {
    ...$inst,
    mountNode,
  }
}

export default function DV3Popup(app: any) {
  app.component('v3-popup', SubDialog)
  app.config.globalProperties.$subDialog = V3Popup
  // app.provide('subDialog', V3Popup)
}
