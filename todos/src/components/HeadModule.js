import React,{Component} from 'react';
import Items from './Items';
import FootModule from './FootModule';
import '../css/style.css';

class HeadModule extends Component{
	constructor(){
		super();
		this.state={
			val:'',
			arr:[]
		}
	}
	componentWillMount(){
		this.setState({
			arr:getItem()
		});
	}
	change=(ev)=>{
		this.setState({
			val:ev.target.value
		})
	}
	addItem=(ev)=>{
		if(ev.keyCode===13&&ev.target.value){
			let {arr}=this.state;
			let arr1=Object.assign(arr);
			arr1.push({content:ev.target.value,checked:false,id:+new Date()});
			this.setState({
				val:'',
				arr:arr1
			})
		}
		
	}
	removeChild=(id)=>{
		let {arr}=this.state;
		let arr1=arr.filter((e,i)=>{
			return e.id!==id
		});
		this.setState({
			arr:arr1
		});
		
	}
	chooseChild=(id)=>{
		let {arr}=this.state;
		let arr1=Object.assign(arr);
		arr1.forEach((e,i)=>{
			if(e.id===id){
				e.checked=!e.checked
			}
		});
		this.setState({
			arr:arr1
		})
	}
	checkAll=(ev)=>{
		let {arr}=this.state;
		let {checked}=ev.target;
		if(arr.length!==0){
			let arr1=arr.map((e,i)=>{
				e.checked=checked;
				return e;
			})
			this.setState({
				arr:arr1
			})
		}
	}
	changeContent=(id,val)=>{
		let {arr}=this.state;
		let arr1=Object.assign(arr);
		arr1.forEach((e,i)=>{
			if(e.id===id){
				e.content=val
			}
		});
		this.setState({
			arr:arr1
		})
	}
	clearItem=()=>{
		let {arr}=this.state;
		let arr1=arr.filter((e,i)=>{
			return !e.checked;
		})
		this.setState({
			arr:arr1
		})
	}
	chooseItem=(target)=>{
		let lis=Array.from(target.parentNode.parentNode.children);
		if(target.tagName.toLowerCase()==='a'){
			lis.forEach((e)=>{
				e.children[0].className='';
			})
			target.className='selected';
			window.location=target.href;
			this.setState({});
		}
		
	}
	
	render(){
		let {arr}=this.state;
		
		localStorage.setItem('info',JSON.stringify(arr));
		let str='';
		if(window.location.hash){
			str=window.location.hash.split('/')[1];
		}else{
			str='all';
		}
		let arr2=null;
		let num=0;
		switch(str){
			case 'all':
				arr2=Object.assign(arr);
				num=arr2.filter(e=>{
					return !!e.checked;
				}).length;
				break;
			case 'active':
				arr2=arr.filter(e=>{
					return !e.checked;
				});
				num=arr2.length;
				break;
			case 'completed':
				arr2=arr.filter(e=>{
					return e.checked;
				});
				num=arr2.length;
				break;
			default:console.log(arr,num)
				break;
		}
		let list=arr2.map((e,i)=>{
			let data={
				content:e.content,
				checked:e.checked,
				id:e.id,
				key:e.id,
				removeChild:this.removeChild,
				chooseChild:this.chooseChild,
				changeContent:this.changeContent
			}
			return <Items {...data} />
		})
		let footer=null;
		if(arr.length){
			let data2={
				num:num,
				chooseItem:this.chooseItem,
				clearItem:this.clearItem
			}
			footer=<FootModule {...data2}/>;
		}
		
		let onOff=false;
		if(arr2.length){
			onOff=arr2.every(e=>{
				return e.checked
			})
		}
		let allCheck=onOff;
		return(
			<section className='todoapp' onLoad={this.loading}>
				<header className="header" >
	                <h1>todos</h1>
	                <input className="new-todo" 
	                	placeholder="请输入内容" 
	                	value={this.state.val} 
	                	onChange={this.change}
	                	onKeyUp={this.addItem}
	                />
	            </header>
            	<section className="main">
	                <input className="toggle-all" type="checkbox" checked={allCheck} onChange={this.checkAll}/>
	                <ul className="todo-list">{list}</ul>
	            </section>
	            {footer}
            </section>
        )
	}
}
function getItem(){
	return JSON.parse(localStorage.getItem('info'))||[];
}
export default HeadModule;
