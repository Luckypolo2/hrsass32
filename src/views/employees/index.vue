<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <template v-slot:before>
          <span>共{{ page.total }}条记录</span>
        </template>
        <template v-slot:after>
          <el-button size="small" type="warning">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary" @click="showDialog = true">新增员工</el-button>
        </template>
      </page-tools>
      <el-card v-loading="loading">
        <el-table border :data="list">
          <el-table-column type="index" label="序号" sortable align="center" />
          <el-table-column prop="username" label="姓名" sortable align="center" />
          <el-table-column prop="workNumber" label="工号" sortable align="center" />
          <el-table-column :formatter="formatEmployment" prop="formOfEmployment" label="聘用形式" sortable align="center" />
          <el-table-column prop="departmentName" label="部门" sortable align="center" />
          <el-table-column prop="timeOfEntry" label="入职时间 " sortable align="center">
            <template v-slot="{ row }">
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column prop="enableState" label="账号状态" sortable align="center">
            <template v-slot="{ row }">
              <el-switch :value="row.enableState === 1" />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable align="center">
            <template v-slot="{ row }">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="delEmployee(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="center" align="middle" style="height:60px">
          <el-pagination :total="page.total" :current-page="page.page" :page-size="page.size" layout="prev, pager, next" @current-change="changePage" />
        </el-row>
      </el-card>
    </div>
    <add-employee :show-dialog.sync="showDialog" />
  </div>
</template>

<script>
import { delEmployee, getEmployeesList } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
import AddEmployee from '@/views/employees/components/AddEmployee'

export default {
  components: {
    AddEmployee
  },
  data() {
    return {
      loading: false,
      list: [],
      page: {
        page: 1,
        size: 10,
        total: 0
      },
      showDialog: false
    }
  },
  created() {
    this.loadEmployeesList()
  },
  methods: {
    changePage(newPage) {
      this.page.page = newPage
      this.loadEmployeesList()
    },
    async loadEmployeesList() {
      this.loading = true
      const { total, rows } = await getEmployeesList(this.page)
      this.page.total = total
      this.list = rows
      this.loading = false
      console.log(total, rows)
    },
    // 聘用形式枚举
    formatEmployment(row, column, cellValue, index) {
      const obj = EmployeeEnum.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },
    async delEmployee(id) {
      try {
        await this.$confirm('确认删除吗')
        await delEmployee(id)
        this.$message.success('删除成功')
        await this.loadEmployeesList()
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style>

</style>
