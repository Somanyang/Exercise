import React,{Component} from 'react';
export default class ScheItem extends Component{
	constructor(){
		super();
		this.state={
			x:0,
			init:0,
			data:JSON.parse(localStorage.getItem('Data'))
		}
	}
	componentDidMount(){
		this.setState({
			x:this.props.x,
			init:0
		})
	}
	deletePro=()=>{
		let {data}=this.state;
		data.projects=data.projects.filter(e=>{
			let n=0,m=0;
			for(let k in e){
				n++;
				if(e[k]===this.props.e[k]){
					m++;
				}
			}
			if(n!==m)return e;
		})
		localStorage.setItem('Data',JSON.stringify(data));
		this.props.changeData();
		this.setState({
			x:0
		})
	}
	cancel=()=>{
		this.setState({
			x:0
		})
	}
	//单条拖动
	moveStart=(ev)=>{
		let {init}=this.state;
		init=ev.changedTouches[0].pageX;
		this.setState({
			init:init
		})
	}
	moveLeft=(ev)=>{
		let {init,x}=this.state;
		let rootFont=parseFloat(document.documentElement.style.fontSize);
		x=(ev.changedTouches[0].pageX-init)/rootFont;
		if(x<=-3.2)x=-3.2;
		if(x>0)x=0;
		
		this.setState({
			x:x
		})
	}
	moveEnd=(ev)=>{
		let {x}=this.state;
		if(x<-1.6){
			x=-3.2
		}else{
			x=0
		}
		this.setState({
			x:x
		})
	}
	render(){
		let project=this.props.e;
		let address=null;
		let name='';
		let type='';
		if(project.Address){
			address=<span>地址<i>:</i>{project.Address}</span>
		}
		if(project.type==='拜访'){
			type="拜访客户";
			name=project.clientName;
		}else{
			type=project.type+'名称';
			name=project.itemName;
		}
		return(
			<li className="scheItem" onTouchStart={this.moveStart} onTouchMove={this.moveLeft} onTouchEnd={this.moveEnd} style={{transform:`translateX(${this.state.x}rem)`}}> 
				<span className="scheItemTitle">{type}<i>:</i>{name}</span>
				<span>时间<i>:</i>{this.props.e.startTime}-{this.props.e.endTime}</span>
				{address}
				<span>执行人<i>:</i>{this.props.e.manager}</span>
				<strong  ref={ele=>this.del=ele}>
					<b onClick={this.cancel}><em>取  消</em></b>
					<b onClick={this.deletePro}><em>删  除</em></b>
				</strong>
			</li>
		)
	}
}