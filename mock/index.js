const Mock = require('mockjs')
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
	console.log('mock', options.body); // "http://localhost:8080/reserve/getRsvbyDate?date=2022-08-17"
	// let data = urlParser.parse2JSON(options.url);
	let data = JSON.parse(options.body).data;
	let res = reserveMock.makeRsv(data);
	return res;
});

