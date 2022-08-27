<template>
	<view>
		<view class="info-cell">
			<u-form :model="form" :rules="rules" ref="uform" :borderBottom="false" labelPosition="top" labelWidth="100">
				<u-form-item label="原密码" prop="originPWD" required>
					<u-input v-model="form.originPWD" placeholder="请输入原密码" border="bottom" clearable password maxLength="16">
						<view slot="suffix" style="color: #cccccc;">
							{{form.originPWD.length}}
						</view>
					</u-input>
				</u-form-item>
				<u-form-item label="新密码" prop="newPWD" required>
					<u-input v-model="form.newPWD" placeholder="8-16个字符,必须同时包含字母和数字" border="bottom" clearable password maxLength="16">
						<view slot="suffix" style="color: #cccccc;">
							{{form.newPWD.length}}
						</view>
					</u-input>
				</u-form-item>
				<u-form-item label="确认密码" prop="newPWD1" required>
					<u-input v-model="form.newPWD1" placeholder="再次输入密码" border="bottom" clearable password maxLength="16">
						<view slot="suffix" style="color: #cccccc;">
							{{form.newPWD1.length}}
						</view>
					</u-input>
				</u-form-item>
			</u-form>
		</view>
		<view class="btn-area">
			<u-button type="error" shape="circle" :hairline="true" text="确认修改" @click="submit"></u-button>
		</view>
	</view>
</template>

<script>
	import { mapState, mapGetters } from 'vuex';
	export default {
		computed: {
			...mapState(['hasLogin']),
			...mapGetters({
						myname: 'getUsername'
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
				form: {
					originPWD: '',
					newPWD: '',
					newPWD1: ''
				},
				rules: {
					originPWD: {
						required: true,
						message: '密码不能为空',
						trigger: ['blur']
					},
					newPWD: [{
						required: true,
						message: '密码不能为空',
						trigger: ['blur']
					}, {
						min: 8,
						max: 16,
						message: '密码长度必须在8-16之间',
						trigger: ['blur','change']
					}, {
						pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{6,20})$/,
						message: '密码必须且只能同时包含字母和数字',
						trigger: ['blur', 'change']
					}],
					newPWD1: [{
						required: true,
						message: '请确认新密码',
						trigger: ['blur']
					}, {
						validator: (rule, value, callback) => {
							return value===this.form.newPWD;
						},
						message: '两次输入的密码不一致',
						trigger: ['blur', 'change']
					}]
				},

			}
		},
		methods: {
			submit() {
				this.$refs.uform.validate().then(res => {
					uni.$u.toast('校验通过');
					console.dir(res);
					// 数据传输
					let _this = this;
					uni.showLoading({
						title: "提交中"
					})
					let req = {
						uname: this.myname,
						originpwd: this.form.originPWD,
						newpwd: this.form.newPWD
					}
					this.$axios.post('/changepwd', {data:req}).then((res)=>{
						console.log(res);
						if(res.status===200) {
							console.log(res.data);
							if(res.data.code === 600) {
								uni.hideLoading();
								uni.showToast({
									title: "修改成功，重新登录",
									icon: 'success',
									duration: 3000,
									complete: ()=>{
										uni.redirectTo({
											url: '/pages/login/login',
											success() {
												_this.$store.dispatch('reLogin');
											}
										});
									}
								});
							} else if (res.data.code === 601) {
								uni.hideLoading();
								uni.showToast({
									title: "原密码输入错误",
									icon: 'error'
								});
							} else {
								uni.hideLoading();
								uni.showToast({
									title: res.data.msg,
									icon: 'error'
								})
							}

							// 跳转或刷新页面
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
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			}
		}
	}
</script>

<style>
	.info-cell {
		padding-left: 30rpx;
		padding-right: 30rpx;
	}
	
	.u-input:hover {
		border-bottom: 1.5px solid rgba(0, 173, 181, 0.5)!important;

	}
</style>
