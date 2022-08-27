<template>
	<view>
		<view class="info-cell">
			<u-cell title="头像">
			<!-- <u-cell title="头像" :isLink="true" @click="editAvatar"> -->
				<view slot="value" class="u-slot-value"><u-avatar :text="myname?myname[0].toUpperCase():''" fontSize="18" shape="square" randomBgColor></u-avatar></view>
			</u-cell>
			<u-cell title="用户名" :value="myname"></u-cell>
			<u-cell title="学校" :value="mySchool"></u-cell>
			<u-cell title="学号" :value="myNumber"></u-cell>
			<u-cell title="手机号" :value="myTel" :border="false"></u-cell>	
		</view>
		<view class="btn-area">
			<u-button color="#00adb5" :plain="true" shape="circle" :hairline="true" text="修改密码" @click="editPwd"></u-button>
		</view>
	</view>
</template>

<script>
	import { mapState, mapGetters } from 'vuex';
	export default {
		computed: {
			...mapState(['hasLogin']),
			...mapGetters({
					myname: 'getUsername', 
					// myAvatar: 'getAvatarUrl',
					mySchool: 'getSchool',
					myNumber: 'getNumber',
					myTel: 'getTel'
				})
		},
		onShow() {
			if(!this.hasLogin) {
				uni.redirectTo({
					url:'/pages/login/login'
				})
			}
		},
		data() {
			return {

			}
		},
		methods: {
			// editAvatar() {
			// 	uni.navigateTo({
			// 		url: "./editAvatar"
			// 	});
			// },
			editPwd() {
				uni.navigateTo({
					url: "./editPwd"
				});
			}
		}
	}
</script>

<style>

</style>
