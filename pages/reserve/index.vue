<template>
	<view class="main">
		<u-popup :show="show" mode="center" customStyle="border-radius: 15px;">
			<view class="u-popup-slot">
				<view class="popup-title"><h2>预约需知</h2></view>
				<view class="popup-content">
					<ol>
						<li>请提前一天预约</li>
						<li>只能预约一周内的教室</li>
						<li>一次最多预约一个时段</li>
						<li>预约成功后，请凭预约凭证（<span class="strong">【首页】-【用户中心】-【预约凭证】</span>）在预约前半小时内去A209找管理员开门</li>
						<!-- <li>如果计划改变不用教室，请提前取消</li> -->
						<li>请保持教室卫生</li>
						<li>如有问题，请联系159xxxxxxxx（x老师）</li>
					</ol>
				</view>
				<u-button
					color="#00adb5" 
					text="我知道了"
					customStyle="width: 200rpx"
					@click="show = !show"
				></u-button>
			</view>
		</u-popup>
		<view class="header">
			<view class="blank" v-if="preDisable"></view>
			<view v-else class="pre preDay" @click="toPreDay"><u-icon name="rewind-left-fill" color="#eeeeee" size="15"></u-icon><text>前一天</text></view>
			<view class="pickDate">
				<text @click="showCal=true">{{chosenDate}}</text>
				<u-calendar
					color="#00adb5"
					rowHeight=50
					round=10
					monthNum=2
					:minDate="minDate"
					:maxDate="maxDate"
					:showMark="false"
					:show="showCal"
					:defaultDate="chosenDate"
					@confirm="confirm"
					@close="showCal = !showCal"
						></u-calendar>

			</view>
			<view class="blank" v-if="nextDisable"></view>
			<view v-else class="nextDay" @click="toNextDay"><text>后一天</text><u-icon name="rewind-right-fill" color="#eeeeee" size="15"></u-icon></view>
		</view> 
		<view class="body">
			<view class="building">
				<city theme="filled" size="24" fill="#00adb5"/>
				<h3 class="btitle">{{currentBuilding.name}}</h3>
				<span class="change" @click="change"><switch-icon theme="filled" size="14" fill="#00adb5"/>切换</span>
			</view>
			
			<view class="area">
				<view v-if="$u.test.isEmpty(currentBuilding.area)"
				style="height:calc(100vh - 400rpx);display: flex;align-items: center;justify-content: center;">
					<u-empty
						mode="data"
					    text="暂无数据"
					>
					</u-empty>
				</view>
				<view v-else class="areaList">
					<view class="areaItem" v-for="(item,index) in currentBuilding.area" :key="index">
						<view class="itemHeader" @click="showMoreDetail(index)">
							<span>{{item.name}}</span>
							<u-icon name="arrow-up" v-if="showMore[index]" color="white" key="1"></u-icon>
							<u-icon v-else name="arrow-down" color="white" key="2"></u-icon>
						</view>
						<view class="itemContent">
							<view class="briefInfo">
								<text>上午：{{item.brief[0]}}</text>
								<text>下午：{{item.brief[1]}}</text>
								<text>晚上：{{item.brief[2]}}</text>
							</view>
							<transition name="collapse">
								<view v-if="showMore[index]">
									<view class="detailInfo">
										<u-line></u-line>
										<view class="detailTitle">
											预定详情
										</view>
										<view class="detailList">
											<u-line></u-line>
											<view class="smallTitle">
												<text>教室</text>
												<text>上午</text>
												<text>下午</text>
												<text>晚上</text>
											</view>
											<view class="detailItem" v-for="(item0, index0) in item.classroomList" :key="item0.id">
												<text class="roomName">{{item0.classroom}}</text>
												<view :class="'timeBox ' + (time.isChosen===true?'chosen_box ':'') + time.status"
													 v-for="(time, index1) in item0.timeList"
													:key="time.id"
													@click="chooseTime(time, item0.id)"
												>
													<view>{{time.startTime}}</view>
													<view style="line-height: 10px;">-</view>
													<view>{{time.endTime}}</view>
													<view class="chosen_status" v-if="time.isChosen===true">
														<u-icon
															name="checkmark"
															color="#ffffff"
															size="10"
														></u-icon>
													</view>
												</view>
											</view>
										</view>
										<view class="footer">
											<view class="tips">
												<view>可预约</view>
												<view>不可约</view>
												<view>已选择</view>
											</view>
											<u-button color="#00adb5" size="small" text="确认预约" @click="submit"></u-button>
										</view>

									</view>
								</view>
							</transition>
						</view>
					
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import {City, Switch as SwitchIcon} from '@icon-park/vue';
	const mDate = require('@/utils/mytime.js');
	export default {
		components: {
			City,
			SwitchIcon
		},
		data() {
			return {
				show: true,
				showCal: false,
				showMore: [],
				preDisable: true,
				nextDisable: false,
				minDate: mDate.nextDate(),
				maxDate: mDate.calcDate(7),
				chosenDate: mDate.nextDate(),
				chosenTime: [],//{roomName:'',timeName:''}
				chosenArea: '',
				tBuilding : [],
				currentBuilding: {}
			}
		},
		watch: {
			chosenDate(newDate){
				this.fetchInitialData(newDate);
			}
		},
		onLoad() {
			this.fetchInitialData();
		},

		methods: {
			fetchInitialData(chosen_date) {
				let _this = this;
				uni.showLoading({
					title: "正在加载"
				})
				let req = {
					date: chosen_date||mDate.nextDate()
				}
				this.$axios.get('/reserve/getRsvbyDate', {params:req}).then((res)=>{
			
					console.log(res);
					if(res.status===200) {
						console.log(res.data);
						_this.tBuilding = res.data;
						_this.currentBuilding = _this.tBuilding[0];
						_this.initialData();
						uni.hideLoading();
						
					} else {
						uni.hideLoading();
						uni.showToast({
							title: res.statusText,
							icon: 'none'
						})
					}
				}).catch((err)=>{
					console.log(err);
					uni.hideLoading();
					uni.showToast({
						title: '网络故障',
						icon: 'error'
					})
				});
			},
			initialData() {
				this.chosenArea = '';
				this.showMore = [];
				this.chosenTime = [];
				this.currentBuilding.area.forEach(a=>{
					// console.log(JSON.stringify(a));
					if(a.classroomList) a.classroomList.forEach(c=>{
						if(c.timeList) c.timeList.forEach(time=>{
							time.isChosen = false;
						});
					});
				});

			},



			confirm(e) {
				this.chosenDate = e[0];
				if(this.chosenDate===this.minDate) {
					this.preDisable=true;
				} else {
					this.preDisable=false;
				}
				if(this.chosenDate===this.maxDate) {
					this.nextDisable=true;
				} else {
					this.nextDisable=false;
				}
				this.showCal = false;
			},
			toPreDay() {
				if(this.chosenDate>this.minDate) {
					this.chosenDate=mDate.prevDate(this.chosenDate);
					this.nextDisable=false;
				}
				if(this.chosenDate===this.minDate) {
					this.preDisable=true;
				}
			},
			toNextDay() {
				if(this.chosenDate<this.maxDate) {
					this.chosenDate=mDate.nextDate(this.chosenDate);
					this.preDisable=false;
				}
				if(this.chosenDate===this.maxDate) {
					this.nextDisable=true;
				}
			},
			change() {
				// 切换教学楼
				if(JSON.stringify(this.currentBuilding)===JSON.stringify(this.tBuilding[0])) {
					// 对象，不能用==/===直接比较
					this.currentBuilding=this.tBuilding[1];
					console.log(uni.$u.test.isEmpty(this.currentBuilding.area));
					
				} else {
					this.currentBuilding=this.tBuilding[0];
					console.log(this.currentBuilding.name);
				}
				this.initialData();
			},
			showMoreDetail(index) {
				// 展开区域信息
				// if(this.showMore[index]===true) {
				// 	this.$set(this.showMore,index,false);
				// 	this.chosenArea = '';
					
				// } else {
				// 	// 折叠其他所有区域
				// 	for(let i = 0; i< this.showMore.length; i++) {
				// 		this.showMore[i] = false;
				// 	}
				// 	this.$set(this.showMore,index,true);
				// 	this.chosenArea = index;
				// }
				// 折叠其他所有区域
				if(this.showMore[index]===true) {
					this.$set(this.showMore,index,false);
				} else {
					this.$set(this.showMore,index,true);
				}
				for(let i = 0; i< this.showMore.length; i++) {
					if(i!=index) this.showMore[i] = false;
				}
				this.chosenTime.forEach(item=>{
					let room = item.roomID;
					let time = item.timeID;
					this.currentBuilding.area[this.chosenArea].classroomList[room].timeList[time].isChosen=false;
				});
				this.chosenTime = [];
				this.chosenArea = '';
				this.chosenArea = index;
				this.$forceUpdate();
			},
			
			chooseTime(time, roomidx) {
				// console.log(JSON.stringify(time));
				if(time.isChosen===true) {
					time.isChosen=false;
					for(let i=0; i<this.chosenTime.length; i++) {
						console.log(JSON.stringify(this.chosenTime[i]));
						console.log(this.chosenTime[i].timeId===time.id);
						console.log(time.id);
						if(this.chosenTime[i].roomID===roomidx&&this.chosenTime[i].timeID===time.id) {
							console.log("ok");
							this.chosenTime.splice(i,i+1);
						}
					}
					
				} else if(time.status==="available") {
					// console.log(JSON.stringify(time));
					if(this.chosenTime.length>=2) {
						uni.showToast({
							title: "最多预约两个时段",
							icon: "none"
						});
						return;
					}
					time.isChosen=true;
					this.chosenTime.push({
						roomID: roomidx,
						timeID: time.id
					});
					
				}
				this.$forceUpdate();
				console.log(JSON.stringify(this.chosenTime));
			},
			/**
			 * 确认预约
			 */
			submit() {
				if(uni.$u.test.isEmpty(this.chosenTime)) {
					uni.showToast({
						title: '请选择时间段'
					});
				} else {
					this.postData();
				}
				
			},
			
			postData() {
				let _this = this;
				uni.showLoading({
					title: "提交中"
				})
				let req = {
					bid: 0,
					date: this.chosenDate,
					areaid: this.chosenArea,
					time: this.chosenTime
				}
				this.$axios.post('/reserve', {data:req}).then((res)=>{
					console.log(res);
					if(res.status===200&&res.data) {
						console.log(res.data);
						uni.hideLoading();
						uni.showToast({
							title: "预约成功",
							icon: 'none',
							duration: 3000,
							complete: uni.redirectTo({
								url: '../usercenter/reservation'
							})
						});
						// 跳转或刷新页面
					} else {
						uni.hideLoading();
						uni.showToast({
							title: res.statusText,
							icon: 'none'
						})
					}
				}).catch((err)=>{
					console.log(err);
					uni.hideLoading();
					uni.showToast({
						title: '网络故障',
						icon: 'error'
					})
				});
			}

		}
	}
