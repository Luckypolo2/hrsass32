import { getToken, removeToken, setToken } from '@/utils/auth'

const state = {
  token: getToken()
}
const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken(state) {
    state.token = null // 删除vuex的token
    removeToken() // 同步缓存
  }
}
const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

