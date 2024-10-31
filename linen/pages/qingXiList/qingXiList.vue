<template>
	<view class="box fs16">
		<view class="fs16 bcbai padl20 padt10 padb10 marb8 posr bor8" v-for="i in list" :key="i.id">
			<view class="mart5">订单号：<span class="colorhui">{{i.orderNumber}}</span></view>
			<view class="mart5">类型：{{i.materialType}}</view>
			<view class="mart5">部门：{{i.deptName}}</view>
			<view class="mart5">状态：{{i.status}}</view>
			<view class="mart5">时间：{{i.receiveTime}}</view>
			<view class="mart5">数量：<span class="colorlan fs20 fw">{{i.totalNumber}}</span></view>
			<view class="w80h34 textjz linh34 bclan colorbai borr8 posab10r20"
				@click="goqueren(i.orderNumber,i.materialType,i.totalNumber)">
				详情
			</view>
			<!-- <view class="posab10r40">
				<view class="fs36 colorlan">
					{{i.totalNumber}}
				</view>
				<view class="mart10 textjz">
					数量
				</view>
			</view> -->
		</view>

		<!-- <view class="posfb80 disf">
			<button class="w145h44 marl30 bclan colorbai">上一步</button>
			<button class="w145h44 marl30 bclan colorbai" @click="lingyong()">确认领用</button>
		</view> -->
	</view>
</template>

<script>
	import {
		gcQingXilist
	} from "@/public/qj_request.js"
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.lingyonglist()
		},
		methods: {
			lingyonglist() {
				var that = this
				gcQingXilist().then(res => {
					console.log(res.data.data);
					if (res.data.code == 200) {
						that.list = res.data.data
					}
				})
			},
			// lingyong() {
			// 	uni.showModal({
			// 		title: '提示',
			// 		content: '请确认数量无误后点击确定完成领用操作',
			// 		success: function(res) {
			// 			if (res.confirm) { //这里是点击了确定以后
			// 				console.log('用户点击确定')
			// 			} else { //这里是点击了取消以后
			// 				console.log('用户点击取消')
			// 			}
			// 		}
			// 	})
			// },
			goqueren(id, lei, num) {
				uni.navigateTo({
					url: '/pages/cleanout/cleanout?id=' + id + '&lei=' + lei + '&num=' + num
				})
			}
		}
	}
</script>