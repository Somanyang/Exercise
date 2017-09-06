import React ,{Component} from 'react';
import Span from './Span';
export default class FilterItem extends Component{
	constructor(){
		super();
		this.state={
			filterArr:[],
			n:16
		}
	}
	componentDidMount(){
		let {n,filterArr}=this.state;
		
		this.props.arr.forEach((e,i)=>{
			filterArr[i]=e;
		})
		this.timer=setInterval(()=>{
			n--;
			if(n<=0){
				n=0;
				clearInterval(this.timer)
			}
			this.setState({
				n:n,
				filterArr:filterArr
			})
		},14)
	}
	addType=(ev)=>{
		let {filterArr}=this.state;
		if(ev.target.tagName==='SPAN'){
			filterArr[0]=ev.target.innerText;
			this.setState({
				filterArr:filterArr
			})
		}
	}
	addGrade=(ev)=>{
		let {filterArr}=this.state;
		if(ev.target.tagName==='SPAN'){
			filterArr[1]=ev.target.innerText;
			this.setState({
				filterArr:filterArr
			})
		}	
	}
	addAddress=(ev)=>{
		let {filterArr}=this.state;
		if(ev.target.tagName==='SPAN'){
			filterArr[2]=ev.target.innerText;
			this.setState({
				filterArr:filterArr
			})
		}	
	}
	submitting=()=>{
		let {filterArr,n}=this.state;
		this.props.filterArr(filterArr);
		this.timer=setInterval(()=>{
			n++;
			if(n>=16){
				n=16;
				clearInterval(this.timer);
				setTimeout(()=>{
					this.props.filterHide();
				})
			}
			this.setState({
				n:n
			})
		},14)
	}
	reseting=()=>{
		this.setState({
			filterArr:[]
		})
	}
	render(){
		let type=null;
		let grade=null;
		let address=null;
		let {filterArr}=this.state;
		type=this.props.market.type.map((e,i)=>{
			return <Span key={i} txt={e} filArr={filterArr[0]}/>
		})
		grade=this.props.market.grade.map((e,i)=>{
			return <Span key={i} txt={e} filArr={filterArr[1]}/>
		})
		address=this.props.market.address.map((e,i)=>{
			return <Span key={i} txt={e} filArr={filterArr[2]}/>
		})
		return(
			<div className="filterPage" style={{transform:`translateX(${this.state.n}rem)`}}>
				<div className="filterDetail">
					<ul>
						<li>
							<h4>客户分类</h4>
							<div className="clear-fix" onClick={this.addType}>
								{type}
							</div>
						</li>
						<li>
							<h4>渠道级别</h4>
							<div className="clear-fix" onClick={this.addGrade}>
								{grade}
							</div>	
						</li>
						<li>
							<h4>所在地区</h4>
							<div className="clear-fix" onClick={this.addAddress}>
								{address}
							</div>
						</li>
					</ul>
					<div className="btns">
						<span className="reset" onClick={this.reseting}>重 置</span>
						<span className="submit" onClick={this.submitting}>确 定</span>
					</div>
				</div>
			</div>
		)
	}
}