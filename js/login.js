let a = $("#ul").find("a");
let box = $("#index").find(".part");
a.click(function() {
	$(this).addClass("active").parent().siblings().find("a").removeClass("active");
	let index = $(this).parent().index();
	box.eq(index).show().siblings().hide();
})
$("#log").click(function() {
	let json = JSON.parse(getCookie("user"));
	let telStr = json.tel;
	let pwdStr = json.pwd;
	let tel = $("#user").val();
	let pwd = $("#pwd").val();
	if(telStr == tel && pwdStr == pwd) {
		location.href = "index.html?tel=" + tel;
	} else {
		alert("用户名密码不匹配");
		return false;
	}
})