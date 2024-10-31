<template>
	<view class="">
		<view class="padl20 mart10 marb10">订单号：{{id}}</view>
		<view class="padl20 mart10 marb10">品类：{{lei}}</view>
		<view class="padl20 mart10 marb10">数量：{{numder}}</view>
		<view class="padl20 mart10 marb10">洗衣进度</view>
		<view class="scrollable marl133">
			<uni-steps
				:options="[{title:'过水',desc:'2018-11-11'},{title:'清洗',desc:'2018-11-12'},{title:'消毒',desc:'2018-11-13'},{title:'烘干',desc:'2018-11-14'}]"
				direction="column" :active="2"></uni-steps>
		</view>
	</view>
</template>

<script>
	import {
		gcQingXiStep
	} from "@/public/qj_request.js"
	export default {
		data() {
			return {
				saomiao: false, //false显示开始
				templedata: '',
				list: [],
				id: '',
				lei: '',
				numder: '',
			}
		},
		onLoad(a) {
			this.id = a.id
			this.lei = a.lei
			this.numder = a.num
			this.onlreq()
		},
		methods: {
			onlreq() {
				gcQingXiStep().then(res => {
					console.log(res);
				})
			}
		}
	}
</script>

<style>

</style>