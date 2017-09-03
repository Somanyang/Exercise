import React ,{Component} from 'react';
import Header from './header';
import {Link} from 'react-router-dom';
class BuildProject extends Component{
	constructor(){
		super();
		this.state={
			getWholeDay:false,//是否选择全天
			save:false,
			project:{},
			startT:'',
			endT:'',
			stShow:false,
			etShow:false,
			data:JSON.parse(localStorage.getItem('Data')),
			success:false,
			warning:false
		}
	}
	//传递给子组件，用来显示子组件和返回新建页面
	changeChooseClient=()=>{
		this.setState({
			chooseClient:false
		})
	}
	//选择全天
	getWholeDay=()=>{
		let {getWholeDay,project}=this.state;
		this.setState({
			getWholeDay:!getWholeDay
		},()=>{
			project.startTime=this.startT.innerText.split(' ')[0];
			project.endTime=this.endT.innerText.split(' ')[0];
			this.setState({
				project:project
			})
		})
	}
	getTwo=(str)=>{
		if((''+str).length<2){
			return'0'+str
		}
		return str;
	}
	//开始时间设置
	setStartT=()=>{
		//如果正在设置结束时间不能设置开始时间
		let {etShow}=this.state;
		if(!etShow){
			this.setState({
				stShow:true
			})
		}
	}
	//结束时间设置
	setEndT=()=>{
		//如果正在设置开始时间无法设置结束时间
		let {stShow}=this.state;
		if(!stShow){
			this.setState({
				etShow:true
			})
		}
		
	}
	//关闭子组件时间设置
	changeSetTime=(str)=>{
		let {stShow,etShow,project}=this.state;
		if(stShow&&str){
			project.startTime=str.split(' ')[0];
			this.setState({
				stShow:false,
				etShow:false,
				startT:new Date(str),
				project:project
			})
			return;
		}
		if(etShow&&str){
			project.endTime=str.split(' ')[0];
			this.setState({
				stShow:false,
				etShow:false,
				endT:new Date(str),
				project:project
			})
			return;
		}
		this.setState({
				stShow:false,
				etShow:false
			})
	}
	//如果时间不合适则提示时间非法
	warningSure=()=>{
		this.setState({
			startT:'',
			endT:'',
			warning:false
		})
	}
	
	//项目名称
	itemName=(ev)=>{
		let{project}=this.state;
		project.title=ev.target.value
		this.setState({
			project:project
		})
	}
	
