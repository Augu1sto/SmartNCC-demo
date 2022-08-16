<template>
	<view>
		<view class="info-cell">
			<u-cell title="头像" :isLink="true" @click="editAvatar">
				<text slot="value" class="u-slot-value"><u-avatar :src="src" shape="square"></u-avatar></text>
			</u-cell>
			<u-cell title="姓名" :value="uname"></u-cell>
			<u-cell title="学校" :value="uschool"></u-cell>
			<u-cell title="学号" :value="unumber"></u-cell>
			<u-cell title="手机号" :value="uphone" :border="false"></u-cell>	
		</view>
		<view class="btn-area">
			<u-button color="#00adb5" :plain="true" shape="circle" :hairline="true" text="修改密码" @click="editPwd"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: "../../static/avatar.jpg",
				uname: "GY",
				uschool: "武汉大学",
				unumber: "2020202210014",
				uphone: "15105257339"
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
