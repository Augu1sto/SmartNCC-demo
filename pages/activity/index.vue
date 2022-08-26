<template>
	<view class="main">
		<u-sticky zIndex="100">
			<view style="background-color: #fff;">
				<view class="pickerbox">
					<view style="color: #999;font-weight: bold;">所属学校</view>
					<view>
						<my-popover :itemList="items" :chosenNumber="chosen" activeColor="#00adb5" :width='150' @choose="choose">
							<down theme="outline" size="18" fill="#333" :strokeWidth="4" strokeLinejoin="miter"/>
						</my-popover>
					</view>

				</view>
				<view style="padding: 10px;">
					<u-subsection :list="sublist" :current="subindex" @change="sectionChange" activeColor="#00adb5">
					</u-subsection>
				</view>
			</view>
		</u-sticky>
		<view class="content" style="margin-bottom: 80px;">
			<view :class="['cardbox',subindex===1?'finished':'']" v-for="(item, index) in data" :key="item.id" @click="goToDetail(item.id)">
				<!-- 印章效果 -->
				<view v-if="subindex===1" class="seal" style="position: absolute;right: 10rpx;top: 14rpx;">
					<view class="seal-son">
						<span>已结束</span>
					</view>
				</view>
				<view class="cardbox_title">
					{{item.aname}}
				</view>
				<view class="cardbox_detail">
					<view class="item">
						<view class="item_tips">活动组织</view>
						<view class="item_info">
							{{item.orgn}}
						</view>
					</view>
					<view class="item">
						<view class="item_tips">面向对象</view>
						<view class="item_info">
							{{item.target}}
						</view>
					</view>
					<view class="item">
						<view class="item_tips">报名截止时间</view>
						<view class="item_info">
							{{item.stop_time}}
						</view>
					</view>
					<view class="item">
						<view class="item_tips">活动时间</view>
						<view class="item_info">
							{{item.start_time}}
						</view>
					</view>
				</view>
			</view>
		</view>
		
		
		<myTabBar :tabList="tabs" :current="currNow" bgColor="white" activeColor="#00adb5" @choose="chooseTab">
		</myTabBar>
		
	</view>
</template>

<script>
	import myTabBar from '@/components/myTabBar/myTabBar.vue';
	import myPopover from '@/components/myPopover/myPopover.vue';
	import {Down,Switch as SwitchIcon} from '@icon-park/vue';
	export default {
		components: {
			myTabBar,
			myPopover,
			Down
		},
		data() {
			return {
				tabs: [
					{
						title: '活动列表',
						icon: 'fa-lines-leaning'
					},
					{
						title: '我的收藏',
						icon: 'fa-star'
					},
					{
						title: '我的报名',
						icon: 'fa-ticket'
					}
				],
				currNow: 0,
				items: ['全部','武汉大学','华中科技大学'],
				chosen: 0,
				sublist: ['进行中','已结束'],
				subindex: 0,
				data: []
			}
		},
		onShow(){
			this.fetchInitialData()
		},
		methods: {
			chooseTab(index) {
				// console.log(this.currNow);
				this.currNow = index;
				this.fetchInitialData();
				// console.log(JSON.stringify(this.data));
			},
			choose(index) {
				this.chosen = index;
				this.fetchInitialData();
			},
			sectionChange(index) {
				this.subindex = index;
				this.fetchInitialData();
			},
			fetchInitialData() {
				let _this = this;
				uni.showLoading({
					title: "正在加载"
				})
				let req = {
					type: ['all','star','join'][this.currNow],
					sidx: this.chosen,
					status: this.subindex
				}
				this.$axios.get('/activity/getList', {params:req}).then((res)=>{
			
					console.log(res);
					if(res.status===200) {
						// console.log(JSON.stringify(res.data));
						_this.data = res.data;
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
			goToDetail(id) {
				uni.navigateTo({
					url: './activityDetail?id='+id,
				})
			}
		}
	}
</script>

<style lang="scss">
	* {
		box-sizing: border-box;
	}
	.pickerbox {
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 5px 10px 5px 10px;
		border-bottom: #f1f1f1 1rpx solid;
	}
	
	.cardbox {
		width: 90%;
		background-color: white;
		margin: 10px auto;
		padding: 10px;
		border-radius: 10px;
		position: relative;
		&_title:before {
			content: '▮';
			font-size: 20px;
			margin-right: 8rpx;
			color: $theme-color;
		}
		&_title {
			font-size: 18px;
			font-weight: bolder;
			line-height: 30px;
			border-bottom: 1px solid #f1f1f1;
		}
		&_detail {
			padding: 5px;
			.item{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				&_tips {
					font-weight: bold;
				}
			}
		}
	}
	
	.cardbox:active {
		background-color: #B4B4B4;
	}
	
	.finished {
		filter: grayscale(1);
		color: gray;
	}
	.seal{
		width: 160rpx;
		height: 160rpx;
		border: solid 6rpx #B4B4B4;
		border-radius: 100%;
		background-color: rgba(255, 255, 255, 0.5);
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.seal-son{
		width: 145rpx;
		height: 145rpx;
		border: solid 2rpx #B4B4B4;
		border-radius: 100%;
		background-color: rgba(255, 255, 255, 0.5);
		position: relative;
		transform: rotate(45deg);
	}
	
	.seal-son>span {
		color: #B4B4B4;
		font-size: 22px;
		line-height: 145rpx;
		text-align: center;
	}
</style>
