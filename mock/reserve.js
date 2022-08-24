/** 
 * @module 教室预约信息
**/
const Mock = require('mockjs')
const Random = Mock.Random

const time = require('@/utils/mytime.js');
const { DataAll } = require('@icon-park/vue');

/**
 * 初始化所有数据，变更不在这里做
 */
const allData = Mock.mock({"data|7":[
	{
		"id|+1": 0,
		"date": function(){return time.calcDate(this.id+1)},
		"detail": [{
			"name": "新珈楼",
			"area|3": [{
				"id|+1": [0,1,2],
				"name|+1": ["A区","B区","C区"],
				"classroomList|8": [{
					"id|+1": [0,1,2,3,4,5,6,7],
					"classroom|+1": ["103","105","203","205","303","305","403","407"],
					"timeList|4": [
						{
							"id|+1": [0,1,2,3],
							"startTime|+1": ["09:00", "14:00", "16:00", "18:00"],
							"endTime|+1": ["11:00", "16:00", "18:00", "20:00"],
							"status": /(available|busy)/ 
						}
					]
				}]
			}]
		}, {
			"name": "明德楼",
			"area": []
		}]
	}
]}).data;


/**
 * @constant {object} rsvDataAll 所有教室与时段
 * @description 重构数据，日期做索引
 */
const rsvDataAll = {}

allData.forEach((item)=>{
	// 统计每个区域上下午和晚上有无空闲教室
	rsvDataAll[item.date]=item.detail;
});


let p1 = '"startTime":"09:00","endTime":"11:00","status":"available"';
let p21 = '"startTime":"14:00","endTime":"16:00","status":"available"';
let p22 = '"startTime":"16:00","endTime":"18:00","status":"available"';
let p3 = '"startTime":"16:00","endTime":"18:00","status":"available"';
// console.log(rsvDataAll);

/**
 * @description 添加概要信息，每天/每个区域上午/下午/晚上的时段有无空教室
 */
function setbriefInfo() {
	Object.keys(rsvDataAll).forEach((date)=> {
		// console.log(rsvDataAll[date])
		rsvDataAll[date][0].area.forEach((item)=>{ // 暂时只对新珈楼操作
			let st = JSON.stringify(item.classroomList);
			item.brief=[];
			if(st.search(p1)!==-1) {
				item.brief[0] = '有';
			} else {
				item.brief[0] = '无';
			}
			if(st.search(p21)!==-1||st.search(p22)!==-1) {
				item.brief[1] = '有';
			} else {
				item.brief[1] = '无';
			}
			if(st.search(p3)!==-1) {
				item.brief[2] = '有';
			} else {
				item.brief[2] = '无';
			}
		})
	})
}

setbriefInfo();

/**
 * 个人的预约请求
 */
const myRsv = [
	{
		date: "2022-06-01",
		location: "新珈楼",
		detail: "A103 14:00-16:00; A103 16:00-18:00; ",
		status: 1 // 0代表已预约未使用，1代表已使用, 2代表已取消(todo)
	}
]


/**
 * @function makeRsv
 * @description 处理预约请求
 * @param {object} data 
 */
function makeRsv(data) {
	setMyRsv(data);	
	let a = rsvDataAll[data.date][data.bid].area[data.areaid];
	data.time.forEach((item)=>{
		if (a.classroomList[item.roomID].timeList[item.timeID].status === 'busy') {
			return false;
		} else {
			a.classroomList[item.roomID].timeList[item.timeID].status = 'busy';
		}
	})
	setbriefInfo();
	return true;
}


/**
 * 生成我的预约
 */
function setMyRsv(data) {
	let b = rsvDataAll[data.date][data.bid]
	let location = 	b.name;
	let detail = '';
	let a = b.area[data.areaid];
	data.time.forEach((item)=>{
		detail += 	a.name[0] + 
					a.classroomList[item.roomID].classroom + 
					' ' + 
					a.classroomList[item.roomID].timeList[item.timeID].startTime + 
					'-' + 
					a.classroomList[item.roomID].timeList[item.timeID].endTime + 
					'; ';
	});
	myRsv.unshift({
		date: data.date,
		location: location,
		detail: detail,
		status: 0
	});
}



/**
 * @method 撤销预约，待开发
 */
function cancelRsv(data) {
	return 0;
}

// TODO
// 限制用户一天只能预约两个时段

module.exports = {rsvDataAll,makeRsv,myRsv}