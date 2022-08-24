<template name="myTabBar">
	<view class="my-tabbar" :style="{'--bg-color': bgColor,'--active-color':activeColor}">
		<view :class="['my-tab', currentNow===index?'active':'']" v-for="(tab, index) in tabList"  @click="change(index)">
			<view class="my-tab_icon">
				<i :class="['fa',tab.icon]"></i>
			</view>
			<view class="my-tab_text">
				{{tab.title}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"myTabBar",
		props: {
			bgColor: {
				type: String,
				default: "grey"
			},
			activeColor: {
				type: String,
				default: "slateblue"
			},
			tabList: {
				// 列表数组，元素可为字符串，如为对象可通过keyName指定目标属性名
				type: Array,
				required: true
			},
			current: {
				type: Number,
				required: true
			}
		},
		data() {
			return {
				currentNow: this.current
			};
		},
		methods: {
			change(index) {
				if(this.currentNow!=index) {
					// console.log(JSON.stringify(index));
					this.currentNow = index;
					this.$emit("choose", index);
					this.$forceUpdate();
				}

			}
		}
	}
</script>

<style lang="scss">
	@import url("https://cdn.bootcdn.net/ajax/libs/font-awesome/6.1.2/css/all.css");
	.my-tabbar {
		position: fixed;
		bottom: 0;
		background-color: var(--bg-color); // for test
		width: 100%;
		height: 50px;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		box-shadow: 0px -10px 10px #eee;
		z-index: 900;
	}
	
	.my-tab {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: end;
		height: 90px;
		position: relative;
		bottom: -20px;
		cursor: pointer; //?
		color: #999;
		transition: all 80ms ease ;
		&_icon {
			width:30px;
			height: 30px;
			border: var(--bg-color) 5px solid;
			// border-bottom: none;
			border-radius: 50%;
			padding: 5px;
			text-align: center;
			font-size: 25px;
			line-height: 30px;
		}
		&_text {
			text-align: center;
			margin-top: -3px;
			font-weight: bold;
		}
	}
	
	.active {
		position: relative;
		bottom: 0;
		.my-tab_icon {
			background-color: var(--active-color);
			color: white;
		}
		.my-tab_text {
			color: var(--active-color);
		}
		transition: all 80ms ease ;
	}
</style>