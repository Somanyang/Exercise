$('button').click(function(){
	let val = $('input').val();
	$('input').val('');
	let num = 0;
	location.hash='wd='+val+'&page=1';
	if(local(val,num)){
		var str=show(local(val,num));
		var ol=$('<ol>');
		$('#app').html(str[0]);
		$('#app2').html('');
		ol.appendTo('#app2');
		$(ol).html(str[1]);
		clickPage(ol[0],val,num,local(val,num));
		ol[0].children[num].className='red';
	}else{
		Model(val,num);
	}
});

window.onhashchange=function(ev){
	if(location.hash){
		var num=+(location.hash.split('=')[2])-1;
		var keys=location.hash.split('=')[1].split('&')[0];
		if(local(keys,0)&&local(keys,num*(local(keys,0).count))){
			var str=show(local(keys,num*(local(keys,0).count)));
			$('#app').html(str[0]);
			$('ol').find('li').removeClass('red');
			$('ol').find('li').eq(num).addClass('red');
		}
	}
	
}
