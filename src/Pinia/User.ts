//定义关于counter的store
import { defineStore } from 'pinia'

import { Toast } from 'vant'
import { getToken, setToken, removeToken } from '@/utils/Auth'

//defineStore 是返回一个函数 函数命名最好有use前缀，根据函数来进行下一步操作
const useUser = defineStore({
  id: 'UserStore',
  state: () => ({
    token: getToken(),
    UserInfo: {},
    Config: {},
    Balance: {},
  }),
  persist: <any>{
    enabled: true,
    strategies: [
      {
        storage: localStorage, //localStorage存储多个key
        paths: ['token'],
        key: 'token',
      },
      {
        storage: localStorage, //localStorage存储多个key
        paths: ['UserInfo'],
        key: 'UserInfo',
      },
      {
        storage: localStorage, //localStorage存储多个key
        paths: ['Config'],
        key: 'Config',
      },
      {
        storage: localStorage, //localStorage存储多个key
        paths: ['Balance'],
        key: 'Balance',
      },
    ],
  },
  getters: {},
  actions: {
    Login(User: any, Config: any) {
      return new Promise((resolve, reject) => {})
    },
  },
})

export default useUser
