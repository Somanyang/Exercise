import React ,{Component} from 'react';
import Header from '../common/header';
export default class InformsDetail extends Component{
	click=()=>{
		this.props.changeDisplay()
	}
	render(){
		let header=null;
		let dataH={
			pathL:'inform',
			pathR:'inform',
			nameL:'back',
			nameR:'',
			title:<h6>{this.props.title}</h6>,
			classname:'whiteBg',
			click:this.click
		}
		header=<Header {...dataH}/>;
		return(
			<div id="informDetail">
				{header}
				<div id="informContent">
					<h4>{this.props.title}</h4>
					<p>{this.props.content}</p>
					<br/>
					<p>请知悉 ! </p>
				</div>
			</div>
		)
	}
}