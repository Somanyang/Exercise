import React ,{Component} from 'react';
import Footer from './footer';
import Header from './header';
class Clients extends Component{
	constructor(){
		super();
		this.state={
			txt:'',
            bottom:'0rem',
            order:false,
            foldName:'unfold',
            filterArr:[],
            show:false,
			data:[]
		}
	}
	componentDidMount(){
		let arr=JSON.parse(localStorage.getItem('Data')).clients;
		this.setState({
			data:arr
		})
	}
	changeTxt=(ev)=>{
		let {data}=this.state;
		let arr=[];
		data.forEach((e)=>{
			let n=0;
			for(let i=0;i<ev.target.value.length;i++){
				if(e.marketName.includes(ev.target.value[i])){
					n++;
				}
			}
			if(n===ev.target.value.length){
				arr.push(e);
			}
		});
		localStorage.setItem('cliSearch',JSON.stringify(arr));
		this.setState({
			txt:ev.target.value
		})
	}
	folding=()=>{
		let {foldName}=this.state;
		if(foldName==='fold'){
			this.setState({
				foldName:'unfold',
				bottom: '0rem',
			})
		}else{
			this.setState({
				foldName:'fold',
				bottom: '-3.41333rem',
			})
		}
		
	}
	naming=()=>{
		this.setState({
			fold:false
		},()=>{
			this.folding()
		})
	}
	addressing=()=>{
		this.setState({
			fold:true
		},()=>{
			this.folding()
		})
	}
	//筛选数组
	filterFn=(arr)=>{
		this.setState({
			filterArr:arr
		})
	}	
	//拉出筛选界面
	filterShow=()=>{
		this.setState({
			show:true
		})
	}
	filterHide=()=>{
		this.setState({
			show:false
		})
	}
	render(){
		let header=null;
		let footer=null;
		let cont=null;
		let data2=null;
		let dataT=null;
		let {data,txt,bottom,fold,foldName,filterArr,show}=this.state;
		let initTxt='共'+data.length+'家';
		if(txt!==''){
			data2=JSON.parse(localStorage.getItem('cliSearch'))
		}else{
			data2=Object.assign(data)
		}
		//根据筛选确定渲染用的数组
		if(filterArr.length!==0){
			let arr1=[],arr2=[],arr3=[];
			if(filterArr[0]){
				arr1=data2.filter((e)=>{
					return e.marketType===filterArr[0];
				})
			}else{
				arr1=data2;
			}
			if(filterArr[1]){
				arr2=arr1.filter((e)=>{
					return e.marketClass===filterArr[1];
				})
			}else{
				arr2=arr1;
			}
			if(filterArr[2]){
				arr3=arr2.filter((e)=>{
					return e.marketAdd.includes(filterArr[2]);
				})
			}else{
				arr3=arr2;
			}
			dataT=arr3
		}else{
			dataT=data2;
		}
		//排序
		let chooseOrder='';
		if(fold){
			chooseOrder='地址排序';
			dataT.sort((a,b)=>{
				return a.marketAdd.localeCompare(b.marketAdd)
			})
		}else{
			chooseOrder='名称排序';
			dataT.sort((a,b)=>{
				return a.marketName.localeCompare(b.marketName)
			})
		}
		//组件渲染
		cont=dataT.map((e,i)=>{
			return <EachItem {...e} key={i}/>
		})
		let dataH={
			pathL:'',
			pathR:'',
			nameL:'',
			nameR:'',
			title:<h4><span className="redBorder">我的客户</span></h4>,
			classname:'whiteBg'
		}
		header=<Header {...dataH}/>
		footer=<Footer n='2'/>
		
		
		let filterItem=null;
		if(show){
			let dataM=JSON.parse(localStorage.getItem('Data'));
			dataM.filterArr=this.filterFn;
			dataM.filterHide=this.filterHide;
			dataM.arr=filterArr;
			filterItem=<FilterItem {...dataM} />
		}
		
		return(
			<div id="outerWrap">
				{header}
				<div id="contWrap">
					<div id="content">
						<div className="comSearch clientsEdit">
							<ul className="clear-fix">
								<li>
									<div className="order">
										<span className={foldName} onClick={this.folding}>{chooseOrder}</span>
										<span style={{bottom:bottom}} className="orderList">
											<b onClick={this.naming}>名称排序</b>
											<b onClick={this.addressing}>地址排序</b>
										</span>
									</div>
								</li>
								<li><span>最近查看</span></li>
								<li className='filter' onClick={this.filterShow}><span>筛选</span></li>
							</ul>
							<input type="text" value={this.state.txt} placeholder={initTxt} onChange={this.changeTxt}/>
						</div>
						<ul className="clients">
							{cont}
						</ul>
					</div>
				</div>
				{footer}
				{filterItem}
			</div>
		)
	}
}
class EachItem extends Component{
	render(){
		return(
			<li>
				<p><span>{this.props.marketName}</span><em>{this.props.marketType}</em></p>
				<b>{this.props.marketAdd}</b>
				<strong>{this.props.marketLinkMen}</strong>
			</li>
		)
	}
}

class FilterItem extends Component{
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
class Span extends Component{
	render(){
		let className='';
		if(this.props.filArr===this.props.txt)className='chooseRed';
		return(
			<span className={className}>{this.props.txt}</span>
		)
	}
}
export default Clients;