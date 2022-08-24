<template>
	<view class="main">
		<view class="header">
			<u-subsection :list="list" mode="button" :current="curNow" @change="sectionChange" inactiveColor="white" activeColor="#00adb5" bgColor="#00adb5"></u-subsection>
		</view>
		<view class="content">
			<view :class="'content_box'+ (curNow===1?' used':'')" v-for="(item,index) in info" :key="index" v-if="item.status===curNow">
				<text><strong>日期：</strong>{{item.date}}</text>
				<text><strong>教学楼：</strong>{{item.location}}</text>
				<text><strong>预约信息：</strong>{{item.detail}}</text>	
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: ["已预约","已使用"],
				curNow: 0,
				info: []
			}
		},
		onLoad() {
			this.fetchInitailData();
		},
		methods: {
			fetchInitailData() {
				let _this = this;
				uni.showLoading({
					title: "正在加载"
				})
				this.$axios.get('/reservation').then((res)=>{
					// console.log(res);
					if(res.status===200) {
						console.log(res.data);
						_this.info = res.data;
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
			sectionChange(index) {
				this.curNow = index;
				this.$forceUpdate();
			}
		}
	}
</script>

<style lang="scss">
	.header {
		padding: 5px 10px;
		background-color: #00adb5;
	}
	.content {
		width: 90%;
		margin: 10px auto;
	}
	.content_box {
		display: flex;
		flex-direction: column;
		background-color: white;
		margin-bottom: 10px;
		padding: 15px;
		border-radius: 5px;
		border: $theme-color 1px solid;
		font-size: 14px;
		color: #333333;
	}
	
	.used {
		border: #aaaaaa 1px solid;
		color: #aaaaaa;
	}

</style>
