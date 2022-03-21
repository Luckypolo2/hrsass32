<template>
  <el-dialog title="分配角色" :visible="showRoleDialog" @close="btnCancel">
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" size="small" @click="btnOK">确定</el-button>
          <el-button size="small" @click="btnCancel">取消</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
import { assignRoles } from '@/api/employees'

export default {
  name: 'AssignRole',
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      default: null,
      required: true
    }
  },
  data() {
    return {
      list: [],
      roleIds: []
    }
  },
  created() {
    this.loadRoleList()
  },
  methods: {
    // 获取用户角色列表
    async loadRoleList() {
      const { rows } = await getRoleList({
        page: 1,
        pagesize: 10
      })
      this.list = rows
    },
    async getUserDetailById(id) { // userId props为异步操作不能直接操作
      const { roleIds } = await getUserDetailById(id)
      this.roleIds = roleIds
    },
    async btnOK() {
      await assignRoles({
        id: this.userId,
        roleIds: this.roleIds
      })
      this.$emit('update:showRoleDialog', false)
    },
    btnCancel() {
      this.roleIds = []
      this.$emit('update:showRoleDialog', false)
    }
  }
}
</script>

<style scoped>

</style>
