import React ,{Component} from 'react';
import Footer from '../common/footer';
import Header from '../common/header';
import {Link} from 'react-router-dom';
class Message extends Component{
	constructor(){
		super();
		this.state={
			txt:'',
			arr:[],
			send:false
		}
	}
	chatTxt=(ev)=>{
		let txt=ev.target.value;
		this.setState({
			txt:txt
		})
	}
	send=()=>{
		let{txt,arr}=this.state;
		arr.push(txt);
		this.setState({
			send:true,
			arr:arr,
			txt:''
		})
	}
	render(){
		let info=JSON.parse(localStorage.getItem('connectInfo'))
		let header=null;//头部组件
		let chatInfo=null;
		let mesItem=null;
		let dataH={
			pathL:'communicate',
			pathR:'message',
			nameL:'back',
			nameR:'',
			title:<h4>与 {info.name} 聊天</h4>,
			classname:'whiteBg'
		}
		header=<Header {...dataH}/>
		let {send,arr}=this.state;
		chatInfo=arr.map((e,i)=>{
			return <li key={i} className="clear-fix"><span className="chatItem">{e}</span></li>
		})
		return(
			<div id="message">
				{header}
				<ul className='chatList'>
					{chatInfo}
				</ul>
				<div className='chatFoot'>
					<em></em>
					<input type='text' onChange={this.chatTxt} value={this.state.txt}/>
					<span onClick={this.send}>发送</span>
				</div>
			</div>
		)
	}
}
export default Message;