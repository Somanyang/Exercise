import React ,{Component} from 'react';
import Header from '../common/header';
export default class UpdatingPage extends Component{
	constructor(){
		super();
		this.state={
			cont:'',
			time:'',
			wrong:false
		}
	}
	click=(ev)=>{
		this.props.backToProject(this.props.title,this.props.item)
	}
	//获取当前时间
	componentDidMount(){
		let now=new Date();
		let time=now.getFullYear()+'/'+(now.getMonth()+1)+'/'+now.getDate();
		this.setState({
			time:time
		})
	}
	updateCont=(ev)=>{
		this.setState({
			cont:ev.target.value
		})
	}
	//保存信息
	updateSave=()=>{
		let{time,cont}=this.state;
		if(time&&cont){
			this.props.updateData(time,cont,this.props.title,this.props.item)
			this.props.backToProject(this.props.title,this.props.item);
		}else{
			this.setState({
				wrong:true
			})
		}
	}
	//确定后继续填写信息
	warningSure=()=>{
		this.setState({
			wrong:false
		})
	}
	render(){
		let header=null;
		let dataH={
			pathL:'projects',
			pathR:'projects',
			nameL:'back',
			nameR:'',
			title:<h4>跟进详情</h4>,
			classname:'whiteBg',
			click:this.click
		}
		header=<Header {...dataH}/>;
		let {time,wrong}=this.state;
		let warning=null;
		//未填写完整保存提示
		if(wrong){
			warning=(
				<div id='timeWarning'>
					<div>
						<span>请填写完整信息 !</span>
						<em onClick={this.warningSure}>确定</em>
					</div>
			 	 </div>
			)
		}
		return(
			<div id="updatePage">
				{header}
				{warning}
				<div className="itemDetail">
					<div className="itemTitle">条目名称: {this.props.item}</div>
					<div>项目时间: {time}</div>
					<div><span>跟进描述</span><input  value={this.state.cont} onChange={this.updateCont} className="updateEdit"/></div>
				</div>
				<div className='updateSave' onClick={this.updateSave}>保存</div>
			</div>
		)
	}
}