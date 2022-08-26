const Mock = require('better-mock')
const Random = Mock.Random
/**
 * 所有数据
 */
const realOne = 
	{	
		"id": "cf8aFFB0-7DE2-DAE4-7dE1-25aB9f9eFbF3",
		"detail": {
			"aname": "2022届毕业预热文艺晚会",
			"school": "武汉大学",
			"orgn": "武大网安学生会",
			"target": "武汉大学全体学生",
			"start_time": "2022-06-20 --:--:--",
			"end_time": "--",
			"location": "图书馆报告厅",
			"contact_person": "",
			"tel": "",
			"detailurl": "../../static/qrcode/qrcode_1.png",
			"groupurl": "../../static/qrcode/qrcode_2.png",
			"content": "毕业预热文艺晚会将在正式毕业典礼前一晚举办。不同于以往正式的晚会形式，本次预热晚会在班级集体节目和个人、组合节目表演的同时，会安排更多的互动游戏与即兴环节。",
			"status": 1,
			"totaln": "--",
			"currn": 20,
			"stop_time": "2022-06-01 23:59:59"
		},
	}


const unkeyData =  Mock.mock({"data|20": 
	[
		{
			"id": "@guid",
			"detail": {
				"aname": "@ctitle",
				"school": /(武汉大学|华中科技大学)/,
				"orgn": function() {
					if(this.school === '武汉大学') {
						return '武大网安'+Random.pick(['学生会','研究生会','团委'])
					} else {
						return '华科网安'+Random.pick(['学生会','研究生会','团委'])
					}
				},
				"target": function() {
					if(this.school === '武汉大学') {
						return '武大网安全体'+Random.pick(['本科生','研究生','学生'])
					} else {
						return '华科网安全体'+Random.pick(['本科生','研究生','学生'])
					}
				},
				"start_time|1": ["2022-"+"@datetime('MM-dd HH:mm:ss')", "2022-"+"@date('MM-dd')"+" --:--:--"],
				"end_time|1": ["2022-"+"@datetime('MM-dd HH:mm:ss')", "2022-"+"@date('MM-dd')"+" --:--:--","--"],
				"location": /(图书馆报告厅)|(操场)|(一|二)食堂|(新珈楼|明德楼)[1-4]0[1-9]/,
				"contact_person|1": [""|"@cname"],
				"tel|1": ["",/1\d{10}/],
				"detailurl": "",
				"groupurl": "",
				"content": "@cparagraph(0,3)",
				"status|1": [0,1],
				"totaln|1": ["@integer(10,50)","--"],
				"currn": function() {
					if(this.totaln=='--') {
						return Random.integer(10,40);
					} else {
						return this.totaln - Random.integer(0,9);
					}
				},
				"stop_time": "2022-"+"@datetime('MM-dd HH:mm:ss')"
			}
		}
	]
}).data;

unkeyData.unshift(realOne);


const allData = {}; // 所有数据
const briefData = {}; // 简要数据


// 把初始化的数据全部变成键值对象
// 同时生成简要数据
unkeyData.forEach((item)=>{
	allData[item.id] = item.detail;
	allData[item.id]["id"] = item.id;
	let briefinfo = {
		"id": item.id,
		"aname": item.detail.aname,
		"school": item.detail.school,
		"orgn": item.detail.orgn,
		"target": item.detail.target,
		"stop_time": item.detail.stop_time,
		"start_time": item.detail.start_time,
		"status": item.detail.status
	};
	briefData[item.id] = briefinfo;
});




/**
 * 用户报名：id
 */
// const joinData = {};
const joinkey = [];
for (let i = 0; i < 5; i++) {
	joinkey.push(Random.pick(Object.keys(allData)));
}
// joinkey.forEach((key)=>{
// 	joinData[key] = briefData[key];
// });


/**
 * 用户收藏
 */

const starkey = [];
for (let i = 0; i < 4; i++) {
	starkey.push(Random.pick(Object.keys(allData)));
}

/**
 * 筛选函数
 * @param {String} data_type
 * @param {Number} schoolid 0代表所有，1代表武大，2代表华科
 * @param {Number} statusid 0代表进行中，1代表已结束
 */
function selectData(data_type, schoolid, statusid) {
	let data;
	switch(data_type) {
		case 'join':
			data = {};
			joinkey.forEach((key)=>{
				data[key] = briefData[key];
			});			
			break;
		case 'star':
			data = {};
			starkey.forEach((key)=>{
				data[key] = briefData[key];
			});
			break;
		default:
			data = briefData;
			break;
	}
	let selected = []; // 注意是存成列表
	Object.keys(data).forEach((item)=>{
		let detail = data[item];
		if (schoolid == 0) {
			if (detail.status == statusid) {
				selected.push(detail);
			}
		} else {
			if (schoolid == 1 && detail.school == '武汉大学') {
				if (detail.status == statusid) {
					selected.push(detail);
				}
			} else if (schoolid == 2 && detail.school == '华中科技大学') {
				if (detail.status == statusid) {
					selected.push(detail);
				}
			}
		}
	});
	return selected; // 返回的是列表
}

/**
 * 详情
 * 
 */
function getDetail(id) {
	let detail = allData[id];
	let star = (starkey.indexOf(id) > -1)? 1 : 0;
	let join = (joinkey.indexOf(id) > -1)? 1 : 0;
	let response = {
		id: id,
		detail: detail,
		star: star,
		join: join
	}
	return response;
}

/**
 * 活动报名
 */
function joinActivity(id, tel) {
	// 暂不处理tel
	if(allData[id].status == 1){
		return false;
	}
	// 1. 加入到joinData中
	joinkey.push(id);
	// 2. allData里相应的人数加1
	// 如果人数已满（totaln!=='--'&&currn==totaln），则status设为1
	allData[id].currn++;
	if( allData[id].totaln!=='--' && allData[id].currn == allData[id].totaln) {
		allData[id].status = 1;
	// （briefData做相应处理）
		briefData[id].status = 1;
	}
	return true;
}

/**
 * 撤销报名
 * @param {*} id 
 */
function cancelJoin(id) {
	// 1. 从joinData中删除id
	let idx = -1;
	for(let i = 0; i < joinkey.length; i++) {
		if(joinkey[i] == id) {
			idx = i;
			break;
		}
	}
	if(idx == -1) {
		return false;
	}
	joinkey.splice(idx, idx);
	// 2. allData里相应的人数减1
	// status设为0
	allData[id].currn--;
	allData[id].status = 0;
	briefData[id].status = 0;
	
	return true;
}



/**
 * 收藏
 */
function starActivity(id) {
	starkey.push(id);
	return true;
}

/**
 * 取消收藏
 */
function unStarActivity(id) {
	let idx = -1;
	for(let i = 0; i < starkey.length; i++) {
		if(starkey[i] == id) {
			idx = i;
			break;
		}
	}
	if(idx == -1) {
		return false;
	}
	starkey.splice(idx, idx);
	return true;
}


module.exports  = {selectData, getDetail, joinActivity, cancelJoin, starActivity, unStarActivity};

