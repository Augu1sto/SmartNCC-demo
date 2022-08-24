<template>
	<web-view :src="url">

	</web-view>
</template>

<script>
	export default {
		data() {
			return {
				title: '外部链接',
				url: ''
			}
		},
		onLoad(res) {
			// data = decodeURIComponent(res.data);
			this.url = res.url;
			this.title = res.title
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.title
			})
			// #ifdef APP-PLUS
			var currentWebview = this.$scope.$getAppWebview() //获取当前页面的webview对象
			console.log(currentWebview)
			setTimeout(function() {
				wv = currentWebview.children()[0]
				wv.setStyle({scalable:true})
			}, 1000); //如果是页面初始化调用时，需要延时一下
			// #endif
		},
		methods: {
		}
	}
</script>

<style>

</style>