	//点击完成按钮
	//在此处判断时间是否在合法时间内，如果成功在上方有小提示
	complete=()=>{
		let {project,data}=this.state;
		if(project.title&&project.startTime&&project.endTime&&project.including&&project.including.length){
			project.time=project.startTime+'-'+project.endTime;
			delete project.startTime ;
			delete project.endTime ;
			data.myproject.push(project);
			localStorage.setItem('Data',JSON.stringify(data));
			this.setState({
				success:true
			})
		}else{
			this.setState({
				warning:true
			})
		}
	}
	getNum=(ev)=>{
		let{project}=this.state;
		if(+ev.target.innerText){
			project.including=[];
			project.including.length=ev.target.innerText;
			for(let i=0;i<ev.target.innerText;i++){
				project.including[i]={
					item:'',
					update:{time:'',cont:''}
				}
			}
			this.setState({
				project:project
			})
		}
		
	}
	setItem=(ev)=>{
		let{project}=this.state;
		let index=ev.target.id;
		project.including[index].item=ev.target.innerHTML;
		this.setState({
			project:project
		})
	}
	render(){
		let header=null;
		let One=null,Two=null,Three=null;
		let {project,getWholeDay,startT,endT,stShow,etShow,success,warning}=this.state;
		let dataH=null;
		dataH={
			pathL:'projects',
			pathR:'build',
			nameL:'back',
			nameR:'',
			title:<h4>新建项目</h4>,
			classname:'whiteBg'
		};
		header=<Header {...dataH}/>;
		let chooseTime=null;
		let col='',flo='';
		//获取现在的事件
		let now=new Date();
		let hour=now.getHours();
		let minute=now.getMinutes();
		let second=now.getSeconds();
		
		
		if(getWholeDay){//如果是选择全天，则结束时间设置为当天的24:00,开始事件为现在
			col='#F66158';
			flo="right";
			startT=now.getFullYear()+'/'+(now.getMonth()+1)+'/'+now.getDate()+' '+(this.getTwo(hour))+':'+this.getTwo(minute)+':'+this.getTwo(second);
			endT=now.getFullYear()+'/'+(now.getMonth()+1)+'/'+now.getDate()+' '+'23:59:59';
		}else{
			col='#ffffff';
			flo="left";
			//单独设置起始时间的样式
			if(startT){
				let newNow=startT;
				let newHour=newNow.getHours();
				let newMin=newNow.getMinutes();
				let newSec=newNow.getSeconds();
				startT=newNow.getFullYear()+'/'+(newNow.getMonth()+1)+'/'+newNow.getDate()+' '+(this.getTwo(newHour))+':'+this.getTwo(newMin)+':'+this.getTwo(newSec);
			}
			if(endT){
				let newNow=endT;
				let newHour=newNow.getHours();
				let newMin=newNow.getMinutes();
				let newSec=newNow.getSeconds();
				endT=newNow.getFullYear()+'/'+(newNow.getMonth()+1)+'/'+newNow.getDate()+' '+(this.getTwo(newHour))+':'+this.getTwo(newMin)+':'+this.getTwo(newSec);
			}
		}
		
		//二者只能有一个
		if(stShow || etShow){
			chooseTime=<SelectTime stShow={stShow} etShow={etShow} changeSetTime={this.changeSetTime}/>
		}
		
		//判断时间
		
		let Warning=null;
		let txt=''
		if((endT&&(endT-now)<0)||((endT&&startT)&&endT<startT)){
			warning=true;
			txt="非法时间   ！"
		}
		if(warning){
			txt=txt?txt:'请填写完整信息  ！';
			Warning=(<div id='timeWarning'>
						<div>
							<span>{txt}</span>
							<em onClick={this.warningSure}>确定</em>
						</div>
			 	 	</div>)
			}
		if(success){
			txt="新建成功 ！"
			Warning=(<div id='timeWarning'>
						<div>
							<span>{txt}</span>
							<em onClick={this.warningSure}><Link to='./projects'>确定</Link></em>
						</div>
			 	 	</div>)
		}
		let items=null;
		if(project.including&&project.including.length){
			items=project.including.map((e,i)=>{
				return <li key={i} id={i} contentEditable="true" onKeyUp={this.setItem}></li>
			})
		}
		return(
			<div id="outerWrap">
				{header}
				<div id="contWrap">
					<div id="content" className="newpro buildCont">
						<ul>
							<li className="oneLi"><span>项目名称</span><input type="text" placeholder="请填写名称" onChange={this.itemName}/></li>
							<li className="wholeDay"><span>全天</span><em onClick={this.getWholeDay} style={{backgroundColor:col}}><i style={{float:flo}}></i></em></li>
							<li className="seTime"><span>起始时间</span><em className="sTime" onClick={this.setStartT} ref={ele=>this.startT=ele}>{startT}</em><em className="eTime" onClick={this.setEndT} ref={ele=>this.endT=ele}>{endT}</em></li>
							<li className='itemNum'><span>条目数量</span><em><i>共</i><i contentEditable='true' onKeyUp={this.getNum}></i><i>条</i></em></li>
						</ul>
						<ul>
							{items}
						</ul>
					</div>
				</div>
				<span className="overSave" onClick={this.complete}>完  成</span>
				{chooseTime}
				{Warning}
			</div>
		)
	}
}

//时间选择的界面

class SelectTime extends Component{
	constructor(){
		super();
		this.state={
			year:(new Date()).getFullYear(),
			month:(new Date()).getMonth()+1,
			date:(new Date()).getDate(),
			hour:(new Date()).getHours(),
			minute:(new Date()).getMinutes(),
			second:(new Date()).getSeconds()
		}
	}
	//设置时间
	addOne=(e,num)=>{
		let item=this.state[e];
		this.setState({
			[e]:num
		})
		
	}
	cancel=()=>{
		this.props.changeSetTime()
	}
	makeSure=()=>{
		//将选好的时间返回给父组件，设置给相应的时间项
		let {year,month,date,hour,minute,second}=this.state;
		let str=year+'/'+month+'/'+date+' '+hour+':'+minute+':'+second;
		this.props.changeSetTime(str)
	}
	render(){
		let yearC=null,monthC=null,dateC=null,hourC=null,minuteC=null,secondC=null;
		let {year,month,date,hour,minute,second}=this.state;
		let arr=[year,month,date,hour,minute,second];
		let arr1=['year','month','date','hour','minute','second'];
		let times=arr.map((e,i)=>{
			let dataT={
				e:e,
				key:i,
				arr:arr,
				type:arr1[i],//类型
				addOne:this.addOne//设置时间
			}
			return <UlTime {...dataT}/>
		})
		return(
			<div id="selectTime">
				<div className='timeMask'></div>
				<div className="timeMenu"><span onClick={this.cancel}>取消</span><span onClick={this.makeSure}>确定</span></div>
				<div className="showTime">
					{times}
				</div>
			</div>
		)
	}
}




