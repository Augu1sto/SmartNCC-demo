<template>
	<view class="main">
		<view class="header">
			<view class="title">
				智慧网安
			</view>
			<view class="nav">
				<view :class="['nav_item',navidx===0?'nav_left nav_now':'nav_right']" @click="navidx=0">
					登录
				</view>
				<view :class="['nav_item',navidx===1?'nav_right nav_now':'nav_left']" @click="navidx=1">
					注册
				</view>
			</view>
			<view class="illustrator">
				<image src="../../static/undraw_reading.svg" mode="aspectFill"></image>
			</view>
		</view>
		<view :class="['body', navidx===0?'bg-left':'bg-right']">
			<view class="form_box login" v-if="navidx===0">
				<u--form :model="form">
					<u-form-item prop="userInfo.uname">
						<view :class="['label',(form.userInfo.uname!=''||isFocus0)?'focused':'blured']">用户名</view>
						<u-input v-model="form.userInfo.uname" border="bottom" clearable @focus="isFocus0=true" @blur="isFocus0=false">
						</u-input>
					</u-form-item>
					<u-form-item prop="userInfo.password">
						<view :class="['label',(form.userInfo.password!=''||isFocus1)?'focused':'blured']">密码</view>
						<u-input v-model="form.userInfo.password" type="password" border="bottom" clearable @focus="isFocus1=true" @blur="isFocus1=false">
						</u-input>
					</u-form-item>
					<view class="tip1">忘记密码？</view>
				</u--form>

				<view class="btn">
					<u-button color="#00adb5" shape="circle" :hairline="false" @click="submit"><strong>登&nbsp;录</strong></u-button>
				</view>
				<view class="visitor-entrance" @click="visitLogin">
					>游客登入<
				</view>
			</view>
			<view class="form_box signup" v-else >
				<u-empty
				        mode="permission" text="功能暂未开放"
				>
				</u-empty>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	
	export default {
		data() {
			return {
				form: {
					userInfo: {
						uname: '',
						password: ''
					}

				},
				isFocus0: false,
				isFocus1: false,
				navidx: 0, // 0代表登录，1代表注册
			}
		},
		computed: {
			...mapState(['hasLogin'])
		},
		methods: {
			...mapMutations(['login']),
			submit() {
				// console.log(getCurrentPages());
				if(this.checkLogin()) {
					let _this = this;
					uni.showLoading({
						title: "正在加载"
					})
					let req = {
						username: this.form.userInfo.uname,
						password: this.form.userInfo.password
					}
					this.$axios.get('/login', {params:req}).then((res)=>{
						console.log('login', res.data);
						if(res.status===200) {
							uni.hideLoading();
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
							if(res.data.code === 200 ){
								_this.login(res.data.udata);
								setTimeout(() => {
									uni.switchTab({
										url: '../index/index'
									})
									return;
								}, 800)
							}
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
				} 
			},
			checkLogin() {
				if (uni.$u.test.isEmpty(this.form.userInfo.uname)) {
					uni.$u.toast('用户名不能为空');
					return false;
				}
				if (uni.$u.test.isEmpty(this.form.userInfo.password)) {
					uni.$u.toast('密码不能为空');
					return false;
				}
				return true;
				
			},
			visitLogin() {
				console.log('1')
				uni.switchTab({
					url: '../index/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	
	@font-face{font-family:'ZoomlaTouyinghei-A032';/*逐浪投影透视黑体*/
		src: url('https://code.z01.com/font/ZoomlaTouyinghei-A032.eot?#iefix'); /* IE9 */
		src: url('https://code.z01.com/font/ZoomlaTouyinghei-A032.eot?#iefix') format("embedded-opentype"), /* IE6-IE8 */
		url('https://code.z01.com/font/ZoomlaTouyinghei-A032.woff') format("woff"), /* chrome、firefox */
		url('https://code.z01.com/font/ZoomlaTouyinghei-A032.ttf') format("truetype"), /* chrome、firefox、opera、Safari, Android, iOS 4.2+ */
		url('https://code.z01.com/font/ZoomlaTouyinghei-A032.svg#ZoomlaTouyinghei-A032') format("svg"); /* iOS 4.1- */
		font-style: normal; font-weight: normal;}

	* {
		box-sizing: border-box;
	}
	page {
		background-color: #00ADB5;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='135' height='135' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='100' y1='33' x2='100' y2='-3'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='100' y1='135' x2='100' y2='97'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%2300939b' fill-opacity='0.6'%3E%3Crect x='100' width='100' height='100'/%3E%3Crect y='100' width='100' height='100'/%3E%3C/g%3E%3Cg fill-opacity='0.5'%3E%3Cpolygon fill='url(%23a)' points='100 30 0 0 200 0'/%3E%3Cpolygon fill='url(%23b)' points='100 100 0 130 0 100 200 100 200 130'/%3E%3C/g%3E%3C/svg%3E");
		background-position: 30px 0;
		height: 100%;
	}
	
	.main {
		height: 100%;
	}
	
	.header {
		height: 135px;
		position: relative;
	}
	.title {
		font-family: ZoomlaTouyinghei-A032;
		font-weight: 100;
		font-size: 60px;
		color: rgba(255, 255, 255, 1);
		/* color: rgba(47, 46, 65, 1.0); */
		letter-spacing: 8px;
		margin-left: 32px;
		text-shadow: 0 5px 1px #006b6f, 
					0 10px 5px #006b6f,
					0 -2px 0px $theme-color,
					0 -3px 0px $highlight-color;
		// text-shadow: 2px 0 0 $highlight-color,
		// 			-2px 0 0 $highlight-color,
		// 			0 2px 0 $highlight-color,
		// 			0 -2px 0 $highlight-color,
		// 			0 5px 1px #006b6f,
		// 			0 10px 5px #006b6f;
	}
	
	.nav {
		display: flex;
		flex-direction: row;
		position: absolute;
		bottom: 5px;
		left: 30px;
		width: 130px;
		justify-content: space-around;
		align-items: center;
		color: white;
		font-weight: bold;
		&_item {
			padding: 5px;
			color: rgba(255, 255, 255, 0.5);
		}
		&_item::after {
			content: "";
			width: 40px;
			height: 3px;
			background-color: $highlight-color;
			position: absolute;
			bottom: 0px;
		}
		&_left::after {
			left: 12px;
			transition: left 0.1s ease;
			
		}
		&_right::after {
			left: 78px;
			transition: left 0.1s ease;
		}
		&_now {
			color: white;
		}
		
	}
	
	.illustrator {
		position: fixed;
		right: 5px;
		top: 80px;
		z-index: 100;
	}
	.illustrator>image {
		width: 120px;
		height: 120px;
	}
	
	.body {
		height: calc(100% - 135px);
		background-color: white;
		border-top-left-radius: 50px;
		// box-shadow: inset 0 3px 2px rgba(0, 72, 75, 0.8);
		background-image: url('@/static/bg_bottom.svg');
		background-size: 120%;
		
		background-repeat: no-repeat;
		padding: 36px;
	}
	
	.bg-left {
		background-position: 0 bottom;
		transition: all 0.5s ease-in-out;
	}
	
	.bg-right {
		background-position: 120% bottom;
		transition: all 0.5s ease-in-out;
	}
	
	.form_box {
		margin: auto;
		width: 80%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		// background-color: red;
		height: 80%;
		.u-form-item {
			position: relative;
			.label {
				position: absolute;
				color: #999;
			}
			.focused {
				left: 0px;
				bottom: 40px;
				transition: all 50ms ease;
			}
			.blured {
				left: 10px;
				bottom: 20px;
				transition: all 50ms ease;
			}
			margin-top: 10px;
		}
		.tip1 {
			text-align: right;
			text-decoration: underline;
			font-size: 14px;
			color: $highlight-color;
		}
		.visitor-entrance {
			text-align: center;
			text-decoration: underline;
			font-weight: bold;
			color: $theme-color;
		}

	}

</style>
