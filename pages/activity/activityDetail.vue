<template>
	<view class="main">
		<view class="cardbox box1">
			<view class="cardbox_title">
				活动信息
			</view>
			<view class="cardbox_detail">
				<view class="item">
					<view class="item_tips">
						活动名称
					</view>
					<view class="item_info">
						{{data.aname}}
					</view>
				</view>	
				<view class="item">
					<view class="item_tips">
						活动组织
					</view>
					<view class="item_info">
						{{data.orgn}}
					</view>
				</view>	
				<view class="item">
					<view class="item_tips">
						面向对象
					</view>
					<view class="item_info">
						{{data.target}}
					</view>
				</view>	
				<view class="item">
					<view class="item_tips">
						活动时间
					</view>
					<view class="item_info">
						{{data.start_time}}
					</view>
				</view>	
				<view class="item">
					<view class="item_tips">
						结束时间
					</view>
					<view class="item_info">
						{{data.end_time}}
					</view>
				</view>	
				<view class="item" v-if="data.contact_person">
					<view class="item_tips">
						活动联系人
					</view>
					<view class="item_info">
						{{data.contact_person}}
					</view>
				</view>
				<view class="item" v-if="data.tel">
					<view class="item_tips">
						联系电话
					</view>
					<view class="item_info">
						{{data.tel}}
					</view>
				</view>
				<view class="item" v-if="data.detailurl">
					<view class="item_tips">
						查看推送详情
					</view>
					<view class="item_info">
						<u-button type="warning" size="mini" @click="showqrcode('微信扫码查看图文推送',data.detailurl)">
							<two-dimensional-code-two theme="outline" size="20" fill="#ffffff" :strokeWidth="3" strokeLinejoin="miter"/>
						</u-button>
					</view>
				</view>
				<view class="item" v-if="data.groupurl">
					<view class="item_tips">
						扫码加群
					</view>
					<view class="item_info">
						<u-button type="success" size="mini" @click="showqrcode('QQ扫码入群',data.groupurl)">
							<two-dimensional-code-two theme="outline" size="20" fill="#ffffff" :strokeWidth="3" strokeLinejoin="miter"/>
						</u-button>
					</view>
				</view>
				<view class="item">
					<view class="item_tips">
						活动内容
					</view>
					<view class="item_info">
						{{data.content}}
					</view>
				</view>
			</view>
		</view>
		
		<view class="cardbox box2">
			<view class="cardbox_title">
				报名情况
			</view>
			<view class="cardbox_detail">
				<view class="item">
					<view class="item_tips">报名名额</view>
					<view class="item_info">
						<span style="color:black">
							{{data.currn}}
						</span>
						/{{data.totaln}}
					</view>
				</view>
				<view class="item">
					<view class="item_tips">
						截止时间
					</view>
					<view class="item_info">
						{{data.stop_time}}
					</view>
				</view>
			</view>
		</view>
		<!-- 游客页面 -->
		<view class="btn-area" v-if="!hasLogin">
			<u-button shape="circle" :plain="true" :hairline="true" color="grey" @click="goToLogin">报名请先<strong>登录</strong></u-button>
		</view>
		<view class="btn-area" v-else>
			<view :class="['star_btn', star===true?'activeStar':'inactiveStar']" @click="clickStar">
				<star class="star star1" theme="outline" size="30" fill="#ffce07" :strokeWidth="3" strokeLinejoin="miter"/>
				<star class="star star2" theme="filled" size="30" fill="#ffce07" :strokeWidth="3" strokeLinejoin="miter"/>
			</view>
			<view class="main_btn">
				<u-button v-if="data.status==0&&data.join==0" shape="circle" custom-style="backgroundColor: #00adb5;color:white;" @click="joinIn">点击报名</u-button>
				<u-button v-if="data.status==0&&data.join==1" shape="circle" type="error" @click="cancelJoin">取消报名</u-button>
				<u-button v-if="data.status==1" shape="circle" type="error" disabled>已结束</u-button>
			</view>
		</view>
		<u-popup class="qrcodepop" :show="showQRcode" @close="showQRcode = false" :closeable="true" mode="center">
			<view class="pop qrcode">
				<text>{{qrcode.tip}}</text>
				<image :src="qrcode.url" mode="aspectFit"></image>
			</view>
		</u-popup>
		<u-popup class="submitpop" :show="showForm" @close="showForm = false" mode="bottom" :closeOnClickOverlay="true">
			<view class="pop">
				<u-form labelPosition="top" :model="form" :rules="rules" ref="form" labelWidth="200">
					<u-form-item label="联系电话" prop="tel" borderBottom :borderBottom="false" required>
						<u-input v-model="form.tel" placeholder="请输入联系电话" type="number">
						</u-input>
					</u-form-item>
				</u-form>
				<view style="display: flex;align-items:center;width: 100%;margin-top: 32rpx;">
					<view style="margin-right: 32rpx;width: 100%;">
						<u-button @click="showForm = false" shape="circle" :hairline="false">取消</u-button>
					</view>
					<view style="width: 100%;">
						<u-button @click="submit" type="success" shape="circle" :hairline="false">确定</u-button>
					</view>
				</view>
			</view>
		</u-popup>
		<u-popup class="cancelpop" :show="showCancelForm" @close="showCancelForm = false" mode="bottom" :closeOnClickOverlay="true">
			<view class="pop">
				<view>确定取消报名？</view>
				<view style="display: flex;align-items:center;width: 100%;margin-top: 32rpx;">
					<view style="margin-right: 32rpx;width: 100%;">
						<u-button @click="showCancelForm = false" shape="circle" :hairline="false">再想想</u-button>
					</view>
					<view style="width: 100%;">
						<u-button @click="cancel" type="warning" shape="circle" :hairline="false">确定</u-button>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {TwoDimensionalCodeTwo, Star} from '@icon-park/vue';
	import { mapState, mapMutations } from 'vuex';
	export default {
		computed: {
			...mapState(['hasLogin'])
		},
		components: {
			TwoDimensionalCodeTwo,
			Star
		},
		data() {
			return {
				star: false,
				showForm: false,
				showQRcode: false,
				showCancelForm: false,
				qrcode: {
					tip: '扫码',
					url: ''
				},
				form: {
					tel: '',
				},
				rules: {
					'tel': [{
							required: true,
							message: '请输入联系号码',
							trigger: ['change'],
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// uni.$u.test.mobile()就是返回true或者false的
								return uni.$u.test.mobile(value);
							},
							message: '联系号码不正确',
							// 触发器可以同时用blur和change
							trigger: ['change'],
						}
					],
				},
				id: null,
				data: {}
			}
		},

		onLoad(res) {
			this.id = res.id;
			this.fetchInitialData();
		},
		methods: {
			joinIn() {
				this.showForm = true;
			},
			cancelJoin() {
				this.showCancelForm = true;
			},
			showqrcode(tip, url) {
				console.log(url);
				this.showQRcode = true;
				this.qrcode.url = url;
				this.qrcode.tip = tip;
			},
			fetchInitialData() {
				let _this = this;
				uni.showLoading({
					title: "正在加载"
				})
				let req = {
					id: this.id
				}
				this.$axios.get('/activity/getDetail', {params:req}).then((res)=>{
			
					console.log(res);
					if(res.status===200) {
						// console.log(JSON.stringify(res.data));
						_this.data = res.data.detail;
						_this.data.join = res.data.join;
						_this.star = (res.data.star == 1);
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
			clickStar(){
				this.star = !this.star;
				let url;
				if(this.star) {
					url = '/activity/star';
				} else {
					url = '/activity/unstar';
				}
				let _this = this;
				uni.showLoading({
					title: "提交中"
				})
				let req = {
					id: this.id
				}
				this.$axios.post(url, {data:req}).then((res)=>{
					console.log(res);
					if(res.status===200&&res.data) {
						console.log(res.data);
						uni.hideLoading();
						uni.showToast({
							title: this.star?"已收藏":"取消收藏",
							icon: 'none'
						});
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
			},
			
			submit() {
				if(uni.$u.test.mobile(this.form.tel)) {
					this.submitJoin();
				}
			},
			submitJoin() {
				let _this = this;
				uni.showLoading({
					title: "提交中"
				})
				let req = {
					id: this.id,
					tel: this.form.tel
				}
				this.$axios.post('/activity/join', {data:req}).then((res)=>{
					console.log(res);
					if(res.status===200&&res.data) {
						console.log(res.data);
						uni.hideLoading();
						uni.showToast({
							title: "报名成功",
							icon: 'none',
							duration: 3000,
							complete: uni.redirectTo({
								url: './index'
							})
						});
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
			},
			cancel() {
				let _this = this;
				uni.showLoading({
					title: "提交中"
				})
				let req = {
					id: this.id
				}
				this.$axios.post('/activity/cancel', {data:req}).then((res)=>{
					console.log(res);
					if(res.status===200&&res.data) {
						console.log(res.data);
						uni.hideLoading();
						uni.showToast({
							title: "已取消",
							icon: 'none',
							duration: 3000,
							complete: uni.redirectTo({
								url: './index'
							})
						});
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
			},
			goToLogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}
		}
	}
</script>

<style lang="scss">
	* {
		box-sizing: border-box;
	}
	.cardbox {
		width: 90%;
		background-color: white;
		margin: 10px auto;
		padding: 10px;
		border-radius: 10px;
		position: relative;
		&_title:before {
			content: '▮';
			font-size: 20px;
			margin-right: 8rpx;
			color: $theme-color;
		}
		&_title {
			font-size: 18px;
			font-weight: bolder;
			line-height: 30px;
			border-bottom: 1px solid #f1f1f1;
		}
		&_detail {
			padding: 5px;
			.item{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				flex-wrap: wrap;
				margin-bottom: 10px;
				// align-items: center;
				&_tips {
					font-weight: bold;
					padding-right: 10px;
				}
				&_info {
					// text-align: end;
					word-wrap: break-word;
					word-break: break-all;
					color: #777;
				}

			}
		}
	}
	.btn-area {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		position: relative;
		margin: 20px auto;
		width: 90%;
	}
	
	.main_btn {
		flex: 7;
	}
	.star_btn {
		flex: 1;
		position: relative;
		width: 30px;
		height: 30px;
		.star {
			justify-items: center;
			position: absolute;
			top: 0;
			left: 0;
		}
		.star2:hover {
			animation: bounce-out-zoomin 0.5s ease 0s 1 normal none;
		}
		.star2 {
			transform: scale(0);
		}

	}
	
	.activeStar {
		.star2 {
			transform: scale(1); // 不能写100%
		}

	}	
	
	.activeStar:hover{
		animation: rubberband-horizontal 1s ease 0s 1 normal forwards;
	}

	
	@keyframes bounce-out-zoomin {
	  0%{
	    transform: scale(1);
	    animation-timing-function: ease-out;
	  }
	  5%{
	    transform: scale(1.04);
	    animation-timing-function: ease-in;
	  }
	  10%{
	    transform: scale(1);
	    animation-timing-function: ease-out;
	  }
	  20%{
	    transform: scale(1.24);
	    animation-timing-function: ease-in;
	  }
	  30%{
	    transform: scale(1);
	    animation-timing-function: ease-out;
	  }
	  45%{
	    transform: scale(1.5);
	    animation-timing-function: ease-in;
	  }
	  65%{
	    transform: scale(1);
	    animation-timing-function: ease-out;
	    opacity: 1;
	  }
	  100%{
	    transform: scale(4);
	    animation-timing-function: ease-in;
	    opacity: 0;
	  }
	}
	
	@keyframes rubberband-horizontal {
	  0%{
		transform: scale3d(1,1,1);
	  }
	  30%{
		transform: scale3d(1.25,.75,1);
	  }
	  40%{
		transform: scale3d(.75,1.25,1);
	  }
	  50%{
		transform: scale3d(1.15,.85,1);
	  }
	  65%{
		transform: scale3d(.95,1.05,1);
	  }
	  75%{
		transform: scale3d(1.05,.95,1);
	  }
	  100%{
		transform: scale3d(1,1,1);
	  }
	}
	
	
	.pop {
		padding: 32rpx;
	}
	
	.pop-title {
		text-align: center;
		margin: 32rpx;
	}
	
	.qrcodepop {
		text-align: center;
		font-size: 18px;
		font-weight: bold;

		.qrcode {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 300px;
			height: 300px;
		}
	}
	
</style>
