window.onload = function() {
	if( document.cookie ){
		let str = location.href;
		let tel = str.split("?")[1].split("=")[1];
		if( tel.length == 11 ){
			$(".log").html( `<a href="shopcar.html" target="_blank">${tel}</a>` );
		}
	}
	//轮播图
	slideshow();
	function slideshow() {
		let timer = null,
			index = 0,
			$list = $(".slideshow").find("li"),
			$cons = $(".slide-controls").find("span"),
			$smalls = $(".small-banner").find("img");
		timer = setInterval(autoplay, 3000);

		function autoplay() {
			index++;
			if(index == $cons.size()) {
				index = 0;
			}
			$list.eq(index).fadeIn(1000).siblings().fadeOut(1000);
			$cons.eq(index).addClass("cur").siblings().removeClass("cur");
		}
		$cons.mouseenter(function() {
			clearInterval(timer);
			index = $(this).index() - 1;
			autoplay();
		}).mouseleave(function() {
			timer = setInterval(autoplay, 3000);
		})
		$smalls.mouseenter(function() {
			$(this).stop().animate({
				"right": 7,
				"opacity": 1
			}, 500)
		}).mouseleave(function() {
			$smalls.stop().animate({
				"opacity": 0.9,
				"right": 0
			}, 500)
		})
	}
	//热销爆款
	left();

	function left() {
		let img = $(".good").find("img");
		img.mouseenter(function() {
			$(this).stop().animate({
				left: -8
			})
		}).mouseleave(function() {
			$(this).stop().animate({
				left: 0
			})
		})
	}
	//logo切换
	change($(".scroll-f1"), $(".prev-f1"), $(".next-f1"), 188);
	change($(".scroll-f2"), $(".prev-f2"), $(".next-f2"), 188);
	change($(".scroll-f3"), $(".prev-f3"), $(".next-f3"), 188);
	change($(".scroll-f4"), $(".prev-f4"), $(".next-f4"), 188);
	change($(".bt-scroll"), $(".bt-prev"), $(".bt-next"), 550);

	function change(obj1, obj2, obj3, w) {
		let ul = obj1.children(),
			prev = obj2,
			next = obj3,
			index = 0;
		next.click(function() {
			index++;
			if(index == ul.size()) {
				index = 0;
			}
			obj1.animate({
				left: -w * index
			})
		})
		prev.click(function() {
			index--;
			if(index == -1) {
				index = ul.size() - 1;
			}
			obj1.animate({
				left: -w * index
			})
		})
	}
	//楼层选项卡
	floorTab($(".tab-f1"), $(".top-right-all-f1"));
	floorTab($(".tab-f2"), $(".top-right-all-f2"));
	floorTab($(".tab-f3"), $(".top-right-all-f3"));
	floorTab($(".tab-f4"), $(".top-right-all-f4"));

	function floorTab(obj1, obj2) {
		let li = obj1.children(),
			box = obj2.children();
		li.mouseenter(function() {
			let index = $(this).index();
			box.eq(index).show().siblings().hide();
		})
	}
	//楼梯效果
	floor();

	function floor() {
		let $ul = $('.floor-nav').children();
		let $list = $('.floor-nav').find("li");
		let $floorDiv = $('.floor');
		let flag = true;
		$list.click(function() {
			flag = false;
			$(this).find("span").addClass("active").end().siblings().find("span").removeClass("active");
			let index = $(this).index();
			let sTop = $floorDiv.eq(index).offset().top;
			$("body,html").animate({
				scrollTop: sTop
			}, 1000, function() {
				flag = true;
			})
		})
		$(window).scroll(function() {
			if(flag) {
				let sTop = $(document).scrollTop();
				let $fDiv = $floorDiv.filter(function(index) {
					return Math.abs($(this).offset().top - sTop) < $(this).height() / 2;
				})
				let index = $fDiv.index() - 1;
				if(index >= 0) {
					$list.eq(index).find("span").addClass("active").end().siblings().find("span").removeClass("active");
				}
				if(sTop > ($floorDiv.eq(3).offset().top + $floorDiv.eq(3).height() / 10)) {
					$ul.fadeOut(500);
				} else if(sTop > ($floorDiv.eq(0).offset().top - $floorDiv.eq(0).height() / 2)) {
					$ul.fadeIn();
				} else if(sTop < $floorDiv.eq(0).offset().top) {
					$ul.fadeOut();
				}
			}
		})
	}
}