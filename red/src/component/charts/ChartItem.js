import React,{Component} from 'react';
import Echarts from 'echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import $ from "jquery";
export default class ChartItem extends Component{
	constructor(){
		super();
		this.state={
			fold:false,
			datas:JSON.parse(localStorage.getItem('Data')).statistics
		}
	}
	chartDetail=()=>{
		let {fold}=this.state
		this.setState({
			fold:!fold
		})
	}
	render(){
		let {fold,datas}=this.state;
		let display='none';
		let folds='unfold';
		let color=this.props.color;
		if(fold){
			display='block';
			folds='fold';
			let ele=this.container
			let myEcharts=Echarts.init(ele);
			let now=new Date();
			let month=now.getMonth()+1;
			let today=now.getDate();
			let year=now.getFullYear();
			let arrDate=[];
			for(let i=0;i<7;i++){
				let now=new Date(year,month-1,(today-i-1));
				let mon=now.getMonth()+1;
				let day=now.getDate();
				
				arrDate.unshift(mon+'/'+day)
			}
			let data=datas[this.props.data.detail[0][1]].slice(today-1,today+6);
			// 绘制图表
			myEcharts.setOption({
				
			    xAxis: {
			        data:arrDate,
			        axisLabel:{
			        	textStyle:{
			        		fontSize:20
			        	}
			        }
			    },
			    yAxis: {
			    	axisLabel:{
			        	textStyle:{
			        		fontSize:20
			        	}
			        }
			    },
			    series: [{
			        name: this.props.data.detail[0][1],
			        type: 'bar',
			        data: data,
			        itemStyle:{
			        	normal:{
			        		color:color
			        	}
			        },
			        barWidth:15,
			        label:{
			        	normal:{
			        		show:true,
			        		position:'top',
			        		textStyle:{
				        		fontSize:20
				        	}
			        	}
			        }
			    }]
			});
			
			
		}else{
			folds='unfold';
			display='none';
		}
		return(
			<li>
				<h4><i style={{color:this.props.color}}>丨</i>{this.props.data.title}</h4>
				<div className="details clear-fix">
					<dl>
						<dt style={{color:this.props.color}}>{this.props.data.detail[1][0]}</dt>
						<dd>{this.props.data.detail[0][0]}</dd>
					</dl>
					<dl>
						<dt style={{color:this.props.color}}>{this.props.data.detail[1][1]}</dt>
						<dd>{this.props.data.detail[0][1]}</dd>
					</dl>
					<dl>
						<dt style={{color:this.props.color}}>{this.props.data.detail[1][2]}</dt>
						<dd>{this.props.data.detail[0][2]}</dd>
					</dl>
				</div>
				<div className="eChart">
					<span onClick={this.chartDetail} className={folds}></span>
					<div className="chartDetail" style={{display:display,height:'7.04rem',width:'15.14rem'}} ref={(ele)=>(this.container=ele)}></div>
				</div>
			</li>
		)
	}
}