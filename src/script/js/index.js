//1.导入模块的公用部分

define(['../thirdplugins/jquery'], function () {
	return {
		yy: ! function () {
			$('#header').load('header.html', function () {
				var $ssl = $('#qbz');
				var $s_input = $('.s_input ul');
				$ssl.on('input', function (ev) {
					$s_input.show();
					$.ajax({
						url: 'https://suggest.taobao.com/sug?code=utf-8&q=' + $ssl.val() + '&_ksTS=1539324367737_629&callback=jsonp',
						async: true,
						dataType: 'jsonp'
					}).done(function (data) {
						var $ali = '';
						$.each(data, function (index, value) {
							$.each(value, function (index, value1) {
								$ali += '<li><a href="javascript:;">' + value1[0] + '</a><li>';
							});
						});
						$s_input.html($ali);
						$s_input.on('click', 'a', function () {
							$ssl.val($(this).html());
							$s_input.hide();
						})
					})

				});
			});
			$(document.body).not('.s_input').on('click', function () {
				$('.s_input ul').hide();
			})
		}(),		
		//楼层
		loucen: (function (ev) {
			var $louti = $('#left_slider'); //左侧楼梯
			var $loutili = $('#left_slider li');
			var $louceng = $('#main').children('div');
			$(window).on('scroll', function () {
				var $scrolltop = $(window).scrollTop(); //获取滚动条的top值。
				if ($scrolltop >= 250) {
					$louti.show();
				} else {
					$louti.hide();
				}

				//4.4:拖动滚轮，对应的楼梯添加对应的类名
				$louceng.each(function (index, element) { //index:0-8
					//通过遍历的方式获取每一个楼层的top值
					var $top = $louceng.eq(index).offset().top + $(this).innerHeight() / 2;
					if ($top > $scrolltop) {
						$loutili.removeClass('active'); //清除所有的类
						$loutili.eq($(this).index()).addClass('active');
						return false; //阻止循环
						//每次只能有一个满足条件添加类，其他的通过循环阻止
					}
				});
			});
			//4.2点击左侧楼梯，右边对应的楼层跳转。
			$loutili.on('click', function () {
				var $top = $louceng.eq($(this).index()).offset().top;
				$('html,body').animate({ //赋值时考虑兼容。
					scrollTop: $top - 75
				});
			});
		})(),
		banner: (function (ev) {
			var $ul = $('#slide ul');
			var $li = $('#slide li');
			var $btns = $('.btn_all span');
			var $index = 0;
			$btns.on('click', function () {
				$index = $(this).index(); //1
				$btns.eq($index).addClass('on').siblings('span').removeClass('on');
				$ul.children('li').eq($index).addClass('on_li').animate({
					opacity: 1
				}).siblings('li').removeClass('on_li').animate({
					opacity: 0
				});
			});
			//自动切换
			var tabTimer = '';
			var len = $(".btn_all span").length;
			var i = 0;
			$("#slide").hover(function () {
				clearInterval(tabTimer);
				$btns.on('click', function () {
					i = $(this).index();
				})
			}, function () {
				clearInterval(tabTimer);
				tabTimer = setInterval(function () {
					i++;
					if (i > len) {
						i=0;						
					}
					$btns.eq(i).addClass("on").siblings().removeClass("on");
					$ul.children('li').eq(i).addClass('on_li').animate({
						opacity: 1
					})
					.siblings().removeClass('on_li').animate({
						opacity: 0
					});
				}, 1000);
			}).trigger("mouseleave");


		})(),
		g_tab: (function (ev) {
			var $c_ul = $('.grop_ul');
			var $c_right = $('.ri1');
			var $c_left = $('.le1');
			var $c_grop = $('.grop_temp');
			$('.clock li').on('mouseover', function () {
				var $c_index = $(this).index();
				$('.clock li').eq($c_index).addClass('clock_on').siblings('li').removeClass('clock_on');
				$('.grop').eq($c_index).show().siblings().hide()
			})
			$c_right.on('click', function () {
				var $left = $c_grop.width();
				$c_ul.animate({
					left: -$left
				})
			})
			$c_left.on('click', function () {
				var $left = $c_grop.width();
				$c_ul.animate({
					left: 0
				})
			})
		})(),
		now_tab: (function (ev) {
			var $n_ul = $('.time_title ul');
			var $n_li = $('.time_name');
			var $n_time = $('.time_ul');
			var $n_grop = $('.time_gro');
			var $n_line = $('.zb_icon_down');
			var $n_right = $('.lr');
			var $n_left = $('.ll');
			$.each($n_li, function (index, element) {
				$(this).on('click', function () {
					var $left = $n_li.eq(index).offset().left;
					var $width = $n_line.width();
					$n_line.stop(true).animate({
						left: $left - $width - 53
					})
					$n_grop.eq(index).show().siblings('.time_gro').hide();
				});
			});
			$n_right.on('click', function () {
				var $left = $n_grop.width();
				$n_time.animate({
					left: -$left
				})
			})
			$n_left.on('click', function () {
				$n_time.animate({
					left: 0
				})
			})
		})(),
		news: (function (ev) {
			var $new_return = $('.return');
			$new_return.on('click', function () {
				$.ajax({
					url: "http://10.31.162.71/haoyigou/php/new.php",
					async: true,
					dataType: "json"
				}).done(function (data) {
					var $n_oUl = $('.new_ul');
					var $n_oLi = '';
					$.each(data, function (index, value) {
						$n_oLi += '<li><a href="#" class="a1"><img src="' + value.url + '"/></a><a href="#" class="new_title_a"><p class="p1">' + value.small_title + '</p><p class="p2">' + value.title + '</p></a><div class="new_price"><span class="price1">￥' + value.now_price + '</span><del class="price2">￥' + value.original_price + '</del></div></li>';
					});
					$n_oUl.html($n_oLi);
				})
			})
		})(),
		top: (function (ev) {
			var $top = $('#top');
			var $sch = $('.sch');
			$(window).on('scroll', function () {
				var $scrolltop = $(document).scrollTop();
				if ($scrolltop >= 400) {
					$top.css({
						height: '52px'
					})
				} else {
					$top.css({
						height: '0px'
					})
				}
			});
			$(window).on('load', function () {
				$.ajax({
					url: "https://suggest.taobao.com/sug?code=utf-8&q=111&_ksTS=1539219766822_305&callback=jsonp",
					async: true,
					dataType: "jsonp"
				}).done(function (data) {

				})
			})
		})(),
		main: (function () {
			var $b_li = $('.beauty_ul').children('li');
			var $f_li = $('.food_ul').children('li');
			var $d_li = $('.day_ul').children('li');
			var $c_li = $('.cloth_ul').children('li');
			var $h_li = $('.home_ul').children('li');
			var $hs_li = $('.house_ul').children('li');
			$b_li.hover(function () {
				$(this).addClass('click_on').siblings('li').removeClass('click_on');
				$.ajax({
					url: "http://10.31.162.71/haoyigou/php/beauty.php",
					async: true,
					dataType: "json"
				}).done(function (data) {
					var $b_oUl = $('.b_ul');
					var $b_oLi = '';
					$.each(data, function (index, value) {
						$b_oLi += '<li class="beauty_li"><a href="#" class="a1"><img src="' + value.url + '"/></a><a href="#" class="new_title_a"><p class="p1">' + value.small_title + '</p><p class="p2">' + value.title + '</p></a><div class="new_price"><span class="price1">￥' + value.now_price + '</span><del class="price2">￥' + value.original_price + '</del></div></li>';
					});
					$b_oUl.html($b_oLi);
				})
			}, function () { });
			$f_li.hover(function () {
				$(this).addClass('click_on').siblings('li').removeClass('click_on');
				$.ajax({
					url: "http://10.31.162.71/haoyigou/php/beauty.php",
					async: true,
					dataType: "json"
				}).done(function (data) {
					var $f_oUl = $('.f_ul');
					var $f_oLi = '';
					$.each(data, function (index, value) {
						$f_oLi += '<li class="beauty_li"><a href="#" class="a1"><img src="' + value.url + '"/></a><a href="#" class="new_title_a"><p class="p1">' + value.small_title + '</p><p class="p2">' + value.title + '</p></a><div class="new_price"><span class="price1">￥' + value.now_price + '</span><del class="price2">￥' + value.original_price + '</del></div></li>';
					});
					$f_oUl.html($f_oLi);
				})
			}, function () { });
			$d_li.hover(function () {
				$(this).addClass('click_on').siblings('li').removeClass('click_on');
				$.ajax({
					url: "http://10.31.162.71/haoyigou/php/beauty.php",
					async: true,
					dataType: "json"
				}).done(function (data) {
					var $d_oUl = $('.d_ul');
					var $d_oLi = '';
					$.each(data, function (index, value) {
						$d_oLi += '<li class="beauty_li"><a href="#" class="a1"><img src="' + value.url + '"/></a><a href="#" class="new_title_a"><p class="p1">' + value.small_title + '</p><p class="p2">' + value.title + '</p></a><div class="new_price"><span class="price1">￥' + value.now_price + '</span><del class="price2">￥' + value.original_price + '</del></div></li>';
					});
					$d_oUl.html($d_oLi);
				})
			}, function () { });
			$c_li.hover(function () {
				$(this).addClass('click_on').siblings('li').removeClass('click_on');
				$.ajax({
					url: "http://10.31.162.71/haoyigou/php/beauty.php",
					async: true,
					dataType: "json"
				}).done(function (data) {
					var $c_oUl = $('.c_ul');
					var $c_oLi = '';
					$.each(data, function (index, value) {
						$c_oLi += '<li class="beauty_li"><a href="#" class="a1"><img src="' + value.url + '"/></a><a href="#" class="new_title_a"><p class="p1">' + value.small_title + '</p><p class="p2">' + value.title + '</p></a><div class="new_price"><span class="price1">￥' + value.now_price + '</span><del class="price2">￥' + value.original_price + '</del></div></li>';
					});
					$c_oUl.html($c_oLi);
				})
			}, function () { });
			$h_li.hover(function () {
				$(this).addClass('click_on').siblings('li').removeClass('click_on');
				$.ajax({
					url: "http://10.31.162.71/haoyigou/php/beauty.php",
					async: true,
					dataType: "json"
				}).done(function (data) {
					var $h_oUl = $('.h_ul');
					var $h_oLi = '';
					$.each(data, function (index, value) {
						$h_oLi += '<li class="beauty_li"><a href="#" class="a1"><img src="' + value.url + '"/></a><a href="#" class="new_title_a"><p class="p1">' + value.small_title + '</p><p class="p2">' + value.title + '</p></a><div class="new_price"><span class="price1">￥' + value.now_price + '</span><del class="price2">￥' + value.original_price + '</del></div></li>';
					});
					$h_oUl.html($h_oLi);
				})
			}, function () { });
			$hs_li.hover(function () {
				$(this).addClass('click_on').siblings('li').removeClass('click_on');
				$.ajax({
					url: "http://10.31.162.71/haoyigou/php/beauty.php",
					async: true,
					dataType: "json"
				}).done(function (data) {
					var $hs_oUl = $('.hs_ul');
					var $hs_oLi = '';
					$.each(data, function (index, value) {
						$hs_oLi += '<li class="beauty_li"><a href="#" class="a1"><img src="' + value.url + '"/></a><a href="#" class="new_title_a"><p class="p1">' + value.small_title + '</p><p class="p2">' + value.title + '</p></a><div class="new_price"><span class="price1">￥' + value.now_price + '</span><del class="price2">￥' + value.original_price + '</del></div></li>';
					});
					$hs_oUl.html($hs_oLi);
				})
			}, function () { });
		})(),
	}
});