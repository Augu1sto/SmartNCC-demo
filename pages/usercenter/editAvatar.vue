<template>
	<view>
		<view class="upload-box">
			<u-upload
				:fileList="upImage"
				@afterRead="afterRead"
				@delete="deletePic"
				multiple
				maxCount="1"
				width="120"
				height="120"
				radius="20"
			>
				<image src="../../static/upload_avatar.png" 
				mode="widthFix" style="width: 120px;height: 120px;"></image>
			</u-upload>
		</view>
		<view class="btn-area">
			<u-button color="#00adb5" :plain="true" shape="circle" :hairline="true" text="确认修改"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				upImage: []
			}
		},
		methods: {
			deletePic(event) {
				this[`upImage`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`upImage`].length
				lists.map((item) => {
					this[`upImage`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`upImage`][fileListLen]
					this[`upImage`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			// TODO:上传图片
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: '', // 仅为示例，非真实的接口地址https://pic.stackoverflow.wiki/upload
						filePath: url,
						name: 'file',
						formData: {
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			}
		}
	}
</script>

<style>
	.upload-box {
		background-color: white;
		margin: 50rpx auto;
		width: 120px;
		height: 120px;
		padding: 5px;
		border-radius: 25px;
		box-shadow: 0 0 10rpx #dddddd;
	}
	
/* 	image, uni-image, .u-upload__status{
		border-radius: 20px!important;
	} */
</style>
