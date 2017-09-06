import React,{Component} from 'react';
import Header from '../common/header';
import ClientList from './ClientList';
//新建拜访客户选择界面
export default class ChooseClients extends Component{
	constructor(){
		super();
		this.state={
			data:JSON.parse(localStorage.getItem('Data')).clients,
			txt:'',
			init:0,
			hn:30
		}
	}
	componentDidMount(){
		//获取初始位置
		this.setState({
			init:this.cont.getBoundingClientRect().top
		})
	}
	//上移按需加载
	moveUp=(ev)=>{
		let {hn,init}=this.state;
		let h=this.cont.getBoundingClientRect().top;
		let rootFont=parseFloat(document.documentElement.style.fontSize);
		if((-h+init)>=1.9*(hn-20)*rootFont){
			this.setState({
				hn:hn+20
			})
		}
	}
	//搜索
	changeTxt=(ev)=>{
		let {data}=this.state;
		let arr=[];
		let dataD=[];
		dataD=Object.assign(data);
		dataD.forEach((e)=>{
			let n=0;
			//根据姓名搜索并存储在相应的数组中
			for(let i=0;i<ev.target.value.length;i++){
				if(e.marketName.includes(ev.target.value)){
					arr.push(e);
				}
			}
			if(n===ev.target.value.length){
				arr.push(e);
			}	
		})
		localStorage.setItem('clientsSearch',JSON.stringify(arr));
		this.setState({
			txt:ev.target.value
		})
	}
	//点击获取选中的客户
	getClient=(ev)=>{
		if(ev.target.tagName!=='UL'){
			let name=ev.target.innerText;
			this.props.getClient(name);
			this.props.changeChooseClient();
		}
	}
	//返回新建页面
	backHome=()=>{
		this.props.changeChooseClient();
	}
	render(){
		let header=null;
		let dataH=null;
		dataH={
			pathL:'new',
			pathR:'',
			nameL:'back',
			nameR:'',
			title:<h4>客户选择</h4>,
			classname:'whiteBg',
			click:this.backHome
		};
		header=<Header {...dataH}/>;
		let clientList=null;
		let cont=null;
		let {data,txt,hn}=this.state;
		let dataShow=null;
		//根据是否有搜索内容来渲染页面
		if(txt!==''){
			dataShow=JSON.parse(localStorage.getItem('clientsSearch'));
		}else{
			dataShow=Object.assign(data);
		}
		dataShow.sort((a,b)=>{
			return a.marketName.localeCompare(b.marketName)
		})
		cont=dataShow.map((e,i)=>{
			//根据hn来确定加载的数量
			if(i<hn){
				let dataS={
					e:e,
					key:i
				}
				return<ClientList {...dataS}/>
			}
			
		})
		return(
			<div id="selectClientWrap">
				{header}
				<div id="selectClient">
					<div className="selectClient" onTouchMove={this.moveUp} ref={ele=>this.cont=ele} onWheel={this.moveUp} >
						<div className="comSearch">
							<input type="text" value={this.state.txt} placeholder="搜索" onChange={this.changeTxt}/>
						</div>
						<ul className="communicate" onClick={this.getClient}>
							{cont}
						</ul>
					</div>
				</div>
			</div>
		)
	}
}