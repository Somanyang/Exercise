import React,{Component} from 'react';

//新建拜访客户选择界面的单条信息
export default class ClientList extends Component{
	render(){
		return(
			<li>
				<div>
					<span className="linkName">{this.props.e.marketName}</span>
				</div>
			</li>
		)
	}
}