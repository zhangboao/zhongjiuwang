window.onload = function() {
	$("#head").load("head.html",function(){
		let cookie = document.cookie;
		if( cookie ){
			let tel = JSON.parse(cookie.split("=")[1]).tel;
			console.log($(".log"))
			$(".log").html( `<a href="shopcar.html" target="_blank">${tel}</a>` );
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
	//加载数据
	let str = location.href;
	let arr = str.split("?")[1].split("&");
	if(arr.length != 1) {
		let pid = arr[0].split("=")[1];
		let classify = arr[1].split("=")[1];
		let deff = $.ajax({
			type: "get",
			url: "category.json",
			async: true
		});
		deff.done(function(json) {
			let proList = json[classify].list;
			let str = "";
			for(let i = 0; i < proList.length; i++) {
				let pro = proList[i];
				if(pid == pro.id) {
					str = ` <div class="page-left" id="box">
								<div class="big">
									<img src="images/${pro.src}" class="bigImg"/>
								</div>
								<div class="small">
									<img src="images/${pro.src}"/>
									<div class="mask"></div>
								</div>
								<div class="tab">
									<ul>
										<li><img src="images/${pro.src}"/></li>
									</ul>
								</div>
							</div>
							<div class="page-right">
								<h1>${pro.name}</h1>
								<ul>
									<li>价格 <span>${pro.price}</span></li>
									<li>促销 满 <span>200.00</span>免运费</li>
									<li>库存 <span>有货</span></li>
								</ul>
								<div class="count">
									<span>数量</span>
									<a href="javascript:;" class="update" data-number="-1">-</a>
									<a href="javascript:;" class="count-n">1</a>
									<a href="javascript:;" class="update" data-number="1">+</a>
								</div>
								<div class="buy-shop">
									<div class="buy">
										<img src="images/lijig.png"/>
										立即购买
									</div>
									<div class="shop" data-id=${pro.id} data-src=${pro.src} data-name=${pro.name} data-price=${pro.price}>
										<img src="images/gou.png"/>
										加入购物车
									</div>
								</div>
							</div>`
					$(".page").html(str);
					break;
				}
			}
			$(".update").click(function() {
				let num = Number($(this).data("number"));
				let count = Number($(this).parent().find(".count-n").html());
				if(num == -1 && count == 1) {
					return;
				}
				count += num;
				$(this).parent().find(".count-n").html(count);
			})
			$(".shop").click(function() {
				let id = $(this).data("id");
				let flag = true;
				let arr = [];
				let count = Number($(".count-n").html());
				let totalcount = 0;
				let proJson = {
					"id": $(this).data("id"),
					"src": $(this).data("src"),
					"name": $(this).data("name"),
					"price": $(this).data("price"),
					"count": count
				}
				let proTxt = localStorage.getItem("prolist");
				if(proTxt != null) {
					arr = JSON.parse(proTxt);
					for(let i = 0; i < arr.length; i++) {
						if(proJson.id == arr[i].id) {
							arr[i].count += proJson.count;
							flag = false;
						}
					}
				}
				if(flag) {
					arr.push(proJson);
				}
				for(let i = 0; i < arr.length; i++) {
					totalcount += arr[i].count;
				}
				$("#count").html(totalcount);
				localStorage.setItem("prolist", JSON.stringify(arr));
			})
			//放大镜
			$(".tab li").mouseenter(function() {
				$(this).addClass("active").siblings().removeClass("active");
				let index = $(this).index();
				$(".small img").eq(index).show().siblings().hide();
				$(".big img").eq(index).show().siblings().hide();
			})
			$(".small").hover(function() {
				$(".mask").show();
				$(".big").show();
			}, function() {
				$(".mask").hide();
				$(".big").hide();
			})
			$(".small").mousemove(function(evt) {
				let box = $(".page-left");
				let mask = $(".mask");
				let big = $(".big");
				let e = evt || event;
				let x = e.pageX - box.offset().left - mask.width() / 2;
				let y = e.pageY - box.offset().top - mask.height() / 2;
				let maxL = $(".small").width() - mask.width();
				let maxT = $(".small").height() - mask.height();
				x = Math.min(Math.max(0, x), maxL);
				y = Math.min(Math.max(0, y), maxT);
				$(".mask").css({
					left: x,
					top: y
				});
				let w = big.width() / mask.width();
				let h = big.height() / mask.height();
				$(".bigImg").css({
					left: -x * w,
					top: -y * h
				});
			})
		})
	}
}