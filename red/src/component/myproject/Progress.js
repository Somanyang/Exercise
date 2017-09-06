import React ,{Component} from 'react';
export default class Progress extends Component{
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