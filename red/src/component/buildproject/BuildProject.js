import React ,{Component} from 'react';
import Header from '../common/header';
import {Link} from 'react-router-dom';
import Ulli from './Ulli';
import UlTime from './UlTime';
import SelectTime from './SelectTime';
import NewLi from './NewLi';
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
			warning:false,
			num:''
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
		if(!Number.isNaN(ev.target.value)){
			project.including=[];
			project.including.length=ev.target.value;
			for(let i=0;i<ev.target.value;i++){
				project.including[i]={
					item:'',
					update:{time:'',cont:''}
				}
			}
			this.setState({
				project:project,
				num:ev.target.value
			})
		}
		
	}
	setItem=(id,val)=>{
		let{project}=this.state;
		project.including[id].item=val;
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
				let dataN={
					key:i,
					id:i,
					setitem:this.setItem
				}
				return <NewLi {...dataN}/>
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
							<li className='itemNum'><span>条目数量</span><em><i>共</i><input value={this.state.num} onChange={this.getNum}/><i>条</i></em></li>
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

export default BuildProject;