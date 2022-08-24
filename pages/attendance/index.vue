<template>
	<view class="main">
		<view id="wavesDIV" :style="{bottom: waveHeight}">
			<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
				xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 2400 800" opacity="1">
				<defs>
					<linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="sssurf-grad">
						<stop stop-color="hsl(162, 100%, 58%)" stop-opacity="1" offset="0%"></stop>
						<stop stop-color="hsl(270, 73%, 53%)" stop-opacity="1" offset="100%"></stop>
					</linearGradient>
				</defs>
				<g fill="url(#sssurf-grad)" transform="matrix(1,0,0,1,2.0377197265625,182.8368682861328)">
					<path
						d="M-10,10C117.08333333333334,21.875,347.9166666666667,76.79166666666667,600,67C852.0833333333333,57.208333333333336,950,-52.83333333333333,1200,-37C1450,-21.166666666666668,1550,156.75,1800,143C2050,129.25,2222.9166666666665,-156.54166666666669,2400,-103C2577.0833333333335,-49.45833333333333,3254.1666666666665,191.04166666666669,2650,400C2045.8333333333335,608.9583333333333,156.25,795.8333333333334,-500,900"
						transform="matrix(1,0,0,1,0,148)" opacity="0.05"></path>
					<path
						d="M-10,10C117.08333333333334,21.875,347.9166666666667,76.79166666666667,600,67C852.0833333333333,57.208333333333336,950,-52.83333333333333,1200,-37C1450,-21.166666666666668,1550,156.75,1800,143C2050,129.25,2222.9166666666665,-156.54166666666669,2400,-103C2577.0833333333335,-49.45833333333333,3254.1666666666665,191.04166666666669,2650,400C2045.8333333333335,608.9583333333333,156.25,795.8333333333334,-500,900"
						transform="matrix(1,0,0,1,0,296)" opacity="1.00"></path>
				</g>
			</svg>
		</view>
		<view id="footerDIV" :style="{height: waveHeight}"></view>
		
		<view class="count-container" @click="gotoDetail">

			<view class="count-tips">
				<view>{{cMonth}}月有效打卡天数</view>
				<!-- <view></view> -->
			</view>
			<view class="count-total">
				<span>{{days}}</span>/20天
			</view>
			<view class="count-calendar">
				<inspection theme="two-tone" size="16" :fill="['#333' ,'#1fbbbb']" />
				查看打卡日历
			</view>
			<view id="bgDIV">
				<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
					viewBox="0 0 700 700" style="overflow: hidden; display: block;" width="700" height="700">
					<defs></defs>
					<g id="two-0" transform="matrix(1 0 0 1 0 0)" opacity="0.8">
						<path transform="matrix(1 0 0 1 350 350)" id="two-166"
							d="M 305.018799 118.164912 C 294.067583 155.857199 262.16015 185.879943 235.444813 214.636307 C 208.855475 243.257046 182.332929 279.995682 144.776809 290.751028 C 106.520426 301.706915 65.148178 272.507996 25.376923 273.860613 C -11.67651 275.120798 -48.599177 306.227956 -84.537434 297.118259 C -120.294264 288.05455 -140.016236 246.619243 -169.669001 224.678067 C -199.594069 202.535405 -241.369008 192.903329 -264.700581 163.89566 C -288.29452 134.561796 -299.963563 94.265975 -304.136 56.852871 C -308.230042 20.142718 -296.134105 -17.779976 -289.531397 -54.122798 C -282.906359 -90.588524 -278.206942 -129.247039 -264.081584 -163.512394 C -248.94213 -200.237747 -236.100036 -247.677832 -200.811862 -265.91788 C -163.375243 -285.268434 -115.323231 -261.770387 -73.36418 -257.848347 C -41.529799 -254.872691 -9.094739 -243.570008 22.790116 -245.944531 C 62.330879 -248.889203 101.801911 -293.14522 138.530189 -278.206125 C 173.641323 -263.924799 181.641076 -213.873404 196.233393 -178.890376 C 208.487841 -149.512064 206.243716 -113.761671 221.406472 -85.773325 C 239.483186 -52.406214 283.432398 -35.039693 298.004688 -0.000001 C 313.004745 36.068279 315.91759 80.653062 305.018799 118.164912 Z "
							fill="hsl(167, 0%, 100%)" stroke="undefined" stroke-width="1" stroke-opacity="1"
							fill-opacity="1" visibility="visible" stroke-linecap="butt" stroke-linejoin="miter"
							stroke-miterlimit="4">
						</path>
					</g>
				</svg>
				<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
					viewBox="0 0 700 700" style="overflow: hidden; display: block;" width="700" height="700">
					<defs></defs>
					<g id="two-0" transform="matrix(1 0 0 1 0 0)" opacity="0.6">
						<path transform="matrix(1 0 0 1 350 350)" id="two-278"
							d="M 304.570047 126.157044 C 280.09088 160.489575 233.525516 174.159937 201.030579 201.030579 C 171.432304 225.505921 152.449989 267.78856 116.333947 280.854993 C 80.165324 293.940449 38.454757 272.896134 0 273.689887 C -39.279622 274.500667 -80.379096 295.702377 -118.426115 285.90593 C -156.883988 276.003696 -195.715939 250.628272 -217.282283 217.282282 C -238.822797 183.976228 -227.986048 137.137549 -239.294738 99.119125 C -249.394461 65.165095 -271.856974 34.351398 -280.509257 0 C -290.326549 -38.976731 -306.195107 -83.373771 -292.599589 -121.198719 C -279.071102 -158.837177 -238.071129 -181.932541 -206.544742 -206.544742 C -177.1303 -229.508176 -146.116122 -256.472873 -109.813746 -265.113834 C -74.455136 -273.530152 -35.967104 -251.394449 -0.000001 -256.632115 C 44.203321 -263.06917 83.004997 -315.780636 126.382269 -305.11379 C 166.962751 -295.134699 183.003337 -241.913545 210.097131 -210.097132 C 235.529284 -180.231992 264.484793 -151.351475 285.628826 -118.311334 C 309.000491 -81.790246 339.402869 -43.227573 342.779492 -0.000001 C 346.16703 43.367306 329.823451 90.738627 304.570047 126.157044 Z "
							fill="hsl(55, 75%, 72%)" stroke="undefined" stroke-width="1" stroke-opacity="1"
							fill-opacity="1" visibility="visible" stroke-linecap="butt" stroke-linejoin="miter"
							stroke-miterlimit="4">
						</path>
					</g>
				</svg>
			</view>
		</view>
		<view class="time-container">
			<view class="time-total">
				<view class="title">
					今日时长
				</view>
				<view class="timeall">
					{{totalTime||"--:--:--"}}
				</view>
			</view>
			<view class="time-box">
				<view class="left">
					<sun-one theme="two-tone" size="34" :fill="['#ff8282' ,'#fff478']" :strokeWidth="3" strokeLinejoin="miter"/>
					<text>{{startTime||"--:--:--"}}</text>
				</view>
				<view class="right">
					<moon theme="two-tone" size="34" :fill="['#4a90e2' ,'#fff478']" :strokeWidth="3" strokeLinejoin="miter"/>
					<text>{{endTime||"--:--:--"}}</text>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	import {
		Inspection,
		SunOne,
		Moon
	} from '@icon-park/vue';
	
	const mTime = require('@/utils/mytime.js');
	
	export default {
		components: {
			Inspection,
			SunOne,
			Moon
		},
		data() {
			return {
				cMonth: 8,
				days: 0,
				totalDay: 20,
				waveHeight: '100px',
				startTime: '',
				endTime: '',
				totalTime: '',
				timer: null
			}
		},
		onLoad() {
			this.fetchInitialData();
			// 计算比例
			// 	this.waveHeight = this.days/this.totalDay*100 + '%';
			// 	this.totalTime = mTime.calcTimeDuration(this.startTime);

		},
		mounted() {
		    let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
		    this.timer = setInterval(() => {
				_this.totalTime = mTime.calcTimeDuration(this.startTime); // 修改数据date
		    }, 1000)
		},
		beforeDestroy() {
			if (this.timer) {
				clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
			}
		},
		methods: {
			fetchInitialData() {
				let _this = this;
				uni.showLoading({
					title: "正在加载"
				})
				this.$axios.get('/attendance/fetchToday').then((res)=>{

					console.log(res);
					if(res.status===200) {
						console.log(res.data);
						let li = res.data.timeList;
						if(!uni.$u.test.isEmpty(li)) {
							for(let i=0; i<li.length; i++) {
								if(li[i].isValid) {
									_this.startTime = li[i].time;
									console.log('set startTime!');
									break;
								}
							}

						}
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
			// 获得有效天数
			this.$axios.get('/attendance/fetchValidDate').then((res)=>{
					console.log(res);
					if(res.status===200) {
						_this.days = res.data.length>20?20:res.data.length;
						this.waveHeight = this.days/this.totalDay*100 + '%';
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
			gotoDetail() {
				uni.navigateTo({
					url: './attendanceDetail'
				});
			}
		}
	}
</script>

<style>
	/* googlefont镜加速 */
	@import url('https://fonts.loli.net/css?family=Monoton');
	
	page {
		background-color: #D9F7F2;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='484' height='242' viewBox='0 0 1600 800'%3E%3Cpath fill='%23F8FF7A' d='M1102.5 734.8c2.5-1.2 24.8-8.6 25.6-7.5.5.7-3.9 23.8-4.6 24.5C1123.3 752.1 1107.5 739.5 1102.5 734.8zM1226.3 229.1c0-.1-4.9-9.4-7-14.2-.1-.3-.3-1.1-.4-1.6-.1-.4-.3-.7-.6-.9-.3-.2-.6-.1-.8.1l-13.1 12.3c0 0 0 0 0 0-.2.2-.3.5-.4.8 0 .3 0 .7.2 1 .1.1 1.4 2.5 2.1 3.6 2.4 3.7 6.5 12.1 6.5 12.2.2.3.4.5.7.6.3 0 .5-.1.7-.3 0 0 1.8-2.5 2.7-3.6 1.5-1.6 3-3.2 4.6-4.7 1.2-1.2 1.6-1.4 2.1-1.6.5-.3 1.1-.5 2.5-1.9C1226.5 230.4 1226.6 229.6 1226.3 229.1zM33 770.3C33 770.3 33 770.3 33 770.3c0-.7-.5-1.2-1.2-1.2-.1 0-.3 0-.4.1-1.6.2-14.3.1-22.2 0-.3 0-.6.1-.9.4-.2.2-.4.5-.4.9 0 .2 0 4.9.1 5.9l.4 13.6c0 .3.2.6.4.9.2.2.5.3.8.3 0 0 .1 0 .1 0 7.3-.7 14.7-.9 22-.6.3 0 .7-.1.9-.3.2-.2.4-.6.4-.9C32.9 783.3 32.9 776.2 33 770.3z'/%3E%3Cpath fill='%2398A3FF' d='M171.1 383.4c1.3-2.5 14.3-22 15.6-21.6.8.3 11.5 21.2 11.5 22.1C198.1 384.2 177.9 384 171.1 383.4zM596.4 711.8c-.1-.1-6.7-8.2-9.7-12.5-.2-.3-.5-1-.7-1.5-.2-.4-.4-.7-.7-.8-.3-.1-.6 0-.8.3L574 712c0 0 0 0 0 0-.2.2-.2.5-.2.9 0 .3.2.7.4.9.1.1 1.8 2.2 2.8 3.1 3.1 3.1 8.8 10.5 8.9 10.6.2.3.5.4.8.4.3 0 .5-.2.6-.5 0 0 1.2-2.8 2-4.1 1.1-1.9 2.3-3.7 3.5-5.5.9-1.4 1.3-1.7 1.7-2 .5-.4 1-.7 2.1-2.4C596.9 713.1 596.8 712.3 596.4 711.8zM727.5 179.9C727.5 179.9 727.5 179.9 727.5 179.9c.6.2 1.3-.2 1.4-.8 0-.1 0-.2 0-.4.2-1.4 2.8-12.6 4.5-19.5.1-.3 0-.6-.2-.8-.2-.3-.5-.4-.8-.5-.2 0-4.7-1.1-5.7-1.3l-13.4-2.7c-.3-.1-.7 0-.9.2-.2.2-.4.4-.5.6 0 0 0 .1 0 .1-.8 6.5-2.2 13.1-3.9 19.4-.1.3 0 .6.2.9.2.3.5.4.8.5C714.8 176.9 721.7 178.5 727.5 179.9zM728.5 178.1c-.1-.1-.2-.2-.4-.2C728.3 177.9 728.4 178 728.5 178.1z'/%3E%3Cg fill='%23FFF'%3E%3Cpath d='M699.6 472.7c-1.5 0-2.8-.8-3.5-2.3-.8-1.9 0-4.2 1.9-5 3.7-1.6 6.8-4.7 8.4-8.5 1.6-3.8 1.7-8.1.2-11.9-.3-.9-.8-1.8-1.2-2.8-.8-1.7-1.8-3.7-2.3-5.9-.9-4.1-.2-8.6 2-12.8 1.7-3.1 4.1-6.1 7.6-9.1 1.6-1.4 4-1.2 5.3.4 1.4 1.6 1.2 4-.4 5.3-2.8 2.5-4.7 4.7-5.9 7-1.4 2.6-1.9 5.3-1.3 7.6.3 1.4 1 2.8 1.7 4.3.5 1.1 1 2.2 1.5 3.3 2.1 5.6 2 12-.3 17.6-2.3 5.5-6.8 10.1-12.3 12.5C700.6 472.6 700.1 472.7 699.6 472.7zM740.4 421.4c1.5-.2 3 .5 3.8 1.9 1.1 1.8.4 4.2-1.4 5.3-3.7 2.1-6.4 5.6-7.6 9.5-1.2 4-.8 8.4 1.1 12.1.4.9 1 1.7 1.6 2.7 1 1.7 2.2 3.5 3 5.7 1.4 4 1.2 8.7-.6 13.2-1.4 3.4-3.5 6.6-6.8 10.1-1.5 1.6-3.9 1.7-5.5.2-1.6-1.4-1.7-3.9-.2-5.4 2.6-2.8 4.3-5.3 5.3-7.7 1.1-2.8 1.3-5.6.5-7.9-.5-1.3-1.3-2.7-2.2-4.1-.6-1-1.3-2.1-1.9-3.2-2.8-5.4-3.4-11.9-1.7-17.8 1.8-5.9 5.8-11 11.2-14C739.4 421.6 739.9 421.4 740.4 421.4zM261.3 590.9c5.7 6.8 9 15.7 9.4 22.4.5 7.3-2.4 16.4-10.2 20.4-3 1.5-6.7 2.2-11.2 2.2-7.9-.1-12.9-2.9-15.4-8.4-2.1-4.7-2.3-11.4 1.8-15.9 3.2-3.5 7.8-4.1 11.2-1.6 1.2.9 1.5 2.7.6 3.9-.9 1.2-2.7 1.5-3.9.6-1.8-1.3-3.6.6-3.8.8-2.4 2.6-2.1 7-.8 9.9 1.5 3.4 4.7 5 10.4 5.1 3.6 0 6.4-.5 8.6-1.6 4.7-2.4 7.7-8.6 7.2-15-.5-7.3-5.3-18.2-13-23.9-4.2-3.1-8.5-4.1-12.9-3.1-3.1.7-6.2 2.4-9.7 5-6.6 5.1-11.7 11.8-14.2 19-2.7 7.7-2.1 15.8 1.9 23.9.7 1.4.1 3.1-1.3 3.7-1.4.7-3.1.1-3.7-1.3-4.6-9.4-5.4-19.2-2.2-28.2 2.9-8.2 8.6-15.9 16.1-21.6 4.1-3.1 8-5.1 11.8-6 6-1.4 12 0 17.5 4C257.6 586.9 259.6 588.8 261.3 590.9z'/%3E%3Ccircle cx='1013.7' cy='153.9' r='7.1'/%3E%3Ccircle cx='1024.3' cy='132.1' r='7.1'/%3E%3Ccircle cx='1037.3' cy='148.9' r='7.1'/%3E%3Cpath d='M1508.7 297.2c-4.8-5.4-9.7-10.8-14.8-16.2 5.6-5.6 11.1-11.5 15.6-18.2 1.2-1.7.7-4.1-1-5.2-1.7-1.2-4.1-.7-5.2 1-4.2 6.2-9.1 11.6-14.5 16.9-4.8-5-9.7-10-14.7-14.9-1.5-1.5-3.9-1.5-5.3 0-1.5 1.5-1.5 3.9 0 5.3 4.9 4.8 9.7 9.8 14.5 14.8-1.1 1.1-2.3 2.2-3.5 3.2-4.1 3.8-8.4 7.8-12.4 12-1.4 1.5-1.4 3.8 0 5.3 0 0 0 0 0 0 1.5 1.4 3.9 1.4 5.3-.1 3.9-4 8.1-7.9 12.1-11.7 1.2-1.1 2.3-2.2 3.5-3.3 4.9 5.3 9.8 10.6 14.6 15.9.1.1.1.1.2.2 1.4 1.4 3.7 1.5 5.2.2C1510 301.2 1510.1 298.8 1508.7 297.2zM327.6 248.6l-.4-2.6c-1.5-11.1-2.2-23.2-2.3-37 0-5.5 0-11.5.2-18.5 0-.7 0-1.5 0-2.3 0-5 0-11.2 3.9-13.5 2.2-1.3 5.1-1 8.5.9 5.7 3.1 13.2 8.7 17.5 14.9 5.5 7.8 7.3 16.9 5 25.7-3.2 12.3-15 31-30 32.1L327.6 248.6zM332.1 179.2c-.2 0-.3 0-.4.1-.1.1-.7.5-1.1 2.7-.3 1.9-.3 4.2-.3 6.3 0 .8 0 1.7 0 2.4-.2 6.9-.2 12.8-.2 18.3.1 12.5.7 23.5 2 33.7 11-2.7 20.4-18.1 23-27.8 1.9-7.2.4-14.8-4.2-21.3l0 0C347 188.1 340 183 335 180.3 333.6 179.5 332.6 179.2 332.1 179.2zM516.3 60.8c-.1 0-.2 0-.4-.1-2.4-.7-4-.9-6.7-.7-.7 0-1.3-.5-1.4-1.2 0-.7.5-1.3 1.2-1.4 3.1-.2 4.9 0 7.6.8.7.2 1.1.9.9 1.6C517.3 60.4 516.8 60.8 516.3 60.8zM506.1 70.5c-.5 0-1-.3-1.2-.8-.8-2.1-1.2-4.3-1.3-6.6 0-.7.5-1.3 1.2-1.3.7 0 1.3.5 1.3 1.2.1 2 .5 3.9 1.1 5.8.2.7-.1 1.4-.8 1.6C506.4 70.5 506.2 70.5 506.1 70.5zM494.1 64.4c-.4 0-.8-.2-1-.5-.4-.6-.3-1.4.2-1.8 1.8-1.4 3.7-2.6 5.8-3.6.6-.3 1.4 0 1.7.6.3.6 0 1.4-.6 1.7-1.9.9-3.7 2-5.3 3.3C494.7 64.3 494.4 64.4 494.1 64.4zM500.5 55.3c-.5 0-.9-.3-1.2-.7-.5-1-1.2-1.9-2.4-3.4-.3-.4-.7-.9-1.1-1.4-.4-.6-.3-1.4.2-1.8.6-.4 1.4-.3 1.8.2.4.5.8 1 1.1 1.4 1.3 1.6 2.1 2.6 2.7 3.9.3.6 0 1.4-.6 1.7C500.9 55.3 500.7 55.3 500.5 55.3zM506.7 55c-.3 0-.5-.1-.8-.2-.6-.4-.7-1.2-.3-1.8 1.2-1.7 2.3-3.4 3.3-5.2.3-.6 1.1-.9 1.7-.5.6.3.9 1.1.5 1.7-1 1.9-2.2 3.8-3.5 5.6C507.4 54.8 507.1 55 506.7 55zM1029.3 382.8c-.1 0-.2 0-.4-.1-2.4-.7-4-.9-6.7-.7-.7 0-1.3-.5-1.4-1.2 0-.7.5-1.3 1.2-1.4 3.1-.2 4.9 0 7.6.8.7.2 1.1.9.9 1.6C1030.3 382.4 1029.8 382.8 1029.3 382.8zM1019.1 392.5c-.5 0-1-.3-1.2-.8-.8-2.1-1.2-4.3-1.3-6.6 0-.7.5-1.3 1.2-1.3.7 0 1.3.5 1.3 1.2.1 2 .5 3.9 1.1 5.8.2.7-.1 1.4-.8 1.6C1019.4 392.5 1019.2 392.5 1019.1 392.5zM1007.1 386.4c-.4 0-.8-.2-1-.5-.4-.6-.3-1.4.2-1.8 1.8-1.4 3.7-2.6 5.8-3.6.6-.3 1.4 0 1.7.6.3.6 0 1.4-.6 1.7-1.9.9-3.7 2-5.3 3.3C1007.7 386.3 1007.4 386.4 1007.1 386.4zM1013.5 377.3c-.5 0-.9-.3-1.2-.7-.5-1-1.2-1.9-2.4-3.4-.3-.4-.7-.9-1.1-1.4-.4-.6-.3-1.4.2-1.8.6-.4 1.4-.3 1.8.2.4.5.8 1 1.1 1.4 1.3 1.6 2.1 2.6 2.7 3.9.3.6 0 1.4-.6 1.7C1013.9 377.3 1013.7 377.3 1013.5 377.3zM1019.7 377c-.3 0-.5-.1-.8-.2-.6-.4-.7-1.2-.3-1.8 1.2-1.7 2.3-3.4 3.3-5.2.3-.6 1.1-.9 1.7-.5.6.3.9 1.1.5 1.7-1 1.9-2.2 3.8-3.5 5.6C1020.4 376.8 1020.1 377 1019.7 377zM1329.7 573.4c-1.4 0-2.9-.2-4.5-.7-8.4-2.7-16.6-12.7-18.7-20-.4-1.4-.7-2.9-.9-4.4-8.1 3.3-15.5 10.6-15.4 21 0 1.5-1.2 2.7-2.7 2.8 0 0 0 0 0 0-1.5 0-2.7-1.2-2.7-2.7-.1-6.7 2.4-12.9 7-18 3.6-4 8.4-7.1 13.7-8.8.5-6.5 3.1-12.9 7.4-17.4 7-7.4 18.2-8.9 27.3-10.1l.7-.1c1.5-.2 2.9.9 3.1 2.3.2 1.5-.9 2.9-2.3 3.1l-.7.1c-8.6 1.2-18.4 2.5-24 8.4-3 3.2-5 7.7-5.7 12.4 7.9-1 17.7 1.3 24.3 5.7 4.3 2.9 7.1 7.8 7.2 12.7.2 4.3-1.7 8.3-5.2 11.1C1335.2 572.4 1332.6 573.4 1329.7 573.4zM1311 546.7c.1 1.5.4 3 .8 4.4 1.7 5.8 8.7 14.2 15.1 16.3 2.8.9 5.1.5 7.2-1.1 2.7-2.1 3.2-4.8 3.1-6.6-.1-3.2-2-6.4-4.8-8.3C1326.7 547.5 1317.7 545.6 1311 546.7z'/%3E%3C/g%3E%3C/svg%3E");
		background-attachment: fixed;
		height: 100%;
	}

	.main {
		position: relative;
		height: 100%;
		margin: auto;
	}
	/* 波浪 */
	#wavesDIV {
		position: absolute;
		/* bottom: 100px; */
		z-index: 1;
		width: 100%;
		right: 0px;
		display: block;
		/* height: 180px; */
		transition: bottom 2s;
	}

	#wavesDIV>svg {
		/* margin-bottom: -4px; */
		transform: translate(50%, -20%) scale(2);
		animation: moveWave 10s ease-in-out infinite alternate;
	}

	@keyframes moveWave {
		0% {
			transform: translate(50%, -20%) scale(2);
		}

		50% {
			transform: translate(25%, -10%) scale(2);
		}

		100% {
			transform: translate(0%, -40%) scale(2);
		}
	}

	#footerDIV {
		/* height: 100px; */
		position: absolute;
		bottom: 0px;
		background-color: rgba(69, 191, 201, 1.0);
		display: block;
		width: 100%;
		animation: changeColor 10s ease-in-out infinite alternate;
		z-index: 1;
		transition: height 2s;
	}

	@keyframes changeColor {
		0% {
			background-color: rgba(69, 191, 201, 1.0);
		}

		50% {
			background-color: rgba(65, 199, 199, 1.0);
		}

		100% {
			background-color: rgba(76, 175, 203, 1.0);
		}
	}
	/* endOf波浪 */

	/* 打卡天数的框 */
	.count-container {
		color: #333333;
		text-align: center;
		/* background-color: orange; // for test */
		height: 400px;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	#bgDIV svg {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(0.45);
	}

	#bgDIV svg:first-child {
		animation: splash1 100s ease-in-out infinite;
		z-index: 4;
	}

	#bgDIV svg:last-child {
		animation: splash2 120s linear infinite;
		z-index: 3;
	}

	@keyframes splash1 {
		0% {
			transform: translate(-50%, -50%) scale(0.45) rotate(0deg);
		}

		25% {
			transform: translate(-50%, -50%) scale(0.30) rotate(90deg);
		}

		60% {
			transform: translate(-50%, -50%) scale(0.40) rotate(200deg);
		}

		75% {
			transform: translate(-50%, -50%) scale(0.30) rotate(270deg);
		}

		100% {
			transform: translate(-50%, -50%) scale(0.45) rotate(360deg);
		}
	}

	@keyframes splash2 {
		0% {
			transform: translate(-50%, -50%) scale(0.45) rotate(0deg);
		}

		30% {
			transform: translate(-50%, -50%) scale(0.40) rotate(-180deg);
		}

		100% {
			transform: translate(-50%, -50%) scale(0.45) rotate(-360deg);
		}
	}

	/* 悬停动画 */
	#bgDIV svg:first-child:hover,
	.count-tips:hover~#bgDIV>svg:first-child,
	.count-total:hover~#bgDIV>svg:first-child,
	.count-calendar:hover~#bgDIV>svg:first-child {
		animation-play-state: paused;
		transition: all 1s ease;
	}

	svg:first-child:hover>g,
	.count-tips:hover~#bgDIV>svg:first-child>g,
	.count-total:hover~#bgDIV>svg:first-child>g,
	.count-calendar:hover~#bgDIV>svg:first-child>g {
		opacity: 1;
		transition: all 1s ease;
	}

	.count-tips,
	.count-total,
	.count-calendar {
		z-index: 100;
		/* flex: 1; */
	}

	.count-tips {
		font-weight: bold;
	}

	.count-total {
		margin-left: 2em;
		font-size: 20px;
		font-weight: 200;
	}

	.count-total>span {
		font-size: 80px;
		font-family: 'Monoton', cursive;
		font-weight: 500;
		line-height: 110px;
		/* background-image: linear-gradient(to bottom hsl(162, 100%, 58%) ); */
		color: hsl(264, 78%, 40%);
		text-shadow: 2px 2px 1px #38dbc5;
	}

	.count-calendar {
		font-style: italic;
		text-decoration: underline;
		font-size: 14px;
		line-height: 14px;
		color: #555555;
	}
	/* endOf打卡天数的框 */
	
	/* 时间框 */
	.time-container {
		margin: -40px auto;
		width: 90%;
		z-index: 100;
		display: block;
		position: fixed;
		bottom: 15%;
		left: 5%;
	}
	.time-total {
		text-align: center;
		margin-bottom: 10%;
		color: rgba(33, 61, 182, 0.5);
	}
	.time-total .title {
		font-size: 16px;
	}
	
	.time-total .timeall {
		font-size: 25px;
	}
	
	.time-box {
		border-radius: 10px;
		background-color: rgba(255, 255, 255, 0.8);
		padding: 15px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		box-shadow: inset -10px -10px 50px rgb(255, 255, 255), 1px 1px 5px #999999;

	}
	
	.time-box .left, .time-box .right {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		flex: 1;
	}
	.time-box .left {
		border-right: 1px #38dbc5 solid;
	}
	.time-box text {
		font-size: 20px;
		color: #555555;
		font-weight: 400;
	}
</style>
