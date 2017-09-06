import React ,{Component} from 'react';
import Header from '../common/header';
import OneItem from './OneItem';
import Progress from './Progress';
export default class UpdateItem extends Component{
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