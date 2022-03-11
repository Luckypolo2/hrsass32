<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色管理">
            <el-row style="height:60px">
              <el-button icon="el-icon-plus" size="small" type="primary" @click="showDialog=true">新增角色</el-button>
            </el-row>
            <el-table border :data="list">
              <el-table-column align="center" type="index" label="序号" width="120" />
              <el-table-column align="center" prop="name" label="角色名称" width="240" />
              <el-table-column align="center" prop="description" label="描述" />
              <el-table-column align="center" label="操作">
                <template v-slot="{ row }">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary" @click="editRole(row.id)">编辑</el-button>
                  <el-button size="small" type="danger" @click="deleteRole(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="center" align="middle" style="height:60px">
              <el-pagination layout="prev,pager,next" :total="page.total" :page-size="page.pagesize" :current-page="page.page" @current-change="changePage" />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="公司名称">
                <el-input v-model="formData.name" disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="formData.companyAddress" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="formData.mailbox" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="formData.remarks" type="textarea" :rows="3" disabled style="width:400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <!--      弹窗模块-->
      <el-dialog :title="showTitle" :visible="showDialog" @close="btnCancel">
        <el-form ref="roleData" :model="roleForm" :rules="rules" label-width="120px">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleForm.name" />
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input v-model="roleForm.description" />
          </el-form-item>
        </el-form>
        <template v-slot:footer>
          <el-row type="flex" justify="center">
            <el-col :span="5">
              <el-button @click="btnCancel">取消</el-button>
              <el-button type="primary" @click="btnOk">确定</el-button>
            </el-col>
          </el-row>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { addRole, deleteRole, getCompanyInfo, getRoleDetail, getRoleList, updateRole } from '@/api/setting'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      list: [],
      page: {
        page: 1,
        pagesize: 10,
        total: 0
      },
      formData: {},
      showDialog: false,
      roleForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['companyId']),
    showTitle() {
      return this.roleForm.id ? '编辑角色' : '添加角色'
    }
  },
  created() {
    this.loadRoleList()
    this.loadCompanyInfo()
  },
  methods: {
    async loadRoleList() {
      const { total, rows } = await getRoleList(this.page)
      this.list = rows
      this.page.total = total
    },
    async loadCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId)
    },
    changePage(newPage) {
      this.page.page = newPage
      this.loadRoleList()
    },
    async deleteRole(id) {
      // $confirm 为promise操作
      try {
        await this.$confirm('确定删除吗')
        await deleteRole(id)
        await this.loadRoleList()
        this.$message('删除成功')
      } catch (e) {
        console.log(e)
      }
    },
    async editRole(id) {
      this.roleForm = await getRoleDetail(id)
      this.showDialog = true
    },
    async btnOk() {
      // 整体验证表单
      try {
        await this.$refs.roleData.validate()
        if (this.roleForm.id) {
          // 编辑操作
          await updateRole(this.roleForm)
        } else {
          // 新增操作
          await addRole(this.roleForm)
        }
        await this.loadRoleList()
        this.roleForm.id ? this.$message.success('更新成功') : this.$message.success('添加成功')
        this.showDialog = false
      } catch (e) {
        console.log(e)
      }
    },
    btnCancel() {
      // 重置
      this.roleForm = {
        name: '',
        description: ''
      }
      // 移除校验出错提示
      this.$refs.roleData.resetFields()
      this.showDialog = false
    }
  }
}
</script>

<style>

</style>
