const header_1 = {
	'Content-Type': 'application/x-www-form-urlencoded'
}

// 基础路径
// const baseURL = 'http://192.168.1.85:8080'; //线下
const baseURL = 'http://192.168.1.85:9999'; //线
const request = (e) => {
	let options = {
		url: '',
		method: 'get',
		data: {},
		header: header_1,
		timeout: 60000
	};
	Object.assign(options, e)
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseURL + '/' + options.url,
			method: options.method,
			data: options.data,
			header: options.header,
			timeout: options.timeout,
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}
export default request