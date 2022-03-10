<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <tree-tools :tree-node="company" :is-root="true" @addDepts="addDepts" />
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <tree-tools slot-scope="{ data }" :tree-node="data" @delDepts="loadDepartments" @addDepts="addDepts" @editDepts="editDepts" />
        </el-tree>
      </el-card>
    </div>
    <add-dept ref="addDept" :show-dialog.sync="showDialog" :tree-node="node" @addDepts="loadDepartments" />
  </div>
</template>

<script>
import TreeTools from '@/views/departments/components/tree-tools'
import AddDept from '@/views/departments/components/add-dept'
import { getDepartments } from '@/api/departments'
import { tranListToTree } from '@/utils'
export default {
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      company: {},
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      departs: [],
      showDialog: false,
      node: null
    }
  },
  created() {
    this.loadDepartments()
  },
  methods: {
    async loadDepartments() {
      const result = await getDepartments()
      this.company = { name: result.companyName, manager: '负责人', id: '' }
      this.departs = tranListToTree(result.depts, '')
      console.log(this.departs)
    },
    addDepts(node) {
      this.showDialog = true
      this.node = node
      console.log(node)
    },
    editDepts(node) {
      this.showDialog = true
      this.node = node
      this.$refs.addDept.getDepartDetail(node.id) // 调用子组件方法
    }
  }
}
</script>

<style scoped>
.tree-card{
  padding: 30px 140px;
  font-size: 14px;
}
</style>
