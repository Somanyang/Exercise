import React ,{Component} from 'react';
import {Link} from 'react-router-dom';
import Header from '../common/header';
import InformsDetail from './InformsDetail';
import ContItem from './ContItem';
class Informs extends Component{
	constructor(){
		super();
		this.state={
			data:JSON.parse(localStorage.getItem('Data')),
			show:false,
			name:'',
			time:''
		}
	}
	changeDisplay=()=>{
		this.setState({
			show:false
		})
	}
	getDetail=(ev)=>{
		if(ev.target.tagName==='EM'){
			this.setState({
				show:true,
				name:ev.target.getAttribute('name'),
				time:ev.target.previousElementSibling.innerText
			})
		}
	}
	render(){
		let header=null;
		let cont=null;
		let detail=null;
		let {data,time,name,show}=this.state;
		let dataH={
			pathL:'/index',
			pathR:'inform',
			nameL:'back',
			nameR:'',
			title:<h4>公告</h4>,
			classname:'whiteBg',
			click:this.click
		}
		header=<Header {...dataH}/>;
		cont=data.informs.map((e,i)=>{
			let dataC={
				key:i,
				e:e
			}
			return <ContItem {...dataC}/>
		})
		if(show){
			let dd=data.informs.find(e=>e.title===name&&e.time===time);
			
			let dataD={
				time:dd.time,
				title:dd.title,
				content:dd.content,
				changeDisplay:this.changeDisplay
			}
			detail=<InformsDetail {...dataD}/>
		}
		return(
			<div id="outerWrap">
				{header}
				<div id="contWrap">
					<div id="content">
						<ul onClick={this.getDetail}>
							{cont}
						</ul>
					</div>
				</div>
				{detail}
			</div>
		)
	}
}


export default Informs;
