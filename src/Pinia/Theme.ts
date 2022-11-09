//定义关于counter的store
import { defineStore } from 'pinia'

//defineStore 是返回一个函数 函数命名最好有use前缀，根据函数来进行下一步操作
const ThemeStore = defineStore({
  id: 'ThemeStore',
  state: () => ({
    Theme: 'light',
  }),
  persist: <any>{
    enabled: true,
    strategies: [
      {
        storage: localStorage, //localStorage存储多个key
        paths: ['Theme'],
        key: 'Theme',
      },
    ],
  },
  getters: {},
  actions: {
    ChangeTheme(params: string) {
      this.Theme = params
    },
  },
})

export default ThemeStore
