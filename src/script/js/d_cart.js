define(['../thirdplugins/jquery'], function() {
	return {
		add: (function() {
			function addcookie(key, value, day) {
				var date = new Date(); //创建日期对象
				date.setDate(date.getDate() + day); //过期时间：获取当前的日期+天数，设置给date
				document.cookie = key + '=' + encodeURI(value) + ';expires=' + date; //添加cookie，设置过期时间
			};
			//得到cookie
			function getcookie(key) {
				var str = decodeURI(document.cookie);
				var arr = str.split('; ');
				for(var i = 0; i < arr.length; i++) {
					var arr1 = arr[i].split('=');
					if(arr1[0] == key) {
						return arr1[1];
					}
				}
			};
			//删除cookie

			function delcookie(key) {
				addcookie(key, '', -1); //添加的函数,将时间设置为过去时间
			};

			var $sidarr = []; //将取得cookie的编号存放到此数组
			var $numarr = []; //将取得cookie的数量存放到此数组
			//获取cookie,值变成数组
			function getcookievalue() {
				if(getcookie('cartsid') && getcookie('cartnum')) {
					$sidarr = getcookie('cartsid').split(','); //[1,2,3,4]					
					$numarr = getcookie('cartnum').split(','); //[50,60,70,80]
					console.log($sidarr);
				}
			};
			$('.add_cart').on('click', function() {
				var $sid = $(this).parents('.details_content').find('.sm_img img').attr('alt');
				getcookievalue(); //获取cookie,值变成数组				
				if($.inArray($sid, $sidarr) != -1) { //sid存在,数量累加					
					if(getcookie('cartnum') == '') {					
						var $num = parseInt($('#sl').val());						
						$numarr[$.inArray($sid, $sidarr)] = $num; //根据$.inArray通过sid确定位置.
						addcookie('cartnum', $numarr.toString(), 7); //修改后的结果
						$sidarr[$.inArray($sid, $sidarr)] = $sid; //将当前id添加到对应的位置。
						addcookie('cartsid', $sidarr.toString(), 7); //将整个数组添加到cookie
					} else {						
						var $num1 = parseInt($numarr[$.inArray($sid,$sidarr)]) + parseInt($('#sl').val()); //当前的值和cookie里面的值(和sid对应的值)进行累加
						$numarr[$.inArray($sid, $sidarr)] = $num1; //将新的数量，覆盖原先的值。
						addcookie('cartnum', $numarr, 10);
					}
				} else { //不存在,存入cookie
					$sidarr.push($sid); //将sid追加到数组
					addcookie('cartsid', $sidarr, 10); //存cookie
					$numarr.push($('#sl').val()); //将表单的值追加到数组
					addcookie('cartnum', $numarr, 10); //存cookie
				}
			})
		})()
	}
});