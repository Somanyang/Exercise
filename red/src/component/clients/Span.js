import React ,{Component} from 'react';
export default class Span extends Component{
	render(){
		let className='';
		if(this.props.filArr===this.props.txt)className='chooseRed';
		return(
			<span className={className}>{this.props.txt}</span>
		)
	}
}