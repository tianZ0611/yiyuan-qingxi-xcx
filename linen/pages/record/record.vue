<template>
	<view class="box">
		<view class="w730 bcbai borr8 padt10 padb20 posr mart10" v-if="juese == '院方角色'">
			<view class="fs12 colorhui padl20">日常管理</view>
			<view class=" mart40 disf jussa">
				<view class="" v-for="i in list11" :key="i.id" @click="receive(i.id)">
					<view class="bchuang wh90 borr8 w45 mar0auto">
						<img class="wh56 mart5 marl9 mart8" :src="i.img" alt="" />
					</view>
					<view class="textjz mart8 fs14">
						{{i.name}}
					</view>

				</view>
			</view>
		</view>
		<view class="w730 bcbai borr8 padt10 padb20 posr mart10" v-else-if="juese == '厂方角色'">
			<view class="fs12 colorhui padl20">日常管理</view>
			<view class=" mart40 disf jussa">
				<view class="" v-for="i in list11" :key="i.id" @click="receive(i.id)">
					<view class="bclan wh90 borr8 w45 mar0auto">
						<img class="wh56 mart5 marl9 mart8" :src="i.img" alt="" />
					</view>
					<view class="textjz mart8 fs14">
						{{i.name}}
					</view>

				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

				list11: [{
					id: 1,
					name: "领用记录",
					img: "../../static/gongzuotai/lingyong.png"
				}, {
					id: 2,
					name: "回收记录",
					img: "../../static/gongzuotai/shouwu.png"
				}, {
					id: 3,
					name: "清洗记录",
					img: "../../static/gongzuotai/qingxi.png"
				}, {
					id: 4,
					name: "报损记录",
					img: "../../static/gongzuotai/baosun.png"
				}],
				juese: ''
			}
		},
		onLoad() {
			uni.getStorage({
				key: 'login',
				success: (res) => {
					// this.tit = res.data.dept.deptName //部门
					// this.name = res.data.userName //用户
					this.juese = res.data.roles[0].roleName //角色
					console.log('login获取成功', this.juese, this.name, this.tit, res.data);
				}
			})
		},
		methods: {
			receive(a) {
				if (a == 1) {
					uni.navigateTo({
						url: '/pages/getRecord/getRecord'
					})
				} else {
					uni.navigateTo({
						url: "/pages/recordsQuery/recordsQuery?id=" + a
					})
				}
			}
		}
	}
</script>

<style>

</style>