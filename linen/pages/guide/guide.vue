<template>
	<view class="box">
		<view class="textjz fw colorlan mart70">
			扫描操作指引
		</view>
		<view class="mart70">
			<img class="wh113 marl232" src="@/static/gongzuotai/bucao.png" alt="" />
		</view>
		<view class="marl133 mart40">
			<view class="w232 colorlan fs14 textjz">
				请循环移动手持扫描设备持续10-30秒
			</view>
			<view class="w232 colorlan fs14 textjz mart10">
				确保手持扫描设备读取标签的完整性
			</view>
		</view>
		<button class="mart70 w222h44 bclan colorbai" @click="goscan()">下一步</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: ""
			}
		},
		onLoad(a) {
			console.log(a.id);
			this.id = a.id
		},
		methods: {
			goscan() {
				var that = this
				if (that.id == 2) {
					uni.navigateTo({
						url: '/pages/scanningCopy/scanningCopy?id=' + that.id
					})
				} else if (that.id == 5 || that.id == 51) {
					uni.navigateTo({
						url: "/pages/gcpage/changRemand/changRemand?id=" + that.id
					})
				}
			}
		}
	}
</script>

<style>

</style>