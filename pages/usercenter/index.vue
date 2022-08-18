<template>
	<view class="main">
		<view class="account-header">
			<u-avatar :src="src" size="60"></u-avatar>
			<view class="uname">欢迎，{{username || '游客'}}</view>
		</view>
		<view class="info-cell">
			<u-cell-group :border="false">
				<u-cell icon="account-fill" size="large" title="个人信息" :isLink="true" @click="goToUserInfo"></u-cell>
				<u-cell icon="tags-fill" size="large" title="我的预约" :isLink="true" @click="goToMyRsv"></u-cell>
				<u-cell icon="chat" size="large" title="我的消息" :isLink="true" @click="goToMessageBox">
					<text slot="value" class="u-slot-value">{{msgNumber}}</text>
				</u-cell>
				<u-cell icon="setting-fill" size="large" title="设置" :isLink="true" :border="false" @click="goToSetting"></u-cell>
			</u-cell-group>
		</view>
		<view class="btn-area">
			<u-button type="error" :hairline="true" text="退出登录"></u-button>
		</view>
	</view>
</template>

<script>
	const myname = "GY"; // 名字
	const msgNumber = 99;

	export default {
		data() {
			return {
				src: "../../static/avatar.jpg",
				username: myname,
				namecap: myname[0], // 名字的首字
				msgNumber: msgNumber
			}
		},
		methods: {
			goToUserInfo() {
				uni.navigateTo({
					url: './userinfo',
				});
			},
			goToMyRsv() {
				uni.navigateTo({
					url:'./myreservation'
				});
			},
			goToMessageBox() {
				uni.navigateTo({
					url: './messagebox'
				});
			},
			goToSetting() {
				uni.navigateTo({
					url: './setting'
				});
			}
		}
	}
</script>

<style>
	.main {
		width: 100%;
	}
	.account-header {
		width: 100%;
		height: 100px;
		margin: 20px 0 20px 0;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
	
	.uname {
		font-size: 1.2rem;
		font-weight: bold;
	}
	
	.u-slot-value {
		background-color: #f56c6c;
		color: white;
		border-radius: 10px;
		width: 30px;
		text-align: center;
	}



</style>
