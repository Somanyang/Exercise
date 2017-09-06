import React,{Component} from 'react';
import {Link} from 'react-router-dom';
//新增页面的条目
export default class Dl extends Component{
	click=()=>{
		localStorage.setItem('new',this.props.dd.slice(2))
	}
	render(){
		return(
			<dl onClick={this.click}>
				<dt><Link to='/new'></Link></dt>
				<dd><Link to='/new'>{this.props.dd}</Link></dd>
			</dl>
		)
	}
}