window.onload = function() {
	let cookie = document.cookie;
	if(cookie) {
		let tel = JSON.parse(cookie.split("=")[1]).tel;
		$(".log").html(`<a href="shopcar.html" target="_blank">${tel}</a>`);
	}
	let proArr = JSON.parse(localStorage.getItem("prolist"));
	let str = "";
	if(proArr != null) {
		for(let i = 0; i < proArr.length; i++) {
			let pro = proArr[i];
			let price = Number(pro.price.substr(1));
			str += `<div class="item">
						<div class="sel">
							<input type="checkbox" class="ck"/>
						</div>
						<div class="good">
							<div class="good-img">
								<a href="page.html" target="_blank"><img src="images/${pro.src}"/></a>
							</div>
							<div class="good-name">
								<a href="page.html" target="_blank">${pro.name}</a>
							</div>
						</div>
						<div class="price">${pro.price}</div>
						<div class="count" data-id=${pro.id} data-name=${pro.name} data-src=${pro.src} data-price=${pro.price}>
							<a href="javascript:;" class="update" data-number="-1">-</a>
							<a href="javascript:;" class="count-n">${pro.count}</a>
							<a href="javascript:;" class="update" data-number="1">+</a>
						</div>
						<div class="sum">￥${pro.count*price}.00</div>
						<div class="action">
							<a href="javascript:;" id="delbtn">删除</a>
						</div>
					</div>`;
		}
	}
	$(".content").html(str);
	$(".update").click(function() {
		let id = $(this).parent().data("id");
		let num = Number($(this).data("number"));
		let count = Number($(this).parent().find(".count-n").html());
		if(num == -1 && count == 1) {
			return;
		}
		proArr.forEach(function(pro) {
			if(id == pro.id) {
				pro.count += num;
				localStorage.setItem("prolist", JSON.stringify(proArr));
				$(this).parent().find(".count-n").html(pro.count);
				let price = Number(pro.price.substr(1));
				let total = "￥" + (price * pro.count) + ".00";
				$(this).parent().next().html(total);
			}
		}.bind(this))
	})
	$(".action").on("click", "#delbtn", function() {
		if(confirm("确定删除吗？")) {
			let id = $(this).parent().parent().find(".count").data("id");
			for(let i = 0; i < proArr.length; i++) {
				if(id == proArr[i].id) {
					$(this).parent().parent().remove();
					proArr.splice(i, 1);
					localStorage.setItem("prolist", JSON.stringify(proArr));
					jiesuan();
				}
			}
		}
	})

	function jiesuan() {
		let money = 0;
		$(".ck:checked").each(function() {
			let sum = $(this).parent().parent().find(".sum").html().substr(1);
			money += Number(sum);
		})
		$("#s1").html("￥" + money + ".00");
	}
	$(".ck").click(function() {
		jiesuan();
	})
	$("#selAll").click(function() {
		$(".ck").prop("checked", $(this).prop("checked"));
		jiesuan();
		if($("#selAll").prop("checked")) {
			$("#delAll").click(function() {
				if(confirm("确定全部删除吗？")) {
					$(".content").empty();
					for(let i = 0; i < proArr.length; i++) {
						proArr.splice(i);
						localStorage.setItem("prolist", JSON.stringify(proArr));
					}
				}
			})
		}
	})
}