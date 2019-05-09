window.onload = function() {
	$("#head").load("head.html",function(){
		let str = document.cookie;
		if(str) {
			let tel = JSON.parse(str.split("=")[1]).tel;
			$(".log").html(`<a href="shopcar.html" target="_blank">${tel}</a>`);
		}
	});
	$("#foot").load("foot.html");
	let count = 0;
	let proArr = JSON.parse(localStorage.getItem("prolist"));
	if(proArr != null) {
		for(let i = 0; i < proArr.length; i++) {
			count += proArr[i].count;
		}
		$("#count").html(count);
	}
	//ajax获取数据
	let deffered = $.ajax({
		type: "get",
		url: "category.json?_id" + new Date().getTime(),
		async: true
	});
	deffered.done(function(json) {
		show();

		function show() {
			let titleStr = "";
			let proList = [];
			let conStr = "";
			for(let attr in json) {
				titleStr += `<li classify=${attr}>${json[attr].name}</li>`
				proList = json[attr].list;
				if(proList) {
					for(let i = 0; i < proList.length; i++) {
						let pro = proList[i];
						conStr += ` <li>
										<div>
											<a href="page.html?pid=${pro.id}&classify=${attr}" target="_blank"><img src="images/${pro.src}"/></a>
										</div>
										<p><strong>${pro.price}</strong><span>成交<b> 17088 </b>笔</span></p>
										<h3>${pro.name}</h3>
										<h4>天佑德西宁机场专卖店<span><i data-id=${pro.id} data-src=${pro.src} data-name=${pro.name} data-price=${pro.price}></i></span></h4>
									</li>`;
					}
				}
			}
			$(".list-area").find("ul").html(conStr);
			$(".left-a").find("ul").html(titleStr);
		}
		let $h3 = $(".left-a").find("h3");
		$h3.click(function() {
			show(); //所有分类
		})
		let $ul = $(".left-a").find("ul");
		$ul.on("click", "li", function() {
			$(this).css("color", "#F00F34").siblings().css("color", "#7F7F7A");
			let classify = $(this).attr("classify");
			let proList = json[classify].list;
			let conStr = "";
			for(let i = 0; i < proList.length; i++) {
				let pro = proList[i];
				conStr += ` <li>
									<div>
										<a href="page.html" target="_blank"><img src="images/${pro.src}"/></a>
									</div>
									<p><strong>${pro.price}</strong><span>成交<b> 17088 </b>笔</span></p>
									<h3>${pro.name}</h3>
									<h4>天佑德西宁机场专卖店<span><i data-id=${pro.id} data-src=${pro.src} data-name=${pro.name} data-price=${pro.price}></i></span></h4>
								</li>`;
			}
			$(".list-area").find("ul").html(conStr);
		})
	})
	$(".list-area").on("click", "i", function() {
		let count = 0;
		let flag = true;
		let arr = [];
		let proJson = {
			"id": $(this).data("id"),
			"src": $(this).data("src"),
			"name": $(this).data("name"),
			"price": $(this).data("price"),
			"count": 1
		}
		let proTxt = localStorage.getItem("prolist");
		if(proTxt != null) {
			arr = JSON.parse(proTxt);
			for(let i = 0; i < arr.length; i++) {
				if(proJson.id == arr[i].id) {
					arr[i].count++;
					flag = false;
				}
			}
		}
		if(flag) {
			arr.push(proJson);
		}
		let oImg = $(`<img src=images/${proJson.src}>`);
		$(this).append(oImg);
		oImg.css({
			width: 52,
			height: 52,
			position: "absolute",
			top: -10,
			left: -10,
			zIndex: 100
		}).animate({
			left: $(".shopbox").offset().left - $(this).offset().left - 20,
			top: $(".shopbox").offset().top - $(this).offset().top
		}, 1000, function() {
			oImg.remove();
			for(let i = 0; i < arr.length; i++) {
				count += arr[i].count;
			}
			$("#count").html(count);
		})
		localStorage.setItem("prolist", JSON.stringify(arr));
	})

	return false;
}