import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import i18n from '@/lang'
// import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import * as directives from '@/directives' // 自定义指令
import * as filters from '@/filters' // 过滤器

import Component from '@/components'
import checkPermission from '@/mixin/checkPermission'
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { i18n: (key, value) => i18n.t(key, value) })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
// 注册全局组件
Vue.use(Component)
/*
* 注册mixin
* */
Vue.mixin(checkPermission)
/*
* 注册自定义指令
* */
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})
/*
* 注册全局过滤器
* */
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
