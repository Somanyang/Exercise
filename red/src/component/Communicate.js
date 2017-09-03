import React ,{Component} from 'react';
import Footer from './footer';
import Header from './header';
import {Link,Route} from 'react-router-dom';
import Message from './Message';
//import '../css/communcate.css'
class Communicate extends Component{
	constructor(){
		super();
		this.state={
			data:JSON.parse(localStorage.getItem('Data')),
			switcher:1,//1->同事，0->客户
			txt:'',
			hn:20,
			init:0,
			connect:false,
			connectInfo:null
		}
	}
	//加载后获取数据信息
//	componentWillMount(){
//		this.setState({
//			data:JSON.parse(localStorage.getItem('Data'))
//		})
//	}
	componentDidMount(){
		this.setState({
			init:this.cont.getBoundingClientRect().top
		})
	}
	//切换联系人信息->同事
	switcherT=()=>{
		this.setState({
			switcher:1,
			txt:''
		})
	}
	//切换联系人信息->客户
	switcherF=()=>{
		this.setState({
			switcher:0,
			txt:''
		})
	}
	//输入文字搜索
	changeTxt=(ev)=>{
		let {switcher,data}=this.state;
		let arr=[];
		let dataD=[];
		if(switcher){
			dataD=data.linkmen;
			dataD.forEach((e)=>{
				let n=0;
				//根据姓名搜索并存储在相应的数组中
				for(let i=0;i<ev.target.value.length;i++){
					if(e.name.includes(ev.target.value[i])){
						n++;
					}
				}
				if(n===ev.target.value.length){
					arr.push(e);
				}
				
			})
		}else{
			dataD=data.clients;
			dataD.forEach((e)=>{
				let n=0;
				//根据姓名搜索并存储在相应的数组中
				for(let i=0;i<ev.target.value.length;i++){
					if(e.marketLinkMen.includes(ev.target.value)){
						arr.push(e);
					}
				}
				if(n===ev.target.value.length){
					arr.push(e);
				}	
			})
		}
		localStorage.setItem('menSearch',JSON.stringify(arr));
		this.setState({
			txt:ev.target.value
		})
	}
	moveUp=(ev)=>{
		let {hn,init}=this.state;
		let h=this.cont.getBoundingClientRect().top;
		let rootFont=parseFloat(document.documentElement.style.fontSize);
		if((-h+init)>=2.56*(hn-10)*rootFont){
			this.setState({
				hn:hn+10
			})
		}
	}
	//单击显示联系人的信息
	menInfo=(ev)=>{
		let name='';
		let add='';
		let arr=[];
		if(ev.target.tagName==='LI'){
			arr=ev.target.innerText.split('\n');
		}else if(ev.target.parentNode.tagName==='LI'||ev.target.parentNode.tagName==='DIV'){
			arr=ev.target.parentNode.innerText.split('\n');
		}
		name=arr[1];
		add=arr[2];
		let {data,switcher}=this.state;//1->同事，0->客户
		let connectInfo=null;//选中的联系人信息
		if(switcher){
			data.linkmen.forEach(e=>{
				if (e.name.includes(name)&&e.department.includes(add)){
					connectInfo={
						name:e.name,
						add:e.department,
						tel:e.tel
					}
				}
			})
		}else{
			data.clients.find(e=>{
				if(e.marketLinkMen.includes(name)&&e.marketName.includes(add)){
					connectInfo={
						name:e.marketLinkMen,
						add:e.marketName,
						tel:e.marketLinkTel
					}
				}
			})
		}
		//设置要显示的信息
		this.setState({
			connect:true,
			connectInfo:connectInfo
		})
	}
	changeSwitcher=()=>{
		this.setState({
			connect:false,
			connectInfo:null
		})
	}
	render(){
		let {data,switcher,txt,hn,connect,connectInfo}=this.state;
		let dataItem=null;//主要内容部分的组件数据
		let cont=null;//主要内容部分的组件
		let header=null;//头部组件
		let footer=null;//尾部组件
		let dataShow=null;//存储渲染数据
		let connectDetail=null;//存储联系人信息详情
		//根据是否输入框内有文字来判断数据来源，根据数据来生成结构
		if(txt!==''){//有搜索内容
			dataShow=JSON.parse(localStorage.getItem('menSearch'));
			if(dataShow.length!==0){
				if(switcher){
					//名字按拼音排序
					dataShow.sort((a,b)=>{
						return a.name.localeCompare(b.name);
					})
					cont=dataShow.map((e,i)=>{
						if(i<hn){
							dataItem={
								name:e.name,
								department:e.department,
								tel:e.tel,
								key:i
							}
							return <CItem {...dataItem}/>
						}
					})
				}else{
					//名字按拼音排序
					dataShow.sort((a,b)=>{
						return a.marketLinkMen.localeCompare(b.marketLinkMen)
					})
					cont=dataShow.map((e,i)=>{
						if(i<hn){
							dataItem={
								name:e.marketLinkMen,
								department:e.marketName,
								tel:e.marketLinkTel,
								key:i
							}
							return <CItem {...dataItem}/>
						}
						
					})	
				}
			}
		}else{//没有搜索内容
			dataShow=Object.assign(data);
			if(switcher){
				if(dataShow.linkmen&&dataShow.linkmen.length){
					//名字按拼音排序
					dataShow.linkmen.sort((a,b)=>{
						return a.name.localeCompare(b.name)
					})
					cont=dataShow.linkmen.map((e,i)=>{
						if(i<hn){
							dataItem={
								name:e.name,
								department:e.department,
								tel:e.tel,
								key:i,
								id:i
							}
							return <CItem {...dataItem}/>
						}
					})
				}
			}else{
				if(dataShow.clients&&dataShow.clients.length){
					//名字按拼音排序
					dataShow.clients.sort((a,b)=>{
						return a.marketLinkMen.localeCompare(b.marketLinkMen)
					})
					cont=dataShow.clients.map((e,i)=>{
						if(i<hn){
							dataItem={
								name:e.marketLinkMen,
								department:e.marketName,
								tel:e.marketLinkTel,
								key:i,
								id:i
							}
							return <CItem {...dataItem}/>
						}
					})	
				}
			}
		}
		
		//头部和尾部组件
		let classOne=switcher?'redBorder':'';
		let classTwo=switcher?'':'redBorder';
		let dataH={
			pathL:'charts',
			pathR:'communicate',
			nameL:'chart',
			nameR:'',
			title:<h4><span className={classOne} onClick={this.switcherT}>我的同事</span><span className={classTwo} onClick={this.switcherF}>我的客户</span></h4>,
			classname:'whiteBg'
		}
		header=<Header {...dataH}/>
		footer=<Footer n='1'/>
		
		if(connect){
			let dataD={
				connectInfo:connectInfo,//具体的信息
				changeSwitcher:this.changeSwitcher,//关闭详情页面
				switcher:switcher
			}
			connectDetail=<ConnectDetail {...dataD}/>
		}
		
		
		//渲染页面
		return(
			<div id="outerWrap">
				{header}
				<div id="contWrap">
					<div id="content" onTouchMove={this.moveUp} ref={ele=>this.cont=ele} onWheel={this.moveUp}>
						<div className="comSearch">
							<input type="text" value={this.state.txt} placeholder="搜索" onChange={this.changeTxt}/>
						</div>
						<ul className="communicate" onClick={this.menInfo}>
							{cont}
						</ul>
					</div>
				</div>
				{footer}
				{connectDetail}
			</div>
		)
	}
}	

//单条信息组件
class CItem extends Component{
	render(){
		let n=`./images/${this.props.id%14+1}.png`;
		return(
			<li>
				<img className="photos" src={n}/>
				<div>
					<span className="linkName">{this.props.name}</span>
					<i className="linkAdd">{this.props.department}</i>
				</div>
			</li>
		)
	}
}

//联系人详情页面

class ConnectDetail extends Component{
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

export default Communicate;