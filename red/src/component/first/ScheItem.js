import React ,{Component} from 'react';
export default class ScheItem extends Component{
	
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
			<li className="scheItem"> 
				<span className="scheItemTitle">{type}<i>:</i>{name}</span>
				<span>时间<i>:</i>{this.props.e.startTime}-{this.props.e.endTime}</span>
				{address}
				<span>执行人<i>:</i>{this.props.e.manager}</span>
			</li>
		)
	}
}