class UlTime extends Component{
	constructor(){
		super();
		this.state={
			h:0,
			hstart:0,
			arr:[]
		}
	}
	componentDidMount(){
		let {arr}=this.state;
		let r=this.props.arr
		let times=(new Date(r[0],r[1],0)).getDate();
		switch (this.props.type){
			case 'year':
				arr[0]=this.props.e-2>0?this.props.e-2:'';
				arr[1]=this.props.e-1>0?this.props.e-1:'';
				arr[3]=this.props.e+1;
				arr[4]=this.props.e+2;
				break;
			case 'month':
				arr[0]=this.props.e-2>0?this.props.e-2:'';
				arr[1]=this.props.e-1>0?this.props.e-1:'';
				arr[3]=this.props.e+1<13?this.props.e+1:'';
				arr[4]=this.props.e+2<13?this.props.e+2:'';
				break;
			case 'date':
				arr[0]=this.props.e-2>0?this.props.e-2:'';
				arr[1]=this.props.e-1>0?this.props.e-1:'';
				arr[3]=this.props.e+1<=times?this.props.e+1:'';
				arr[4]=this.props.e+2<=times?this.props.e+2:'';
				break;
			case 'hour':
				arr[0]=this.props.e-2>=0?this.props.e-2:'';
				arr[1]=this.props.e-1>=0?this.props.e-1:'';
				arr[3]=this.props.e+1<24?this.props.e+1:'';
				arr[4]=this.props.e+2<24?this.props.e+2:'';
				break;
			case 'minute':
			case 'second':
				arr[0]=this.props.e-2>=0?this.props.e-2:'';
				arr[1]=this.props.e-1>=0?this.props.e-1:'';
				arr[3]=this.props.e+1<60?this.props.e+1:'';
				arr[4]=this.props.e+2<60?this.props.e+2:'';
			break;
			default:
				break;
		}
		this.setState({
			arr:[arr[0],arr[1],this.props.e,arr[3],arr[4]]
		})
	}
	moveStart=(ev)=>{
		this.setState({
			hstart:ev.changedTouches[0].pageY
		})
	}
	moving=(ev)=>{
		//上下拖动改变
		let {h,hstart,arr}=this.state;
		h=ev.changedTouches[0].pageY-hstart;
		let rootFont=parseFloat(document.documentElement.style.fontSize);
		h=h/rootFont;
		let li=this.ul.children[0];
		let liH=li.offsetHeight/rootFont;
		//向下
		if(h>liH/2){
			console.log(1)
			let insert=0;
			switch (this.props.type){
				case 'year':
				case 'month':
				case 'date':
					insert=arr[0]-1>0?arr[0]-1:'';
				break;
				case 'hour':
				case 'minute':
				case 'second':
					insert=arr[0]-1>=0?arr[0]-1:'';
				break;
				default:
					break;
			}
			//判断是否是第一个，来确定是否可以继续下移
			if(arr[1]!==''){
				hstart=hstart+liH*rootFont;
				arr.unshift(insert);
				arr.pop(arr[arr.length-1])
			}else{
				hstart=ev.changedTouches[0].pageY;
			}
			
		}
		
		//向上
		let r=this.props.arr
		let times=(new Date(r[0],r[1],0)).getDate();
		if(h<-liH/2){
			let insert='';
			switch (this.props.type){
				case 'year':
					insert=arr[arr.length-1]+1;
					break;
				case 'month':
					if(arr[arr.length-1]){
						insert=arr[arr.length-1]+1>12?'':arr[arr.length-1]+1;
					}
					break;
				case 'date':
					if(arr[arr.length-1]){
						insert=arr[arr.length-1]+1>times?'':arr[arr.length-1]+1;
					}
					break;
				case 'hour':
					if(arr[arr.length-1]){
						insert=arr[arr.length-1]+1>23?'':arr[arr.length-1]+1;
					}
					break;
				case 'minute':
				case 'second':
					if(arr[arr.length-1]){
						insert=arr[arr.length-1]+1>59?'':arr[arr.length-1]+1;
					}
					break;
				default:
					break;
			}
			//判断是否是最后一个，来确定是否可以继续上移
			if(arr[3]!==''){
				hstart=hstart-liH*rootFont;
				arr.push(insert);
				arr.shift(arr[0]);
			}else{
				hstart=ev.changedTouches[0].pageY;
			}
			
		}
		this.setState({
			arr:arr,
			h:h,
			hstart:hstart
		})
	}
	moveEnd=(ev)=>{
		//根据抬起的位置来判断向上还是向下
		let {h,hstart,arr}=this.state;
		h=ev.changedTouches[0].pageY-hstart;
		let rootFont=parseFloat(document.documentElement.style.fontSize);
		h=h/rootFont;
		let li=this.ul.children[0];
		let liH=li.offsetHeight/rootFont;
		if(h>liH/2){
			h=liH
		}else if(h<-liH/2){
			h=-liH
		}else{
			h=0;
		}
		
		this.props.addOne(this.props.type,arr[2])
		//去调用this.props.设置事件的方法，将arr[2]返回给父组件
		this.setState({
			h:h,
		})
	}
	
	render(){
		let {arr}=this.state;
		let cont=arr.map((e,i)=>{
			return <Ulli  key={i} e={e}/>
		})
		return(
			<div className="ulWrap">
				<ul onTouchMove={this.moving} onTouchStart={this.moveStart} onTouchEnd={this.moveEnd} style={{transform:"translateY("+this.state.h+'rem)'}} ref={ele=>this.ul=ele}>
					{cont}
				</ul>
			</div>
		)
	}
}

class Ulli extends Component{
	render(){
		return(
			<li>{this.props.e}</li>
		)
	}
}
export default BuildProject;