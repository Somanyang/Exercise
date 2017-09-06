import React ,{Component} from 'react';
export default class CItem extends Component{
	render(){
		let n=`./images/${this.props.id%14+1}.png`;
		return(
			<li>
				<img className="photos" src={n}/>
				<div>
					<span className="linkName">{this.props.name}</span>
					<i className="linkAdd">{this.props.department}</i>
				</div>
			</li>
		)
	}
}