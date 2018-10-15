//1.导入模块的公用部分

define(['../thirdplugins/jquery'], function() {
	return {
		yy: ! function() {
			$('#header').load('header.html');
			$('#footer').load('footer.html');
		}(),
		hqnr: (function() {
			$.ajax({
				url: 'http://10.31.162.71/haoyigou/php/details.php',
				data: {
					sid: location.search.substring(1).split('=')[1]
				},
				dataType: 'json'
			}).done(function(data) {				
				var $title = $('.detail_tit');
				var $js = $('.detail_tit_md');
				var $jiage = $('.details_price');
				var $s_piclist = $('.detail_ul');
				var $location = $('.details_location');
				var $tit = '';
				var $jieshao = '';
				var $price = '';
				var $piclist = '';
				var $lc = '';
				//标题
				$tit += '<span class="sp_hot"><em class="em_l">[</em>' + data[0].smalltitle + '<em class="em_r">]</em></span>' + data[0].title + '';
				$title.html($tit);
				//介绍
				$jieshao += '<p>' + data[0].js + '</p>';
				$js.html($jieshao);
				//价格
				$price += '<span class="habby_price">欢乐价</span><div class="price"><em>￥</em><span class="price_num">' + data[0].nprice + '</span><del>￥' + data[0].oprice + '</del></div>'
				$jiage.html($price);
				//小图
				$('.details_content .sm_img img').attr({ src: data[0].url.split(',')[0], alt: data[0].sid });
				

				//大图
				$('.details_content .bf img').attr("src", data[0].url.split(',')[0]);

				//图片列表
				$piclist += '<li><a href="javascript:;"><img src="' + data[0].url.split(',')[0] + '"/></a></li>' +
					'<li><a href="javascript:;"><img src="' + data[0].url.split(',')[1] + '"/></a></li>' +
					'<li><a href="javascript:;"><img src="' + data[0].url.split(',')[2] + '"/></a></li>' +
					'<li><a href="javascript:;"><img src="' + data[0].url.split(',')[3] + '"/></a></li>' +
					'<li><a href="javascript:;"><img src="' + data[0].url.split(',')[4] + '"/></a></li>' +
					'<li><a href="javascript:;"><img src="' + data[0].url.split(',')[5] + '"/></a></li>';
				$s_piclist.html($piclist);

				//路径
				$lc += '<a href="#">首页</a><span>&gt;</span>' +
					'<a href="#">餐厨日用</a><span>&gt;</span>' +
					'<a href="#">家具</a><span>&gt;</span>' +
					'<span>' + data[0].title + '</span>';
				$location.html($lc);
			})
		})(),
		fd: (function() {
			var $sf = $('#sf');
			var $bf = $('.bf');
			var $spic = $('.sm_img');
			var $bpic = $('.bf img');
			$spic.hover(function() {
				$sf.css('display', 'block');
				$bf.css('display', 'block');
				$sf.width($(this).width() * $bf.width() / $bpic.width());
				$sf.height($(this).height() * $bf.height() / $bpic.height());
				var $bili = $bpic.width() / $spic.width();
				$spic.on('mousemove', function(ev) {
					var $l = ev.pageX - $spic.offset().left - $sf.outerWidth() / 2;
					var $t = ev.pageY - $spic.offset().top - $sf.outerHeight() / 2;
					if($l <= 0) {
						$l = 0
					} else if($l >= $spic.width() - $sf.width()) {
						$l = $spic.width() - $sf.width()
					}
					if($t <= 0) {
						$t = 0;
					} else if($t >= $spic.height() - $sf.height()) {
						$t = $spic.height() - $sf.height()
					}
					$sf.css({
						left: $l,
						top: $t
					})
					$bpic.css({
						left: -$l * $bili,
						top: -$t * $bili
					})
				});
			}, function() {
				$sf.css('display', 'none');
				$bf.css('display', 'none');
			});

		})(),
		fdtab: (function() {
			var $spic = $('.sm_img img');
			var $bpic = $('.bf img');
			$('.detail_ul').on('mousemove', 'li img', function() {
				var url = $(this).attr('src');
				$spic.attr('src', url);
				$bpic.attr('src', url);				
				$('.detail_right').on('click', function() {					
					$('.detail_ul').stop().animate({
							left: -81							
					});
				});
				$('.detail_left').on('click', function() {
					$('.detail_ul').stop().animate({
							left: -5
					});

				});
			});

		})()
	}
})