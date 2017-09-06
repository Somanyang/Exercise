import React,{Component} from 'react';
import Footer from '../common/footer';
import Header from '../common/header';
import {Link} from 'react-router-dom';
import Dl from './Dl';
import ScheAdd from './ScheAdd';
import ScheItem from './ScheItem';
//import '../css/sche.css';

class Sche extends Component{
	constructor(){
		super();
		this.state={
			add:false,//是否点击新增，false->原页面，true->新增
			scheArr:[],//存储新增数据
			data:JSON.parse(localStorage.getItem('Data')),
			now:new Date(),
			initX:0,
			x:0,
			move:false,
			fx:0,
			date:(new Date()).getDay(),
			showT:new Date()
		}
	}
	
	
	//显示新增页面
	addSche=()=>{
		this.setState({
			add:true
		})
	}
	//新增页面返回
	back=()=>{
		this.setState({
			add:false
		})
	}
	changeData=()=>{
		this.setState({
			data:JSON.parse(localStorage.getItem('Data'))
		})
	}
	chooseDate=(ev)=>{
		let dateNum=ev.target.innerText;
		let lis=ev.target.parentNode.children;
		for(let i=0;i<lis .length;i++){
			lis[i].classList.remove('selectedD')
		}
		let s=ev.target.getAttribute('name');
		ev.target.className+=' selectedD';
		this.setState({
			showT:new Date(s)
		})
	}
	changeDateS=(ev)=>{//按下
		let {initX}=this.state;
		initX=ev.changedTouches[0].pageX;
		this.setState({
			initX:initX,
			fx:initX
		})
	}
	changeDate=(ev)=>{//滑动
		let {initX,x,now}=this.state;
		let date=now.getDate()
		let nowX=ev.changedTouches[0].pageX;
		let rootFont=parseFloat(document.documentElement.style.fontSize);
		if(nowX-initX<=-2.04*rootFont){
			initX=initX-rootFont*2.04;
			now.setDate(date+1)
		}
		if(nowX-initX>2.04*rootFont){
			initX=initX+rootFont*2.04;
			now.setDate(date-1)
		}
		x=nowX-initX;
		
		let lis=Array.from(this.days.children);
		lis.forEach(e=>{
			e.classList.remove('selectedD')
		})
		this.setState({
			now:now,
			initX:initX,
			move:true,
			x:x
		})
	}
	changeDateE=(ev)=>{//抬起
		let {x}=this.state;
		let rootFont=parseFloat(document.documentElement.style.fontSize);
		this.setState({
			move:false,
			x:0
		})
	}
	render(){
		let{add,scheArr,data,x,move,date,showT}=this.state;
		let header=null;
		let footer=null;
		let cont=null;
		let addPage=null;
		//头部尾部
		let dataH={
			pathL:'charts',
			pathR:'sche',
			nameL:'chart',
			nameR:'',
			title:<h4>我的日程</h4>,
			classname:'whiteBg'
		};
		header=<Header {...dataH}/>;
		footer=<Footer n='3'/>;
		
//		//页面日期事件设置
		let {now}=this.state;
		let year=now.getFullYear();
		let month=now.getMonth()+1;
		let week=now.getDay();
		//根据今天星期几来判断应该显示的是哪几天
		
		let days=[];
		for(let i=0;i<9;i++){
			let firstDay=null;
			if(move){
				firstDay=new Date(year,month-1,now.getDate()-1-date);
			}else{
				firstDay=new Date(year,month-1,now.getDate()-1-week);
			}
			
			firstDay.setDate(firstDay.getDate()+i);
			let day=firstDay.getDate();
			let year1=firstDay.getFullYear();
			let month1=firstDay.getMonth()+1;
			let today=(day===(new Date()).getDate()&&month1===(new Date()).getMonth()+1&&year1===(new Date()).getFullYear())?'today':'';
			days.push(<li className={today} key={i} name={`${year1}-${month1}-${day}`}>{day}</li>)
		}
	
		//日程项数
		let scheNum=scheArr.length;
		//根据add判断是否新增项目
		if(add){
			let addData={
				date:now.getDate(),
				month:month,
				year:year,
				week:week,
				back:this.back//点击事件
			}
			addPage=<ScheAdd {...addData}/>
		}
		//渲染日程数据
		//根据projects中的包含今天在内的日期，渲染到页面中
		if(data.projects.length){
			cont=data.projects.map((e,i)=>{
				let s=e.endTime;
				let s1=e.startTime;
				s=s.replace(/[\u4e00-\u9fa5]/g,'/');
				s1=s1.replace(/[\u4e00-\u9fa5]/g,'/');
				if(+new Date(s)-showT>0&&showT-+new Date(s1)>-86400000){
					scheNum++;
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
		x=x+'px'
		return(
			<div id="outerWrap">
				{header}
				<div id="contWrap">
					<div id="content">
						<div className="canlender">
							<p>{year}年{month}月</p>
							<ul className="weeks">
								<li>日</li>	
								<li>一</li>	
								<li>二</li>	
								<li>三</li>	
								<li>四</li>	
								<li>五</li>	
								<li>六</li>	
							</ul>
							<ul className='days' ref={ele=>this.days=ele} onTouchMove={this.changeDate} onTouchStart={this.changeDateS} onTouchEnd={this.changeDateE}   onClick={this.chooseDate} style={{transform:`translateX(${x})`}}>
								{days}
							</ul>
						</div>
						<div className="scheList">
							<p>我的日程&nbsp;{scheNum}&nbsp;项</p>
							<ul>
								{cont}
							</ul>
						</div>
					</div>
				</div>
				<span id="addSche" onClick={this.addSche}>+</span>
				{addPage}
				{footer}
			</div>
		)
	}
}



export default Sche;