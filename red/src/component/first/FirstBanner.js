import React ,{Component} from 'react';
export default class FirstBanner extends Component{
	render(){
		//banner的动态
		let n=null;
		if(this.props.n<=0){
			if(this.props.id===1){
				n=1+this.props.n*0.02;
			}else{
				n=0.8-this.props.n*0.02;
			}
		}else if(this.props.n>=0){
			if(this.props.id===1){
				n=1-this.props.n*0.02;
			}else{
				n=0.8+this.props.n*0.02;
			}
		}
		
		
		return(
			<div className="banner" style={{transform:`scale(${n})`}}>
				<h3>{this.props.title}</h3>
				<div className="details clear-fix">
					<dl>
						<dt>{this.props.details[1][0]}</dt>
						<dd>{this.props.details[0][0]}</dd>
					</dl>
					<dl>
						<dt>{this.props.details[1][1]}</dt>
						<dd>{this.props.details[0][1]}</dd>
					</dl>
					<dl>
						<dt>{this.props.details[1][2]}</dt>
						<dd>{this.props.details[0][2]}</dd>
					</dl>
				</div>
			</div>
		)
	}
}