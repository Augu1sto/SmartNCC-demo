<template>
	<view>
		<view class="info-cell">
			<u-cell title="头像" :isLink="true" @click="editAvatar">
				<text slot="value" class="u-slot-value"><u-avatar :src="myAvatar" shape="square"></u-avatar></text>
			</u-cell>
			<u-cell title="姓名" :value="myname"></u-cell>
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
					myAvatar: 'getAvatarUrl',
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
				// src: this.myAvatar,
				// uname: this.myname,
				// uschool: "武汉大学",
				// unumber: "2020202210014",
				// uphone: "15105257339"
			}
		},
		methods: {
			editAvatar() {
				uni.navigateTo({
					url: "./editAvatar"
				});
			},
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
