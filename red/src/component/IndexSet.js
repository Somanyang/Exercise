import React,{Component} from 'react';
import Header from './header';
class Setting extends Component{
	render(){
		let header=null;
		let cont=null;
		let dataH={
			pathL:'/index',
			pathR:'',
			nameL:'back',
			nameR:'',
			title:<h4>报表</h4>,
			classname:'whiteBg'
		}
		header=<Header {...dataH}/>;
		return(
			<div id="outerWrap">
				{header}
				<div id="contWrap">
					<div id="content">
						<ul className="chartsList">
							{cont}
						</ul>
					</div>
				</div>
			</div>
		)
	}
}
export default Setting;