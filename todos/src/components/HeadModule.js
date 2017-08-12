import React,{Component} from 'react';
import Items from './Items';
import '../css/style.css';
class HeadModule extends Component{
	constructor(){
		super();
		this.state={
			val:'',
			arr:[]
		}
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
	render(){
		let {arr}=this.state;
		let list=arr.map((e,i)=>{
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
		let onOff=false;
		if(arr.length){
			onOff=arr.every(e=>{
				return e.checked
			})
		}
		let allCheck=onOff;
		return(
			<section className='todoapp'>
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
            </section>
		)
	}
}

export default HeadModule;
