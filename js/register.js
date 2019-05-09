window.onload = function() {
	$("#formcell").submit(function() {
		let tel = $("#tel").val();
		let pwd = $("#pwd").val();
		let json = {
			"tel": tel,
			"pwd": pwd
		}
		if(telFlag && pwdFlag && pwdrFlag && numFlag) {
			setCookie("user", JSON.stringify(json));
			return true;
		} else {
			return false;
		}
		location.href = "login.html";
	})
	let inputs = $("#formcell").find("input");
	$("#tel").focus(function() {
		$("#tel-r").show();
		$("#tel-e").hide();
		$(this).css("border", "1px solid #7ABD54");
	})
	let telFlag = null;
	$("#tel").blur(function() {
		$(this).css("border", "1px solid #ccc");
		let tel = $(this).val();
		if(tel == "") {
			$("#tel-e").show();
		}
		let telReg = /^1[3578]\d{9}$/;
		if(telReg.test(tel)) {
			$("#tel-r").hide();
			$("#tel-e").hide();
			telFlag = true;
		} else {
			$("#tel-e").show();
			$("#tel-r").hide();
			telFlag = false;
		}
	})
	$("#pwd").focus(function() {
		$(this).css("border", "1px solid #7ABD54");
		$("#pwd-r").show();

	})
	let pwdFlag = null;
	$("#pwd").blur(function() {
		$(this).css("border", "1px solid #ccc");
		let pwd = $("#pwd").val();
		if(pwd == "") {
			$("#pwd-e").show();
		}
		let pwdReg = /^.{6,20}$/;
		if(pwdReg.test(pwd)) {
			$("#pwd-r").hide();
			$("#pwd-e").hide();
			pwdFlag = true;
		} else {
			$("#pwd-e").show();
			$("#pwd-r").hide();
			pwdFlag = false;
		}
	})
	$("#pwdr").focus(function() {
		$(this).css("border", "1px solid #7ABD54");
		$("#pwdr-r").show();

	})
	let pwdrFlag = null;
	$("#pwdr").blur(function() {
		$(this).css("border", "1px solid #ccc");
		let pwdr = $("#pwdr").val();
		let pwd = $("#pwd").val();
		if(pwdr == "") {
			$("#pwdr-e").show();
		} else if(pwdr == pwd) {
			$("#pwdr-r").hide();
			$("#pwdr-e").hide();
			pwdrFlag = true;
		} else {
			$("#pwdr-e").show();
			$("#pwdr-r").hide();
			pwdrFlag = false;
		}
	})
	let numFlag = null;
	let ck = document.getElementById("ck");
	$("#ck").click(function() {
		if(ck.checked) {
			numFlag = true;
		} else {
			numFlag = false;
			$("num-e").show();
		}
	})
	return false;
}