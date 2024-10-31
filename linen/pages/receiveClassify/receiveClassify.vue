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
		<view class="disf mart70">
			<view class="w145h100 marl30 bclan colorbai disf borr8" @click="goscan(1)">
				<img class="wh80 marl10 mart5" src="@/static/chuang.png" alt="" />
				<view class="linh100 marl20">
					床品领用
				</view>
			</view>
			<view class="w145h100 marl30 bclan colorbai disf borr8" @click="goscan(2)">
				<img class="wh80 marl10 mart5" src="@/static/yiwu.png" alt="" />
				<view class="linh100 marl20">
					衣物领用
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			goscan(a) {
				uni.navigateTo({
					url: '/pages/scan/scan?id=' + a
				})
			}
		}
	}
</script>

<style>

</style>