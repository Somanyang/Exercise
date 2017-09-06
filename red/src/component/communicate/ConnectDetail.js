import React ,{Component} from 'react';
import {Link,Route} from 'react-router-dom';
export default class ConnectDetail extends Component{
	backToCom=()=>{
		this.props.changeSwitcher();
	}
	render(){
		let name='';
		let add='';
		let tel='';
		if(this.props.switcher){
			name=this.props.connectInfo.name;
			add='部门：'+this.props.connectInfo.add;
			tel= '分机号：'+this.props.connectInfo.tel;
		}else{
			name=this.props.connectInfo.name;
			add='门店名称：'+this.props.connectInfo.add;
			tel='联系电话：'+this.props.connectInfo.tel;
		}
		localStorage.setItem('connectInfo',JSON.stringify(this.props.connectInfo));
		return(
			<div id="connectDetail">
				<div className="connectHead"><em onClick={this.backToCom}>返回</em><span>个人资料</span></div>
				<div className="connectName">{name}</div>
				<div className="connectAdd">{add}</div>
				<div className="connectTel">{tel}</div>
				<div className="connectFoot">
					<Link to="./message">发消息</Link>
				</div>
			</div>
		)
	}
}