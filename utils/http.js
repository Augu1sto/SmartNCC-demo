import store from "@/store";

import axios from 'axios';


axios.defaults.timeout = 5000;

// axios.defaults.baseURL = "http://192.168.43.14:8080"
axios.defaults.baseURL = "http://localhost:8080"; // mockURL
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
//http request 拦截器
axios.interceptors.request.use(
	config => {
		// 在发送请求之前做些什么
		// 每次发送请求之前判断vuex中是否存在token        
		// 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
		// 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 

		config.data = JSON.stringify(config.data);
		// config.headers = {
		// 	'Content-Type':'application/x-www-form-urlencoded'
		// }

		//JWT方案 插入HEADER
		const token = store.state.token;

		if(token){
			config.headers.Authorization = token
		}
		return config;
	},
	error => {
		return Promise.reject(error);
  }
);

//http response 拦截器
axios.interceptors.response.use(
    response => {   
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
        // 否则的话抛出错误
        if (response.status === 200) {
			// 校验token是否失效
			if ( response.data.code && (response.data.code == 700 || response.data.code == 701 || response.data.code == 702)) {
				uni.showToast({
					icon: 'error',
					title: response.data.msg,
					duration: 2000
				});
				console.log('http.js:' + response.data.code + response.data.msg);
				store.dispatch("reLogin");
				// try {
				// 	let pages = getCurrentPages();
				// 	if (pages.length && pages.length > 1 && pages[pages.length - 1].route) {
				// 		let route = pages[pages.length - 1].route;
				// 		uni.setStorage({
				// 			key: 'lasturl',
				// 			data: '/' + route,
				// 			success: function() {
				// 				console.log('lasturl setStorage success');
				// 			}
				// 		});
				// 	}
				// } catch (e) {
				// 	console.error(e)
				// }
			}
            return Promise.resolve(response);        
        } else {            
            return Promise.reject(response);        
        }
	},
	error => {
		return Promise.reject(error)
  }
)

export default axios;
  // response => {
	  
  //   if(response.data.errCode ==2){
  //     router.push({
  //       path:"/pages/login/login",
  //       querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
  //     })
  //   }
  //   return response;
  // },


// //  封装get方法,返回promise对象
// export function get(url,params={}){
//   return new Promise((resolve,reject) => {
//     axios.get(url,{
//       params:params
//     })
//     .then(response => {
//       resolve(response.data);
//     })
//     .catch(err => {
//       reject(err)
//     })
//   })
// }
// // 封装post请求
// export function post(url,data = {}){
//   return new Promise((resolve,reject) => {
//     axios.post(url,data)
//          .then(response => {
//            resolve(response.data);
//          },err => {
//            reject(err)
//          })
//   })
// }
// // 封装getAwait方法,返回async方法
// export async function getAwait(url,params={}){
//   let res=await axios.get(url,{params:params})
//   res=res.data
//   return res
// }
// // 封装getAwait方法,返回async方法
// export async function postAwait(url,data={}){
//   let res=await axios.post(url,data)
//   res=res.data
//   return res
// }

