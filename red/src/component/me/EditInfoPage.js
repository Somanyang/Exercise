import React,{Component} from 'react';
import Header from '../common/header';
import EditItem from './EditItem';
export default class EditInfoPage extends Component{
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