</script>

<style lang="scss">
	.u-popup-slot {
		display: flex;
		flex-direction: column;
		width: 250px;
		height: 400px;
		background-color: white;
		justify-content: space-evenly;
		align-items: center;
		flex-wrap: wrap;
		border-radius: 15px;
		box-shadow: 0 0 10px #dddddd;
	}
	
	.popup-content {
		padding-right: 15px;
	}
	
	.strong {
		color: $theme-color;
	}

	
	.header {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		// justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 80rpx;
		background-color: $theme-color;
		box-shadow: 0 2px 2px #dddddd;
		
	}
	
	.preDay, .nextDay, .blank{
		height: 80rpx;
		line-height: 80rpx;
		padding: 0 10px;
		flex: 1;
		text-align: center;
		color: #eeeeee;
		// display: flex;
	}
	
	.header .u-icon {
		display: inline-block;
		margin: 5px;
	}
	
	.preDay:active, .nextDay:active {
		background-color: rgba(240, 240, 240, 0.5);
	}
	
	.pickDate {
		background-color: #eeeeee;
		height: 60rpx;
		line-height: 60rpx;
		padding: 0 10rpx;
		border-radius: 40rpx;
		box-shadow: inset 5rpx 5rpx 10rpx #dddddd;
		color: #555555;
		flex: 1;
		text-align: center;
		margin: auto 10px;
	}
	
	.pickDate:hover {
		background-color: #dddddd;
		box-shadow: inset 5rpx 5rpx 10rpx #cccccc;
	}
	
	// 变灰
	// .preDay-disable, .nextDay-disable {
	// 	color: #888888;
	// }
	
	.body {
		width: 90%;
		margin: 20rpx auto;
	}
	
	.building {
		box-sizing:border-box;
		width: 100%;
		border-radius: 8px;
		background-color: white;
		box-shadow: 0 0 5px desaturate($theme-color,40%);
		height: 40px;
		line-height: 40px;
		padding-left: 10px;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
	
	.building:active{
		background-color: #cccccc;
	}
	
	.btitle {
		margin-left: 5px;
	}
	
	.change {
		color: $theme-color;
		margin-right: 10px;
		position: absolute;
		right: 5%;
	}
	.area {
		// background-color: red; // for dev
		margin-top: 10px;
	}
	
	.areaItem {
		background-color: white;
		// padding: 10px;
		box-sizing:border-box;
		border-radius: 8px;
		box-shadow: 0 0 5px desaturate($theme-color,40%);
		margin-bottom: 20px;
		overflow-y: hidden;
	}
	
	.areaItem>.itemHeader {
		// background-image: linear-gradient(to bottom, $theme-color 50%, desaturate($theme-color,20%));
		background: linear-gradient(
			135deg, 
			$theme-color 0, 
			$theme-color 80%, 
			desaturate($theme-color,40%) 80%, 
			desaturate($theme-color,40%) calc(80% + 10px),
			$theme-color calc(80% + 10px),
			$theme-color calc(80% + 20px),
			desaturate($theme-color,40%) calc(80% + 20px),
			desaturate($theme-color,40%) calc(80% + 45px),
			$theme-color calc(80% + 45px)
			);
		border-radius: 8px;
		padding: 10px;
		padding-left: 20px;
		color: white;
		font-size: 18px;
		font-weight: bold;
		letter-spacing: 5px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	/**
	 * collapse过渡动画
	 */
	.collapse-leave-active,.collapse-enter-active {
		transition: max-height 0.5s ease;
	}
	.collapse-enter,.collapse-leave-to {
		max-height: 0px ;
	}
	.collapse-enter-to,.collapse-leave {
		max-height: 700px ;
	}


	.briefInfo {
		padding: 3px 20px;
		font-size: 13px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		color: #555555;
		box-sizing: content-box;
	}
	
	.detailInfo {
		padding: 5px 10px;
	}
	
	
	.detailTitle {
		font-weight: bold;
		height: 30px;
		line-height: 30px;
	}
	.detailList {
		padding: 0 5px;
	}
	
	.smallTitle {
		display: grid;
		grid-template-columns: 1fr 2fr 4fr 2fr;
		justify-items: center;
		align-items: center;
	}
	
	.detailItem {
		display: grid;
		grid-template-columns: 1fr 2fr 2fr 2fr 2fr;
		justify-items: center;
		align-items: center;
		column-gap: 5px;
		margin-top: 5px;
	}
	
	.roomName {
		color: white;
		background-color: $theme-color;
		border-radius: 10px;
		padding: 2px 4px;
	}
	
	
	.timeBox, .available {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 2px 5px;
		border-radius: 5px;
		border: 1px solid #dddddd;
		// box-sizing: border-box;
		position: relative;
		// box-shadow: 0 0 5px $theme-color;
	}
	
	.busy {
		color: #555555;
		background-color: #dddddd;
	}
	
	.chosen_box {
		box-shadow: 0 0 5px $theme-color;
	}
	

	.chosen_status {
		// 定位在右上角
		position: absolute;
		right: 0;
		top: 0;
		// 画背景三角形
		border-style: solid;
		border-color: $theme-color $theme-color transparent transparent;
		border-width: 9px;
		// 定位中间的图标
		display: flex;
		justify-content: flex-start;
		align-items: flex-end;
	}

	.chosen_status>.u-icon {
		position: absolute;
		transform: scale(0.9);
		right: -9px;
		top: -9px;		
	}
	
	.footer {
		padding: 10px 3px 3px 3px;	
		display: grid;
		grid-template-columns: 2fr 1fr;
		column-gap: 5px;
		align-items: center;
	}
	
	.tips {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
	}
	.tips>view {
		font-size: 5px;
		padding: 2px 5px;
		color: #555555;
		border-radius: 5px;
		border: 1px solid #dddddd;
	}
		
	// .tips>view:nth-child(1) {
		
	// }
	
	.tips>view:nth-child(2) {
		background-color: #dddddd;
	}
	
	.tips>view:nth-child(3) {
		box-shadow: 0 0 3px $theme-color;
	}
	
	.check_btn {
		width: 25px;
		// text-align: center;
	}
	
</style>
