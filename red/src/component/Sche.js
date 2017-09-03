import React,{Component} from 'react';
import Footer from './footer';
import Header from './header';
import {Link} from 'react-router-dom';
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


class ScheItem extends Component{
	constructor(){
		super();
		this.state={
			x:0,
			init:0,
			data:JSON.parse(localStorage.getItem('Data'))
		}
	}
	componentDidMount(){
		this.setState({
			x:this.props.x,
			init:0
		})
	}
	deletePro=()=>{
		let {data}=this.state;
		data.projects=data.projects.filter(e=>{
			let n=0,m=0;
			for(let k in e){
				n++;
				if(e[k]===this.props.e[k]){
					m++;
				}
			}
			if(n!==m)return e;
		})
		localStorage.setItem('Data',JSON.stringify(data));
		this.props.changeData();
		this.setState({
			x:0
		})
	}
	cancel=()=>{
		this.setState({
			x:0
		})
	}
	//单条拖动
	moveStart=(ev)=>{
		let {init}=this.state;
		init=ev.changedTouches[0].pageX;
		this.setState({
			init:init
		})
	}
	moveLeft=(ev)=>{
		let {init,x}=this.state;
		let rootFont=parseFloat(document.documentElement.style.fontSize);
		x=(ev.changedTouches[0].pageX-init)/rootFont;
		if(x<=-3.2)x=-3.2;
		if(x>0)x=0;
		
		this.setState({
			x:x
		})
	}
	moveEnd=(ev)=>{
		let {x}=this.state;
		if(x<-1.6){
			x=-3.2
		}else{
			x=0
		}
		this.setState({
			x:x
		})
	}
	render(){
		let project=this.props.e;
		let address=null;
		let name='';
		let type='';
		if(project.Address){
			address=<span>地址<i>:</i>{project.Address}</span>
		}
		if(project.type==='拜访'){
			type="拜访客户";
			name=project.clientName;
		}else{
			type=project.type+'名称';
			name=project.itemName;
		}
		return(
			<li className="scheItem" onTouchStart={this.moveStart} onTouchMove={this.moveLeft} onTouchEnd={this.moveEnd} style={{transform:`translateX(${this.state.x}rem)`}}> 
				<span className="scheItemTitle">{type}<i>:</i>{name}</span>
				<span>时间<i>:</i>{this.props.e.startTime}-{this.props.e.endTime}</span>
				{address}
				<span>执行人<i>:</i>{this.props.e.manager}</span>
				<strong  ref={ele=>this.del=ele}>
					<b onClick={this.cancel}><em>取  消</em></b>
					<b onClick={this.deletePro}><em>删  除</em></b>
				</strong>
			</li>
		)
	}
}

//新增页面
class ScheAdd extends Component{
	close=()=>{
		this.props.back()
	}
	render(){
		//随机句子
		let sentence=['心有多大，舞台就有多大','有理想的人，生活总是火热的','既然开始，就做到最好','伟大的行动和思想，都有一个微不足道的开始','我们自己的态度，决定了我们的人生','只有想不到的，没有做不到的','没有天生的信心，只有不断培养的信心','胜利不是战胜敌人，而是提高自己','风雨夏秋冬，十年磨一剑','风雨夏秋冬，十年磨一剑不必遗憾。若是美好，叫做精彩。若是糟糕，叫做经历','人生的成功不过是在紧要处多一份坚持'];
		let itemsArr=['新建拜访','新建任务','新建会议','新建培训'];
		let items=itemsArr.map((e,i)=>{
			let dlData={
				dd:e,
				key:i,
				id:i,
				txt:itemsArr[i].slice(2)
			}
			return <Dl {...dlData}/>
		});
		let sentOne=sentence[Math.floor(Math.random()*sentence.length)];
		let week=null;
		switch(this.props.week){
			case 0:week='星期日'
			break;
			case 1:week='星期一'
			break;
			case 2:week='星期二'
			break;
			case 3:week='星期三'
			break;
			case 4:week='星期四'
			break;
			case 5:week='星期五'
			break;
			case 6:week='星期六'
			break;
			default:;
		}
		return(
			<div id="addPage">
				<div className='timeShow'>
					<span>{this.props.date}</span>
					<span><em>{week}</em><em>{this.props.month}/{this.props.year}</em></span>
				</div>
				<p>{sentOne}</p>
				<div className="chooseItem clear-fix">
					{items}
				</div>
				<div className="close"><span onClick={this.close}>×</span></div>
			</div>
		)
	}
}
//新增页面的条目
class Dl extends Component{
	click=()=>{
		localStorage.setItem('new',this.props.dd.slice(2))
	}
	render(){
		return(
			<dl onClick={this.click}>
				<dt><Link to='/new'></Link></dt>
				<dd><Link to='/new'>{this.props.dd}</Link></dd>
			</dl>
		)
	}
}
export default Sche;