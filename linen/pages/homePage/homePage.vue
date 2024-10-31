<template>
	<view class="box">
		<view class="w690 bcbai borr8 padt20 padl20 padb20 posr">
			<view class="disf">
				<img class="wh56" src="@/static/gongzuotai/name.png" alt="" />
				<view class="fs18 marl12">{{name}}</view>
			</view>
			<view class="disf mart20">
				<img class="wh56" src="@/static/gongzuotai/bumen.png" alt="" />
				<view class="fs18 marl12">{{tit}}</view>
			</view>
			<view class="disf posat20r20">
				<img class="wh56" src="@/static/gongzuotai/time.png" alt="" />
				<view class="fs18 marl12">{{formattedTime}}</view>
			</view>
			<button class="fs14 w160h60 posab20r20 boxcha2" @click="jiaojie()">交接班</button>
		</view>



		<view class="w690 bcbai borr8 padt10 padl20 padb20 posr mart10">
			<view class="disf">
				<view class="wh60 bchuang borr3">
					<img class="wh40 mart5 marl5" src="@/static/gongzuotai/sao.png" alt="" />

				</view>
				<view class="fs16 marl12 h30">扫一扫快速盘点</view>
			</view>
			<view class="mart6 fw">
				<span class="colorlan">一 键 扫 描</span>
				<span class="marl8 colorhuang">简 单 读 取</span>
			</view>
			<view class="mart6 fw colorlan">
				<span class="">快 捷 实 现</span>
				<span class="marl8">出 入 盘 对</span>
			</view>
			<!-- <view class="mart6 fw colorlan">
				快 捷 实 现 出 入 盘 对
			</view> -->
			<view class="posab0r20 posr wh94 element">
				<!-- <img class="" src="@/static/gongzuotai/shaomiao1.png" alt="" /> -->
				<img class="wh35 posab20r0" src="@/static/gongzuotai/saomiao.png" alt="" />
			</view>
		</view>

		<!-- 医院 -->
		<view class="w730 bcbai borr8 padt10 padb20 posr mart10" v-if="juese == '院方角色'">
			<view class="fs12 colorhui padl20">日常管理</view>
			<view class=" mart40 disf jussa fww">
				<view class="w45 marl10 marr10" v-for="i in list11" :key="i.id" @click="yyreceive(i.id)">
					<view class="bchuang wh90 borr8">
						<img class="wh56 mart5 marl9 mart8" :src="i.img" alt="" />
					</view>
					<view class="textjz mart8 fs14">
						{{i.name}}
					</view>
				</view>
			</view>
		</view>
		<!-- 工厂 -->
		<view class="w730 bcbai borr8 padt10 padb20 posr mart10" v-else-if="juese == '厂方角色'">
			<view class="fs12 colorhui padl20">日常管理</view>
			<view class=" mart40 disf jussa fww">
				<view class="w45 marl10 marr10" v-for="i in list11" :key="i.id" @click="gcreceive(i.id)">
					<view class="bclan wh90 borr8">
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
				currentTime: new Date(), // 当前时间  
				formattedTime: '', // 格式化后的时间字符串  
				name: '',
				tit: '',
				time: '2024/09/20 15:29',
				juese: '',
				list11: [{
						id: 1,
						name: "领用",
						img: "../../static/gongzuotai/lingyong.png"
					}, {
						id: 2,
						name: "收污",
						img: "../../static/gongzuotai/shouwu.png"
					}, {
						id: 3,
						name: "清洗",
						img: "../../static/gongzuotai/qingxi.png"
					}, {
						id: 5,
						name: "送净",
						img: "../../static/gongzuotai/shouwu.png"
					},
					{
						id: 4,
						name: "库存",
						img: "../../static/gongzuotai/kucun.png"
					},
				]
			}
		},
		onLoad() {
			uni.getStorage({
				key: 'login',
				success: (res) => {
					this.tit = res.data.dept.deptName //部门
					this.name = res.data.userName //用户
					this.juese = res.data.roles[0].roleName //角色
					console.log('login获取成功', this.juese, this.name, this.tit, res.data);
				}
			})
		},
		mounted() {
			this.startTimer(); // 组件挂载后启动定时器  
		},
		beforeDestroy() {
			this.stopTimer(); // 组件销毁前停止定时器  
		},
		methods: {
			// 启动定时器  
			startTimer() {
				this.timer = setInterval(() => {
					this.updateTime();
				}, 1000);
			},
			// 停止定时器  
			stopTimer() {
				clearInterval(this.timer);
			},
			// 更新时间  
			updateTime() {
				this.currentTime = new Date();
				this.formattedTime = this.formatDate(this.currentTime);
			},
			// 格式化日期  
			formatDate(date) {
				const year = date.getFullYear();
				const month = String(date.getMonth() + 1).padStart(2, '0');
				const day = String(date.getDate()).padStart(2, '0');
				const hours = String(date.getHours()).padStart(2, '0');
				const minutes = String(date.getMinutes()).padStart(2, '0');
				const seconds = String(date.getSeconds()).padStart(2, '0');
				return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
			},
			//医院
			yyreceive(id) {
				if (id == 1) { //领用
					uni.navigateTo({
						url: "/pages/receiveClassify/receiveClassify"
					})
				}
				if (id == 2) { //收污
					uni.navigateTo({
						url: "/pages/guide/guide?id=" + id
					})
				}
				if (id == 3) { //清洗
					uni.navigateTo({
						url: "/pages/qingXiList/qingXiList"
					})
				}
				if (id == 4) { //库存
					uni.navigateTo({
						url: "/pages/inventory/inventory?id=" + id
					})
				}
				if (id == 5) { //送净
					uni.navigateTo({
						url: "/pages/guide/guide?id=" + id
					})
				}
			},
			//工厂
			gcreceive(id) {
				if (id == 1) { //领用
					uni.navigateTo({
						url: "/pages/gcpage/getStatistics/getStatistics"
					})
				}
				if (id == 2) { //收污
					uni.navigateTo({
						url: "/pages/gcpage/huiShouList/huiShouList"
					})
				}
				if (id == 3) { //清洗
					uni.navigateTo({
						url: "/pages/gcpage/xiYiList/xiYiList"
					})
				}
				if (id == 4) { //库存
					uni.navigateTo({
						url: "/pages/inventory/inventory?id=" + id
					})
				}
				if (id == 5) { //送净
					uni.navigateTo({
						url: "/pages/guide/guide?id=" + id + 1
					})
				}
			},
			jiaojie() {
				uni.redirectTo({
					url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style>

</style>