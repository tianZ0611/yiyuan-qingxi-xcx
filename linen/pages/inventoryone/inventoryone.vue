<template>
	<view class="fs16">
		<view class="bcbai">
			<view class="colorhui padb20 textjz">{{jilu}}库存</view>
			<view class="box ">
				<view class="padl20 padt10 padb10 marb8 posr mart10 bcbai borr8" v-for="i in list" :key="i.id">
					<view class="">名称：{{i.materialName}}</view>
					<view class="mart10">部门：{{i.deptName}}</view>
					<view class="mart10">规格：{{i.fabric}}</view>
					<!-- <view class="mart10">状态：{{i.ling}}</view> -->
					<view class="posab10r40">
						<view class="fs36 colorlan">
							{{i.totalNumber}}
						</view>
						<view class="mart10 textjz">
							数量
						</view>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import {
		yiwuInventory,
		chuangpinInventory
	} from '@/public/qj_request.js'
	export default {
		data() {
			return {
				jilu: '', //回显是什么记录
				jiluid: '', //保存上个页面传来的id
				list: [{
					id: 1,
					ming: "整套",
					bumen: "神经内科9A-909",
					guige: "普通面料",
					ling: "领用",
					shuliang: '1270'
				}, {
					id: 2,
					ming: "整套",
					bumen: "神经内科9A-909",
					guige: "普通面料",
					ling: "领用",
					shuliang: '170'
				}]
			}
		},

		watch: {},
		onLoad(a) {
			this.jiluid = a.id
			this.onlkucun(a.id)
		},
		methods: {
			onlkucun(aid) {
				var that = this
				if (aid == 1) {
					this.jilu = '床品'
					chuangpinInventory().then(res => {
						console.log('床', res.data.data);
						that.list = res.data.data
					})
				}
				if (aid == 2) {
					this.jilu = '衣物'
					yiwuInventory().then(res => {
						console.log('衣', res.data.data);
						that.list = res.data.data
					})
				}
			}
		}
	}
</script>

<style>

</style>