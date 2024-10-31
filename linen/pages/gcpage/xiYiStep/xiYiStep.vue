<template>
	<view class="box">
		<view class="bcbai padb10 padt10">
			<view class="padl20 mart10 marb10">订单号：{{id}}</view>
			<view class="padl20 mart10 marb10">品类：{{lei}}</view>
			<view class="padl20 mart10 marb10">数量：{{numder}}</view>
			<view class="padl20 mart10 marb10">当前状态：{{zhuangtai}}</view>
		</view>
		<view class="w730 bcbai borr8 padt10 padb20 posr mart10">
			<view class="colorhui padl20">进度更改项</view>
			<view class="w222h44 marl180">
				<uni-data-select class="" v-model="value" :localdata="range" @change="change"></uni-data-select>
			</view>
		</view>
		<view class="bclan colorbai borr8 textjz posfb80 w222h44 linh44 marl153" @click="buzhou()">
			步骤确认更改
		</view>
	</view>
</template>

<script>
	import {
		gcQingXiStep,
		gcQingXiStepChange
	} from "@/public/qj_request.js"
	export default {
		data() {
			return {
				value: '',
				id: '',
				lei: '',
				numder: '',
				zhuangtai: '',
				zhuang: '',
				range: [{
					value: 1,
					text: "篮球"
				}],
				buzhoutext: ''
			}
		},
		onLoad(a) {
			console.log(a);
			this.id = a.id
			this.lei = a.lei
			this.numder = a.num
			if (a.zhuangtai == "已回收") {
				this.zhuangtai = '清洗中'
			}
			this.zhuang = a.zhuangtai
			this.onlreq()
		},
		methods: {
			onlreq() {
				var that = this
				gcQingXiStep().then(res => {
					console.log(res);
					var da = res.data
					var bu = []
					if (da.code == 200) {
						for (var i = 0; i < da.data.length; i++) {
							var list = {
								value: i + 1,
								// text: `${i+1} - ` + da.data[i]
								text: da.data[i]
							}
							bu.push(list)
							if (i == da.data.length - 1) {
								console.log(list);
								that.range = bu
							}
						}
					}
				})
			},
			change(e) {
				var that = this
				console.log("e:", e);
				for (var i = 0; i < that.range.length; i++) {
					if (e == that.range[i].value) {
						that.buzhoutext = that.range[i].text
					}
				}
			},
			buzhou() {
				var that = this
				uni.getStorage({
					key: 'login',
					success: (res) => {
						var r = res.data
						// this.tit = r.dept.deptName //部门
						// this.name = r.userName //用户
						// this.juese = r.roles[0].roleName //角色
						console.log('login获取成功', this.juese, this.name, this.tit, res.data);
						var da = {
							operator: r.userName,
							status: that.buzhoutext,
							orderNumber: that.id,
							currentStatus: that.zhuang
						}
						gcQingXiStepChange(da).then(res => {
							console.log(res.data);
							if (res.data.code == 200) {
								wx.showToast({
									title: res.data.msg,
									icon: 'none',
									duration: 2000 //持续的时间
								})
							} else {
								wx.showToast({
									title: `失败!${res.data.msg}`,
									icon: 'none',
									duration: 2000 //持续的时间
								})
							}
						})
					}
				})
			}
		}
	}
</script>

<style>

</style>