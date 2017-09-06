import React ,{Component} from 'react';
export default class NewLi extends Component{
	constructor(){
		super();
		this.state={
			inner:''
		}
	}
	setItem=(ev)=>{
		if(ev.target.tagName==='INPUT'){
			this.setState({
				inner:ev.target.value
			})
			this.props.setitem(this.props.id,ev.target.value)
		}
	}
	render(){
		return(
			<li className="newItem"><input value={this.state.inner} onChange={this.setItem}/></li>
		)
	}
}