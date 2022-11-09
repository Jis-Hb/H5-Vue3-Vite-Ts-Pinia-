import { Toast } from 'vant'
import router from '@/router/index'
import app from '@/main'

// http/index.ts
import axios from 'axios'
import { getToken, setToken, removeToken } from '@/utils/Auth'
//创建axios的一个实例
const BASE_URL = 'http://newapi.smallstar.cc/'

var instance = axios.create({
  baseURL: BASE_URL, //接口统一域名
  timeout: 10000, //设置超时
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})
//请求拦截器
instance.interceptors.request.use(
  (config: any) => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    const token = getToken()
    token && (config.headers.Authorization = token)
    config.headers.Language = window.localStorage.getItem('I18')
    //判断是否加载load
    if (config.url != 'users/balance') {
      app.config.globalProperties.$loading.showLoading()
    }
    //若请求方式为post，则将data参数转为JSON字符串
    if (config.method === 'POST') {
      config.data = JSON.stringify(config.data)
    }

    return config
  },
  (error) =>
    // 对请求错误做些什么
    Promise.reject(error),
)
//响应拦截器
instance.interceptors.response.use(
  (response) => {
    response.data.refresh_token && setToken(response.data.refresh_token)
    app.config.globalProperties.$loading.hideLoading()
    return Promise.resolve(response.data)
  },
  (error) => {
    //未登录非法请求
    if (error.response.status === 405) {
      router.push('/login')
      Toast(error.response.data.message)
    }
    //签名过期
    if (error.response.status === 402) {
      removeToken()
      router.push('/login')
      Toast(error.response.data.message)
    }
    // 踢出登录
    if (error.response.status === 401) {
      removeToken()
      app.config.globalProperties.$subDialog({
        Show: true,
        Title: error.response.data.message,
        Content: error.response.data.message,
        ShowTitle: false,
        ShowCancel: false,
        PConfirm: function () {
          app.config.globalProperties.$subDialog()
          router.push('/login')
        },
      })
    }

    //不管code 200 还是400都有token
    error.response.data.refresh_token && setToken(error.response.data.refresh_token)
    //响应错误
    app.config.globalProperties.$loading.hideLoading()
    if (error.response && error.response.status) {
      const status = error.response.status
      return Promise.reject(error)
    }
    return Promise.reject(error)
  },
)
export { instance, BASE_URL }
