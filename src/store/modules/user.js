import { getToken, removeToken, setTimeStamp, setToken } from '@/utils/auth'
import { getUserDetailById, getUserInfo, login } from '@/api/user'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  userInfo: {}
}
const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken(state) {
    state.token = null // 删除vuex的token
    removeToken() // 同步缓存
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  async login(context, data) {
    const result = await login(data)
    context.commit('setToken', result)
    setTimeStamp() // 登录注入token时间戳
  },
  async getUserInfo(context) {
    const result = await getUserInfo()
    const baseInfo = await getUserDetailById(result.userId)
    context.commit('setUserInfo', { ...result, ...baseInfo })
    return result
  },
  logout(context) {
    context.commit('removeToken')
    context.commit('removeUserInfo')
    resetRouter() // 重置路由
    context.commit('permission/setRoutes', [], { root: true }) // 移除vuex中路由表
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

