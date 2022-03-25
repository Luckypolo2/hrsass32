
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    /**
    * @param key 权限标识
    * */
    checkPermission(key) {
      // const { userInfo } = store.state.user
      if (this.userInfo.roles.points && this.userInfo.roles.points.length) {
        return this.userInfo.roles.points.some(item => item === key)
      }
      return false
    }
  }
}
