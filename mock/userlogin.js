// const Mock = require('better-mock');
// const Random = Mock.Random;

/**
 * 模拟数据库
 */
const userdata =
	[
		{
			guid: 'c6bB5CcC-dBc2-BE92-Afe1-8AeAD9dd7BA4',
			username: 'test1',
			password: 'test12345678', // for test todo: save hash
			school: '武汉大学',
			snumber: '2021202211515',
			tel: '15522023568',
			avatar: '../../static/avatar.jpg'
		},{
			guid: 'B69eaABD-8577-Bf3B-29f2-be439BBFBE4C',
			username: 'test2',
			password: 'test22345678', // for test todo: save hash
			school: '武汉大学',
			snumber: '2021202211533',
			tel: '12852056897',
			avatar: '../../static/avatar.jpg'
		}
	];


/**
 * 模拟后台
 */

// import * from 'utils/tokenUtil.js';
import tokenUtil from './utils/tokenUtil';

/**
 * @description 登录逻辑
 * @param {Object} username
 * @param {Object} password
 */

function login(username, password) {
	let flag = false;
	let data = {
		code: 801,
		msg: '用户不存在',
		udata: {}
	};
	userdata.forEach((user) => {
		if(user.username === username) {
			if(user.password === password) {
				flag = true;
				data.code = 200;
				data.msg = '登录成功'
				data.udata = {
					username: user.username,
					school: user.school,
					snumber: user.snumber,
					tel: user.tel,
					avatar: user.avatar,
					token: tokenUtil.generateToken({guid: user.guid}, 60*60*24)
				}
			} else {
				data.code = 802;
				data.msg = '用户名或密码错误';
			}
		}
	});
	return data;
}


/**
 * 校验token逻辑
 */
function loginWithToken(token) {
	let code = tokenUtil.validateToken(token);
	let data = { // 不存在则报错
			code: 702,
			msg: '用户token出错'
	}
	if(code == 299) {
		// 进一步验证guid是否存在
		let guid = tokenUtil.decodedToken(token).guid;
		console.log(guid)
		userdata.forEach((user) => {
			// console.log(user.guid);
			// console.log(user.guid==guid);
			if(user.guid === guid) {
				data = {
					code: 299,
					msg: '使用token登录成功',
				};
			}
		});

	} else if(code == 700) {
		data = {
			code: 700,
			msg: 'token过期'
		}
	} else {
		data = {
			code: 701,
			msg: 'token无效'
		}
	}
	return data;
}


export default {login, loginWithToken};
