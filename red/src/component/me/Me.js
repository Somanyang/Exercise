import React,{Component} from 'react';
import Header from '../common/header';
import Footer from '../common/footer';
import {Link} from 'react-router-dom';
import $ from "jquery";
import CubeItem from './CubeItem';
import EditInfoPage from './EditInfoPage';
import EditItem from './EditItem';
import MeList from './MeList';
//import '../css/Me.css'
let img=require('../../images/photo.png')
class Me extends Component{
	constructor(){
		super();
		this.state={
			data:(JSON.parse(localStorage.getItem('Data')).users.find(e=>e.user===localStorage.getItem('user'))),
			editInfo:false
		}
	}
	toComplete=()=>{
		this.setState({
			editInfo:true
		})
	}
	backMe=()=>{
		this.setState({
			editInfo:false
		})
	}
	render(){
		let {data,editInfo}=this.state;
		let header=null;
		let footer=null;
		let dataH={
			pathL:'me',
			pathR:'me',
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
		let arr=['项目','产品','公告','考勤','审批','日志'];
		let arr1=['/projects','/product','/inform','attendence','/me','me']
		cubeItem=arr.map((e,i)=>{
			let dataC={
				txt:e,
				href:arr1[i],
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
		
		let editInfoPage=null;
		if(editInfo){
			let dataE={
				data:data,
				backMe:this.backMe
			}
			editInfoPage=<EditInfoPage {...dataE}/>
		}
		
		
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
							<em onClick={this.toComplete}></em>
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
				{editInfoPage}
			</div>
		)
	}
}

export default Me;