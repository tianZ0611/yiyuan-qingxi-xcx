<template>
	<view class="fs16">
		<view class="bcbai">
			<view class="fs12 colorhui padl20 padb20">{{jilu}}记录查询</view>
			<!-- <uni-section :title="'日期用法：' + single" type="line"></uni-section> -->
			<view class="borb1lan marl10 marr10 borr3 marb20">
				<!-- <uni-datetime-picker type="date" :clear-icon="false" v-model="single" @maskClick="maskClick" /> -->
				<uni-datetime-picker type="date" :clear-icon="false" v-model="single" @maskClick="maskClick" />
			</view>
			<view class="box ">
				<view class="fs16 padl20 padt10 padb10 marb8 posr mart10 bcbai borr8" v-for="i in list" :key="i.id"
					v-show="show == true">
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
				<view class="textjz" v-show="show == false">
					--------暂无数据--------
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		chuangpinjilu,
		yiwujilu,
		qingxijiluriqi,
		shouwujilu
	} from '@/public/qj_request.js'
	export default {
		data() {
			return {
				jilu: '', //回显是什么记录
				jiluid: '', //保存上个页面传来的id
				show: true,
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
				}],
				single: "", //日期
				datetimesingle: "2021-04-3",
			}
		},

		watch: {
			single(newval) { //这里处理选择日期
				console.log(newval, "单选:", this.single);
				var riqi = {
					date: this.single
				}
				this.onljilu(this.jiluid, riqi)
			}
		},
		onLoad(aaa) {
			this.jiluid = aaa.id
			this.onljilu(this.jiluid, this.single)
		},
		methods: {
			onljilu(aid, b) {
				var that = this
				if (aid == 1) {
					that.jilu = '床品领用'
					chuangpinjilu(b).then(res => {
						console.log(res.data.data);
						that.list = res.data.data
						that.listshow()
					})
				}
				if (aid == 5) {
					that.jilu = '衣物领用'
					yiwujilu(b).then(res => {
						console.log(res);
						that.list = res.data.data
						that.listshow()
					})
				}
				if (aid == 2) {
					that.jilu = '回收'
					shouwujilu(b).then(res => {
						console.log(res);
						that.list = res.data.data
						that.listshow()
					})
				}
				if (aid == 3) {
					that.jilu = '清洗'
					qingxijiluriqi(b).then(res => {
						console.log(res);
						that.list = res.data.data
						that.listshow()
					})
				}
				if (aid == 4) {
					that.jilu = '报损'
					baosunjilu(b).then(res => {
						console.log(res);
						that.list = res.data.data
						that.listshow()
					})
				}
			},
			listshow() {
				var that = this
				if (that.list.length <= 0) {
					that.show = false
				}
			},
			change(e) {
				this.single = e
				console.log('change事件:', this.single = e);
			},
			changeLog(e) {
				console.log('change事件:', e);
			},
			maskClick(e) {
				console.log('maskClick事件:', e);
			}
		}
	}
</script>

<style>

</style>