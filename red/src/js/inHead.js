var pixelradtio=1/window.devicePixelRatio;
document.write('<meta name="viewport" content="width=device-width,initial-scale='+pixelradtio+',minimum-scale='+pixelradtio+',maximum-scale='+pixelradtio+',user-scalable=no"/>')
var html=document.documentElement;
var pageWidth=html.getBoundingClientRect().width;
html.style.fontSize=pageWidth/16+'px';