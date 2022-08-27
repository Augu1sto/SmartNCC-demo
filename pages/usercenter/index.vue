<template>
	<view class="main" v-if="this.hasLogin">
		<view class="account-header">
			<!-- <u-avatar :src="myAvatar" size="60"></u-avatar> -->
			<u-avatar :text="myname?myname[0].toUpperCase():''" fontSize="18" size="60" randomBgColor></u-avatar>
			<view class="uname">欢迎，{{myname}}</view>
		</view>
		<view class="info-cell">
			<u-cell-group :border="false">
				<u-cell icon="account-fill" size="large" title="个人信息" :isLink="true" @click="goToUserInfo"></u-cell>
				<u-cell icon="tags-fill" size="large" title="预约凭证" :isLink="true" @click="goToMyRsv"></u-cell>
				<u-cell icon="chat" size="large" title="我的消息" :isLink="true" @click="goToMessageBox">
					<text slot="value" class="u-slot-value">{{msgNumber}}</text>
				</u-cell>
				<u-cell icon="setting-fill" size="large" title="设置" :isLink="true" :border="false" @click="goToSetting"></u-cell>
			</u-cell-group>
		</view>
		<view class="btn-area">
			<u-button type="error" :hairline="true" text="退出登录" @click="toLogout"></u-button>
		</view>
	</view>
</template>

<script>
	import { mapState, mapGetters, mapMutations } from 'vuex';
	export default {
		computed: {
			...mapState(['hasLogin']),
			...mapGetters({
					myname: 'getUsername', 
					// myAvatar: 'getAvatarUrl'
				})
		},
		data() {
			return {
				// name: this.myname,
				// namecap: name[0], // 名字的首字
				msgNumber: 99
			}
		},

		onShow() {
			if(!this.hasLogin) {
				uni.setNavigationBarTitle({
					title: '正在跳转'
				});
				uni.redirectTo({
					url:'/pages/login/login'
				})
			}
		},
		methods: {
			...mapMutations(['logout']),
			goToUserInfo() {
				uni.navigateTo({
					url: './userinfo',
				});
			},
			goToMyRsv() {
				uni.navigateTo({
					url:'./reservation'
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
			},
			toLogout() {
				uni.showLoading({
					title: "正在退出"
				})
				this.logout();
				uni.redirectTo({
					url: '/pages/login/login'
				})
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
