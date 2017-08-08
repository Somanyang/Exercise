/*
	https://api.douban.com/v2/movie/search?q=战狼2&start=0&callback=fn 
*/
function Model(search,num){
	$.ajax({
		url:'https://api.douban.com/v2/movie/search?callback=?',
		dataType:'jsonp',
		data:{
			q:search,
			count:18,
			start:num
		},
		success:function(data){
			var obj={};
			var checked=false;
			//判断localstorage是否有内容，再判断是否有相应的内容，如果有就打开开关
			if(localStorage.getItem('result')){
				obj=JSON.parse(localStorage.getItem('result'));
				for(var k in obj){
					if(k==search){
						checked=true;
					}
				}
			}
			//因为只有localStorage没有对应数据才可以进来，所以可以直接将数据添加进去
			if(checked){
				obj[search].push(data);
			}else{
				obj[search]=[];
				obj[search].push(data);
			}
			data.pages=Math.ceil(data.total/data.count);
			localStorage.setItem('result',JSON.stringify(obj));
			let t = template('temp',data);
			let p = template('temp1',data);
			$('#app').html(t+p);
			var ol=document.getElementsByTagName('ol')[0];
			clickPage(ol,search,num,data);
		}
	});
}
//如果localStorage有相应的就返回相应的数据，否则返回undefined
function local(val,num){
	if(localStorage.getItem('result')){
		var obj=JSON.parse(localStorage.getItem('result'));
		if(obj[val]&&obj[val].length){
			 return obj[val].find((e,i)=>{
				return (e.title=='搜索 "'+val+'" 的结果'&&e.start==num)
			})
		}
	}
	
}

function show(data){
	//生成页面的主要内容
	var str1='';
	data.subjects.forEach(function(e,i){
		str1+=`<li>
			      <img width="128" src="${e.images.medium}">
			      <p>${e.title}</p>
			      <p>${e.rating.average}</p>
		    </li>`
	})
	//初始打开页面时，生成页码
	var str2='';
	for(var i=0;i<Math.ceil(data.total/data.count);i++){
		str2+=`<li>${i+1}</li>`
	}
	//返回两个字符串
	return [str1,str2];
}
//页码点击事件
function clickPage(obj,search,num,data){
	obj.onclick=function(ev){
//		$(obj).find('li').remove('red');
//		ev.target.className='red';
		num=(ev.target.innerText-1)*data.count;
		location.hash='page='+ev.target.innerText;
		if(local(search,num)){
			var str=show(local(search,num));
			$('ul').html(str[0])
		}else{
			Model(search,num);
		}
		
	}
}
