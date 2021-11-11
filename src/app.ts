import Vue from 'vue'
import App from './App.vue'
import AntdUI from 'ant-design-vue'
import './assets/style/index.less'
import 'ant-design-vue/dist/antd.less'

Vue.config.productionTip = false
Vue.use(AntdUI)
new Vue({
  render: (h) => h(App),
}).$mount('#app')
