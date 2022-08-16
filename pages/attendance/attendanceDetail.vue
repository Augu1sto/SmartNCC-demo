<template>
	<view>
		<view class="header">
		</view>
		<view class="cal_box">
			<uni-calendar class="at"
				:insert="true"
				:disable-before="true"
				:start-date="startDate"
				:end-date="endDate"
				:showMonth="false"
				:selected=checkList
			@change="change" />
		</view>
		<view class="detail">
			<view class="detail_header">
				<view class="box1">
					详细信息
				</view>
				<view class="box2">
					{{pickDate.fulldate}}
				</view>
			</view>
			<!-- for test 没有那么多数据的情况下，缺数据 -->
			<u-empty v-if="$u.test.isEmpty(testData[pickDate.fulldate])"
				mode="data"
			    text="数据有待导入中"
			></u-empty>
			<view v-else class="detail_content">
				<u-alert v-if="(!pickDate.lunar.isToday)&&(!testData[pickDate.fulldate].isValid)" type = "warning" description = "缺卡, 前往补卡>>" :showIcon="true" @click="goToCheck"></u-alert>
				<!-- 这里缺打卡数据是因为没有打卡 -->
				<u-empty v-if="$u.test.isEmpty(testData[pickDate.fulldate].timeList)"
					mode="list"
				    text="无打卡数据"
				></u-empty>
				<view class="detail_item" v-for="(item,index) in testData[pickDate.fulldate].timeList" :key="index">
					<u-cell :title="item.time" :label="item.location">
						<view
							slot="value"
							class="u-slot-title"
						>
							<u-tag v-if="item.isValid"
								text="有效"
								plain
								size="mini"
								type="success"
							></u-tag>
							<u-tag v-else
								text="无效"
								plain
								size="mini"
								type="warning"
							></u-tag>
						</view>
					</u-cell>
				</view>
			</view>
			
		</view>

	</view>
</template>

<script>
	import {
		uniCalendar
	} from "@/uni_modules/uni-calendar/components/uni-calendar/uni-calendar";
	
	const mDate = require("@/utils/mytime.js");
	
	export default {
		data() {
			return {
				startDate: mDate.calcDate(-30), // 查询1个月的信息
				endDate: mDate.toDayDate(),
				pickDate:{ fulldate:mDate.toDayDate(), lunar:{isToday: true}},
				checkList: [],
				testData: {}
			}
		},
		onLoad() {
			this.fetchInitialData();
		},
		methods: {
			fetchInitialData() {
				let _this = this;
				uni.showLoading({
					title: "正在加载"
				})
				// 获得有效日列表
				this.$axios.get('/attendance/fetchValidDate').then((res)=>{
					console.log(res);
					if(res.status===200) {
						res.data.forEach((item)=>{
							_this.checkList.push({
								date: item,
								info: ''
							});
						});
						
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
				// 获得所有数据
				this.$axios.get('/attendance/fetchAll').then((res)=>{
				
					console.log(res);
					if(res.status===200) {
						//console.log(res.data);
						let d = JSON.stringify(res.data);
						_this.testData = JSON.parse(d);
						// console.log(JSON.stringify(_this.testData));
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
			change(e) {
				this.pickDate = e;
				this.$forceUpdate();
				// console.log(this.testData);
				console.log(JSON.stringify(this.checkList));
				console.log(e);
			}, 
			goToCheck() {
				uni.$u.toast("功能开发中");
			}
		}
	}
</script>

<style lang="scss">
	
	/**
	 * 其他
	 */
	.header {
		width: 100%;
		height: 30px;
		background-color: $theme-color;
	}
	/**
	 * 日历
	 * 更多见App.vue
	 */
	.cal_box {
		width: 90%;
		margin: auto;
		margin-top: -30px;
		border-radius: 20px;
		box-shadow: 5px 5px 10px #c8c8c8;
	}
	
	/**
	 * 详细信息列表
	 */
	.detail {
		width: 95%;
		margin: 10px auto;
		margin-bottom: 30px;
	}
	.detail>.detail_header {
		width: 90%;
		margin: auto;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-end;
		margin-bottom: 10px;
	}
	
	.detail>.detail_header>.box1 { // 详细信息
		font-size: 18px;
		font-weight: 600;
		color: $theme-color;
	}
	
	.detail>.detail_header>.box2 { // 日期
		color: #333333;
	}
	

	.detail>.detail_content {
		display: flex;
		flex-direction: column;
	}
	
	
	.detail>.detail_content>.detail_item { // 始终在最上面
		background-color: white;
	}

	


</style>
