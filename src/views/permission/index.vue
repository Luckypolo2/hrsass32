<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <template v-slot:after>
          <el-button type="primary" size="small">添加权限</el-button>
        </template>
      </page-tools>
      <el-table border :data="list" row-key="id">
        <el-table-column align="center" label="名称" prop="name" />
        <el-table-column align="center" label="标识" prop="code" />
        <el-table-column align="center" label="描述" prop="description" />
        <el-table-column align="center" label="操作">
          <template v-slot="{ row }">
            <el-button v-if="row.type === 1" type="text">添加</el-button>
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="编辑删除" :visible="showDialog">
        <el-form :model="formData" label-width="120px">
          <el-form-item label="权限名称">
            <el-input v-model="formData.name" style="width:90%" />
          </el-form-item>
          <el-form-item label="权限标识">
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
              <el-button type="primary" size="small">确定</el-button>
              <el-button size="small">取消</el-button>
            </el-col>
          </el-row>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { tranListToTree } from '@/utils'
import { getPermissionList } from '@/api/permission'

export default {
  data() {
    return {
      list: [],
      showDialog: true,
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      }
    }
  },
  created() {
    this.loadPermissionList()
  },
  methods: {
    async loadPermissionList() {
      this.list = tranListToTree(await getPermissionList(), '0')
    }
  }
}
</script>

<style>

</style>
