import React from 'react';
class Items extends React.Component{
	constructor(){
		super();
		this.state={
			db:false
		}
	}
	click=(ev)=>{
		if(ev.target.className==='toggle'){
			this.props.chooseChild(this.props.id);
		}
		if(ev.target.tagName.toLowerCase()==='button'){
			this.props.removeChild(this.props.id);
		}
	}
	edit=(ev)=>{
		if(ev.target.tagName.toLowerCase()==='label'){
			this.setState({
				db:true
			},()=>{
				this.db.focus()
				this.db.value=this.props.content;
			})
		}
	}
	blurs=(ev)=>{
		this.setState({
			db:false
		})
		this.props.changeContent(this.props.id,this.db.value);
		if(this.db.value===''){
			this.props.removeChild(this.props.id);
		}
	}
	keyUp=(ev)=>{
		if(ev.keyCode===13){
			this.blurs()
		}else if(ev.keyCode===27){
			this.db.value=this.props.content;
			this.db.blur()
		}
	}
	render(){
		let {db}=this.state;
		let sClass=db?'editing':(this.props.checked?'completed':'')
		return(
            <li className={sClass} onClick={this.click} onDoubleClick={this.edit}>
                <div className="view">
                    <input className="toggle" type="checkbox" checked={this.props.checked}/>
                    <label>{this.props.content}</label>
                    <button className="destroy"></button>
                </div>
                 <input className="edit" onBlur={this.blurs} ref={(ele)=>{this.db=ele}} onKeyUp={this.keyUp}/>
            </li>
		)
	}
}
export default Items;