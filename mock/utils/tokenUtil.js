var jwt = require('jsonwebtoken');

const secretKey = 'NOT@#SMARTNCC'
const SUCCESS_CODE = 299; // 验证成功
const EXPIRED_CODE = 700; // token过期
const INVALID_CODE = 701; // token无效

module.exports = {

	/**
	 * @param {Object} payload 包含所需字段的对象，不推荐将用户名密码存进去
	 * @param {Object} duration 过期时间
	 * @return {String} token
	 */
	generateToken: function(payload, duration) {
		let token = jwt.sign(payload, secretKey, { expiresIn: duration }); 
		console.log(`TOKEN GENERATED: ${token}`);
		return token;
	},
	/**
	 * @description 验证token
	 * @param {Object} token 
	 * @return {Number} 299代表验证成功；700代表token过期；701代表其他无效token的情况
	 */
	validateToken: function(token) {
		let code = jwt.verify(token, secretKey, (error, decoded) => {
			if(error){
				if (error.name === 'TokenExpiredError') {
						console.log('TOKEN过期')
					return EXPIRED_CODE;
				} else {
					console.log('无效TOKEN');
					return INVALID_CODE;
				}
			} else {
				console.log(decoded);
				return SUCCESS_CODE;
			}
		});
		return code;
	},
	/**
	 * 使用前需要先验证
	 * @param {Object} token
	 */
	decodedToken: function(token) {
		return jwt.decode(token);
	}
}