/*
 	思路：
 		第一步：获取所要操作的节点对象
 		第二步：为小盒子添加鼠标事件 当鼠标移到小盒子上，工具和大盒子显示
 		第三步：鼠标移动，工具跟着走，然后大盒子的图片跟着移动
 * */

var smallBox = document.getElementById("small");
var tool = document.getElementById("tool");
var bigBox = document.getElementById("big");
var bigImg = document.querySelectorAll(".bigBox img");
var simgs = document.querySelectorAll(".small-box img");
var tabs = document.querySelectorAll(".tab img");
var lis = document.querySelectorAll(".tab #list li");
var a = 0;
for(var i=0;i<tabs.length;i++){
			tabs[i].index = i;
			tabs[i].onclick = function(){
				for(var j=0;j<tabs.length;j++){
					tabs[j].className = "";		
					simgs[j].className = "item";
					bigImg[j].className = "item";
					lis[j].className = "";
				}
				lis[this.index].className = "active";
				this.className = "active";
				simgs[this.index].className = "item active";
				bigImg[this.index].className = "item active";
				a = this.index;
			}
		}
				
smallBox.onmouseenter = function(){
	tool.className = "tool active";
	bigBox.className = "bigBox ative";
	
}
smallBox.onmouseleave = function(){
	tool.className = "tool";
	bigBox.className = "bigBox";
}
smallBox.onmousemove = function(e){
	var _e = window.event||e;
	var x = _e.clientX - smallBox.offsetLeft-tool.offsetWidth/2;
	var y = _e.clientY - smallBox.offsetTop-tool.offsetHeight/2;
	if(x<0){
		x=0;
	}
	if(x>smallBox.offsetWidth-tool.offsetWidth){
		x=smallBox.offsetWidth-tool.offsetWidth;
	}
	if(y<0){
		y=0;
	}
	if(y>smallBox.offsetHeight - tool.offsetHeight){
		y=smallBox.offsetHeight - tool.offsetHeight;
	}
	tool.style.left = x + "px";
	tool.style.top = y + "px";
	var left = tool.offsetLeft*4;
	var top = tool.offsetTop*4;
	bigImg[a].style.left = -left + "px";
	bigImg[a].style.top = -top + "px";
}
//为两侧的按钮添加点击事件
var zgt = document.getElementById("zgt");
var ygt = document.getElementById("ygt");
var tab = document.getElementById("tab");
var list = document.getElementById("list");
var step = -40;
zgt.onclick = function(){
	
	if(step==-40){
		list.style.left = -40 + "px";
	}else{
		step = step + 35;
		list.style.left = step + "px";
	}
}
ygt.onclick = function(){
	
	if(step==-285){
		list.style.left = -285 + "px";
	}else{
		step = step - 35;
		list.style.left = step + "px";
	}
		
}
