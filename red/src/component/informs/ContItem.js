import React ,{Component} from 'react';
export default class ContItem extends Component{
	render(){
		return(
			<li className='informItem'><span>{this.props.e.title}</span><i>{this.props.e.time}</i><em name={this.props.e.title}></em></li>
		)
	}
}