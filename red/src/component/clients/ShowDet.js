import React ,{Component} from 'react';
export default class ShowDet extends Component{
	back=()=>{
		this.props.back()
	}
	render(){
		return(
			<div id="connectDetail">
				<div className="connectHead"><em onClick={this.back}>返回</em><span>客户资料</span></div>
				<div className="connectSName">{this.props.marketName}</div>
				<div className="connectType">地址: {this.props.marketAdd}</div>
				<div className="connectType">联系人:{this.props.marketLinkMen}</div>
				<div className="connectType">联系电话:{this.props.marketLinkTel}</div>
				<div className="connectType">渠道级别:{this.props.marketClass}</div>
				<div className="connectType">门店类型:{this.props.marketType}</div>
			</div>
		)
	}
}