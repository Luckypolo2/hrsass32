<template>
  <div class="upload-img">
    <el-upload
      list-type="picture-card"
      :limit="1"
      action="#"
      :on-preview="preview"
      :file-list="fileList"
      :class="{ disabled : fileComputed }"
      :on-remove="handleRemove"
      :on-change="fileOnchange"
      :before-upload="beforeUpload"
      :http-request="upload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress v-if="showProgress" :percentage="percent" style="width:180px" />
    <el-dialog title="预览" :visible.sync="showDialog">
      <img :src="imgUrl" alt="" style="width:100%">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'

const cos = new COS({
  SecretId: 'AKIDMXS7VcS1KL6ZlgKgmb9PO7Y7PRCgtpVu',
  SecretKey: '8zauwhCSRActtc4KJ1SbT4ORDhuqWv3u'
})
export default {
  name: 'Index',
  data() {
    return {
      fileList: [],
      imgUrl: '',
      showDialog: false,
      currentFileUid: null,
      percent: 0,
      showProgress: false
    }
  },
  computed: {
    fileComputed() {
      // 只有一个文件 返回true
      return this.fileList.length === 1
    }
  },
  methods: {
    preview(file) {
      this.imgUrl = file.url
      this.showDialog = true
    },
    handleRemove(file) {
      // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
      // filter 用来进行数组删除元素操作
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
    },
    fileOnchange(file, fileList) {
      this.fileList = fileList.map(item => item)
    },
    beforeUpload(file) {
      // 上传类型检查
      const imgType = ['image/png', 'image/jpeg', 'image/gif', 'image/bmp']
      if (!imgType.some(item => item === file.type)) {
        this.$message.error('只能上传PNG,JPEG,GIF,BMP格式')
        return false
      }
      // 上传大小检查
      const maxSize = 10 * 1024 * 1024 // js单位为b
      if (file.size > maxSize) {
        this.$message.error('只能上传10M')
        return false
      }
      this.currentFileUid = file.uid
      this.showProgress = true
      return true
    },
    upload(param) {
      if (param.file) {
        cos.putObject({
          Bucket: 'hrsaas-1259672777',
          Region: 'ap-nanjing',
          Key: param.file.name,
          Body: param.file,
          StorageClass: 'STANDARD',
          onProgress: (params) => {
            console.log(params)
            this.percent = params.percent * 100
          }
        }, (err, data) => {
          console.log(err || data)
          if (!err && data.statusCode === 200) {
            this.fileList = this.fileList.map(item => {
              if (item.uid === this.currentFileUid) {
                return { url: `https://${data.Location}`, upload: true }
              }
              return item
            })
          }
          setTimeout(() => {
            this.showProgress = false
            this.percent = 0
          }, 1000)
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.upload-img{
  .disabled::v-deep{
     .el-upload--picture-card{
      display: none!important;
    }
  }
}
</style>
