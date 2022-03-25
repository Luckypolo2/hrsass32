<template>
  <div>
    <svg-icon icon-class="fullscreen" style="color:#fff;width: 20px;height: 20px" @click="changeScreen" />
  </div>
</template>
<script>
import ScreenFull from 'screenfull'
export default {
  name: 'Index',
  methods: {
    changeScreen() {
      if (!ScreenFull.isEnabled) {
        this.$message('组件错误')
        return
      }
      ScreenFull.toggle()
      // document.documentElement.requestFullscreen()
    }
  }
}
</script>

<style scoped>

</style>
