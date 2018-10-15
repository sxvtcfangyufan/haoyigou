function addcookie(key,value,day){
	var d=new Date();
	d.setDate(d.getDate()+day);
	document.cookie=key+'='+encodeURIComponent(value)+';expires='+d;
}
function delcookie(key){
	addcookie(key,'',-1);
}
function getcookie(key){
	var cookiearr=decodeURIComponent(document.cookie).split('; ');
	for(var i=0;i<cookiearr.length;i++){
		var newcookiearr=cookiearr[i].split('=');
		if(key==newcookiearr[0]){
			return newcookiearr[1];
		}
	}
}