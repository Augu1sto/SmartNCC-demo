const Mock = require('better-mock')
const mockURL = 'http://localhost:8080'
import urlParser from './utils/urlParser.js'

/**
 * 考勤记录
 */
import attendanceMock from './attendance.js'
Mock.mock(`${mockURL}/attendance/fetchAll`, 'get', attendanceMock.checkDataAll);
Mock.mock(`${mockURL}/attendance/fetchToday`, 'get', attendanceMock.checkToday);
Mock.mock(`${mockURL}/attendance/fetchValidDate`, 'get', attendanceMock.validDays);

/**
 * 教室预约
 */
import reserveMock from './reserve.js'

// 获取某一天的数据
Mock.mock(RegExp(`${mockURL}/reserve/getRsvbyDate` + ".*"), 'get', (options)=>{
	console.log('mock', options.url); // "http://localhost:8080/reserve/getRsvbyDate?date=2022-08-17"
	let data = urlParser.parse2JSON(options.url);
	return reserveMock.rsvDataAll[data.date];
});

// 处理预约请求
Mock.mock(RegExp(`${mockURL}/reserve` + ".*"), 'post', (options)=>{
	console.log('mock', options.body);
	// let data = urlParser.parse2JSON(options.url);
	let data = JSON.parse(options.body).data;
	let res = reserveMock.makeRsv(data);
	return res;
});

// 发送预约信息
Mock.mock(`${mockURL}/reservation`, 'get', reserveMock.myRsv);


/**
 * 校车查询
 */
import busMock from './bus.js'
Mock.mock(RegExp(`${mockURL}/bus` + ".*"), 'get', (options)=>{
	console.log('mock', options.url); // "http://localhost:8080/bus?.."
	let data = urlParser.parse2JSON(options.url);
	return busMock.getData(data.sidx, data.dayidx, data.diridx);
});


/**
 * 活动报名
 */
import activityMock from './activity.js'

// 获得活动列表
Mock.mock(RegExp(`${mockURL}/activity/getList` + ".*"), 'get', (options)=>{
	console.log('mock', options.url); // "http://localhost:8080/"
	let data = urlParser.parse2JSON(options.url);
	return activityMock.selectData(data.type, data.sidx, data.status);
});

// 获得活动详细信息
Mock.mock(RegExp(`${mockURL}/activity/getDetail` + ".*"), 'get', (options)=>{
	console.log('mock', options.url); // "http://localhost:8080/bus?.."
	let data = urlParser.parse2JSON(options.url);
	return activityMock.getDetail(data.id);
});

// 处理收藏请求
Mock.mock(RegExp(`${mockURL}/activity/star` + ".*"), 'post', (options)=>{
	console.log('mock', options.body);
	// let data = urlParser.parse2JSON(options.url);
	let data = JSON.parse(options.body).data;
	let res = activityMock.starActivity(data.id);
	return res;
});

// 处理取消收藏请求
Mock.mock(RegExp(`${mockURL}/activity/unstar` + ".*"), 'post', (options)=>{
	console.log('mock', options.body);
	// let data = urlParser.parse2JSON(options.url);
	let data = JSON.parse(options.body).data;
	let res = activityMock.unStarActivity(data.id);
	return res;
});

// 处理报名请求
Mock.mock(RegExp(`${mockURL}/activity/join` + ".*"), 'post', (options)=>{
	console.log('mock', options.body);
	// let data = urlParser.parse2JSON(options.url);
	let data = JSON.parse(options.body).data;
	let res = activityMock.joinActivity(data.id);
	return res;
});

// 处理取消报名请求
Mock.mock(RegExp(`${mockURL}/activity/cancel` + ".*"), 'post', (options)=>{
	console.log('mock', options.body);
	// let data = urlParser.parse2JSON(options.url);
	let data = JSON.parse(options.body).data;
	let res = activityMock.cancelJoin(data.id);
	return res;
});


/**
 * 模拟用户登录
 */
import loginMock from './userlogin.js'


// 普通登录
Mock.mock(RegExp(`${mockURL}/login` + ".*"), 'get', (options)=>{
	console.log('mock', options.url);
	let data = urlParser.parse2JSON(options.url);
	return loginMock.login(data.username, data.password);
});

// token登录
Mock.mock(`${mockURL}/tokenlogin`, 'get', (options)=>{
	console.log('mock', options.headers);
	if(options.headers.Authorization) {
		return loginMock.loginWithToken(options.headers.Authorization);
	}
	return {code:900,msg:'ERROR'};
});