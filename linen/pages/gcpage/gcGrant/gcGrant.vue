<template>
	<view>
		<uni-table class="w690" border stripe emptyText="暂无更多数据">
			<!-- 表头行 -->
			<uni-tr class="w690 fs14">
				<uni-th width="90" align="center">ID</uni-th>
				<uni-th width="90" align="center">名称</uni-th>
				<uni-th width="90" align="center">部门</uni-th>
				<uni-th width="90" align="center">校准</uni-th>
			</uni-tr>
			<!-- 表格数据行 -->
			<uni-tr class="fs14" v-for="i in list">
				<uni-td align="center">{{i.rfid}}</uni-td>
				<uni-td align="center">{{i.materialName}}</uni-td>
				<uni-td align="center">{{i.deptName}}</uni-td>
				<uni-td align="center" :class="i.state == '正常'?'colorlan':'colorhong'">{{i.state}}</uni-td>
			</uni-tr>
		</uni-table>
		<!-- 多出来的id的表格 -->
		<uni-table class="w690" border stripe emptyText="暂无更多数据" v-show="duodeid.length>=1">
			<!-- 表头行 -->
			<uni-tr class="w690 fs14">
				<uni-th width="90" align="center">非本单物品ID</uni-th>
				<uni-th width="90" align="center">校准</uni-th>
			</uni-tr>
			<!-- 表格数据行 -->
			<uni-tr class="fs14" v-for="i in duodeid">
				<uni-td align="center">{{i.id}}</uni-td>
				<uni-td align="center" :class="i.state == '正常'?'colorlan':'colorhong'">异常</uni-td>
			</uni-tr>
		</uni-table>
		<view class="posfb80 disf">
			<button class="w145h44 marl30 bclan colorbai" @click="gogetstatistics()">确认分发</button>
			<button v-show="saomiao == false" class="w145h44 marl30 bclan colorbai"
				@click="inventoryStart()">开始扫描</button>
			<button v-show="saomiao == true" class="w145h44 marl30 bccheng colorbai"
				@click="inventoryStop()">关闭扫描</button>
			<!-- <view class="w60 marl20 bcchong textjz colorbai linh44 borr8" @click="qing()">清空</view> -->
		</view>
	</view>
</template>

