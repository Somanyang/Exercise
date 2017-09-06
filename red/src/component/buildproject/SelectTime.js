import React ,{Component} from 'react';
import UlTime from './UlTime';
//时间选择的界面
export default class SelectTime extends Component{
	constructor(){
		super();
		this.state={
			year:(new Date()).getFullYear(),
			month:(new Date()).getMonth()+1,
			date:(new Date()).getDate(),
			hour:(new Date()).getHours(),
			minute:(new Date()).getMinutes(),
			second:(new Date()).getSeconds()
		}
	}
	//设置时间
	addOne=(e,num)=>{
		let item=this.state[e];
		this.setState({
			[e]:num
		})
		
	}
	cancel=()=>{
		this.props.changeSetTime()
	}
	makeSure=()=>{
		//将选好的时间返回给父组件，设置给相应的时间项
		let {year,month,date,hour,minute,second}=this.state;
		let str=year+'/'+month+'/'+date+' '+hour+':'+minute+':'+second;
		this.props.changeSetTime(str)
	}
	render(){
		let yearC=null,monthC=null,dateC=null,hourC=null,minuteC=null,secondC=null;
		let {year,month,date,hour,minute,second}=this.state;
		let arr=[year,month,date,hour,minute,second];
		let arr1=['year','month','date','hour','minute','second'];
		let times=arr.map((e,i)=>{
			let dataT={
				e:e,
				key:i,
				arr:arr,
				type:arr1[i],//类型
				addOne:this.addOne//设置时间
			}
			return <UlTime {...dataT}/>
		})
		return(
			<div id="selectTime">
				<div className='timeMask'></div>
				<div className="timeMenu"><span onClick={this.cancel}>取消</span><span onClick={this.makeSure}>确定</span></div>
				<div className="showTime">
					{times}
				</div>
			</div>
		)
	}
}