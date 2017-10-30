// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import vuex from 'vuex'
import 'mint-ui/lib/style.css'
import 'mint-ui/lib/font/style.css'
import { Loadmore, Toast, Indicator, TabContainer, TabContainerItem, Cell, Tabbar, TabItem, Popup, Picker } from 'mint-ui'

Vue.use(vuex)

// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import { Form, FormItem, Input, Button } from 'element-ui'

//Element 样式表
import 'element-ui/lib/theme-default/index.css'
import 'element-ui/lib/theme-default/base.css'
//按需加载 Element-ui
Vue.component(CollapseTransition.name, CollapseTransition)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)

//按需加载 Mint-UI
Vue.component(Loadmore.name,Loadmore)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(Tabbar.name, Tabbar)
Vue.component(TabItem.name, TabItem)
Vue.component(Cell.name, Cell)
Vue.component(Popup.name, Popup)
Vue.component(Picker.name, Picker)

// Vue.use(MintUI)

import router from './assets/js/router.config.js'
import store from './store/index.js'
import './assets/css/reset.css'
import './assets/css/common.css'
import './assets/js/device.js'

Vue.config.productionTip = false

//mint-ui Indicator Toast
window.Indicator = Indicator
window.Toast = Toast

import Coms from './assets/js/fn.js'

window.Coms = Coms

// qs
window.Qs = require('../node_modules/qs')

// AXIOS
window.axios = require('../node_modules/axios')

// import axios from 'axios'
// 响应时间
axios.defaults.timeout = 5000
// 配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// 测试网接口地址
axios.defaults.baseURL = 'http://pay.lawyer-says.cn/api/'
// 正式网接口地址
// axios.defaults.baseURL = 'http://pay.lawyer-says.com/api'

// 添加一个请求拦截器
axios.interceptors.request.use(config => {
  // 在请求发出之前进行一些操作
  return config
}, err => {
  Indicator.close()
  Toast('系统繁忙，请稍后重试')
  // Do something with request error
  return Promise.reject(err)
})

// 添加一个响应拦截器
axios.interceptors.response.use(res => {
  // 在这里对返回的数据进行处理
  Indicator.close()
  return res
}, err => {
  // Do something with response error
  Indicator.close()
  Toast('系统繁忙，请稍后重试')
  return Promise.reject(err)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

