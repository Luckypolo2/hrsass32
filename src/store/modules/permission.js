/*
* VUEX存储用户权限信息
* */
import { asyncRouter, constantRoutes } from '@/router'

const state = {
  routes: constantRoutes // 默认静态路由
}
const mutations = {
  setRoutes(state, newRoutes) {
    // 合并静态动态路由
    state.routes = [...constantRoutes, ...newRoutes]
  }
}
const actions = {
  // 筛选路由 menus为获取用户信息中的权限菜单
  filterRoutes(context, menus) {
    const routes = []
    // 遍历用户权限菜单数组
    menus.forEach(menu => {
      // 从动态路由中筛选 返回值为数组
      const filterRoutes = asyncRouter.filter(item => item.name === menu)
      routes.push(...filterRoutes)
    })
    context.commit('setRoutes', routes)
    return routes
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
