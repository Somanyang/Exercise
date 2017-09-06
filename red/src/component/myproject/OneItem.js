import React ,{Component} from 'react';
export default class OneItem extends Component{
	render(){
		let str='填写跟进';
		if(this.props.e.update.time&&this.props.e.update.cont){
			str='已完成'
		}
		return(
			<span className="oneItem"><span>{this.props.e.item}</span><em>{str}</em></span>
		)
	}
}