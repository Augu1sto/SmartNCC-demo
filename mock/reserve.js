/** 
 *	教室预约信息
**/
const Mock = require('mockjs')
const Random = Mock.Random

const time = require('@/utils/mytime.js');

const allData = Mock.mock({"data|7":[
	{
		"id|+1": 0,
		"date": time.calcDate(this.id+1),
		"detail": [{
			"name": "新珈楼",
			"area|3": [{
				"id|+1": 0,
				"name|+1": ["A","B","C"],
				"classroomList|8": [{
					"id|+1": 0,
					"classroom|+1": ["103","105","203","205","303","305","403","407"],
					"timeList|4": [
						{
							"id|+1": 0,
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
		}];
	}
]});

module.exports = {}