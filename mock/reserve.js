/** 
 *	教室预约信息
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

// 重构数据，日期做索引
const rsvDataAll = {}

allData.forEach((item)=>{
	// 统计每个区域上下午和晚上有无空闲教室
	rsvDataAll[item.date]=item.detail;
});

let p1 = '"startTime":"09:00","endTime":"11:00","status":"available"';
let p21 = '"startTime":"14:00","endTime":"16:00","status":"available"';
let p22 = '"startTime":"16:00","endTime":"18:00","status":"available"';
let p3 = '"startTime":"16:00","endTime":"18:00","status":"available"';
console.log(rsvDataAll);


function setbriefInfo() {
	Object.keys(rsvDataAll).forEach((date)=> {
		// console.log(rsvDataAll[date])
		rsvDataAll[date][0].area.forEach((item)=>{
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

// 预约
function makeRsv(data) {
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


module.exports = {rsvDataAll,makeRsv}