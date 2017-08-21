import React,{Component} from 'react';
import Header from './header';
import Footer from './footer';
//import '../css/Me.css'
let img=require('../images/photo.png')
class Me extends Component{
	constructor(){
		super();
		this.state={
			data:{},
			editInfo:false
		}
	}
	componentWillMount(){
		let user=localStorage.getItem('user');
		let data=JSON.parse(localStorage.getItem('Data')).users.find(e=>{
			return e.user===user;
		})
		this.setState({
			data:data
		})
	}
	render(){
		let {data}=this.state;
		let header=null;
		let footer=null;
		let dataH={
			pathL:'',
			pathR:'',
			nameL:'',
			nameR:'',
			title:<h4>我的</h4>,
			classname:'whiteBg'
		}
		header=<Header {...dataH}/>;
		footer=<Footer n='4'/>;
		let n=0,m=0,rate=0;
		for(let key in data){
			n++;
			if(data[key]!==''){
				m++;
			}
		}
		rate=Math.round(m/n*100)+'%';
		let cubeItem=null;
		let arr=['项目','产品','公告','考勤','审批','日志','拜访路线'];
		cubeItem=arr.map((e,i)=>{
			let dataC={
				txt:e,
				key:i
			}
			return<CubeItem {...dataC}/>
		})
		let meList=null;
		let arr2=['角色与权限','企业设置','个人设置','我的积分','我的成就'];
		meList=arr2.map((e,i)=>{
			let dataM={
				txt:e,
				key:i
			}
			return<MeList {...dataM}/>
		})
		return(
			<div id="outerWrap">
				{header}
				<div id="contWrap">
					<div id="content">
						<div className="userInfo">
							<img src={img}/>
							<div>
								<span className="userName">{data.user}</span>
								<i className="linkAdd">完善资料{rate}</i>
							</div>
							<em></em>
						</div>
						<div className="clear-fix cubeList">
							{cubeItem}
						</div>
						<ul className="meList">
							{meList}
						</ul>
					</div>
				</div>
				{footer}
			</div>
		)
	}
}
class CubeItem extends Component{
	render(){
		return(
			<dl className="cubeItem">
				<dt></dt>
				<dd>{this.props.txt}</dd>
			</dl>
		)
	}
}
class MeList extends Component{
	render(){
		return(
			<li>
				<span>{this.props.txt}</span>
				<em></em>
			</li>
		)
	}
}
export default Me;