import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class Header extends Component{
	click=()=>{
		if(this.props.click){
			this.props.click();
		}
	}
	clickT=()=>{
		if(this.props.clickT){
			this.props.clickT();
		}
	}
	render(){
		let right=null;
		if(this.props.right){
			right=this.props.right
		}
		return(
			<header className={this.props.classname} style={this.props.background}>
				<em onClick={this.click}><Link to={this.props.pathL} className={this.props.nameL}></Link></em>
				{this.props.title}
				<em onClick={this.clickT}><Link to={this.props.pathR} className={this.props.nameR}>{right}</Link></em>
			</header>
		)
	}
}
export default Header;