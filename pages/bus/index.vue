<template>
	<view class="main">
		<view class="header">
			<text>校车时间表</text>
			<my-popover :itemList="daylist" :chosenNumber="dayidx" activeColor="#00adb5" bgColor="transparent" @choose="chooseDay">
				<down theme="outline" size="18" fill="white" :strokeWidth="4" strokeLinejoin="miter"/>
			</my-popover>
		</view>
		<view class="content">
			<view class="choose_box">
				<view class="tipbox tip1"><span>起点</span></view>
				<view class="fix" :style="{order: -flexOrder}">基地</view>
				<view class="change_btn" @click="change">
					<switch-icon theme="filled" size="16" :strokeWidth="5" fill="white"/>
				</view>
				<view class="choose_btn" :style="{order: flexOrder}">
					<my-popover :itemList="items" :chosenNumber="chosen" activeColor="#00adb5" @choose="choose">
						<down theme="outline" size="18" fill="#333" :strokeWidth="4" strokeLinejoin="miter"/>
					</my-popover>
				</view>
				<view class="tipbox tip2"><span>终点</span></view>
			</view>
			<view class="time-table">
				<view class="time-table-header">
					
				</view>
				<view v-for="(item, index) in thedata" :key="index" :class="['time-table-detail', (today===dayidx&&timeNow<=item.time)?'':'filter']" >
					<view class="blank_box"></view>
					<view class="detail-box">
						<view class="location location1">
							{{item.start}}
						</view>
						<view class="timeclock">
							{{item.time}}
						</view>
						<view class="location location2">
							{{item.end}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import myPopover from '@/components/myPopover/myPopover.vue';
	import {Down,Switch as SwitchIcon} from '@icon-park/vue'
	export default {
		components: {
			myPopover,
			Down,
			SwitchIcon
		},
		data() {
			return {
				daylist: ['工作日','周末'],
				dayidx: 0,
				items: ['武大','华科'],
				chosen: 0,
				flexOrder: 1,
				thedata: [],
				today: 0, // 0代表今天是工作日，1代表是周末
				timeNow: '00:00',
				timer: null
			}
		},
		onLoad() {
			let day = new Date().getDay();
			this.today = ((day===0||day===6)?1:0);
			this.dayidx = this.today;
			this.fetchInitialData();
		},
		mounted() {
			let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
			this.timer = setInterval(() => {
			  _this.timeNow = new Date().toString().substring(16,21); // 修改数据
			  // console.log(_this.timeNow);
			}, 6000);
		},
		beforeDestroy() {
			if (this.timer) {
				clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
			}
		},
		methods: {
			fetchInitialData(){
				this.fetchData();
				this.timeNow = new Date().toString().substring(16,21);
			},
			fetchData(){
				let _this = this;
				uni.showLoading({
					title: "正在加载"
				})
				let req = {
					sidx: this.chosen,
					dayidx: this.dayidx,
					diridx: this.flexOrder===1?0:1
				};
				this.$axios.get('/bus', {params:req}).then((res)=>{
							
					// console.log(res);
					if(res.status===200) {
						console.log(+res.data);
						this.thedata = JSON.parse(JSON.stringify(res.data));
						console.log(JSON.stringify(this.thedata));
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
			
			change() {
				this.flexOrder *= -1;
				this.fetchData();
			},
			
			chooseDay(index) {
				this.dayidx = index;
				this.fetchData();
			},
			
			choose(index) {
				this.chosen=index;
				this.fetchData();
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $theme-color;
		height: 100%;
	}
	.main {
		margin: 0;
		height: 100%;
		
	}
	.header {
		height: 50px;
		color: white;

		display: flex;
		justify-content: flex-start;
		align-items: flex-end;
		background-image: url('@/static/bus.png');
		background-size: contain;
		background-repeat: no-repeat;
		background-position: 90%;
	}
	
	.header>text{
		font-size: 18px;
		font-weight: bold;
		margin-left: 8%;
		margin-bottom: 5px;
	}
	
	.header>.my-popover {
		margin: 0;
		margin-left: 10px;
	}
	
	.content {
		box-sizing: border-box;
		background-color: white;
		width: 93%;
		height: calc(100% - 50px);
		margin: auto;
		border-top-left-radius: 30px;
		border-top-right-radius: 30px;
		// padding: 20px;
		padding-top: 10px;
		
	}
	
	.choose_box {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		color: #333;
		font-size: 16px;
		font-weight: 600;
		
	}
	
	.fix {
		// order: -1;
		flex: 2;
		text-align: center
	}
	
	.change_btn {
		order: 0;
		flex: 1;
		text-align: center;
	}
	
	.change_btn>.i-icon {
		background-color: #fbb03b;
		padding: 8px;
		border-radius: 50%;
	}
	
	.change_btn:active>.i-icon {
		-webkit-filter: brightness(1.2);
		filter: brightness(1.2);
	}
	
	.choose_btn {
		// order: 1;
		flex: 2;
	}
	
	.tipbox {
		font-size: 12px;
		line-height: 12px;
		font-weight: lighter;
		padding: 2px;
		color: white;
		background-color: $theme-color;
		padding: 4px;
	}
	
	.tip1 {
		order: -2;
		padding-left: 20px;
		border-radius: 0 12px 12px 0;
	}
	
	.tip2 {
		order: 2;
		padding-right:20px;
		border-radius: 12px 0 0 12px;
	}
	
	
	.time-table {
		// background-color: aquamarine; // for test
		width: 90%;
		margin: 10px auto;
		padding-top: 10%;
	}
	
	.time-table-detail {
		--main-color: #00adb5;
	}
	
	.filter {
		filter: grayscale(1);
	}
	
	.time-table-detail>.blank_box{
		height: 50px;
		background-color: var(--main-color);
		width: 2px;
		margin: auto;
		position: relative;
	}
	

	.time-table-detail>.blank_box::before{
		content: '';
		background-color: var(--main-color);
		position: absolute;
		width: 10px;
		bottom: 0px;
		left: -4px;
		height: 10px;
		border-radius: 50%;
	}
	
	.time-table-detail:nth-of-type(2)>.blank_box {
		display: none;
	}
	
	

	.time-table-detail>.detail-box {
		display: grid;
		grid-template-columns: 2fr 2fr 2fr;
		align-items: center;
		justify-items: center;

	}
	
	.time-table-detail>.detail-box>.timeclock{
		border-radius: 10px;
		background-color: var(--main-color);
		padding: 0 5px 0 5px;
		font-size: 14px;
		color: white;
	}
	
	.time-table-detail>.detail-box>.location {
		color: var(--main-color);
		text-align: center;
	}
	
	
	
</style>
