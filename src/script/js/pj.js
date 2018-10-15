define(['../thirdplugins/jquery'],function(){
	return{		
		pj_lunbo:(function(){
			$.ajax({
				url:"http://10.31.162.71/haoyigou/php/pj_lunbo.php",
				async:true,
				dataType:"json"
			}).done(function(data){
				 var $oUl=$('#slide ul');				
				 var $oLi='';
				 $.each(data, function(index,value) {				 	
				 	$oLi+='<li style="opacity:0"><img src="'+value.url+'"/></li>'	 	
				 });				
				 $oUl.html($oLi);
			})
		})(),
		xsqg:(function(){
			$.ajax({
				url:"http://10.31.162.71/haoyigou/php/xsqg.php",
				async:true,
				dataType:"json"
			}).done(function(data){
				var $g_oUl=$('.ul_a');
				var $g_oLi='';
				$.each(data,function(index,value){
					$g_oLi+='<li><a><img src="'+value.url+'"/></a><a class="x_g"><p class="g_p1">'+value.small_title+'</p><p class="g_p2">'+value.title+'</p></a><div class="g_ljqg"><div class="qg_price"><span>￥'+value.now_price+'</span><del>￥'+value.original_price+'</del></div><a>立即抢购</a></div></li>'
				});
				$g_oUl.html($g_oLi);
			})
		})(),
		xsqg1:(function(){
			$.ajax({
				url:"http://10.31.162.71/haoyigou/php/xsqg1.php",
				async:true,
				dataType:"json"
			}).done(function(data){
				var $g_oUl=$('.ul_b');
				var $g_oLi='';
				$.each(data,function(index,value){
					$g_oLi+='<li><a><img src="'+value.url+'"/></a><a class="x_g"><p class="g_p1">'+value.small_title+'</p><p class="g_p2">'+value.title+'</p></a><div class="g_ljqg"><div class="qg_price"><span>￥'+value.now_price+'</span><del>￥'+value.original_price+'</del></div><a>立即抢购</a></div></li>'
				});
				$g_oUl.html($g_oLi);
			})
		})(),		
		xsqg2:(function(){
			$.ajax({
				url:"http://10.31.162.71/haoyigou/php/xsqg2.php",
				async:true,
				dataType:"json"
			}).done(function(data){
				var $g_oUl=$('.ul_c');
				var $g_oLi='';
				$.each(data,function(index,value){
					$g_oLi+='<li><a><img src="'+value.url+'"/></a><a class="x_g"><p class="g_p1">'+value.small_title+'</p><p class="g_p2">'+value.title+'</p></a><div class="g_ljqg"><div class="qg_price"><span>￥'+value.now_price+'</span><del>￥'+value.original_price+'</del></div><a>立即抢购</a></div></li>'
				});
				$g_oUl.html($g_oLi);
			})
		})(),
		yesterday:(function(){
			$.ajax({
				url:"http://10.31.162.71/haoyigou/php/now_time.php",
				async:true,
				dataType:"json"
			}).done(function(data){				
				var $t_oUl=$('.time1');
				var $t_oLi='';				
				$.each(data,function(index,value){					
					$t_oLi+='<li><div class="last_time"><i class="time_icon"></i>00:48</div><a href="#" class="pro"><img src="'+value.url+'"/></a><p class="p_num">'+value.small_title+'</p><p class="p_jj"><a href="#"><span>'+value.title+'</span></a></p><div class="now_price"><span>￥'+value.now_price+'</span><del>￥'+value.original_price+'</del></div></li>'
				});
				$t_oUl.html($t_oLi);
			})
		})(),
		now_time:(function(){
			$.ajax({
				url:"http://10.31.162.71/haoyigou/php/yesterday.php",
				async:true,
				dataType:"json"
			}).done(function(data){				
				var $t_oUl=$('.time2');
				var $t_oLi='';				
				$.each(data,function(index,value){
					$t_oLi+='<li><div class="last_time"><i class="time_icon"></i><span></span></div><a href="details.html?sid='+value.sid+'" class="pro"><img src="'+value.url+'"/></a><p class="p_num">'+value.small_title+'</p><p class="p_jj"><a href="#"><span>'+value.title+'</span></a></p><div class="now_price"><span>￥'+value.now_price+'</span><del>￥'+value.original_price+'</del></div></li>'
				});				
				$t_oUl.html($t_oLi);
				//有bug区域
				$(document).ready(function(){					
					var now=new Date();				
					var end=new Date(2018,10,14,17,59,00);//结束的时间：年，月，日，分，秒（月的索引是0~11）
					/*两个时间相减,得到的是毫秒ms,变成秒*/
					var result=Math.floor(end-now)/1000;					
					var interval=setInterval(sub,1000); //定时器 调度对象
					/*封装减1秒的函数*/
					function sub(){							
						if (result>1) {
						   result = result - 1; 
						   var second = Math.floor(result % 60);     // 计算秒 ，取余  
						   var minite = Math.floor((result / 60) % 60); //计算分 ，换算有多少分，取余，余出多少秒						  
						   if(second==0 && minite==0 ){
							   clearInterval(interval);							  
						   }		
						   if(second<10){
								second='0'+second;								
						   }	
						   if(minite<10){
							minite='0'+minite;								
					  		 }
						   $('.last_time span').html(minite + ":" + second);
						}
					}
				})
				//有bug区域
				
			})
		})(),
		news:(function(){
			$.ajax({
				url:"http://10.31.162.71/haoyigou/php/new.php",
				async:true,
				dataType:"json"
			}).done(function(data){					
				var $n_oUl=$('.new_ul');
				var $n_oLi='';				
				$.each(data,function(index,value){
					$n_oLi+='<li><a href="#" class="a1"><img src="'+value.url+'"/></a><a href="#" class="new_title_a"><p class="p1">'+value.small_title+'</p><p class="p2">'+value.title+'</p></a><div class="new_price"><span class="price1">￥'+value.now_price+'</span><del class="price2">￥'+value.original_price+'</del></div></li>';					
				});
				$n_oUl.html($n_oLi);
			})
		})(),
		main_beauty:(function(){			
			$.ajax({
				url:"http://10.31.162.71/haoyigou/php/beauty.php",
				async:true,
				dataType:"json"
			}).done(function(data){
				var $b_oUl=$('.b_ul');
				var $b_oLi='';
				$.each(data,function(index,value){				
					$b_oLi+='<li class="beauty_li"><a href="#" class="a1"><img src="'+value.url+'"/></a><a href="#" class="new_title_a"><p class="p1">'+value.small_title+'</p><p class="p2">'+value.title+'</p></a><div class="new_price"><span class="price1">￥'+value.now_price+'</span><del class="price2">￥'+value.original_price+'</del></div></li>';
				});
				$b_oUl.html($b_oLi);
			})
		})(),
		main_footer:(function(){			
			$.ajax({
				url:"http://10.31.162.71/haoyigou/php/beauty.php",
				async:true,
				dataType:"json"
			}).done(function(data){
				var $f_oUl=$('.f_ul');
				var $f_oLi='';
				$.each(data,function(index,value){				
					$f_oLi+='<li class="beauty_li"><a href="#" class="a1"><img src="'+value.url+'"/></a><a href="#" class="new_title_a"><p class="p1">'+value.small_title+'</p><p class="p2">'+value.title+'</p></a><div class="new_price"><span class="price1">￥'+value.now_price+'</span><del class="price2">￥'+value.original_price+'</del></div></li>';
				});
				$f_oUl.html($f_oLi);
			})
		})(),
		main_day:(function(){			
			$.ajax({
				url:"http://10.31.162.71/haoyigou/php/beauty.php",
				async:true,
				dataType:"json"
			}).done(function(data){
				var $d_oUl=$('.d_ul');
				var $d_oLi='';
				$.each(data,function(index,value){				
					$d_oLi+='<li class="beauty_li"><a href="#" class="a1"><img src="'+value.url+'"/></a><a href="#" class="new_title_a"><p class="p1">'+value.small_title+'</p><p class="p2">'+value.title+'</p></a><div class="new_price"><span class="price1">￥'+value.now_price+'</span><del class="price2">￥'+value.original_price+'</del></div></li>';
				});
				$d_oUl.html($d_oLi);
			})
		})(),
		main_cloth:(function(){			
			$.ajax({
				url:"http://10.31.162.71/haoyigou/php/beauty.php",
				async:true,
				dataType:"json"
			}).done(function(data){
				var $c_oUl=$('.c_ul');
				var $c_oLi='';
				$.each(data,function(index,value){				
					$c_oLi+='<li class="beauty_li"><a href="#" class="a1"><img src="'+value.url+'"/></a><a href="#" class="new_title_a"><p class="p1">'+value.small_title+'</p><p class="p2">'+value.title+'</p></a><div class="new_price"><span class="price1">￥'+value.now_price+'</span><del class="price2">￥'+value.original_price+'</del></div></li>';
				});
				$c_oUl.html($c_oLi);
			})
		})(),
		main_home:(function(){			
			$.ajax({
				url:"http://10.31.162.71/haoyigou/php/beauty.php",
				async:true,
				dataType:"json"
			}).done(function(data){
				var $h_oUl=$('.h_ul');
				var $h_oLi='';
				$.each(data,function(index,value){				
					$h_oLi+='<li class="beauty_li"><a href="#" class="a1"><img src="'+value.url+'"/></a><a href="#" class="new_title_a"><p class="p1">'+value.small_title+'</p><p class="p2">'+value.title+'</p></a><div class="new_price"><span class="price1">￥'+value.now_price+'</span><del class="price2">￥'+value.original_price+'</del></div></li>';
				});
				$h_oUl.html($h_oLi);
			})
		})(),
		main_house:(function(){			
			$.ajax({
				url:"http://10.31.162.71/haoyigou/php/beauty.php",
				async:true,
				dataType:"json"
			}).done(function(data){
				var $hs_oUl=$('.hs_ul');
				var $hs_oLi='';
				$.each(data,function(index,value){				
					$hs_oLi+='<li class="beauty_li"><a href="#" class="a1"><img src="'+value.url+'"/></a><a href="#" class="new_title_a"><p class="p1">'+value.small_title+'</p><p class="p2">'+value.title+'</p></a><div class="new_price"><span class="price1">￥'+value.now_price+'</span><del class="price2">￥'+value.original_price+'</del></div></li>';
				});
				$hs_oUl.html($hs_oLi);
			})
		})(),		
	}
})
