import React,{Component} from 'react';
import Ulli from './Ulli';
export default class UlTime extends Component{
	constructor(){
		super();
		this.state={
			h:0,
			hstart:0,
			arr:[]
		}
	}
	componentDidMount(){
		let {arr}=this.state;
		let r=this.props.arr
		let times=(new Date(r[0],r[1],0)).getDate();
		switch (this.props.type){
			case 'year':
				arr[0]=this.props.e-2>0?this.props.e-2:'';
				arr[1]=this.props.e-1>0?this.props.e-1:'';
				arr[3]=this.props.e+1;
				arr[4]=this.props.e+2;
				break;
			case 'month':
				arr[0]=this.props.e-2>0?this.props.e-2:'';
				arr[1]=this.props.e-1>0?this.props.e-1:'';
				arr[3]=this.props.e+1<13?this.props.e+1:'';
				arr[4]=this.props.e+2<13?this.props.e+2:'';
				break;
			case 'date':
				arr[0]=this.props.e-2>0?this.props.e-2:'';
				arr[1]=this.props.e-1>0?this.props.e-1:'';
				arr[3]=this.props.e+1<=times?this.props.e+1:'';
				arr[4]=this.props.e+2<=times?this.props.e+2:'';
				break;
			case 'hour':
				arr[0]=this.props.e-2>=0?this.props.e-2:'';
				arr[1]=this.props.e-1>=0?this.props.e-1:'';
				arr[3]=this.props.e+1<24?this.props.e+1:'';
				arr[4]=this.props.e+2<24?this.props.e+2:'';
				break;
			case 'minute':
			case 'second':
				arr[0]=this.props.e-2>=0?this.props.e-2:'';
				arr[1]=this.props.e-1>=0?this.props.e-1:'';
				arr[3]=this.props.e+1<60?this.props.e+1:'';
				arr[4]=this.props.e+2<60?this.props.e+2:'';
			break;
			default:
				break;
		}
		this.setState({
			arr:[arr[0],arr[1],this.props.e,arr[3],arr[4]]
		})
	}
	moveStart=(ev)=>{
		this.setState({
			hstart:ev.changedTouches[0].pageY
		})
	}
	moving=(ev)=>{
		//上下拖动改变
		let {h,hstart,arr}=this.state;
		h=ev.changedTouches[0].pageY-hstart;
		let rootFont=parseFloat(document.documentElement.style.fontSize);
		h=h/rootFont;
		let li=this.ul.children[0];
		let liH=li.offsetHeight/rootFont;
		//向下
		if(h>liH/2){
			console.log(1)
			let insert=0;
			switch (this.props.type){
				case 'year':
				case 'month':
				case 'date':
					insert=arr[0]-1>0?arr[0]-1:'';
				break;
				case 'hour':
				case 'minute':
				case 'second':
					insert=arr[0]-1>=0?arr[0]-1:'';
				break;
				default:
					break;
			}
			//判断是否是第一个，来确定是否可以继续下移
			if(arr[1]!==''){
				hstart=hstart+liH*rootFont;
				arr.unshift(insert);
				arr.pop(arr[arr.length-1])
			}else{
				hstart=ev.changedTouches[0].pageY;
			}
			
		}
		
		//向上
		let r=this.props.arr
		let times=(new Date(r[0],r[1],0)).getDate();
		if(h<-liH/2){
			let insert='';
			switch (this.props.type){
				case 'year':
					insert=arr[arr.length-1]+1;
					break;
				case 'month':
					if(arr[arr.length-1]){
						insert=arr[arr.length-1]+1>12?'':arr[arr.length-1]+1;
					}
					break;
				case 'date':
					if(arr[arr.length-1]){
						insert=arr[arr.length-1]+1>times?'':arr[arr.length-1]+1;
					}
					break;
				case 'hour':
					if(arr[arr.length-1]){
						insert=arr[arr.length-1]+1>23?'':arr[arr.length-1]+1;
					}
					break;
				case 'minute':
				case 'second':
					if(arr[arr.length-1]){
						insert=arr[arr.length-1]+1>59?'':arr[arr.length-1]+1;
					}
					break;
				default:
					break;
			}
			//判断是否是最后一个，来确定是否可以继续上移
			if(arr[3]!==''){
				hstart=hstart-liH*rootFont;
				arr.push(insert);
				arr.shift(arr[0]);
			}else{
				hstart=ev.changedTouches[0].pageY;
			}
			
		}
		this.setState({
			arr:arr,
			h:h,
			hstart:hstart
		})
	}
	moveEnd=(ev)=>{
		//根据抬起的位置来判断向上还是向下
		let {h,hstart,arr}=this.state;
		h=ev.changedTouches[0].pageY-hstart;
		let rootFont=parseFloat(document.documentElement.style.fontSize);
		h=h/rootFont;
		let li=this.ul.children[0];
		let liH=li.offsetHeight/rootFont;
		if(h>liH/2){
			h=liH
		}else if(h<-liH/2){
			h=-liH
		}else{
			h=0;
		}
		
		this.props.addOne(this.props.type,arr[2])
		//去调用this.props.设置事件的方法，将arr[2]返回给父组件
		this.setState({
			h:h,
		})
	}
	
	render(){
		let {arr}=this.state;
		let cont=arr.map((e,i)=>{
			return <Ulli  key={i} e={e}/>
		})
		return(
			<div className="ulWrap">
				<ul onTouchMove={this.moving} onTouchStart={this.moveStart} onTouchEnd={this.moveEnd} style={{transform:"translateY("+this.state.h+'rem)'}} ref={ele=>this.ul=ele}>
					{cont}
				</ul>
			</div>
		)
	}
}