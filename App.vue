<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import 'uview-ui/index.scss';
</style>
<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';

	export default {
		methods: {
			...mapMutations(['login']),
		},
		onLaunch: function() {
			console.log('App Launch');
			let token = uni.getStorageSync('smartNCCdemo_' + 'tokenInfo').token;
			let _this = this;
			if(token) {
				console.log('APP:Login:hasToken');
				console.log(token);
				uni.getStorage({
					key: 'smartNCCdemo_' + 'tokenInfo',
					success: (res) => {
						_this.login(res.data);
						console.log('APP: set vuex');
						console.log('APP: Login:Start')
						let req = {};
						this.$axios.get('/tokenlogin', {params:req}).then((res)=>{
								console.log('tokenlogin', res.data);
								if(res.status === 200) {
									if(res.data.code !== 299 ){
										_this.$store.dispatch('reLogin');
										_this.$isResolve();
									} else {
										console.log("APP: Login OK")
										_this.$isResolve();
									}
								}
							})
					},
				})
			}
			_this.$isResolve();
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	page {
		background-color: #eeeeee;
		font-size: 30rpx;
	}
	
	.info-cell {
		width: 80%;
		background-color: white;
		/* height: 500px; /* for demo */ 
		margin: 40rpx auto;
		border-radius: 2%;
		box-shadow: 5rpx 0rpx 20rpx #dddddd;
		padding: 20rpx;
	}
	
	/* cell选中后的效果 */
	.cell-hover-class {
		background-color: rgb(235, 237, 238);
	}
		
	.btn-area {
		width: 80%;
		margin: 40px auto;
	}
	
	/* picker的确认按钮的颜色 */
	.uni-picker-action-confirm {
		color: $theme-color!important;
	}
	
	
	// uni-calendar样式修改
	.at .uni-calendar-item__weeks-box-circle {
		background-image: url('https://cdn-icons-png.flaticon.com/512/5290/5290058.png');
		background-color: transparent!important;
		background-position: 0 0;
		background-size: contain;
		top: 8px!important;
		right: 8px!important;
		width: 12px!important;
		height: 12px!important;
		border-radius: 0px!important;
	}
	
	.at .uni-calendar__content, .at .uni-calendar-item__weeks-box {
		border-radius: 20px!important;
	}
	
	.at .uni-calendar__backtoday {
		top: 40rpx!important;
	}
	
	
	.at .uni-calendar-item--isDay,
	.at .uni-calendar-item--checked,
	.at .uni-calendar-item--multiple {
		border-radius: 100%!important;
	}

	.upload-box .u-upload__deletable {
		height: 18px!important;
		width: 18px!important;
		border-radius: 100%!important;
	}
	
	.upload-box .u-upload__deletable__icon {
		position: unset!important;
		transform: scale(0.9)!important;
	}
	
	
</style>
