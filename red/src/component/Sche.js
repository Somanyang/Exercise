import React,{Component} from 'react';
import Footer from './footer';
import Header from './header';
//import '../css/sche.css';

class Sche extends Component{
	constructor(){
		super();
		this.state={
			add:false,//是否点击新增，false->原页面，true->新增
			scheArr:[]//存储新增数据
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
	render(){
		let{add,scheArr}=this.state;
		let header=null;
		let footer=null;
		let cont=null;
		let addPage=null;
		//头部尾部
		let dataH={
			pathL:'',
			pathR:'',
			nameL:'',
			nameR:'',
			title:<h4><span className="redBorder">我的日程</span></h4>,
			classname:'whiteBg'
		};
		header=<Header {...dataH}/>;
		footer=<Footer n='3'/>;
		//页面日期事件设置
		let now=new Date();
		let year=now.getFullYear();
		let month=now.getMonth()+1;
		let week=now.getDay();
		let date=now.getDate()+(0-week);
		let firstDay=new Date(year+'/'+month+'/'+date);//只可用'/'，不然手机显示为NaN，
		//根据今天星期几来判断应该显示的是哪几天
		let days=[];
		for(let i=0;i<7;i++){
			let day=firstDay.getDate()+i;
			let today=(day===now.getDate())?'today':'';
			days.push(<li className={today} key={i}>{day}</li>)
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
							<ul className='days'>
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
//新增页面
class ScheAdd extends Component{
	close=()=>{
		this.props.back()
	}
	render(){
		//随机句子
		let sentence=['心有多大，舞台就有多大','只有想不到的，没有做不到的','没有天生的信心，只有不断培养的信心','胜利不是战胜敌人，而是提高自己','风雨夏秋冬，十年磨一剑','风雨夏秋冬，十年磨一剑不必遗憾。若是美好，叫做精彩。若是糟糕，叫做经历','人生的成功不过是在紧要处多一份坚持'];
		let itemsArr=['新建拜访','拜访路线','新建任务','新建会议','新建培训'];
		let items=itemsArr.map((e,i)=>{
			let dlData={
				dd:e,
				key:i,
				id:i
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
		console.log(this.props.id)
	}
	render(){
		return(
			<dl onClick={this.click}>
				<dt></dt>
				<dd>{this.props.dd}</dd>
			</dl>
		)
	}
}
export default Sche;