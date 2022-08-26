import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


const store = new Vuex.Store({
	state: {
		hasLogin: false, //设定默认值  是否已经登陆 
		token: "", //token校验
		tokenInfo: {}, //用户信息缓存
	},
	getters: {
		getUsername: state => {
			return state.tokenInfo.username;
		},
		getSchool: state => {
			return state.tokenInfo.school;
		},
		getNumber: state => {
			return state.tokenInfo.snumber;
		},
		getTel: state => {
			return state.tokenInfo.tel;
		},
		getAvatarUrl: state => {
			return state.tokenInfo.avatar;
		}
	},
	mutations: {
		login(state, payload) {
			state.hasLogin = true;
			state.tokenInfo = payload;
			state.token = payload.token;
			uni.setStorage({ //缓存用户登陆状态
				key: 'smartNCCdemo_' + 'tokenInfo',
				data: payload,
				success: function() {
					console.log('success');
				}
			})
			console.log(state.tokenInfo);
		},
		logout(state) {
			state.hasLogin = false;
			state.tokenInfo = {};
			state.token = "";
			uni.removeStorage({
				key: 'smartNCCdemo_' +  'tokenInfo'
			})
		}
	},
	actions: {
		// 登录过期 重新登录
		reLogin({commit}, info) {
			commit("logout", "");
		}
	}
});

export default store;
