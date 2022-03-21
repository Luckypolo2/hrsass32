<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <template v-slot:before>
          <span>共{{ page.total }}条记录</span>
        </template>
        <template v-slot:after>
          <el-button size="small" type="warning" @click="$router.push('/import')">导入</el-button>
          <el-button size="small" type="danger" @click="exportExcel">导出</el-button>
          <el-button size="small" type="primary" @click="showDialog = true">新增员工</el-button>
        </template>
      </page-tools>
      <el-card v-loading="loading">
        <el-table border :data="list">
          <el-table-column type="index" label="序号" sortable align="center" />
          <el-table-column prop="username" label="姓名" sortable align="left" header-align="center">
            <template v-slot="{ row }">
              <div style="margin-left: 30px">
                <img v-imagerror="require('@/assets/common/head.jpg')" :src="row.staffPhoto" alt="" style="border-radius: 50%; width: 55px; height: 55px; padding: 10px; vertical-align:middle;" class="avatar-username" @click="showQrCanvas(row.staffPhoto)">
                <span>{{ row.username }}</span>
              </div>
            </template>
          </el-table-column>
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
              <el-button type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="editRole(row.id)">角色</el-button>
              <el-button type="text" size="small" @click="delEmployee(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="center" align="middle" style="height:60px">
          <el-pagination :total="page.total" :current-page="page.page" :page-size="page.size" layout="prev, pager, next" @current-change="changePage" />
        </el-row>
      </el-card>
    </div>
    <add-employee :show-dialog.sync="showDialog" @updateEmployeeList="loadEmployeesList" />
    <el-dialog title="二维码" :visible.sync="showCodeDialog">
      <el-row type="flex" justify="center">
        <canvas ref="myCanvas" />
      </el-row>
    </el-dialog>
    <assign-role ref="assignRole" :user-id="userId" :show-role-dialog.sync="showRoleDialog" />
  </div>
</template>

<script>
import { delEmployee, getEmployeesList } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
import AddEmployee from '@/views/employees/components/AddEmployee'
import AssignRole from '@/views/employees/components/AssignRole'
import { formatDate } from '@/filters'
import Qrcode from 'qrcode'

export default {
  components: {
    AddEmployee,
    AssignRole
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
      showDialog: false,
      showCodeDialog: false,
      showRoleDialog: false,
      userId: ''
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
    },
    exportExcel() {
      const multiHeader = [['姓名', '主要信息', '', '', '', '', '部门']]
      const merges = ['A1:A2', 'B1:F1', 'G1:G2']
      // 中英对照
      const headers = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      // 懒加载导出excel模块
      // import ('@/vendor/Export2Excel').then(excel => {
      //   excel.export_json_to_excel({
      //     header: ['姓名', '工资'],
      //     data: [['小红', 1000], ['小白', 2000]],
      //     filename: '员工工资表',
      //     autoWidth: true,
      //     bookType: 'xlsx'
      //   })
      // })
      import ('@/vendor/Export2Excel').then(async excel => {
        // 接口获取员工所有列表数据
        const { rows } = await getEmployeesList({ page: 1, size: this.page.total })
        const data = this.formJson(headers, rows)
        excel.export_json_to_excel({
          header: Object.keys(headers),
          data,
          filename: '员工工资表',
          autoWidth: true,
          bookType: 'xlsx',
          multiHeader,
          merges
        })
      })
    },
    formJson(headers, rows) {
      // item是对象  => 转化成只有值的数组 => 数组值的顺序依赖headers  {username: '张三'  }
      // Object.keys(headers)  => ["姓名", "手机号",...]
      return rows.map(item => {
        return Object.keys(headers).map(key => {
          // 格式化数据
          if (headers[key] === 'timeOfEntry' || headers[key] === 'correctionTime') {
            return formatDate(item[headers[key]])
          } else if (headers[key] === 'formOfEmployment') {
            // 查找对应id返回对象
            const obj = EmployeeEnum.hireType.find(obj => obj.id === item[headers[key]])
            return obj ? obj.value : '未知'
          }
          return item[headers[key]] // headers[key] 获取英文字符串
        })
      })
    },
    showQrCanvas(url) {
      if (url) {
        this.showCodeDialog = true
        this.$nextTick(() => {
          Qrcode.toCanvas(this.$refs.myCanvas, url)
        })
      } else {
        this.$message.warning('用户未上传头像')
      }
    },
    async editRole(id) {
      this.userId = id // 给props赋值
      await this.$refs.assignRole.getUserDetailById(id)
      this.showRoleDialog = true
    }
  }
}
</script>

<style scoped>
</style>
