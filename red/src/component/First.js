import React ,{Component} from 'react';
import {Link} from 'react-router-dom';
//import '../css/header.css';
//import '../css/index-1.css';
import Footer from './footer';
import Header from './header';
class Index extends Component{
	constructor(){
		super();
		this.state={
			n:0,
			initx:0,
			onOff:false,
			background:{background:'rgba(255,255,255,0)'},
			data:JSON.parse(localStorage.getItem('Data'))
		}
	}
	componentWillMount(){
		//数据预处理
		let data1=JSON.parse(localStorage.getItem('Data'));
		let visitArr=data1.visit;//拜访数据
		let clientsArr=data1.clients;//总客户数据
		let newMArr=data1.newMarket;//新增客户数据
		let keywords=data1.keywords;
		//获取时间
		let now=new Date();
		let today=now.getDate();
		let yesterday=today-1;
		//新增客户信息
		//昨日新增数据条数
		let yesterdayAdd=0;
		//本月新增数据
		let monthArr=[];
		let futureArr=[];
		newMArr.forEach((e,i)=>{
			if(e.createDate===yesterday){
				yesterdayAdd=e.detail.length;
			}
			if(e.createDate<=today){
				monthArr=monthArr.concat(e.detail);
			}
			if(e.createDate>today){
				futureArr=futureArr.concat(e.detail);
			}
		});
		//本月新增条数
		let monthAdd=monthArr.length;
		//客户总数
		let clientTotal=clientsArr.length-futureArr.length;
		//本月日均增长量
		let addRate=Math.round(monthAdd/today);
		//将数据中的keywords进行处理，保证数据的动态性
		keywords[1].detail[1][0]=yesterdayAdd;
		keywords[1].detail[1][1]=clientTotal;
		keywords[1].detail[1][2]=monthAdd;
		keywords[2].detail[1][0]=addRate;
		keywords[2].detail[1][1]=yesterdayAdd;
		keywords[2].detail[1][2]=monthAdd;
		//拜访信息统计
		//昨日覆盖数
		let yesterdayVist=0;
		let yesterdayVistArr=[];
		//昨日人均拜访
		let yesterdayAverage=0;
		//本月人均拜访
		let monthAverage=0;
		//昨日拜访总人次
		let yesterdayTimes=0;
		//本月覆盖数
		let monthVist=0;
		let monthVistArr=[];
		let futureVistArr=[];
		let people=[];
		visitArr.forEach((e,i)=>{
			//昨日拜访
			if(e.date===yesterday){
				e.desc.forEach((e,i)=>{
					//统计昨日总拜访数
					yesterdayVistArr=yesterdayVistArr.concat(e.detail);
					
				})
				//昨日拜访人次
				yesterdayTimes=e.desc.length;
			}
			if(e.date<=today){
				e.desc.forEach((e,i)=>{
					monthVistArr=monthVistArr.concat(e.detail);
					if(!people.includes(e.name)){
						people.push(e.name);
					}
				})
			}
			//由于数据模拟需要将未来日期的数据进行删除
			if(e.date>today){
				e.desc.forEach((e,i)=>{
					futureVistArr=futureVistArr.concat(e.detail);
				})
			}
		})
		//昨日拜访数
		yesterdayVist=yesterdayVistArr.length;
		//本月覆盖数
		monthVist=monthVistArr.length-futureVistArr.length;
		//昨日人均拜访
		if(yesterdayTimes){
			yesterdayAverage=Math.round(yesterdayVist/yesterdayTimes);
		}
		//本月人均拜访
		monthAverage=Math.round(monthVist/people.length);
		keywords[0].detail[1][0]=monthAverage;
		keywords[0].detail[1][1]=yesterdayAverage;
		keywords[0].detail[1][2]=yesterdayTimes;
		keywords[3].detail[1][0]=yesterdayVist;
		keywords[3].detail[1][1]=yesterdayAverage;
		keywords[3].detail[1][2]=monthVist;
		//将数据添加到localStorage
		localStorage.setItem('Data',JSON.stringify(data1));
		this.setState({
			data:data1
		})
	}
	componentDidMount(){
		let {n,data,onOff}=this.state;
		let data2=Object.assign(data);
		this.timer=setInterval(()=>{
			let timer=null;
			timer=setInterval(()=>{
				if(n===-10){
					let ite=data2.keywords.splice(0,1)[0];
					data2.keywords.push(ite);
					n=1;
					onOff=true;
					clearInterval(timer);
				}
				this.setState({
					n:--n,
					data:data2,
					onOff:onOff
				})
			},80)
			
		},6000)
	}
	componentWillUnmount(){
		clearInterval(this.timer)
	}
	banTouchStart=(ev)=>{
		let {n,onOff,initx}=this.state;
		clearInterval(this.timer);
		if(n===0)onOff=true;
		initx=ev.changedTouches[0].pageX;
		this.setState({
			initx:initx,
			onOff:true
		})
	}
	banTouchMove=(ev)=>{
		let{initx,n,onOff}=this.state;
		if(onOff){
			n=ev.changedTouches[0].pageX-initx;
			n=Math.round(n/75);
			this.setState({
				n:n
			})
		}
		
	}
	banTouchEnd=(ev)=>{
		let {n,data}=this.state;
		let data2=Object.assign(data);
		setTimeout(()=>{
			let timer=null;
			timer=setInterval(()=>{
				if(n<0){
					if(n===-10){
						let ite=data2.keywords.splice(0,1)[0];
						data2.keywords.push(ite);
						n=1;
						clearInterval(timer);
					}
					this.setState({
						n:--n,
						data:data2,
						onOff:false
					})
					
				}else{
					if(n===10){
						let ite=data2.keywords.splice(2,1)[0];
						data2.keywords.unshift(ite);
						n=-1;
						clearInterval(timer);
					}
					this.setState({
						n:++n,
						data:data2,
						onOff:false
					})
				}
				
			},80)
			
		})
		this.timer=setInterval(()=>{
			let timer=null;
			timer=setInterval(()=>{
				if(n===-10){
					let ite=data2.keywords.splice(0,1)[0];
					data2.keywords.push(ite);
					n=1;
					clearInterval(timer);
				}
				this.setState({
					n:--n,
					data:data2
				})
			},80)
			
		},6000)
	}
	moveUp=()=>{
		let h=this.cont.getBoundingClientRect().top;
		let opacity=Math.round(128-h)/12.8/10;
		this.setState({
			background:{background:`rgba(255,255,255,${opacity})`}
		})
		
	}
	render(){
		let banners=null;
		let header=null;
		let footer=null;
		let{data,background}=this.state;
		banners=data.keywords.map((e,i)=>{
			if(i<3){
				let data2={
					title:e.title,
					key:i,
					id:i,
					details:e.detail,
					n:this.state.n
				}
				return <FirstBanner {...data2} />
			}
		})
		let dataH={
			pathL:'/charts',
			pathR:'/setting',
			nameL:'chart',
			nameR:'setting',
			title:<h4>首页</h4>,
			classname:'whiteBg',
			background:background
			
		}
		header=<Header {...dataH}/>
		footer=<Footer n="0"/>
		return(
			<div id="outerWrap">
				<div className="headerRedBg"></div>
				{header}
				<div id="contWrap" className="contWrap firstContWrap" >
					<div id="content" ref={(ele)=>this.cont=ele} onTouchMove={this.moveUp}>
						<section className="clear-fix firstSec">
							<div className="bg"></div>
							<div className="bans" 
								style={{transform:`translate(${this.state.n}rem)`}}
								onTouchStart={this.banTouchStart}
								onTouchMove={this.banTouchMove}
								onTouchEnd={this.banTouchEnd}
							>{banners}</div>
						</section>
						<div id="main">
							<ul className="list clear-fix">
								<li><Link to="/attendence">考勤</Link></li>
								<li><Link to="/communicate/reach">必达</Link></li>
								<li><Link to="/inform">公告</Link></li>
								<li><Link to="/items">项目</Link></li>
							</ul>
							<div>
								<h4><i>丨</i>当前日程</h4>
								<ul></ul>
							</div>
							<div>
								<h4><i>丨</i>关注客户</h4>
								<ul></ul>
							</div>
							<div>
								<h4><i>丨</i>待审批</h4>
								<ul></ul>
							</div>
						</div>
					</div>
				</div>
				{footer}
			</div>	
		)
	}
}

class FirstBanner extends Component{
	render(){
		//banner的动态
		let n=null;
		if(this.props.n<=0){
			if(this.props.id===1){
				n=1+this.props.n*0.02;
			}else{
				n=0.8-this.props.n*0.02;
			}
		}else if(this.props.n>=0){
			if(this.props.id===1){
				n=1-this.props.n*0.02;
			}else{
				n=0.8+this.props.n*0.02;
			}
		}
		
		
		return(
			<div className="banner" style={{transform:`scale(${n})`}}>
				<h3>{this.props.title}</h3>
				<div className="details clear-fix">
					<dl>
						<dt>{this.props.details[1][0]}</dt>
						<dd>{this.props.details[0][0]}</dd>
					</dl>
					<dl>
						<dt>{this.props.details[1][1]}</dt>
						<dd>{this.props.details[0][1]}</dd>
					</dl>
					<dl>
						<dt>{this.props.details[1][2]}</dt>
						<dd>{this.props.details[0][2]}</dd>
					</dl>
				</div>
			</div>
		)
	}
}
export default Index;
