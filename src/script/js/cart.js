define(['../thirdplugins/jquery'], function () {
	return {
		cart: (function () {
			function addCookie(key, value, day) {
				var date = new Date(); //创建日期对象
				date.setDate(date.getDate() + day); //过期时间：获取当前的日期+天数，设置给date
				document.cookie = key + '=' + encodeURI(value) + ';expires=' + date; //添加cookie，设置过期时间
			}

			function getCookie(key) {
				var str = decodeURI(document.cookie);
				var arr = str.split('; ');
				for (var i = 0; i < arr.length; i++) {
					var arr1 = arr[i].split('=');
					if (arr1[0] == key) {
						return arr1[1];
					}
				}
			}

			function delCookie(key) {
				addCookie(key, '', -1); //添加的函数,将时间设置为过去时间
			}

			function createcart(sid, num) { //sid：图片的编号  num:商品的数量
				$.ajax({
					url: 'http://10.31.162.71/haoyigou/php/yesterday.php',
					dataType: 'json'
				}).done(function (data) {
					$.each(data, function (index, value) {
						if (sid == data[index].sid) { //图片的sid和数据里面的sid匹配						
							$('.good_main').css('display', 'none');
							$('.goods_main').css('display', 'block');
							var $clone = $('.cart_item:hidden').clone(true); //对隐藏的模块进行克隆
							// //都是赋值
							$clone.find('.p_img').find('img').attr('src', value.url);
							$clone.find('.p_img').find('img').attr('sid', value.sid);
							$clone.find('.p_goodsname').find('a').html(value.small_title);
							$clone.find('.p_price').find('p').html(value.now_price);
							if(num>=99){
								num=99;														
							}						
							$clone.find('.p_quantity').find('input').val(num);
							// //计算价格,每个商品的价格
							var $dj1 = parseFloat($clone.find('.p_price p').html()); //获取单价
							$clone.find('.sps_sum').html(($dj1 * $clone.find('.p_quantity').find('input').val()).toFixed(2)); //num：数量
							$clone.css('display', 'block'); //克隆的模块是隐藏，显示出来。													
							$('.item_list').append($clone); //追加
							totalprice();
						}
					})
				})
			}
			if (getCookie('cartsid') && getCookie('cartnum')) {
				var s = getCookie('cartsid').split(',');//存放sid数组
				var n = getCookie('cartnum').split(',');//存放数量数组
				for (var i = 0; i < s.length; i++) {
					createcart(s[i], n[i]);//遍历创建商品列表        			
				}
			}
			//获取cookie放入数组
			var sidarr = [];
			var numarr = [];
			function cookieToArray() {
				if (getCookie('cartsid')) {
					sidarr = getCookie('cartsid').split(',');
				}

				if (getCookie('cartnum')) {
					numarr = getCookie('cartnum').split(',');
				}
			}
			//计算总价
			function totalprice() {//计算总价
				var total = 0;//总的价格
				var countnum = 0;//总的数量
				$('.cart_item:visible').each(function () {//可视的商品列表进行遍历，循环叠加
					if ($(this).find('input:checkbox').is(':checked')) {//商品的复选框是选中的
						total += parseFloat($(this).find('.sps_sum').html());
						countnum += parseInt($(this).find('.p_quantity').find('input').val());
					}
				});
				//赋值	
				$('.cart_total').html(total.toFixed(2));
				$('.sunm').html(countnum);
			}
			
			//消除点击checkbox不能直接加入数量和总价的问题
			$('.p_checkbox input').on('click',function(){				
				if ($('input:checkbox').is(':checked')){
					totalprice();
				}else{
					$('.cart_total').html(0);
					$('.sunm').html(0);
				}
			})

			//num输入框操作
			$('.quantityred').on('click', function () {
				var $count = $(this).parents('.cart_item').find('.p_quantity input').val();
				$count--;
				if ($count <= 1) {
					$count = 1;
				}
				$(this).parents('.cart_item').find('.p_quantity input').val($count);
				$(this).parents('.cart_item').find('.p_sum').find('.sps_sum').html(singlegoodsprice($(this)));//改变后的价格				
				setcookie($(this));
				totalprice();
			});

			$('.quantityadd').on('click', function () {
				var $count = $(this).parents('.cart_item').find('.p_quantity input').val();
				$count++;
				if ($count >= 99) {
					$count = 99;
				}
				$(this).parents('.cart_item').find('.p_quantity input').val($count);
				$(this).parents('.cart_item').find('.p_sum').find('.sps_sum').html(singlegoodsprice($(this)));//改变后的价格				
				setcookie($(this));
				totalprice();
			});
			$('.p_quantity input').on('input', function () {
				var $reg = /^\d+$/g; //只能输入数字
				var $value = parseInt($(this).val());
				if ($reg.test($value)) {
					if ($value >= 99) {//限定范围
						$(this).val(99);
					} else if ($value <= 0) {
						$(this).val(1);
					} else {
						$(this).val($value);
					}
				} else {
					$(this).val(1);
				}
				$(this).parents('.cart_item').find('.p_sum').find('.sps_sum').html(singlegoodsprice($(this)));//改变后的价格				
				setcookie($(this));
				totalprice();
			});


			//计算改变数量后单价
			function singlegoodsprice(row) { //row:当前元素
				var $dj = parseFloat(row.parents('.cart_item').find('.p_price').find('.sp_sum').html());
				var $cnum = parseInt(row.parents('.cart_item').find('.p_quantity input').val());
				return ($dj * $cnum).toFixed(2);
			}

			//改变后存cookie
			function setcookie(obj) { //obj:当前操作的对象
				cookieToArray();
				var $index = obj.parents('.cart_item').find('img').attr('sid');
				numarr[sidarr.indexOf($index)] = obj.parents('.cart_item').find('.p_quantity input').val();
				addCookie('cartnum', numarr.toString(), 7);
			}


			//8.全选
			$('.t_check input').on('change', function () {
				$('.cart_item:visible').find('input:checkbox').prop('checked', $(this).prop('checked'));
				$('.t_check input').prop('checked', $(this).prop('checked'));
				totalprice();//求和
			});

			var $inputchecked = $('.goods-item:visible').find('input:checkbox');//获取委托元素
			$('.item-list').on('change', $inputchecked, function () {
				var $inputs = $('.goods-item:visible').find('input:checkbox'); //放内部
				if ($('.goods-item:visible').find('input:checked').length == $inputs.size()) {
					$('.allsel').prop('checked', true);
				} else {
					$('.allsel').prop('checked', false);
				}
				totalprice();
			});

			//删除
			//删除cookie的函数
			function delgoodslist(sid, sidarr) {//sid：当前的sid，sidarr:cookie的sid的值
				var index = -1;
				for (var i = 0; i < sidarr.length; i++) {
					if (sid == sidarr[i]) {
						index = i;
					}
				}
				sidarr.splice(index, 1);//删除数组对应的值
				numarr.splice(index, 1);//删除数组对应的值
				addCookie('cartsid', sidarr.toString(), 7);//添加cookie
				addCookie('cartnum', numarr.toString(), 7);
			}
			//删除单个
			$('.cart_item').on('click', '.p_ops a', function(ev) {
				cookieToArray(); //转数组
			   if(confirm('你确定要删除吗？')){
				 $(this).parents('.cart_item').remove();
			   }
				delgoodslist($(this).first().parents('.cart_item').find('img').attr('sid'), sidarr);
				 totalprice();
			});
			//删除全部
		})(),
	}
})