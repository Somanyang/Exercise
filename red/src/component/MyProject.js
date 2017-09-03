import React ,{Component} from 'react';
import Header from './header';
import {Link} from 'react-router-dom';
class Myproject extends Component{
	constructor(){
		super();
		this.state={
			data:JSON.parse(localStorage.getItem('Data')),
			show:false,
			info:null,
			updatingpPage:false,
			title:'',
			str:'',
			all:false
			
		}
	}
	
	makeUpdate=(ev)=>{
		let {data}=this.state;
		if(ev.target.tagName==='EM'){
			let title=ev.target.getAttribute('name');
			let info=data.myproject.find((e,i)=>{
				return e.title===title
			})
			this.setState({
				show:true,
				info:info
			})
		}
	}
	//返回项目页面
	changeShow=()=>{
		this.setState({
			show:false,
		})
	}
	//跟进详情添加
	changePage=(str,title)=>{
		this.setState({
			updatingPage:true,
			show:false,
			title:title,
			str:str
		})
	}
	//返回项目跟进页面
	backToProject=(title,item)=>{
		let {data}=this.state;
		let info=data.myproject.find((e,i)=>{
				return e.title===title
			})
		this.setState({
			updatingPage:false,
			show:true,
			title:title,
			str:item,
			info:info
		})
	}
	//更新数据
	updateData=(time,cont,title,item)=>{
		let {data}=this.state;
		data.myproject.forEach(e=>{
			if(e.title===title){
				e.including.forEach(e=>{
					if(e.item===item){
						e.update.time=time,
						e.update.cont=cont
					}
				})
			}
		})
		localStorage.setItem('Data',JSON.stringify(data));
		this.setState({
			data:JSON.parse(localStorage.getItem('Data')),
		})
	}
	clickT=()=>{
		let {all}=this.state;
		this.setState({
			all:!all
		})
	}
	render(){
		let header=null;
		let cont=null
		let {data,show,info,title,str,updatingPage,all}=this.state;
		let txt='';
		if(all){
			txt='当前项目'
		}else{
			txt='更多项目';
		}
		let dataH={
			pathL:'/index',
			pathR:'projects',
			nameL:'back',
			nameR:'',
			title:<h4>项 目</h4>,
			classname:'whiteBg',
			click:this.click,
			clickT:this.clickT,
			right:txt
		}
		header=<Header {...dataH}/>;
		//添加项目条
		cont=data.myproject.map((e,i)=>{
			let start=new Date(e.time.split('-')[0]);
			let end=new Date(e.time.split('-')[1]+' '+'23:59:59');
			let bool=e.including.every(ele=>{
				return ele.update.cont
			})
			
			if(all){
				//所有的未完成
				if(end-new Date()<0&&!bool){
					let dataP={
						time:e.time,
						title:e.title,
						including:e.including,
						update:e.update,
						key:e.title+Math.random(),
						more:'查看',
						comp:'项目过期'
					}
					return <ContItem {...dataP}/>
				}
				//所有的已完成项目
				if(end-new Date()<0&&bool){
					let dataP={
						time:e.time,
						title:e.title,
						including:e.including,
						update:e.update,
						key:e.title+Math.random(),
						more:'查看',
						comp:'项目完成'
					}
					return <ContItem {...dataP}/>
				}
				//时间内的未完成项目
				if(end-new Date()>=0&&!bool){
					let dataP={
						time:e.time,
						title:e.title,
						including:e.including,
						update:e.update,
						key:e.title+Math.random(),
						more:'跟进',
						comp:'项目未完成'
					}
					return <ContItem {...dataP}/>
				}
				//时间内的已完成项目
				if(end-new Date()>=0&&bool){
					let dataP={
						time:e.time,
						title:e.title,
						including:e.including,
						update:e.update,
						key:e.title+Math.random(),
						more:'查看',
						comp:'项目完成'
					}
					return <ContItem {...dataP}/>
				}
			}else{
				//时间内的未完成项目
				if(end-new Date()>=0&&!bool){
					let dataP={
						time:e.time,
						title:e.title,
						including:e.including,
						update:e.update,
						key:e.title+Math.random(),
						more:'跟进',
						comp:'进行中'
					}
					return <ContItem {...dataP}/>
				}
				//时间内的已完成项目
				if(end-new Date()>=0&&bool){
					let dataP={
						time:e.time,
						title:e.title,
						including:e.including,
						update:e.update,
						key:e.title+Math.random(),
						more:'查看',
						comp:'已完成'
					}
					return <ContItem {...dataP}/>
				}
			}
		})
		//添加跟进情况
		let updateItem=null;
		if(show){
			let dataU={
				info,
				changeShow:this.changeShow,
				changePage:this.changePage
			}
			updateItem=<UpdateItem {...dataU}/>
		}
		//填写跟进信息页面
		
		let UpPage=null;
		if(updatingPage){
			let getItem=data.myproject.find(e=>e.title===title);
			let itemInfo=getItem.including.find(e=>e.item===str);
			let dataUP={
				item:itemInfo.item,
				time:itemInfo.update.time,
				cont:itemInfo.update.cont,
				backToProject:this.backToProject,
				title:title,
				updateData:this.updateData
			}
			UpPage=<UpdatingPage {...dataUP}/>
		}
		
		return(
			<div id="outerWrap">
				{header}
				<div id="contWrap">
					<div id="content">
						<ul onClick={this.makeUpdate}>
							{cont}
						</ul>
					</div>
				</div>
				<div className='addProject'><Link to='/build'>新建项目</Link></div>
				{updateItem}
				{UpPage}
			</div>
		)
	}
}

