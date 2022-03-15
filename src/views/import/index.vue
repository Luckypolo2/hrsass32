<template>
  <!-- 公共导入组件 -->
  <upload-excel :on-success="success" />
</template>
<script>
import { importEmployee } from '@/api/employees'

export default {
  name: 'Input',
  methods: {
    async success({ header, results }) {
      const userRelation = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      // map返回数组
      const newArr = results.map(item => {
        const userInfo = {}
        // 中英文互换
        Object.keys(item).forEach(key => {
          if (userInfo[userRelation[key]] === 'timeOfEntry') {
            // 转换excel时间格式
            userInfo[userRelation[key]] = new Date(this.formatDate(item[key], '/'))
          } else {
            userInfo[userRelation[key]] = item[key]
          }
        })
        return userInfo
      })
      await importEmployee(newArr)
      this.$message.success('添加成功')
      this.$router.back()
    },
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>

<style scoped>

</style>
