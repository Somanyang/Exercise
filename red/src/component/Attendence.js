import React,{Component} from 'react';
import Header from './header';
import {Map, Marker, NavigationControl,MapTypeControl,ScaleControl} from 'react-bmap';
import $ from "jquery";
class Attendence extends Component{
	constructor(){
		super();
		this.state={
			posX:40,//记录纬度
			posY:116.3,//记录经度
			address:'',//记录位置
			time1:(new Date()).getHours()+':'+(new Date()).getMinutes()+':'+(new Date()).getSeconds(),//获取事件
			onOff:false,//是否可以获取位置
//			checkInfo:[],
			data:JSON.parse(localStorage.getItem('Data')),//获取存储的数据
			check:''//记录签到或者签退  in->签到，out->签退
		}
	}
	componentDidMount(){
		//获取定位信息
		if (navigator.geolocation){
		    navigator.geolocation.watchPosition(this.showPosition,this.errorPosition);
		}else{
			this.infos.innerHTML=<span>不支持地理定位</span>
		}
		let that=this;
		let {posX,posY,address,check,data}=this.state;
		let today=(new Date()).getMonth()+'/'+(new Date()).getDate();
		if(!data.attendence||!data.attendence[today]){
			check='in';
		}else{
			check='out';
		}
		//初始位置请求，根据GPS获取定位信息来确定位置
		$.ajax({
			type:"get",
			url:`http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=${posX},${posY}&output=json&pois=1&ak=phU7p3IR1fedWgIZOQVSv3NTwZWlhek8`,
			async:true,
			dataType:'jsonp',
			success:function(data){
				address=data.result.formatted_address;
				that.setState({
					address:address,
					check:check
				})
			}
		});	
	}
	//获取位置成功
	showPosition=(position)=>{
		this.setState({
			posX:position.coords.latitude,
			posY:position.coords.longitude,
			onOff:true
		})
	}
	//获取位置失败
	errorPosition=()=>{
		this.setState({
			onOff:false
		})
	}
	//拖动调整定位信息
	getPosition=(ev)=>{
		let {posX,posY,address,time1}=this.state;
		let that=this;
		//根据位置抬起的位置来请求地点名称
		$.ajax({
			type:"get",
			url:`http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=${posX},${posY}&output=json&pois=1&ak=phU7p3IR1fedWgIZOQVSv3NTwZWlhek8`,
			async:true,
			dataType:'jsonp',
			success:function(data){
				address=data.result.formatted_address;
				let time=new Date();
				time1=time.getHours()+':'+time.getMinutes()+':'+time.getSeconds();
//				if(check==='in'){
//					checkInfo[0]={address:address,time1:time1};
//				}else{
//					checkInfo[1]={address:address,time1:time1};
//				}
				that.setState({
					posX:ev.point.lat,
					posY:ev.point.lng,
					address:address,
					time1:time1,
//					checkInfo:checkInfo,
					onOff:true
				})
			}
		});	
	}
	//签到签退点击
	checking=()=>{
		let {check,address,time1,data}=this.state;
		let today=(new Date()).getMonth()+'/'+(new Date()).getDate();
		let attendence=data.attendence;
		//如果今天已经签到签退则返回
		if(attendence[today]&&attendence[today].length===2)return;
		//根据属否存在数据及数组长度来确定信息，0->签到信息，1->签退信息
		if(check==='in'&&!attendence[today]){
			attendence[today]=[];
			attendence[today].push({time:time1,add:address})
		}else if(check==='out'&&attendence[today].length===1){
			attendence[today].push({time:time1,add:address})
		}
		check=check==='in'?'out':'in';
		//本地存储记录签到的信息
		localStorage.setItem('Data',JSON.stringify(data));
		this.setState({
			check:check,
			data:data
		})
		
	}
	render(){
		let header=null;
		let posInfo=null;
		let dataH={
			pathL:'/index',
			pathR:'',
			nameL:'back',
			nameR:'',
			title:<h4>考勤</h4>,
			classname:'whiteBg'
		}
		header=<Header {...dataH}/>;
		let {posX,posY,onOff,address,time1,check,data}=this.state;
		//根据判断来决定第一行显示的文字
		if(onOff){
			posInfo=<span>定位成功</span>
		}else{
			posInfo=<div><span>定位失败</span><i>请检查GPS设置</i></div>
		}
		//根据类型来判断第二行和第三行的显示信息
		let type='';
		let checkIn=null;
		let checkOut=null;
		let checkOver=null;
		if(check==='out'){
			type='签     退';
		}else{
			type='签     到';
		}
		let attendence=data.attendence;
		let today=(new Date()).getMonth()+'/'+(new Date()).getDate();
		let arr=[];
		if(attendence[today]){
			arr=attendence[today]
		};
		if(arr){
			switch (arr.length){
				case 2:
					checkOut=<li><span>{arr[1].add}</span><i>{arr[1].time}</i></li>
					checkOver=<li className="last"><i>今日考勤完毕</i></li>
				case 1:
					checkIn=<li><span>{arr[0].add}</span><i>{arr[0].time}</i></li>
					break;
				default:
					break;
			}
		}
		return(
			<div id="outerWrap">
				{header}
				<div id="contWrap" className="chartWrap">
					<div id="content">
						<Map id="map" center={{lng:posY,lat:posX}} zoom={16} >
							<Marker position={{lng:posY,lat:posX}} enableDragging={true} events={{dragend:this.getPosition}}/>
							<NavigationControl />
							<MapTypeControl />
							<ScaleControl />
						</Map>
						<ul className="attendInfo">
							<li ref={(ele)=>this.infos=ele}>{posInfo}</li>
							<li><i>当前信息</i><span>{address}</span><i>{time1}</i></li>
							{checkIn}
							{checkOut}
							{checkOver}
						</ul>
						<span className={check} onTouchEnd={this.checking}>{type}</span>
					</div>
				</div>
			</div>
		)
	}
}
export default Attendence;