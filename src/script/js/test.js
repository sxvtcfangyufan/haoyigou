! function() {
	$('#header').load('header.html', function() {
		var $ssl = $('#qbz');
		var $s_input = $('.s_input ul');
		$ssl.on('input', function() {
			$s_input.show();
			$.ajax({
				url: 'https://suggest.taobao.com/sug?code=utf-8&q=' + $(this).val() + '&_ksTS=1539321032716_575&callback=jsonp576&k=1&area=c2c&bucketid=18',
				async: true,
				dataType: 'jsonp'
			}).done(function(data) {				
				var $ali = '';
				$.each(data, function(index, value) {
					$ali += '<li><a href="javascript:;">'+data.result[0][0]+'</a><li>';
				});
				$s_input.html($ali);
			})
		});
	});
}()
