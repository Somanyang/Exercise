import React ,{Component} from 'react';
import Footer from '../common/footer';
import Header from '../common/header';
import ShowDet from './ShowDet';
import Span from './Span';
import FilterItem from './FilterItem';
import EachItem from './EachItem';
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
            hn:20,//显示数量
            init:0,
			data:[],
			showDetail:false,//是否显示详情
			showId:'',
			care:false//最近查看
		}
	}
	componentDidMount(){
		let arr=JSON.parse(localStorage.getItem('Data')).clients;
		this.setState({
			data:arr,
			init:this.cont.getBoundingClientRect().top
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
			fold:false,
			care:false
		},()=>{
			this.folding()
		})
	}
	addressing=()=>{
		this.setState({
			fold:true,
			care:false
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
	moveUp=(ev)=>{
		let {hn,init}=this.state;
		let h=this.cont.getBoundingClientRect().top;
		let rootFont=parseFloat(document.documentElement.style.fontSize);
		if((-h+init)>=3.6*(hn-9)*rootFont){
			this.setState({
				hn:hn+10
			})
		}
	}
	showDetail=(id)=>{
		let {data}=this.state;
		let dataB=JSON.parse(localStorage.getItem('Data'));
		let bool=dataB.careClient.some((e,i)=>{
			return(e.marketName===data[id].marketName&&e.marketLinkMen===data[id].marketLinkMen)
		})
		if(!bool){
			dataB.careClient.push(data[id]);
		}
		localStorage.setItem('Data',JSON.stringify(dataB));
		this.setState({
			showDetail:true,
			showId:id
		})
	}
	hideDetail=()=>{
		this.setState({
			showDetail:false
		})
	}
	careClients=()=>{
		this.setState({
			care:true
		})
		
	}
	render(){
		let header=null;
		let footer=null;
		let cont=null;
		let data2=null;
		let dataT=null;
		let {data,txt,bottom,fold,foldName,filterArr,show,hn,showDetail,showId,care}=this.state;
		let initTxt='共'+data.length+'家';
		if(care){
			data2=JSON.parse(localStorage.getItem('Data')).careClient
		}else{
			data2=Object.assign(data)
		}
		
		if(txt!==''){
			data2=JSON.parse(localStorage.getItem('cliSearch'))
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
			if(i<hn){
				return <EachItem {...e} key={i} id={i} showDetail={this.showDetail}/>
			}
		})
		let dataH={
			pathL:'charts',
			pathR:'clients',
			nameL:'chart',
			nameR:'',
			title:<h4>我的客户</h4>,
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
		
		let showDet=null;
		if(showDetail){
			let showData=dataT[showId];
			showData.back=this.hideDetail
			showDet=<ShowDet {...showData} />
		}
		
		
		return(
			<div id="outerWrap">
				{header}
				<div id="contWrap">
					<div id="content" onTouchMove={this.moveUp} ref={ele=>this.cont=ele} onWheel={this.moveUp}>
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
								<li onClick={this.careClients}><span>最近查看</span></li>
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
				{showDet}
			</div>
		)
	}
}
export default Clients;