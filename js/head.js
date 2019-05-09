//分类
$(".cate").mouseenter(function() {
	$(".cate-all").show();
}).mouseleave(function() {
	$(".cate-all").hide();
})
$(".cate-all").hover(function() {
	$(this).show();
}, function() {
	$(this).hide();
})
$(".category-details").hover(function() {
	$(".cate-all").show();
}, function() {
	$(".cate-all").hide();
})
//顶部选项卡
let list1 = $(".top-list").find(".wh");
list1.mouseenter(function() {
	$(this).addClass("white").siblings().removeClass("white");
}).mouseleave(function() {
	list1.removeClass("white");
})
let list2 = $(".top-list").find(".div");
list2.mouseenter(function() {
	$(this).find("div").show();
}).mouseleave(function() {
	$(this).find("div").hide();
})
//分类列表选项卡
let item = $(".nav-cen").find(".item");
let details = $(".nav-cen").find(".category-details");
item.mouseenter(function() {
	let index = $(this).index();
	details.eq(index).show().siblings().hide();
	$(this).addClass("bg").siblings().removeClass("bg");
}).mouseleave(function() {
	item.removeClass("bg");
	details.hide();
})
details.mouseenter(function() {
	$(this).show();
}).mouseleave(function() {
	$(this).hide();
})