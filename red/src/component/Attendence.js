import React,{Component} from 'react';
import Header from './header';
import {Map, Marker, NavigationControl,Geocoder, InfoWindow,Circle,MapTypeControl,ScaleControl} from 'react-bmap';
import $ from "jquery";
class Attendence extends Component{
	constructor(){
		super();
		this.state={
			posX:40,
			posY:116.3,
			address:'',
			time1:(new Date()).getHours()+':'+(new Date()).getMinutes()+':'+(new Date()).getSeconds(),
			onOff:false,
			checkIn:null,
			checkOut:null,
			checkInfo:[,],
			check:'in'
		}
	}
	componentDidMount(){
		//获取定位信息
		if (navigator.geolocation){
		    navigator.geolocation.getCurrentPosition(this.showPosition,this.errorPosition);
		}else{
			this.infos.innerHTML=<span>不支持地理定位</span>
		}
		let that=this;
		let {posX,posY,address}=this.state;
		$.ajax({
			type:"get",
			url:`http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=${posX},${posY}&output=json&pois=1&ak=phU7p3IR1fedWgIZOQVSv3NTwZWlhek8`,
			async:true,
			dataType:'jsonp',
			success:function(data){
				console.log(data.result.formatted_address)
				address=data.result.formatted_address;
				that.setState({
					address:address
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
	getPosition=(ev)=>{
		let {posX,posY,address,time1}=this.state;
		let that=this;
		$.ajax({
			type:"get",
			url:`http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=${posX},${posY}&output=json&pois=1&ak=phU7p3IR1fedWgIZOQVSv3NTwZWlhek8`,
			async:true,
			dataType:'jsonp',
			success:function(data){
				address=data.result.formatted_address;
				let time=new Date();
				time1=time.getHours()+':'+time.getMinutes()+':'+time.getSeconds();
				that.setState({
					posX:ev.point.lat,
					posY:ev.point.lng,
					address:address,
					time1:time1,
					onOff:true
				})
			}
		});	
	}
	checking=()=>{
		let {check,address,time1,arr}=this.state;
		check=check==='in'?'out':'in';
		if(check==='out'){
			this.setState({
				check:check,
				checkOut:<li><span>{address}</span><i>{time1}</i></li>
			})
			
		}else{
			this.setState({
				check:check,
				checkIn:<li><span>{address}</span><i>{time1}</i></li>
			})
			
		}
		
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
		let {posX,posY,onOff,address,time1,check,checkIn,checkOut}=this.state;
		if(onOff){
			posInfo=<span>定位成功</span>
		}else{
			posInfo=<div><span>定位失败</span><i>请检查GPS设置</i></div>
		}
		let type='';
		if(check==='out'){
			type='签     退';
			checkOut=<li><span>{address}</span><i>{time1}</i></li>
		}else{
			type='签     到';
			checkIn=<li><span>{address}</span><i>{time1}</i></li>
		}
		
		return(
			<div id="outerWrap">
				{header}
				<div id="contWrap" className="chartWrap">
					<div id="content">
						<Map id="map" center={{lng:posY,lat:posX}} zoom={16}>
							<Marker position={{lng:posY,lat:posX}} enableDragging={true} events={{dragend:this.getPosition}}/>
							<NavigationControl />
							<MapTypeControl />
							<ScaleControl />
						</Map>
						<ul className="attendInfo">
							<li ref={(ele)=>this.infos=ele}>{posInfo}</li>
							{checkIn}
							{checkOut}
						</ul>
						<span className={check} onTouchEnd={this.checking}>{type}</span>
					</div>
				</div>
			</div>
		)
	}
}
export default Attendence;