import App from './App'
// 导入uView插件
import uView from 'uview-ui';
Vue.use(uView);
console.log(uni.$u.config.v);
import '@icon-park/vue/styles/index.css';

// 引入axios和mockjs
import axios from 'utils/http.js';

Vue.prototype.$axios = axios;
require('./mock/index.js');// 注意文件路径名称


import Vue from 'vue'
import store from './store'

Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$onLaunched = new Promise(resolve => {
	Vue.prototype.$isResolve = resolve;
})

const app = new Vue({
    ...App,
	store
})
app.$mount()
