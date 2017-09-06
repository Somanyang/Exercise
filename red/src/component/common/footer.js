import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class Footer extends Component{
	componentDidMount(props){
		this.ul.children[this.props.n].children[0].className='redColor';
	}
	render(){
		return(
			<footer className="clear-fix">
				<ul className="clear-fix" ref={(ele)=>this.ul=ele}>
					<li><Link to="/index"><span  className="icon-index"></span><i>首页</i></Link></li>
					<li><Link to="/communicate"><span className="icon-communicate"></span><i>沟通</i></Link></li>
					<li><Link to="/clients"><span className="icon-clients"></span><i>客户</i></Link></li>
					<li><Link to="/sche"><span className="icon-sche"></span><i>日程</i></Link></li>
					<li><Link to="/me"><span className="icon-me"></span><i>我的</i></Link></li>
				</ul>
			</footer>
		)
	}
}
export default Footer;