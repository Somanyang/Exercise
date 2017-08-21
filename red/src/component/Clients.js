import React ,{Component} from 'react';
import Footer from './footer';
import Header from './header';
//import '../css/clients.css';
class Clients extends Component{
	constructor(){
		super();
		this.state={
			txt:'',
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
	render(){
		let header=null;
		let footer=null;
		let cont=null;
		let data2=null;
		let {data,txt}=this.state;
		let initTxt='共'+data.length+'家';
		if(txt!==''){
			data2=JSON.parse(localStorage.getItem('cliSearch'))
		}else{
			data2=Object.assign(data)
		}
		cont=data2.map((e,i)=>{
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
		return(
			<div id="outerWrap">
				{header}
				<div id="contWrap">
					<div id="content">
						<div className="comSearch">
							<input type="text" value={this.state.txt} placeholder={initTxt} onChange={this.changeTxt}/>
						</div>
						<ul className="clients">
							{cont}
						</ul>
					</div>
				</div>
				{footer}
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

export default Clients;