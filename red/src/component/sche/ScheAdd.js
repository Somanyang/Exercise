import React,{Component} from 'react';
import Dl from './Dl';
//新增页面
export default class ScheAdd extends Component{
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