<script>
	import {
		lingyongjilu_chuang,
		lingyongjilu_yi,
		millDetails
	} from '@/public/qj_request.js'
	const andoridModule = uni.requireNativePlugin('seuic')
	export default {
		data() {
			return {
				saomiao: false, //false显示开始
				lingqu: '', //1床品，2衣服
				templedata: '',
				list: [],
				bumen: '浣洗部',
				xinlist: [],
				tit: '',
				name: '',
				juese: '',
				duodeid: [] //多出来的回显
			}
		},
		onLoad(a) {
			console.log(a.id, a.lei);
			this.lingqu = a.lei
			this.onLdetails(a.id)
			uni.getStorage({
				key: 'login',
				success: (res) => {
					console.log('login获取成功', res.data);
					this.tit = res.data.dept.deptName //部门
					this.name = res.data.userName //用户
					this.juese = res.data.roles[0].roleName //角色
				}
			})
			andoridModule.open((e) => { //开启扫描权限
				console.log('open', e);
				this.templedata = e
				if (this.templedata == 'true') {
					andoridModule.setPower('30', (e) => { //设置频率、5-30
						console.log('setPower', e);
						this.templedata = e
					});
					andoridModule.setParameters('7', '1', (e) => { //会话值
						console.log('setParameters', e);
						this.templedata = e
					});
				}
			});
		},
		methods: {
			onLdetails(a) {
				var that = this
				millDetails(a).then(res => {
					console.log('厂家详情确认', res.data);
					var da = res.data
					if (da.code == 200) {
						that.list = da.data
					} else {
						wx.showToast({
							title: '获取失败，请向联系管理员',
							icon: 'none',
							duration: 2000 //持续的时间
						})
					}
				})
			},
			gogetstatistics() { //点击下一步
				var that = this
				var thlist = that.list
				var jiaoZhunOrder = true
				for (var i = 0; i < thlist.length; i++) {
					thlist[i].rfid = that.list[i].id
					thlist[i].scanTimes = that.list[i].count
					delete thlist[i].id
					delete thlist[i].count
					delete thlist[i].len
					delete thlist[i].rssi
					delete thlist[i].embeded
					if (thlist[i].state == '异常') {
						jiaoZhunOrder = false
					}
				}
				if (that.saomiao == false && jiaoZhunOrder != false && that.duodeid.length < 1) { //检测未关闭扫描状态false为关闭
					if (that.lingqu == '床品') {
						var data = {
							username: that.name, //操作人
							bedReceiveList: thlist,
							deptName: that.tit, //部门
							roleName: that.juese //角色
						}
						console.log('传过去的', data);

						lingyongjilu_chuang(data).then(res => { //床品接口
							console.log('回收记录', res);
							if (res.data.code == 200) {
								uni.navigateBack()
								wx.showToast({
									title: '提交成功',
									icon: 'none',
									duration: 2000 //持续的时间
								})
							} else {
								wx.showToast({
									title: '提交失败，请联系管理员',
									icon: 'none',
									duration: 2000 //持续的时间
								})
							}
						})
					} else {
						var data = {
							operator: that.name, //操作人
							clothesReceiveList: thlist, //
							deptName: that.tit,
							roleName: that.juese
						}
						console.log('传过去的', data);
						lingyongjilu_yi(data).then(res => { //衣物接口
							console.log('回收记录', res);
							if (res.data.code == 200) {
								uni.navigateBack()
								wx.showToast({
									title: '提交成功',
									icon: 'none',
									duration: 2000 //持续的时间
								})
							} else {
								wx.showToast({
									title: '提交失败，请联系管理员',
									icon: 'none',
									duration: 2000 //持续的时间
								})
							}
						})
					}
				} else {
					uni.showToast({
						title: '未关闭扫描或存在异常状态',
						icon: 'none',
						duration: 2000 //持续的时间
					})
				}
			},
			/* inventoryStart */
			inventoryStart() { //开启扫描
				var that = this
				that.saomiao = !that.saomiao
				console.log('扫描');
				andoridModule.inventoryStart((e) => {
					console.log('扫描', e);
					if (e != 'false') {
						// var sao = JSON.stringify(e)
						// var saomiao = JSON.parse(sao)
						console.log("扫描出：", e);
						var a = that.list
						var b = e
						// e.forEach(newData => {//次数
						// 	that.insertData(arr, newData);
						// });
						that.checkAndAddState(a, b)
						for (var i = 0; i < e.length; i++) {
							that.playsoundPool();
							console.log(that.list);
						}
					} else {
						that.templedata = e
					}
				});
			},
			//校对
			checkAndAddState(a, b) {
				var that = this
				for (let itemB of b) {
					let found = false;
					for (let itemA of a) {
						if (itemB.id == itemA.rfid) {
							itemA.state = '正常';
							found = true;
							break;
						}
					}
					if (!found) {
						// 这里也可以考虑对 b 中的对象添加状态为异常，但题目只要求处理 a
						// itemB.state = '异常';
						// 如果 b 中有 a 没有的数据，保存在 this.xinlist 中
						if (!that.xinlist) {
							that.xinlist = [];
						}
						that.xinlist.push(itemB);
						console.log('异常多出的', that.xinlist);
					}
				}
				// 添加处理 a 中没有状态为'正常'的情况
				for (let itemA of a) {
					if (!itemA.hasOwnProperty('state') || itemA.state !== '正常') {
						itemA.state = '异常';
					}
				}
				return that.forceShowValue(a); //让他回显
			},

			forceShowValue(a) { //回显
				this.list = a;
				this.$forceUpdate(); // 强制 Vue 实例重新渲染
				console.log(this.list);
			},
			insertData(existingData, newItem) { //插入新数组并计数
				let found = false;
				for (let item of existingData) {
					if (item.id == newItem.id) {
						item.count++;
						found = true;
						break;
					}
				}
				if (!found) {
					existingData.push(newItem);
				}
			},
			playsoundPool: function() { //声音
				var that = this
				andoridModule.playSound((e) => {
					this.templedata = e
					// console.log("playsoundPool：" + e);
				});
			},

			inventoryStop() { //关闭扫描
				var that = this
				that.saomiao = !that.saomiao
				andoridModule.inventoryStop((e) => {
					this.templedata = e
					console.info("inventoryStop关闭：" + JSON.stringify(e))
					//去除that.xinlist中id重复的
					const uniqueIds = new Set();
					const uniqueData = []; //将重复去除后复制到uniqueData这里
					for (const item of that.xinlist) {
						if (!uniqueIds.has(item.id)) {
							uniqueIds.add(item.id);
							uniqueData.push(item);
						}
					}
					//去除完成后给that.duodeid赋值
					that.duodeid = uniqueData
					console.log('duode', that.duodeid);
				});
			},
			qing() { //清空列表
				var that = this
				that.list = []
			}
		}
	}
</script>

<style>

</style>