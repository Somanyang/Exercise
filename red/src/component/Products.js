import React,{Component} from 'react';
import Footer from './footer';
import Header from './header';

class Prodcuts extends Component{
	constructor(){
		super();
		this.state={
			txt:'',
		    data:JSON.parse(localStorage.getItem('Data')).products,
		    hn:20,
			init:0
		    
		}
	}
	changeTxt=(ev)=>{
		this.setState({
			txt:ev.target.value
		})
	}
	click=()=>{
		window.history.go(-2)
	}
	moveUp=(ev)=>{
		let {hn,init}=this.state;
		let h=this.cont.getBoundingClientRect().top;
		let rootFont=parseFloat(document.documentElement.style.fontSize);
		if((-h+init)>=2.56*(hn-10)*rootFont){
			this.setState({
				hn:hn+10
			})
		}
	}
	render(){
		let{data,txt}=this.state;
		let header=null;
		let cont=null;
		let dataH={
			pathL:'product',
			pathR:'product',
			nameL:'back',
			nameR:'',
			title:<h4>产品</h4>,
			classname:'whiteBg',
			click:this.click
		}
		header=<Header {...dataH}/>
		let data2=[];
		if(!txt){
			data2=data
		}else{
			data2=data.filter((e,i)=>{
				return e.name.includes(txt)
			})
		}
		
		
		cont=data2.map((e,i)=>{
			let dataC={
				e:e,
				key:i
			}
			return <CItem {...dataC} />
		})
		
		return(
			<div id="outerWrap">
				{header}
				<div id="contWrap" className="productsWrap">
					<div id="content" onTouchMove={this.moveUp} ref={ele=>this.cont=ele} onWheel={this.moveUp}>
						<div className="comSearch">
							<input type="text" value={this.state.txt} placeholder="搜索" onChange={this.changeTxt}/>
						</div>
						<ul className="communicate products" onClick={this.menInfo}>
							{cont}
						</ul>
					</div>
				</div>
			</div>
		)
	}
}
class CItem extends Component{
	render(){
		return(
			<li>
				<div>
					<span className="linkName">名称 : {this.props.e.name}</span>
					<i className="linkAdd">编码 :  {this.props.e.code}</i>
				</div>
			</li>
		)
	}
}
export default Prodcuts;