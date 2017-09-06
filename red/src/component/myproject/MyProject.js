import React ,{Component} from 'react';
import Header from '../common/header';
import {Link} from 'react-router-dom';
import ContItem from './ContItem';
import OneItem from './OneItem';
import Progress from './Progress';
import UpdateItem from './UpdateItem';
import UpdatingPage from './UpdatingPage';
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



export default Myproject;