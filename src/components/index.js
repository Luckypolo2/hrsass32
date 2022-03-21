import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
import UploadImg from './UploadImg'
import Print from 'vue-print-nb'
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('UploadImg', UploadImg)
    Vue.use(Print)
  }
}
