<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <tree-tools :tree-node="company" :is-root="true" />
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <tree-tools slot-scope="{ data }" :tree-node="data" @delDepts="loadDepartments" />
        </el-tree>
      </el-card>
    </div>
    <add-dept />
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
      departs: []
    }
  },
  created() {
    this.loadDepartments()
  },
  methods: {
    async loadDepartments() {
      const result = await getDepartments()
      this.company = { name: result.companyName, manager: '负责人' }
      this.departs = tranListToTree(result.depts, '')
      console.log(this.departs)
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
