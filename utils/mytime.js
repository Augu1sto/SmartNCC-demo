/**
 * myTime: time模块
 * @description 封装了一些需要用到的有关时间包括日期的方法
 */

module.exports = {
	error:'',
	/**
	 * @description 指定日期推算往前/往后第i天的日期
	 * @param {Num} i 往前或往后第i天（如果是往前推，则i为负数）
	 * @param {String||undefined} theDate （可选）基准时间，格式为'yyyy-MM-dd'；默认为当天日期
	 * @return {String} 日期字符串，格式为'yyyy-MM-dd'
	 */
	calcDate : function (i, theDate){
		if(theDate!==undefined) {
			var date = new Date(theDate);
		} else {
			var date = new Date(); // 今天
		}
		var seperator = "-"; // 必须有
		var tomorrow = date.setDate(date.getDate()+i);
		var day = date.getDate();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		return year+seperator+month.toString().padStart(2,"0")+seperator+day.toString().padStart(2,"0")+"";
	},
	/**
	 * @description 今天的日期，格式'yyyy-MM-dd'
	 */
	toDayDate : function() {return this.calcDate(0);},
	/**
	 * @description 指定日期的下一天，当参数为空时就是明天
	 * @param {String||undefined} theDate （可选）基准时间，格式为'yyyy-MM-dd'；默认为当天日期
	 * @return {String} 日期字符串，格式为'yyyy-MM-dd'
	 */
	nextDate : function (theDate) {
		return this.calcDate(1, theDate);
	},
	
	/**
	 * @description 指定日期的下一天，当参数为空时就是昨天
	 * @param {String||undefined} theDate （可选）基准时间，格式为'yyyy-MM-dd'；默认为当天日期
	 * @return {String} 日期字符串，格式为'yyyy-MM-dd'
	 */	
	prevDate : function (theDate) {
		return this.calcDate(-1, theDate);
	},
	
	/** 
	 * @description 计算当前时间到指定时间的时间间隔
	 * @param {String} startTime 指定时间，需要和当前时间在同一天且在当前时间之前，为'HH-mm-ss'格式
	 * @param {String||undefined} endTime  (可选) 结束时间；默认为当前时间
	 * @return {String} 时间间隔，为'HH-mm-ss'格式
	 */
	calcTimeDuration(startTime, endTime) {
		if(startTime==='') {
			return '';
		}
		// startTime为08:12:36格式
		var timeNow = new Date(); // 当前时间
		let gettheDate = timeNow.toLocaleDateString().replace('\/','-'); // 转换成本地日期 2022-08-12，获得了当前的日期
		let time1 = timeNow;
		if(endTime!==undefined) {
			time1 = new Date(gettheDate+' '+endTime);
		}
		let time0 = new Date(gettheDate+' '+startTime); // 拼接获得新的本地时间
		let df = new Date(time1-time0); // 两个本地时间相减，获得当前时间到startTime的时间差构成的日期
		let dd = df.toISOString().substring(11,19); // 注意要toISOString，不然会默认转换为本地时间
		return dd;
	}
}