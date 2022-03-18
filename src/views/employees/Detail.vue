<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账号设置">
            <el-form ref="userInfo" :rules="rules" :model="userInfo" label-width="120px" style="margin-left:120px; margin-top: 30px">
              <el-form-item label="姓名:" prop="username">
                <el-input v-model="userInfo.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码:" prop="password2">
                <el-input v-model="userInfo.password2" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveUserDetailById()">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <component :is="userComponent" @updateUserInfo="loadUserDetailById" />
          </el-tab-pane>
          <el-tab-pane label="岗位详情">
            <component :is="jobComponent" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>
<script>
import { getUserDetailById, saveUserDetailById } from '@/api/user'
import UserInfo from '@/views/employees/components/UserInfo'
import JobInfo from '@/views/employees/components/JobInfo'

export default {
  name: 'Detail',
  components: {
    UserInfo,
    JobInfo
  },
  data() {
    return {
      userComponent: 'UserInfo',
      jobComponent: 'JobInfo',
      userId: this.$route.params.id,
      userInfo: {
        username: '',
        password2: ''
      },
      rules: {
        username: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        password2: [{ required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 9, message: '密码长度6-9位', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.loadUserDetailById()
  },
  methods: {
    async loadUserDetailById() {
      this.userInfo = await getUserDetailById(this.userId)
    },
    async saveUserDetailById() {
      try {
        // 上传前整体验证表单
        await this.$refs.userInfo.validate()
        // 调用保存接口
        await saveUserDetailById({ ...this.userInfo, password: this.userInfo.password2 })
        this.$message.success('更新数据成功')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
