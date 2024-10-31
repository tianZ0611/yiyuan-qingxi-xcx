<template>
	<view class="box1 bgColor2B7DD7">
		<view class="fontSize28 colorfff textAlgin padd20">
			院内布草管理终端
		</view>
		<view class="wid100 disPaly marb40">
			<img class="logoImg" src="@/static/logo.png" alt="" />
		</view>
		<!-- <view class="wid100"> -->
		<view class="example marB30 boxcha4">
			<view class="textAlgin fontSize20 padt10 padb20">
				终端用户登录
			</view>
			<!-- 基础用法，不包含校验规则 -->
			<uni-forms ref="baseForm" :modelValue="baseFormData">
				<uni-forms-item label="账号" required>
					<uni-easyinput v-model="baseFormData.name" placeholder="请输入账号" />
				</uni-forms-item>
				<uni-forms-item label="密码" required>
					<uni-easyinput v-model="baseFormData.age" placeholder="请输入密码" />
				</uni-forms-item>
			</uni-forms>
		</view>
		<view class="hei45">
			<view class="floatLeft colorfff posRelative lineHeight">
				<img class="jgImg posAbsolute" src="@/static/jg.png" alt="" />
				<view class="marL30">
					如需开户请联系管理员
				</view>

			</view>
			<view class="floatRight">
				<button class="padd30 boxcha4" @click="enter()">登录</button>
			</view>
		</view>
		<view class="colorbai w750h56 textjz posfb50 fs20">院内布草管理系统 v1.2.0</view>
	</view>

</template>

<script>
	import {
		login
	} from '@/public/qj_request.js'
	export default {
		data() {
			return {
				baseFormData: {
					name: '',
					age: ''
				}
			}
		},
		onLoad() {

		},
		methods: {
			enter() {
				var that = this
				var da = {
					username: that.baseFormData.name,
					password: that.baseFormData.age,
				}
				login(da).then(res => {
					console.log('loginres', res);
					if (res.data.code == 200) {
						uni.setStorage({
							key: 'login',
							data: res.data.user,
							success: function() {
								console.log('login保存成功');
								uni.switchTab({
									url: '/pages/homePage/homePage'
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
	.uni-forms {
		width: 90%;
		/* height: 232px; */
		margin: auto;

	}

	.uni-forms-item__label {
		width: 60px !important;
	}
</style>