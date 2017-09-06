import React ,{Component} from 'react';
export default class ContItem extends Component{
	render(){
		return(
			<li className='myproject'><span>项目名称 : {this.props.title}<b>{this.props.comp}</b></span><i>计划完成时间 ： {this.props.time}</i><em name={this.props.title}>{this.props.more}</em></li>
		)
	}
}