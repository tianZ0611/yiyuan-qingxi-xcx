<template>
	<view class="box">
		<uni-table class="w690" border stripe emptyText="暂无更多数据">
			<!-- 表头行 -->
			<uni-tr class="w690 fs14">
				<uni-th width="90" align="center">ID</uni-th>
				<!-- <uni-th width="90" align="center">名称</uni-th> -->
				<uni-th width="90" align="center">部门</uni-th>
				<uni-th width="90" align="center">次数</uni-th>
			</uni-tr>
			<!-- 表格数据行 -->
			<uni-tr class="fs14" v-for="i in list">
				<uni-td align="center">{{i.id}}</uni-td>
				<!-- <uni-td align="center">{{name}}</uni-td> -->
				<uni-td align="center">{{tit}}</uni-td>
				<uni-td align="center">{{i.count}}</uni-td>
			</uni-tr>

		</uni-table>
		<view class="posfb80 disf">
			<button class="w130h44 marl10 bclan colorbai" @click="gogetstatistics()">确认回收</button>
			<button v-show="saomiao == false" class="w130h44 marl10 bclan colorbai"
				@click="inventoryStart()">开始扫描</button>
			<button v-show="saomiao == true" class="w130h44 marl10 bccheng colorbai"
				@click="inventoryStop()">关闭扫描</button>
			<view class="w60 marl20 bcchong textjz colorbai linh44 borr8" @click="qing()">清空</view>
		</view>
	</view>
</template>

<script>
	import {
		yiYuanRecycle
	} from '../../public/qj_request.js'
	const andoridModule = uni.requireNativePlugin('seuic')
	export default {
		data() {
			return {
				saomiao: false, //false显示开始
				templedata: '',
				list: [],
				// name: '张三',
				tit: '浣洗部'
			}
		},
		onLoad(a) {
			console.log(a.id);
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
		onShow() {
			this.qing()
		},
		methods: {
			gogetstatistics() { //点击下一步
				var that = this
				var thlist = that.list
				for (var i = 0; i < thlist.length; i++) {
					thlist[i].rfid = that.list[i].id
					thlist[i].scanTimes = that.list[i].count
					delete thlist[i].id
					delete thlist[i].count
					delete thlist[i].len
					delete thlist[i].rssi
					delete thlist[i].embeded
				}
				if (that.saomiao == false) { //检测未关闭扫描状态false为关闭
					var data = {
						username: that.name, //操作人
						recycleList: thlist,
						deptName: that.tit, //部门
						roleName: that.juese //角色
					}
					console.log('传过去的', data);
					yiYuanRecycle(data).then(res => {
						console.log('回收记录', res);
						if (res.data.code == 200) {
							// var sao = JSON.stringify(res.data)
							// var saomiao = JSON.parse(sao)
							// console.log(sao);
							uni.navigateBack()
							wx.showToast({
								title: '提交成功',
								icon: 'none',
								duration: 2000 //持续的时间
							})
						} else {
							wx.showToast({
								title: '提交失败，请向管理员反映',
								icon: 'none',
								duration: 2000 //持续的时间
							})
						}
					})
				} else {
					uni.showToast({
						title: '未关闭扫描',
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
						var newArray = that.list
						e.forEach(newData => {
							that.insertData(newArray, newData);
						});
						for (var i = 0; i < e.length; i++) {
							that.playsoundPool();
							console.log(that.list);
						}
					} else {
						that.templedata = e
					}
				});
			},

			insertData(existingData, newItem) { //插入新数组并计数
				let found = false;
				for (let item of existingData) {
					if (item.id === newItem.id) {
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