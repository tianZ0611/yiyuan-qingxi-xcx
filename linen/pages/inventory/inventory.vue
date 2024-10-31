<template>
	<view class="box">
		<view class="mart40">
			<img class="wh113 marl232" src="@/static/gongzuotai/bucao.png" alt="" />
		</view>
		<view class="mart70">
			<view class="w445h140 marl30 bclan colorbai disf borr8" @click="goscan(1)">
				<img class="wh80 marl30 mart15" src="@/static/chuang.png" alt="" />
				<view class="linh140 marl20 fs18">
					床品库存
				</view>
				<uni-icons color="#ffffff" class="linh140 marl232" type="right" size="30"></uni-icons>

			</view>
			<view class="w445h140 marl30 bclan colorbai disf borr8 mart20" @click="goscan(2)">
				<img class="wh80 marl30 mart15" src="@/static/yiwu.png" alt="" />
				<view class="linh140 marl20 fs18">
					衣物库存
				</view>
				<uni-icons color="#ffffff" class="linh140 marl232" type="right" size="30"></uni-icons>

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
					url: '/pages/inventoryone/inventoryone?id=' + a
				})
			}
		}
	}
</script>