import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import Data from './js/data';
import './js/inHead.js';
import './css/main.css';
import './css/style.css'
import First from './component/First.js';
import Communicate from './component/Communicate';
import Clients from './component/Clients';
import Sche from './component/Sche';
import Me from './component/Me';
import Charts from './component/Charts';
import IndexSet from './component/IndexSet';
let img=require('./images/photo.png');
class Login extends Component{
	constructor(props){
		super(props);
		this.state={
			user:'',
			password:'',
			urls:'',
			company:'',
			check:false,
			data:Data
		}
	}
	
	userChange=(ev)=>{
		this.setState({
			user:ev.target.value
		},()=>{
			this.cbCheck();
		})
	}
	passwordChange=(ev)=>{
		this.setState({
			password:ev.target.value
		},()=>{
			this.cbCheck();
		})
	}
	companyChange=(ev)=>{
		this.setState({
			company:ev.target.value
		},()=>{
			this.cbCheck();
		})
	}
	//回调函数检查数据是否满足登陆条件
	cbCheck=()=>{
		let obj={
				user:this.state.user,
				password:this.state.password,
				company:this.state.company
			}
		if(obj.company!==''&&Data[obj.company]){
			let n=Data[obj.company].users.findIndex(e=>{
				let j=null;
				if(e.user===obj.user&&obj.password===e.password){
					j= e;
				}
				return j;
			});
			if(n!==-1){
				localStorage.setItem('Data',JSON.stringify(Data[obj.company]));
				this.setState({urls:"/index"},()=>{
				})
			}else{
				this.setState({urls:""})
			}
		}
	}
	display=()=>{
		this.setState({
			company:"",
			user:"",
			password:"",
			check:false
		})
	}
	submits=()=>{
		localStorage.setItem('user',this.state.user)
		this.setState({
			check:true
		})
	}
	render(){
		let LR=null;
		let submita=null;
		if(this.state.urls===''){
			submita=<span className="login-summit" onClick={this.submits}>登录</span>
		}else{
			submita=<a className="login-summit" href={this.state.urls} onClick={this.submits}>登录</a>
		}
		
		if(this.state.check&&this.state.urls===''){
			LR=<LoginError display={this.display}/>
		}
		return(
			<div id="login">
				<dl>
					<dt><img src={img} alt="头像"/></dt>
					<dd></dd>
				</dl>
				<div className="info">
					<div>
						<label>帐号</label><input type='text' placeholder="请填写用户名" value={this.state.user} onChange={this.userChange}/>
					</div>
					<div>
						<label>密码</label><input type='password' placeholder="输入密码" value={this.state.password} onChange={this.passwordChange}/>
					</div>
					<div>
						<label>公司</label><input type='text' placeholder="请填写公司名称" value={this.state.company} onChange={this.companyChange}/>
					</div>
					<Route path="/index" component={First}/>
					{submita}
				</div>
				<Route path="/register" component={Register}/>
			<Link to="/register" className="to-register" >没有账号，注册一个</Link>
			{LR}
		</div>
		)
	}
}
class Register extends Component{
	constructor(){
		super();
		this.state={
			company:'',
			username:'',
			password:'',
			rePassword:'',
			check:0
		}
	}
	company=(ev)=>{
		this.setState({
			company:ev.target.value
		})
	}
	username=(ev)=>{
		this.setState({
			username:ev.target.value
		})
	}
	password=(ev)=>{
		this.setState({
			password:ev.target.value
		})
	}
	rePassword=(ev)=>{
		this.setState({
			rePassword:ev.target.value
		})
	}
	register=()=>{
		let obj=Object.assign(this.state);
		if(Data[obj.company]){
			let i=Data[obj.company].users.findIndex(e=>e.user===obj.username);
			if(i===-1&&obj.password===obj.rePassword&&obj.password!==''&&obj.username!==''){
				this.setState({
					check:1
				})
				let uInfo={
					user: this.state.username,
					password: this.state.password,
					photo:'./images/photo.png',
					email:'',
					tel:'',
					position:'',
					address:''
				}
				Data[obj.company].users.push(uInfo);
			}else{
				this.setState({
					check:-1
				})
			}
		}else{
			this.setState({
				check:-1
			})
		}
		this.setState({
			company:'',
			username:'',
			password:'',
			rePassword:''
		})
	}
	render(){
		let {check}=this.state;
		let result=null;
		if(check>0){
			result=<Link className="to-login" to="/login">注册成功，返回登陆</Link>
		}
		if(check<0){
			result=<a className="to-login">注册失败,重新注册</a>
		}
		
		return(
			<div id="register">
				<Link to="/" className="backLogin">返回</Link>
				<div className="info">
					<div>
						<label>公司</label><input type='text' placeholder="请填写公司名称" value={this.state.company} onChange={this.company}/>
					</div>
					<div>
						<label>帐号</label><input type='text' placeholder="请填写用户名" value={this.state.username} onChange={this.username}/>
					</div>
					<div>
						<label>密码</label><input type='password' placeholder="输入密码" value={this.state.password} onChange={this.password}/>
					</div>
					<div>
						<label>确认密码</label><input type='password' placeholder="输入密码" value={this.state.rePassword} onChange={this.rePassword}/>
					</div>
					<span className="register-summit" onClick={this.register}>注册</span>
				</div>
				<Route path="/login" component={Login}/>
				{result}
			</div>
		)
	}
}
class LoginError extends Component{
	display=()=>{
		this.props.display();
	}
	render(){
		return(
			<div className="login-error" >
				<div>
					<p>登录失败!</p>
					<span onClick={this.display}>确定</span>
				</div>
			</div>
		)
	}
}

ReactDOM.render(
	<Router>
		<div style={{height:'100%',overflow:'hidden'}}>
			<Route exact strict path="/" render={()=>(<Login />)}/>
			<Route exact strict path="/:id" render={(obj)=>{
				let pathInfo=[
				{	
					name:'register',
					component:<Register />
				},
				{
					name:'login',
					component:<Login />
				},
				{
					name:'index',
					component:<First />
				},
				{
					name:'communicate',
					component:<Communicate />
				},
				{
					name:'clients',
					component:<Clients />
				},
				{
					name:'sche',
					component:<Sche />
				},
				{
					name:'me',
					component:<Me />
				},
				{
					name:'charts',
					component:<Charts />
				},
				{
					name:'setting',
					component:<IndexSet />
				}
//				{
//					name:'inform',
//					component:<Inform />
//				},
//				{
//					name:'items',
//					component:<Items />
//				}
				];
				let {match}=obj
				let f=pathInfo.find((e)=>{
					let obj=null;
					if(e.name===match.params.id){
						obj=e;
					}
					return obj;
				})
				if(!f){
					return <Login />
				}else{
					return f.component;
				}
			}}/>
		</div>
	</Router>
	, document.getElementById('root'));

if(module.hot){
	module.hot.accept();
}
