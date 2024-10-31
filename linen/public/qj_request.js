import requst from './requst.js'
import reqjson from './reqjson.js'

//登录login
export const login = (code) => {
	return reqjson({
		url: 'app/login',
		method: 'POST',
		data: code
	})
}
//批量新增回收
export const HuiShouJiLu = (code) => {
	return reqjson({
		url: 'recycle/recycle/app',
		method: 'POST',
		data: code
	})
}
//批量新增清洗
export const qingxijilu = (code) => {
	return reqjson({
		url: 'recycle/recycle/app',
		method: 'POST',
		data: code
	})
}
//批量新增床品领用
export const lingyongjilu_chuang = (code) => {
	return reqjson({
		url: 'app/bed/receive/bathAdd',
		method: 'POST',
		data: code
	})
}

//批量新增衣物领用
export const lingyongjilu_yi = (code) => {
	return reqjson({
		url: 'app/cloth/receive/bathAdd',
		method: 'POST',
		data: code
	})
}
//统计服装领用
export const fuzhuangtongji = (code) => {
	return requst({
		url: `app/bed/receive/query?date=${code}`,
		method: 'GET',
		data: {}
	})
}

//衣物库存
export const yiwuInventory = (code) => {
	return requst({
		url: `app/clothing/repertory/query`,
		method: 'GET',
		data: code
	})
}
//床品库存
export const chuangpinInventory = (code) => {
	return requst({
		url: `app/bedding/repertory/query`,
		method: 'GET',
		data: code
	})
}


// 床品领用记录

export const chuangpinjilu = (code) => {
	return requst({
		url: `app/bed/receive/query`,
		method: 'GET',
		data: code
	})
}

// 衣物领用记录
export const yiwujilu = (code) => {
	return requst({
		url: `app/cloth/receive/query`,
		method: 'GET',
		data: code
	})
}

// 收污记录
export const shouwujilu = (code) => {
	return requst({
		url: `app/recycle/recycle/query`,
		method: 'GET',
		data: code
	})
}
// 清洗记录
export const qingxijiluriqi = (code) => {
	return requst({
		url: `app/rinse/rinse/query`,
		method: 'GET',
		data: code
	})
}
// 报损记录
export const baosunjilu = (code) => {
	return requst({
		url: `app/rinse/rinse/query`,
		method: 'GET',
		data: code
	})
}


// 厂家领用列表
export const lingList = () => {
	return requst({
		url: `factory/echo/receive`,
		method: 'GET',
		data: {}
	})
}

// 厂家领用详情
export const millDetails = (order) => {
	return requst({
		url: `factory/detail/receive?orderNumber=${order}`,
		method: 'GET',
		data: {}
	})
}
// 医院回收
export const yiYuanRecycle = (data) => {
	return reqjson({
		url: `app/recycle/recycle/bathAdd`,
		method: 'POST',
		data: data
	})
}
// 厂家回收列表
export const GongChangnRecycle = () => {
	return reqjson({
		url: `factory/echo/recycle`,
		method: 'GET',
		data: {}
	})
}

// 厂家回收详情
export const affirmRecycle = (order) => {
	return requst({
		url: `factory/detail/recycle?orderNumber=${order}`,
		method: 'GET',
		data: {}
	})
}
// 厂家/医院    清洗列表
export const gcQingXilist = () => {
	return reqjson({
		url: `factory/echo/rinse`,
		method: 'GET',
		data: {}
	})
}

// 厂家清洗步骤
export const gcQingXiStep = () => {
	return requst({
		url: `factory/washStatusDict`,
		method: 'GET',
		data: {}
	})
}
// 厂家清洗步骤选择更改
export const gcQingXiStepChange = (data) => {
	return reqjson({
		url: `app/rinse/rinse/batchAdd`,
		method: 'POST',
		data: data
	})
}
// 医院清洗步骤查看
export const YYQingXiStep = (data) => {
	return requst({
		url: ``,
		method: 'POST',
		data: data
	})
}
// 工厂送净对比打包列表
export const gcRemand = () => {
	return requst({
		url: `factory/echo/remand`,
		method: 'GET',
		data: {}
	})
}
// 医院送净对比领取列表
export const YYRemand = () => {
	return requst({
		url: ``,
		method: 'GET',
		data: {}
	})
}