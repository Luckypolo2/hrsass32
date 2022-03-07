<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <tree-tools :tree-node="company" :is-root="true" />
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <tree-tools slot-scope="{ data }" :tree-node="data" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from '@/views/departments/components/tree-tools'
export default {
  components: {
    TreeTools
  },
  data() {
    return {
      company: { name: '江苏对海打击有限公司', manager: '负责人' },
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      departs: [{ name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '孙权' }] },
        { name: '行政部', manager: '刘备' }, { name: '人事部', manager: '孙权' }]
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
