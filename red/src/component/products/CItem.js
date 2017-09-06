import React,{Component} from 'react';
export default class CItem extends Component{
	render(){
		return(
			<li>
				<div>
					<span className="linkName">名称 : {this.props.e.name}</span>
					<i className="linkAdd">编码 :  {this.props.e.code}</i>
				</div>
			</li>
		)
	}
}