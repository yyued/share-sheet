import Vue from 'vue'
import shareSheetTemplate from './template/index.vue'

export default {
  install () {
    // 允许微信开放标签
    Vue.config.ignoredElements = [
      'wx-open-launch-app'
    ]
    let vmShareSheet: any = null
    Vue.prototype.$shareSheet = (options: { [key: string]: any }) => {
      console.log(options)
      // 如存在，则覆盖
      const elementShareSheet = document.querySelector('.share-sheet')
      if (elementShareSheet && vmShareSheet) {
        document.body.removeChild(vmShareSheet.$el)
        vmShareSheet.$destroy()
        vmShareSheet = null
      }

      // 实例化
      vmShareSheet = new Vue({
        data () {
          return options
        },
        render: createElement => createElement(shareSheetTemplate)
      })
      vmShareSheet.$mount(document.body.appendChild(document.createElement('div')))
    }
  }
}
