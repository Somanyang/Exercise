import React,{Component} from 'react';
import Header from './header';
import Footer from './footer';
import {Link} from 'react-router-dom';
import $ from "jquery";
//import '../css/Me.css'
let img=require('../images/photo.png')
class Me extends Component{
	constructor(){
		super();
		this.state={
			data:(JSON.parse(localStorage.getItem('Data')).users.find(e=>e.user===localStorage.getItem('user'))),
			editInfo:false
		}
	}
//	componentWillMount(){
//		let user=localStorage.getItem('user');
//		let data=JSON.parse(localStorage.getItem('Data')).users.find(e=>{
//			return e.user===user;
//		})
//		this.setState({
//			data:data
//		})
//	}
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
class CubeItem extends Component{
	render(){
		return(
			<Link className="cubeItem" to={this.props.href}>
				<i></i>
				<span>{this.props.txt}</span>
			</Link>
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
//编辑个人页面
class EditInfoPage extends Component{
	constructor(){
		super();
		this.state={
			data:JSON.parse(localStorage.getItem('Data')),
			userInfo:null,
			txt:'',
			edit:false,
			target:null
		}
	}
	componentDidMount(){
		this.setState({
			userInfo:this.props.data
		})
	}
	back=()=>{
		this.props.backMe()
	}
	changePhoto=(ev)=>{
//		let e=ev.target.files[0];
//		let formData=new FormData;
//		formData.append('file',e);
//		$.ajax({
//			method:"post",
//			url:"./php/post_file.php",
//			data:formData,
//			processData:false,
//			contentType:false,
//			success:function(data){
//				console.log(data)
//			}
//		});
	}
	setEdit=(id,txt)=>{
		let{data,userInfo}=this.state;
		let index=data.users.findIndex(e=>{
			return e.user===userInfo.user
		})
		userInfo[id]=txt;
		data.users[index]=userInfo;
		localStorage.setItem('Data',JSON.stringify(data));
		localStorage.setItem('user',userInfo.user);
		this.setState({
			userInfo:userInfo
		})
	}
	render(){
		let{data,userInfo}=this.state;
		let header=null;
		let dataH={
			pathL:'me',
			pathR:'',
			nameL:'back',
			nameR:'',
			title:<h4>个人信息</h4>,
			classname:'whiteBg',
			click:this.back
		}
		header=<Header {...dataH}/>;
		let arr=['姓名','电话','邮箱','部门','职位','地址'];
		let arr1=['user','tel','email','department','position','address'];
		let cont=null;
		cont=arr.map((e,i)=>{
			let s=this.props.data[arr1[i]];
			s=(s===''||s===undefined)?'未填写':s;
			let dataE={
				e:e,
				s:s,
				id:arr1[i],
				key:i,
				setEdit:this.setEdit
			}
			return <EditItem {...dataE}/>
		})
		return(
			<div id="outerWrap">
				{header}
				<div id="content" className="editInfoPage">
					<div className="editPhoto">
						<span>头像</span>
						<img src='./images/photo.png' />
						<input type="file" className="file" onChange={this.changePhoto}/>
					</div>
					<ul>
						{cont}
					</ul>
				</div>
			</div>
		)
	}
}


class EditItem extends Component{
	constructor(){
		super();
		this.state={
			display:'none',
			txt:''
		}
	}
	componentDidMount(){
		this.setState({
			txt:this.props.s
		})
	}
	changeTxt=(ev)=>{
		this.setState({
			txt:ev.target.value
		})
	}
	editInfo=()=>{
		this.setState({
			display:'block'
		},()=>{
			this.input.focus()
		})
		
	}
	blur=()=>{
		setTimeout(()=>{
			this.setState({
				display:'none',
				txt:''
			})
		})
		
	}
	saveEdit=()=>{
		let txt=this.props.s;
		if(this.state.txt){
			txt=this.state.txt;
		}
		this.props.setEdit(this.props.id,txt);
		this.setState({
			display:'none',
			txt:''
		})
		
	}
	render(){
		return(
			<li>
				<span>{this.props.e}</span>
				<em onClick={this.editInfo}>{this.props.s}</em>
				<div style={{display:this.state.display}}>
					<input type="text" onChange={this.changeTxt} value={this.state.txt} ref={ele=>this.input=ele} onBlur={this.blur}/>
					<i onClick={this.saveEdit}>√</i>
				</div>
			</li>
		)
	}
}
export default Me;