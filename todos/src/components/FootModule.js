import React,{Component} from 'react';

class FootModule extends Component{
	chooseItem=(ev)=>{
		this.props.chooseItem(ev.target);
	}
	clearItem=()=>{
		this.props.clearItem();
	}
	render(){
		let num=this.props.num;
		return(
			 <footer className="footer" >
		          <span className="todo-count">
		            <strong>{num}</strong>
		            <span>条已选中</span>
		          </span>
		          <ul className="filters" onClick={this.chooseItem}>
		            <li>
		              <a href="#/all" className="selected">全部</a>
		            </li>
		            <li>
		              <a href="#/active">未完成</a>
		            </li>
		            <li>
		              <a href="#/completed">已完成</a>
		            </li>
		          </ul>
		          <button className="clear-completed" onClick={this.clearItem}>
		              清除完成项
		          </button>
		    </footer>
		)
	}
}

export default FootModule;