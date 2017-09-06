import React,{Component} from 'react';
import Header from '../common/header';
import {Link} from 'react-router-dom';
import ChooseClients from './ChooseClients';
import ClientList from './ClientList';
import SelectTime from './SelectTime';
import Ulli from './Ulli';
import UlTime from './UlTime';
class NewPro extends Component{
	constructor(){
		super();
		this.state={
			chooseClient:false,//选择客户页面切换
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
	componentDidMount(){
		let {project}=this.state;
		project.type=localStorage.getItem('new');
		this.setState({
			project:project
		})
	}
	//选择客户
	chooseClient=()=>{
		this.setState({
			chooseClient:true
		})
	}
	//获取客户名称
	getClient=(name)=>{
		let {project}=this.state;
		project.clientName=name;
		this.setState({
			project:project
		})
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
			project.startTime=this.startT.innerText;
			project.endTime=this.endT.innerText;
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
			project.startTime=str;
			this.setState({
				stShow:false,
				etShow:false,
				startT:new Date(str),
				project:project
			})
			return;
		}
		if(etShow&&str){
			project.endTime=str;
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
	//项目描述
	projectDesc=(ev)=>{
		let{project}=this.state;
		project.describe=ev.target.value
		this.setState({
			project:project
		})
	}
	//负责人
	manager=(ev)=>{
		let{project}=this.state;
		project.manager=ev.target.value
		this.setState({
			project:project
		})
	}
	//项目名称
	itemName=(ev)=>{
		let{project}=this.state;
		project.itemName=ev.target.value
		this.setState({
			project:project
		})
	}
	//地点
	address=(ev)=>{
		let{project}=this.state;
		project.Address=ev.target.value
		this.setState({
			project:project
		})
	}
	//点击完成按钮
	//判断是否有名称或者客户，执行人和执行时间，描述等信息，如果有则保存，否则添加提示框warning
	//在此处判断时间是否在合法时间内，如果成功在上方有小提示
	complete=()=>{
		let {project,data}=this.state;
		if((project.itemName||project.clientName)&&project.startTime&&project.endTime&&project.manager&&project.describe){
			data.projects.push(project)
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
	render(){
		let header=null;
		let One=null,Two=null,Three=null;
		let {project,getWholeDay,startT,endT,stShow,etShow,success,warning}=this.state;
		let pro=localStorage.getItem('new');
		//根据选中的内容来确定是哪种类型的新项目
		switch (pro){
			case '拜访':
				One=<li className="oneLi"><span>客户选择</span><span className="clientName">{project.clientName}</span><em onClick={this.chooseClient}></em></li>;
				break;
			case '任务':
			case '会议':
			case '培训':
				One=<li className="oneLi"><span>{pro}名称</span><input type="text" placeholder="请填写名称" onChange={this.itemName}/></li>;
				Two=<li className="twoLi"><span>地点</span><input type="text" placeholder="请填写地点" onChange={this.address}/></li>;
				break;
			default:
				break;
		}
		
		let dataH=null;
		dataH={
			pathL:'sche',
			pathR:'new',
			nameL:'back',
			nameR:'',
			title:<h4>新建{pro}</h4>,
			classname:'whiteBg'
		};
		header=<Header {...dataH}/>;
		let chooseTime=null;
		let selectClients=null;
		if(this.state.chooseClient){
			let dataS={
				changeChooseClient:this.changeChooseClient,
				getClient:this.getClient
			}
			selectClients=<ChooseClients {...dataS}/>
		}
		let col='',flo='';
		//获取现在的事件
		let now=new Date();
		let hour=now.getHours();
		let minute=now.getMinutes();
		let second=now.getSeconds();
		
		
		if(getWholeDay){//如果是选择全天，则结束时间设置为当天的24:00,开始事件为现在
			col='#F66158';
			flo="right";
			startT=now.getFullYear()+'年'+(now.getMonth()+1)+'月'+now.getDate()+'日    '+(this.getTwo(hour))+':'+this.getTwo(minute)+':'+this.getTwo(second);
			endT=now.getFullYear()+'年'+(now.getMonth()+1)+'月'+now.getDate()+'日    '+'23:59:59';
		}else{
			col='#ffffff';
			flo="left";
			//单独设置起始时间的样式
			if(startT){
				let newNow=startT;
				let newHour=newNow.getHours();
				let newMin=newNow.getMinutes();
				let newSec=newNow.getSeconds();
				startT=newNow.getFullYear()+'年'+(newNow.getMonth()+1)+'月'+newNow.getDate()+'日    '+(this.getTwo(newHour))+':'+this.getTwo(newMin)+':'+this.getTwo(newSec);
			}
			if(endT){
				let newNow=endT;
				let newHour=newNow.getHours();
				let newMin=newNow.getMinutes();
				let newSec=newNow.getSeconds();
				endT=newNow.getFullYear()+'年'+(newNow.getMonth()+1)+'月'+newNow.getDate()+'日    '+(this.getTwo(newHour))+':'+this.getTwo(newMin)+':'+this.getTwo(newSec);
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
							<em onClick={this.warningSure}><Link to='./sche'>确定</Link></em>
						</div>
			 	 	</div>)
		}
		return(
			<div id="outerWrap">
				{header}
				<div id="contWrap">
					<div id="content" className="newpro">
						<ul>
							{One}
							{Two}
							<li><span>执行人</span><input type="text" placeholder="请填写执行人" onChange={this.manager}/></li>
							<li className="wholeDay"><span>全天</span><em onClick={this.getWholeDay} style={{backgroundColor:col}}><i style={{float:flo}}></i></em></li>
							<li className="seTime"><span>起始时间</span><em className="sTime" onClick={this.setStartT} ref={ele=>this.startT=ele}>{startT}</em><em className="eTime" onClick={this.setEndT} ref={ele=>this.endT=ele}>{endT}</em></li>
							<li><span>{pro}描述</span><textarea placeholder="请填写描述" onChange={this.projectDesc} value={this.state.project.describe}></textarea></li>
						</ul>
					</div>
				</div>
				<span className="overSave" onClick={this.complete}>完  成</span>
				{chooseTime}
				{selectClients}
				{Warning}
			</div>
		)
	}
}



export default NewPro;