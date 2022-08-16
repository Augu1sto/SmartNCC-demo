/** 
 *	出勤信息 
**/
const Mock = require('mockjs')
const Random = Mock.Random

const time = require('@/utils/mytime.js');

// 构造出所有的数据
const checkDataAll_origin = Mock.mock({"data|30":[{
    "id|+1":0, 
    "date": function(){return time.calcDate(-1*this.id)},
    "detail": {
        "isValid": '@boolean' , // 暂时搞成随机的
        "timeList|1-6": [{
            "time|+1": '@time',
            'location': /(武大[A-C][1-4][0-1][1-9])|([1-3]号宿舍楼[2-8]层[1-8]单元电梯厅(左|右))/,
            "isValid": function() {
				if(this.location[0]==="武") {
					return true;
				} else {
					return false;
				}
			}
        }]
    }
}]}).data;

// 重构数据
const checkDataAll = {}
const validDays = []

checkDataAll_origin.forEach((item)=>{
	// 按time的顺序升序排列
	item.detail.timeList.sort((o1,o2)=>o1.time.localeCompare(o2.time, 'en'));
	// 判断是否有效
	if(item.detail.isValid) {
		validDays.push(item.date);
	}
	checkDataAll[item.date]=item.detail;
})

// 获取今天的信息
const checkToday = checkDataAll[time.toDayDate()]
// console.log(JSON.stringify(checkDataAll));

export default {checkDataAll, validDays, checkToday};