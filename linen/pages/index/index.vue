<template>
	<view class="bgColor2B7DD7 wid100 hei100">
		<view class="fontSize28 colorfff textAlgin padd20">
			院内布草管理终端
		</view>
		<view class="wid100 disPaly">
			<img class="logoImg" src="@/static/logo.png" alt="" />
		</view>
		<!-- <view class="wid100"> -->
		<view class="example marT85 marB30">
			<view class="textAlgin fontSize20 padd20">
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
				<button class="padd30">登录</button>
			</view>
		</view>
		<view class="fontSize20 colorfff textAlgin padd20">
			院内布草管理系统 v1.2.0
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {

		},
		methods: {

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