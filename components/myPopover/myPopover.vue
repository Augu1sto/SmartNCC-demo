<template name="myPopover">
	<view class="my-popover" :style="{'--list-bgcolor':listColor,'--active-color':activeColor,width:width+'px',backgroundColor:bgColor}">
		<view class="my-popover-choosebox" @click.stop="showItems=!showItems">
			<view>{{items[chosen]}}</view>
			<view :class="['icon',showItems?'icon-reverse':'']">
				<slot>
					▼
				</slot>
			</view>
		</view>
		<view class="my-popover-list" v-if="showItems" :style="{width:width+'px'}">
			<view :class="['my-popover-list-item',chosen===index?'chosen':'']" v-for="(item,index) in items" @click="choseItem(index)">
				{{item}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"myPopover",
		props: {
			itemList: {
				type: Array,
				required: true
			}, 
			chosenNumber: {
				type: Number,
				default: 0
			},
			width: {
				type: Number,
				default: 80
			},
			listColor: {
				type: String,
				default: "white"
			},
			bgColor: {
				type: String,
				default: "white"
			},
			activeColor: {
				type: String,
				default: "slateblue"
			}
		},
		data() {
			return {
				items: this.itemList,
				chosen: this.chosenNumber,
				showItems: false
			};
		},
		mounted() {
			document.addEventListener('click',e => {
				var c = /my-popover.*/
				if(!c.test(e.target.className)){
					this.showItems= false//点击其他区域关闭
			   }
			})
		},
		// 在组件生命周期结束时销毁
		beforeDestroy() {
		   window.removeEventListener('click', () => {}, true)
		},
		methods: {
			choseItem(index) {
				// console.log(JSON.stringify(e.target));
				this.chosen = index;
				this.showItems = false;
				this.$emit("choose", index);
			}
		}
	}
</script>

<style lang="scss">
	.my-popover {
		position: relative;
		margin: auto;
	}
	
	.my-popover-choosebox {
		display: flex;
		flex-direction: row; // to prop
		justify-content: space-between;
		align-items: center;
		padding: 8px;
		padding-inline-start: 10px;
		padding-inline-end: 3px;
		box-sizing: border-box;
	}
	
	.my-popover-choosebox:active {
		background-color: rgba(50, 50, 50, 0.1);
	}

	.icon {
		transition: all 0.3s;
	}
	
	.icon-reverse {
		transform: rotateX(180deg);
		transition: all 0.3s;
	}
	
	.my-popover-list {
		position: absolute;
		top: 35px;
		border: 1px solid #cccccc;
		border-radius: 6px;
		background-color: var(--list-bgcolor);
		display: flex;
		flex-direction: column; // to prop
		justify-content: space-around;
		align-items: center; // to prop
		padding: 5px;
		box-sizing: border-box;
		z-index: 999;
	}
	
	.my-popover-list::after, .my-popover-list::before {
		position: absolute;
		bottom: 100%;
		left: 50%;
		border: solid transparent;
		content: "";
		height: 0;
		width: 0;
		pointer-events: none;
	}

	.my-popover-list::after {
		border-color: transparent;
		border-bottom-color: var(--list-bgcolor); //与父
		border-width: 8px;
		margin-left: -8px;
	}
	.my-popover-list::before {
		border-color: transparent;
		border-bottom-color: #cccccc;
		border-width: 10px;
		margin-left: -10px;
	}
	
	.my-popover-list-item {
		width: 100%;
		text-align: center;
		border-bottom: #cccccc 1px solid;
		line-height: 30px; // to prop
		font-size: 15px; // to prop
		color: #333;
	}
	
	.my-popover-list-item:last-child {
		border-bottom: none;
	}
	
	.my-popover-list-item:active {
		background-color: rgba(0, 0, 0, 0.1);
	}
	
	.chosen {
		color: var(--active-color);
	}
	

	
	
</style>