<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <template v-slot:after>
          <el-button type="primary" size="small" @click="addPermission('0', 1)">添加权限</el-button>
        </template>
      </page-tools>
      <el-table border :data="list" row-key="id">
        <el-table-column align="center" label="名称" prop="name" />
        <el-table-column align="center" label="标识" prop="code" />
        <el-table-column align="center" label="描述" prop="description" />
        <el-table-column align="center" label="操作">
          <template v-slot="{ row }">
            <el-button v-if="row.type === 1" type="text" @click="addPermission(row.id, 2)">添加</el-button>
            <el-button type="text" @click="editPermission(row.id)">编辑</el-button>
            <el-button type="text" @click="delPermission(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :title="showText" :visible="showDialog" @close="btnCancel">
        <el-form ref="perForm" :rules="rules" :model="formData" label-width="120px">
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="formData.name" style="width:90%" />
          </el-form-item>
          <el-form-item label="权限标识" prop="code">
            <el-input v-model="formData.code" style="width:90%" />
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="formData.description" style="width:90%" />
          </el-form-item>
          <el-form-item label="开启">
            <el-switch v-model="formData.enVisible" active-value="1" inactive-value="0" />
          </el-form-item>
        </el-form>
        <template v-slot:footer>
          <el-row type="flex" justify="center">
            <el-col :span="6">
              <el-button type="primary" size="small" @click="btnOk">确定</el-button>
              <el-button size="small" @click="btnCancel">取消</el-button>
            </el-col>
          </el-row>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { tranListToTree } from '@/utils'
import {
  addPermission,
  delPermission,
  getPermissionDetail,
  getPermissionList,
  updatePermission
} from '@/api/permission'

export default {
  data() {
    return {
      list: [],
      showDialog: false,
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    showText() {
      return this.formData.id ? '编辑' : '新增'
    }
  },
  created() {
    this.loadPermissionList()
  },
  methods: {
    async loadPermissionList() {
      this.list = tranListToTree(await getPermissionList(), '0')
    },
    delPermission(id) {
      this.$confirm('确定删除嘛').then(() => {
        return delPermission(id)
      }).then(() => {
        this.loadPermissionList()
        this.$message.success('删除成功')
      })
    },
    addPermission(pid, type) {
      this.formData.pid = pid
      this.formData.type = type
      this.showDialog = true
    },
    async editPermission(id) {
      this.formData = await getPermissionDetail(id)
      this.showDialog = true
    },
    btnOk() {
      this.$refs.perForm.validate().then(() => {
        if (this.formData.id) {
          return updatePermission(this.formData)
        }
        return addPermission(this.formData)
      }).then(() => {
        this.$message.success('更新成功')
        this.loadPermissionList()
        this.showDialog = false
      })
    },
    btnCancel() {
      this.formData = {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      }
      this.$refs.perForm.resetFields() // 重置验证
      this.showDialog = false
    }
  }
}
</script>

<style>

</style>
