import React ,{Component} from 'react';
import Footer from './footer';
import Header from './header';
//import '../css/communcate.css'
class Communicate extends Component{
	constructor(){
		super();
		this.state={
			data:null,
			switcher:1,//1->同事，0->客户
			txt:''
		}
	}
	//加载后获取数据信息
	componentWillMount(){
		this.setState({
			data:JSON.parse(localStorage.getItem('Data'))
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
	render(){
		let {data,switcher,txt}=this.state;
		let dataItem=null;//主要内容部分的组件数据
		let cont=null;//主要内容部分的组件
		let header=null;//头部组件
		let footer=null;//尾部组件
		let dataShow=null;//存储渲染数据
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
						dataItem={
							name:e.name,
							department:e.department,
							tel:e.tel,
							key:i
						}
						return <CItem {...dataItem}/>
					})
				}else{
					//名字按拼音排序
					dataShow.sort((a,b)=>{
						return a.marketLinkMen.localeCompare(b.marketLinkMen)
					})
					cont=dataShow.map((e,i)=>{
						dataItem={
							name:e.marketLinkMen,
							department:e.marketName,
							tel:e.marketLinkTel,
							key:i
						}
						return <CItem {...dataItem}/>
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
						dataItem={
							name:e.name,
							department:e.department,
							tel:e.tel,
							key:i
						}
						return <CItem {...dataItem}/>
					})
				}
			}else{
				if(dataShow.clients&&dataShow.clients.length){
					//名字按拼音排序
					dataShow.clients.sort((a,b)=>{
						return a.marketLinkMen.localeCompare(b.marketLinkMen)
					})
					cont=dataShow.clients.map((e,i)=>{
						dataItem={
							name:e.marketLinkMen,
							department:e.marketName,
							tel:e.marketLinkTel,
							key:i
						}
						return <CItem {...dataItem}/>
					})	
				}
			}
		}
		
		//头部和尾部组件
		let classOne=switcher?'redBorder':'';
		let classTwo=switcher?'':'redBorder';
		let dataH={
			pathL:'',
			pathR:'',
			nameL:'',
			nameR:'',
			title:<h4><span className={classOne} onClick={this.switcherT}>我的同事</span><span className={classTwo} onClick={this.switcherF}>我的客户</span></h4>,
			classname:'whiteBg'
		}
		header=<Header {...dataH}/>
		footer=<Footer n='1'/>
		//渲染页面
		return(
			<div id="outerWrap">
				{header}
				<div id="contWrap">
					<div id="content">
						<div className="comSearch">
							<input type="text" value={this.state.txt} placeholder="搜索" onChange={this.changeTxt}/>
						</div>
						<ul className="communicate">
							{cont}
						</ul>
					</div>
				</div>
				{footer}
			</div>
		)
	}
}	
//单条信息组件
class CItem extends Component{
	render(){
		return(
			<li>
				<em className="photos"></em>
				<div>
					<span className="linkName">{this.props.name}</span>
					<i className="linkAdd">{this.props.department}</i>
				</div>
			</li>
		)
	}
}
export default Communicate;