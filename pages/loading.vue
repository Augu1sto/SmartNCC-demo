<template>
	<view>
		<u-loading-page></u-loading-page>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			...mapState(['hasLogin', 'token'])
		},
		async onLoad() {
			console.log('APP:Login:LoadingWaitting');
		
			await this.$onLaunched;
			console.log('APP:Login:LoadingWaittingFinish');
		
			this.redirect();
		},
		methods: {
			redirect() {
				let _this = this;
				if (this.hasLogin) {
					console.log("已登录，准备跳转");
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/index/index',
						})
					}, 600);
					return;
				} else {
					uni.redirectTo({
						url: "/pages/login/login"
					})
				}
			}
		}
	}
</script>

<style>

</style>
