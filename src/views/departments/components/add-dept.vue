<template>
  <el-dialog title="新增部门" visible="true">
    <el-form label-width="120px">
      <el-form-item label="部门名称">
        <el-input style="width: 80%" aria-placeholder="1-50字符" />
      </el-form-item>
      <el-form-item label="部门编码">
        <el-input style="width: 80%" aria-placeholder="1-50字符" />
      </el-form-item>
      <el-form-item label="部门负责人">
        <el-select style="width: 80%" aria-placeholder="请选择" />
      </el-form-item>
      <el-form-item label="部门介绍">
        <el-input style="width: 80%" aria-placeholder="1-300字符" type="textarea" :row="3" />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary">确定</el-button>
        <el-button>关闭</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddDept'
}
</script>

<style scoped>

</style>
