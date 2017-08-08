let View = `<h5><%=title%>一共有:<%=total%>条结果</h5>
		<ul>
	    <%for(var i=0;i<subjects.length;i++){%>
	    	<li>
		    	<div>
			      <img width="128" src="<%=subjects[i].images.medium%>">
			    </div>
			      <p><%=subjects[i].title%></p>
			      <p>评分:<%=subjects[i].rating.average%>分</p>
		    </li>
	    <%}%>
	</ul>`

let View2=`<ol>
		<%for(var i=0;i<pages;i++){%>
			<li><%=i+1%></li>
		<%}%>
	</ol>
`
$('#temp').html(View);
$('#temp1').html(View2);
