import React,{Component} from 'react';
import {Link} from 'react-router-dom';
export default class CubeItem extends Component{
	render(){
		return(
			<Link className="cubeItem" to={this.props.href}>
				<i></i>
				<span>{this.props.txt}</span>
			</Link>
		)
	}
}