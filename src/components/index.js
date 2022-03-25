import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
import UploadImg from './UploadImg'
import Print from 'vue-print-nb'
import ScreenFull from './ScreenFull'
import TagsView from './TagsView'
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('UploadImg', UploadImg)
    Vue.component('ScreenFull', ScreenFull)
    Vue.component('TagsView', TagsView)
    Vue.use(Print)
  }
}
