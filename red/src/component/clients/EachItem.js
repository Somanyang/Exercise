import React ,{Component} from 'react';
export default class EachItem extends Component{
	click=(ev)=>{
		this.props.showDetail(this.props.id)
	}
	render(){
		return(
			<li onClick={this.click}>
				<p><span>{this.props.marketName}</span><em>{this.props.marketType}</em></p>
				<b>{this.props.marketAdd}</b>
				<strong>{this.props.marketLinkMen}</strong>
			</li>
		)
	}
}