import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class Header extends Component{
	render(){
		return(
			<header className={this.props.classname} style={this.props.background}>
				<Link to={this.props.pathL} className={this.props.nameL}></Link>
				{this.props.title}
				<Link to={this.props.pathR} className={this.props.nameR}></Link>
			</header>
		)
	}
}
export default Header;