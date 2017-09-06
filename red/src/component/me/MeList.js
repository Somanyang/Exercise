import React,{Component} from 'react';
export default class MeList extends Component{
	render(){
		return(
			<li>
				<span>{this.props.txt}</span>
				<em></em>
			</li>
		)
	}
}