class ContItem extends Component{
	render(){
		return(
			<li className='myproject'><span>项目名称 : {this.props.title}<b>{this.props.comp}</b></span><i>计划完成时间 ： {this.props.time}</i><em name={this.props.title}>{this.props.more}</em></li>
		)
	}
}

class UpdateItem extends Component{
	click=()=>{
		this.props.changeShow()
	}
	updating=(ev)=>{
		let time=new Date(this.props.info.time.split('-')[1]+' 23:59:59');
		if(ev.target.tagName==='EM'&&ev.target.innerText!=='已完成'&&time-new Date>0){
			this.props.changePage(ev.target.previousElementSibling.innerText,this.props.info.title);
			this.props.changeShow();
		}
	}
	
	render(){
		let header=null;
		let dataH={
			pathL:'projects',
			pathR:'projects',
			nameL:'back',
			nameR:'',
			title:<h4>项目跟进</h4>,
			classname:'whiteBg',
			click:this.click
		}
		header=<Header {...dataH}/>;
		let item=null;
		item=this.props.info.including.map((e,i)=>{
			let dataI={
				e:e,
				key:i
			}
			return <OneItem {...dataI}/>
		})
		
		//显示跟进进度
		let progress=null;
		progress=this.props.info.including.map((e,i)=>{
			if(e.update.time&&e.update.cont){
				let dataP={
					time:e.update.time,
					cont:e.update.cont,
					item:e.item,
					key:i
				}
				return <Progress {...dataP}/>
			}
		})
		
		return(
			<div id="updateItem">
				{header}
				<div className="itemDetail">
					<div className="itemTitle">项目名称: {this.props.info.title}</div>
					<div>项目时间: {this.props.info.time}</div>
					<div onClick={this.updating}>项目条目: {item}</div>
					<div>
						<div className='updateDetail'>
							<span>项目进度详情:</span> 
						</div>
						<ul>{progress}<li></li></ul>
					</div>
				</div>
			</div>
		)
	}
}
//条目信息
class OneItem extends Component{
	render(){
		let str='填写跟进';
		if(this.props.e.update.time&&this.props.e.update.cont){
			str='已完成'
		}
		return(
			<span className="oneItem"><span>{this.props.e.item}</span><em>{str}</em></span>
		)
	}
}
//下部进度详情的显示
class Progress extends Component{
	render(){
		
		return(
			<li>
				<span>{this.props.item}</span>
				<span>{this.props.time}</span>
				<span>{this.props.cont}</span>
			</li>
		)
	}
}
//填写跟进项目的页面
class UpdatingPage extends Component{
	constructor(){
		super();
		this.state={
			cont:'',
			time:'',
			wrong:false
		}
	}
	click=(ev)=>{
		this.props.backToProject(this.props.title,this.props.item)
	}
	//获取当前时间
	componentDidMount(){
		let now=new Date();
		let time=now.getFullYear()+'/'+(now.getMonth()+1)+'/'+now.getDate();
		this.setState({
			time:time
		})
	}
	updateCont=(ev)=>{
		this.setState({
			cont:ev.target.innerText
		})
	}
	//保存信息
	updateSave=()=>{
		let{time,cont}=this.state;
		if(time&&cont){
			this.props.updateData(time,cont,this.props.title,this.props.item)
			this.props.backToProject(this.props.title,this.props.item);
		}else{
			this.setState({
				wrong:true
			})
		}
	}
	//确定后继续填写信息
	warningSure=()=>{
		this.setState({
			wrong:false
		})
	}
	render(){
		let header=null;
		let dataH={
			pathL:'projects',
			pathR:'projects',
			nameL:'back',
			nameR:'',
			title:<h4>跟进详情</h4>,
			classname:'whiteBg',
			click:this.click
		}
		header=<Header {...dataH}/>;
		let {time,wrong}=this.state;
		let warning=null;
		//未填写完整保存提示
		if(wrong){
			warning=(
				<div id='timeWarning'>
					<div>
						<span>请填写完整信息 !</span>
						<em onClick={this.warningSure}>确定</em>
					</div>
			 	 </div>
			)
		}
		return(
			<div id="updatePage">
				{header}
				{warning}
				<div className="itemDetail">
					<div className="itemTitle">条目名称: {this.props.item}</div>
					<div>项目时间: {time}</div>
					<div><span>跟进描述</span><div contentEditable='true' onKeyUp={this.updateCont} className="updateEdit"></div></div>
				</div>
				<div className='updateSave' onClick={this.updateSave}>保存</div>
			</div>
		)
	}
}

export default Myproject;