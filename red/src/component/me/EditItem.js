import React,{Component} from 'react';
export default class EditItem extends Component{
	constructor(){
		super();
		this.state={
			display:'none',
			txt:''
		}
	}
	componentDidMount(){
		this.setState({
			txt:this.props.s
		})
	}
	changeTxt=(ev)=>{
		this.setState({
			txt:ev.target.value
		})
	}
	editInfo=()=>{
		this.setState({
			display:'block'
		},()=>{
			this.input.focus()
		})
		
	}
	blur=()=>{
		setTimeout(()=>{
			this.setState({
				display:'none',
				txt:''
			})
		})
		
	}
	saveEdit=()=>{
		let txt=this.props.s;
		if(this.state.txt){
			txt=this.state.txt;
		}
		this.props.setEdit(this.props.id,txt);
		this.setState({
			display:'none',
			txt:''
		})
		
	}
	render(){
		return(
			<li>
				<span>{this.props.e}</span>
				<em onClick={this.editInfo}>{this.props.s}</em>
				<div style={{display:this.state.display}}>
					<input type="text" onChange={this.changeTxt} value={this.state.txt} ref={ele=>this.input=ele} onBlur={this.blur}/>
					<i onClick={this.saveEdit}>√</i>
				</div>
			</li>
		)
	}
}