//设置cookie
function setCookie(key, value, day) {
	if(day) {
		let now = new Date();
		now.setDate(now.getDate() + day);
		document.cookie = `${key}=${value};expires=${ now }`;
	} else {
		document.cookie = `${key}=${value}`;
	}
}
//获取cookie
function getCookie(key) {
	let str = document.cookie;
	if(str) { //如果有cookie
		str = str.replace(/\s/g, "");
		let arr = str.split(";");
		for(let i = 0; i < arr.length; i++) {
			let item = arr[i].split("=");
			if(item[0] == key) {
				return item[1]; //返回该key对应的value值
			}
		}
	}
	return ""; //没有cookie 返回一个空字符串
}
//删除cookie  将值设置为空
function removeCookie(key) {
	setCookie(key, "", -1);
}