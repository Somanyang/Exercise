import React from 'react';
class Items extends React.Component{
	constructor(){
		super();
		this.state={
			classname:''
		}
	}
	click=(ev)=>{
		if(ev.target.tagName.toLowerCase()==='input'){
			this.props.chooseChild(this.props.id);
			if(this.props.checked){
				this.setState({
					classname:''
				})
			}else{
				this.setState({
					classname:'completed'
				})
			}
		}
		if(ev.target.tagName.toLowerCase()==='button'){
			this.props.removeChild(this.props.id)
		}
	}
	render(){
		return(
            <li className={this.state.classname} onClick={this.click}>
                <div className="view">
                    <input className="toggle" type="checkbox" checked={this.props.checked}/>
                    <label>{this.props.content}</label>
                    <button className="destroy"></button>
                </div>
            </li>
		)
	}
}
export default Items;