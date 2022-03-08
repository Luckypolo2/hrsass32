import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTimeStamp } from '@/utils/auth'
import router from '@/router'

const timeOut = 3600 // 单位s

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
service.interceptors.request.use(config => {
  if (store.getters.token) {
    // token时间戳主动检测检测
    if (isCheckTimeOut()) {
      store.dispatch('user/logout').then()
      router.push('/login')
      return Promise.reject(new Error('登录超时'))
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use(response => {
  const { success, message, data } = response.data
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message)) // 新建错误体，中断程序
  }
}, error => {
  // token服务端被动检测
  if (error.response && error.response.data && error.response.data.code === 10002) {
    store.dispatch('user/logout').then()
    router.push('/login')
  }
  Message.error(error.message)
  return Promise.reject(error)
})

/*
* 检测Token超时
* */
function isCheckTimeOut() {
  const currentTime = Date.now()
  const timeStamp = getTimeStamp()
  return (currentTime - timeStamp) / 1000 > timeOut
}

export default service
