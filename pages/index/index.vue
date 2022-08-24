<template>
	<view class="main">
		<view class="header">
			<image src="../../static/banner.png" mode="widthFix" class="banner"></image>
		</view>
		<view class="body">
			<view class="function">
				<swiper :indicator-dots="true" class="swiper">
					<swiper-item>
						<view class="mygrid">
							<view class="mygrid-item" v-for="(item, index) in swiperList" v-if="index<6" :key="item.id" @click="choose(item.url)">
								<u-icon :customStyle="{paddingTop:20+'rpx'}" :name="item.name" :size="30"></u-icon>
								<text class="grid-text">{{item.title}}</text>
							</view>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="mygrid">
							<view class="mygrid-item" v-for="(item, index) in swiperList" v-if="index>5" :key="item.id" @click="choose(item.url)">
								<u-icon :customStyle="{paddingTop:20+'rpx'}" :name="item.name" :size="30"></u-icon>
								<text class="grid-text">{{item.title}}</text>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		
			<view class="picbox">
				<u-swiper class="pickItem"
						:list="picList"
						keyName="image"
						showTitle
						indicator
						indicatorMode="line"
						circular
						@click="clickPic"
				></u-swiper>
			</view>
			
			<view class="exurls">
				<view class="title">
					<p class="titletext">外链直达</p>
				</view>
				<view class="exurls-box">
					<view class="exitem"
							v-for="(listItem,listIndex) in exurlList"
							:key="listIndex"
							@click="openUrl(listItem)"
					>
						<view class="url-box" :style="{backgroundImage: 'url('+listItem.image+')'}"></view>
						<text class="grid-text">{{listItem.title}}</text>
					</view>
				</view>
			</view>
		</view>

		

		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [
					{
						id: 1,
						name: 'chat',
						title: '基地论坛',
						url: '../bbs/index'
					},
					{
						id: 2,
						name: 'order',
						title: '教室预约',
						url: '../reserve/index'
					},
					{
						id: 3,
						name: 'edit-pen',
						title: '权益反馈',
						url: '../rights/index'
					},
					{
						id: 4,
						name: 'car',
						title: '校车查询',
						url: '../bus/index'
					},
					{
						id: 5,
						name: 'clock',
						title: '考勤记录',
						url: '../attendance/index'
					},
					{
						id: 6,
						name: 'grid',
						title: '校园活动',
						url: '../activity/index'
					},
					{
						id: 7,
						name: 'tags',
						title: '请假报备',
						url: '../leave/index'
					},
					{
						id: 8,
						name: 'map',
						title: '校园地图',
						url: '../map/index'
					},
					{
						id: 9,
						name: 'list-dot',
						title: '食堂菜单',
						url: '../food/index'
					}
				],
				
				picList: [
					{
						image: '../../static/0.png',
						title: '关于召开武汉大学国家网络安全学院第五次研究生代表大会的通知',
					},
					{
						image: '../../static/1.png',
						title: '武汉大学毕业预热文艺晚会向你发送了一封邀请函'
					},
					{
						image: '../../static/pic1.png',
						title: '关于召开武汉大学国家网络安全学院第五次研究生代表大会的通知'
					}
				],
				
				picUrl: [
					'',
					'../activity/activityDetail?id=cf8aFFB0-7DE2-DAE4-7dE1-25aB9f9eFbF3',
					''
				],
				
				
				exurlList: [
                    {
                        image: '../../static/expic1.png',
                        title: '武汉大学信息门户',
						url: 'https://cas.whu.edu.cn/authserver/login'
						
                    },
                    {
                        image: '../../static/expic2.png',
                        title: '华中科技大学信息门户',
						url: 'https://pass.hust.edu.cn/cas/login'
                    }			
				]
			
			}
		},

		methods: {

			choose(url) {
				console.log(url);
				if(url){
					uni.navigateTo({
						url: url
					});
				} else {
					uni.showToast({
						title: '暂无页面',
						icon: "error"
					})
				}

				
			},
			openUrl(item) {
				console.log(item.url);
				// let url_1 = encodeURIComponent(url);
				uni.navigateTo({
					url: '/pages/index/webView?url='+item.url+'&title='+item.title,
				})
			},
			clickPic(index) {
				console.log(index);
				console.log(this.picUrl[index])
				this.choose(this.picUrl[index]);
			}
		}
	}
</script>

<style lang="scss">
	.banner {
		width: 100%;
	}
	.swiper {
		height: 420rpx;
		width: 85%;
		margin: 20rpx auto;
	}
	.grid-text {
		font-size: 14px;
		color: #606266;
		padding: 10rpx 0 20rpx 0rpx;
		/* #ifndef APP-PLUS */
		box-sizing: border-box;
		/* #endif */
	}

	.mygrid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		// grid-gap: 20rpx;  为了swiper滑动时间隔相等，不用gap来设置
	}
	
	.mygrid-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 160rpx;
		background-image: linear-gradient(160deg, #F5F7FA, #E6E9ED);
		border-radius: 10rpx;
		margin: 10rpx; // 用margin代替grid-gap设置间隔
		background-color: white;
		box-shadow: 6rpx 6rpx 0rpx $highlight-color;
		color: white;
		border: 3rpx $theme-color solid;
	}
	
	.mygrid-item:hover {
		background-image: linear-gradient(160deg, #d3d6d8, #e3e5e7);
	}
	
	.picbox {
		width: 90%;
		margin: 5rpx auto;
		border: 10rpx solid white;
		border-radius: 10rpx;
	}

	.exurls {
		margin: 60rpx auto;
		width: 90%;
	}
	
	.exurls-box {
		display: grid;
		grid-template-columns: 1fr 1fr;
		justify-items: center;
	}
	
	.exitem {
		gap: 10px;
		text-align: center;
	}
	
	
	.pickItem:active,.exitem:active {
		filter: brightness(80%);
	}
	
	.url-box {
		height: 30px;
		width: 150px;
		border: white 2px solid;
		border-radius: 3px;
		background-size: cover;
		background-repeat: no-repeat;
	}

	.title {
		margin-bottom: 20rpx;
	}

	.titletext {
		font-size: 18px;
		font-weight: bold;
	}
	
	.titletext::before {
		content: "▮";
		color: $theme-color;
	}
	

</style>