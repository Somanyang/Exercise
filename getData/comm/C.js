$('button').click(function(){
	location.hash='page=1';
	let val = $('input').val();
	let num = 0;
	if(local(val,num)){
		var str=show(local(val,num));
		var ul=$('<ul>');
		var ol=$('<ol>');
		ul.appendTo('#app');
		ol.appendTo('#app');
		$(ul).html(str[0]);
		$(ol).html(str[1]);
		clickPage(ol[0],val,num,local(val,num));
//		ol[0].children[0].className='red';
	}else{
		Model(val,num);
	}
//	Model(val,num);
});

