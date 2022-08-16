import App from './App'
// 导入uView插件
import uView from 'uview-ui';
Vue.use(uView);
console.log(uni.$u.config.v);
import '@icon-park/vue/styles/index.css';

// 引入axios和mockjs
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:8080" // mockURL
Vue.prototype.$axios = axios;
require('./mock/index.js');// 注意文件路径名称

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif