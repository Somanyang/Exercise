import React ,{Component} from 'react';
import {Link} from 'react-router-dom';
import Footer from '../common/footer';
import Header from '../common/header';
import FirstBanner from './FirstBanner';
import ScheItem from './ScheItem';
//import AnimatedWrapper from "./AnimatedWrapper";
class Index extends Component{
	constructor(){
		super();
		this.state={
			n:0,
			initx:0,
			onOff:false,
			in:false,
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
		monthVist=monthVistArr.length;
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
//		this.setState({
//			data:data1
//		})
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
					onOff:onOff,
					in:true
				})
			},80)
			
		},6000)
	}
	componentWillUnmount(){
		clearInterval(this.timer)
	}
	
	
	
	
	
	//banner部分滑动
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
			if((n<0&&n>=-10)||(n>0&&n<=10)){
				this.setState({
					n:n
				})
			}
			
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
	//向上滑动，顶部的透明度设置
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
		let cont1=null;
		let cont2=null;
		let cont3=null;
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
			pathR:'/index',
			nameL:'chart',
			nameR:'',
			title:<h4>首  页</h4>,
			classname:'whiteBg',
			background:background
			
		}
		header=<Header {...dataH}/>
		footer=<Footer n="0"/>
		//我的日程
		if(data.projects.length){
			let now=new Date();
			cont1=data.projects.map((e,i)=>{
				let s=e.endTime;
				let s1=e.startTime;
				s=s.replace(/[\u4e00-\u9fa5]/g,'/');
				s1=s1.replace(/[\u4e00-\u9fa5]/g,'/');
				if(+new Date(s)-now>0&&now-+new Date(s1)>-86400000){
					let dataS={
						e:e,
						key:i,
						x:0,
						changeData:this.changeData
					}
					return <ScheItem {...dataS}/>
				}
			})
		}
		
		let dataPro=data.myproject.filter((e)=>{
			let timeS=new Date(e.time.split('-')[0]);
			let timeE=new Date(e.time.split('-')[1]+' 23:59:59');
			return timeS-new Date<=0&&timeE-new Date>0
		})
		cont2=dataPro.map((e,i)=>{
			return(
				<li className="scheItem" key={i}> 
					<span className="scheItemTitle">项目名称<i>:</i>{e.title}</span>
					<span>时间<i>:</i>{e.time}</span>
				</li>
			)
		})
		
		//cont3
		
		cont3=data.careClient.map((e,i)=>{
			return(
				<li className="scheItem" key={i}> 
					<span className="scheItemTitle">客户名称<i>:</i>{e.marketName}</span>
					<span>联系人<i>:</i>{e.marketLinkMen}</span>
					<span>联系方式<i>:</i>{e.marketLinkTel}</span>
				</li>
			)
		})
		
		return(
			<div id="outerWrap">
				<div className="headerRedBg"></div>
				{header}
				<div id="contWrap" className="contWrap firstContWrap" >
					<div id="content" ref={(ele)=>this.cont=ele} onWheel={this.moveUp} onTouchMove={this.moveUp}>
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
								<li><Link to="/product">产品</Link></li>
								<li><Link to="/inform">公告</Link></li>
								<li><Link to="/projects">项目</Link></li>
							</ul>
							<div>
								<h4><i>丨</i>当前日程</h4>
								<ul className="eventProject">{cont1}</ul>
							</div>
							<div>
								<h4><i>丨</i>当前项目</h4>
								<ul className="eventProject">{cont2}</ul>
							</div>
							<div>
								<h4><i>丨</i>关注客户</h4>
								<ul  className="eventProject">{cont3}</ul>
							</div>
						</div>
					</div>
				</div>
				{footer}
			</div>
		)
	}
}




export default Index;
