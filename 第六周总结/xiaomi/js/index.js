/*----------------ban1-------------------*/
var shopping = document.getElementById("shopping");
shopping.onmouseenter = function(){
	shopping.className = "default active";
	var a = this.lastElementChild.firstElementChild;
	var box = document.getElementById("box");
	animate(box,{height:100},10);
	animate(a,{top:30},10);
}
shopping.onmouseleave = function(){
	shopping.className = "default active";
	var a = this.lastElementChild.firstElementChild;
	var box = document.getElementById("box");
	animate(box,{height:0},10);
	animate(a,{top:0},10,function(){
		shopping.className = "default gray";			
	});
}
/*---------------ban2--------------*/
var as = document.querySelectorAll(".ban2-list"); 
var hiddens = document.querySelectorAll(".hidden");
var list = document.getElementById("list");
for(var i = 0;i<as.length;i++){
	var index;
	as[i].index = i;	
	as[i].onmouseenter = function(){
		for(var j = 0;j<as.length;j++){
			as[j].className = "ban2-list";
			hiddens[j].className = "hidden"; 
		}        											 /*写到了这里*/
		this.className = "ban2-list active";
		if(this.index<as.length-2){
			hiddens[this.index].className = "hidden show"; 
		}
		animate(hiddens[this.index],{height:212},10);
		index = this.index;
	}
	list.onmouseleave = function(){
		for(var j = 0;j<as.length;j++){
			as[j].className = "ban2-list";
			animate(hiddens[j],{height:0},10);	
		}
	}
}
var ban2Right = document.getElementById("ban2Right");
var search = document.getElementById("search");
var btn = document.getElementById("btn");
var xinxi = document.getElementById("xinxi");
var txt = search.firstElementChild;
var flag1 = true;
ban2Right.onmouseenter = function(){
	if(flag1){
		ban2Right.className = "ban2-right active";
	}
}
ban2Right.onmouseleave = function(){
	if(flag1){
			ban2Right.className = "ban2-right";
	}
}

txt.onfocus = function(){
	flag1 = false;
	var tip = this.nextElementSibling;
	tip.className = "tip hide";
	xinxi.className = "xinxi active";
	ban2Right.className = "ban2-right orange";
}
txt.onblur = function(){
	flag1 = true;
	var tip = this.nextElementSibling;
	tip.className = "tip";
	xinxi.className = "xinxi";
	ban2Right.className = "ban2-right";
}
btn.onmouseenter = function(){
	this.className = "btn active";
}
btn.onmouseleave = function(){
	this.className = "btn";
}
/*---------------pic--------------*/
var content = document.getElementById("content");
var lilist = document.getElementById("lilist");
var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");
var lunBo = document.getElementById("lunBo");
ajax({
	method:"GET",
	url:"js/handler1.json",
	isAsyc:true,
	success:function(data){
		var arr = JSON.parse(data);
		createDom(arr);
		bindDom();
	},
	error:function(mes){
		alert(mes);
	}
});
function createDom(data){
	for(var i = 0;i<data.length;i++){
		var div = document.createElement("div");
		var li = document.createElement("li");
		if(i==0){
			div.className = "lunBo-item default active";
			li.className = "active";
		}else{
			div.className = "lunBo-item";
			li.className = "";
		}
		div.innerHTML = '<a href="' + data[i].targetSrc + '">' + 
							'<img src="' + data[i].imgSrc + '" alt="" />' + 
						'</a>';
		content.appendChild(div);
		lilist.appendChild(li);
	}
}
function bindDom(){
	var lis = document.querySelectorAll("#pic .lunBo .controls #lilist li");
	var lunBoItem = document.querySelectorAll(".lunBo .lunBo-item");
	var currentIndex = 0; //当前控制切换的索引
	for(var i = 0,len=lis.length;i<len;i++){
		lis[i].index = i;
		lis[i].onmouseenter = function(){
			// this   代表当前的节点对象
			//this.index
			currentIndex = this.index;
			changeItem();
		}
	}
	var termId;  //定时器的标识  （线程标识）
	function autoPlay(){
		termId = setInterval(function(){
			currentIndex++;
			//currentIndex=currentIndex%4;
			currentIndex%=5;
			changeItem();	
		},2000)
	}
	
	
	function changeItem(){
		// this   代表当前的节点对象
		//this.index
		for(var j = 0;j<len;j++){
				lunBoItem[j].className = "lunBo-item";
				lunBoItem[j].style.opacity = "0.01";
				lunBoItem[j].style.filter = "alpha(opacity=1)";
				lis[j].className = "";
		}
		lis[currentIndex].className = "active";
		lunBoItem[currentIndex].className = "lunBo-item active";
		animate(lunBoItem[currentIndex],{opacity:100},30,function(){
			flag = true;
		});
	}

	lunBo.onmouseenter = function(){  //停止定时器
		clearInterval(termId);
	}
	lunBo.onmouseleave = function(){//开启定时器
		autoPlay();
	}
	
	autoPlay();
	var flag = true;
	btn1.onmouseenter = function(){
		this.className = "left-button btn active";	
		this.onclick = function(){
			if(flag){
				flag = false;
				currentIndex--;
				if(currentIndex<0){
					currentIndex = 4;
				}
				changeItem();
			}
		}
	}
	btn2.onmouseenter = function(){
		this.className = "right-button btn active";	
		this.onclick = function(){	
			if(flag){
				flag = false;
				currentIndex++;
				currentIndex%=5;
				changeItem();
			}
		}
	}
	btn1.onmouseleave = function(){
		this.className = "left-button btn";	
	}
	btn2.onmouseleave = function(){
		this.className = "right-button btn";	
	}
}
/*--------侧边栏------------*/
var item = document.getElementById("item");
ajax({
	method:"GET",
	url:"js/handler3.json",
	isAsyc:true,
	success:function(data){
		var arr = JSON.parse(data);
		createDom1(arr);
		bindDom1();
	},
	error:function(mes){
		alert(mes);
	}
});
function createDom1(data){
	for(var i = 0;i<data.length;i++){
		var li = document.createElement("li");	
		li.className = "li-item";	
		li.innerHTML = '<a href="#">'+data[i].shopName+'</a><i>&gt;</i>';
		item.appendChild(li);
//		div.innerHTML = '<div class="hidebox">'+
//							'<dl>'+
//								'<dt><img src="'+data[i].imgSrc+'" /></dt>'+
//								'<dd><a href="#">'+data[i].imgName+'</a><button>选购</button></dd>'+
//							'</dl>'+
//							'<dl>'+
//								'<dt><img src="'+data[i].imgSrc+'" /></dt>'+
//								'<dd><a href="#">'+data[i].imgName+'</a><button>选购</button></dd>'+
//							'</dl>'+
//							'<dl>'+
//								'<dt><img src="'+data[i].imgSrc+'" /></dt>'+
//								'<dd><a href="#">'+data[i].imgName+'</a><button>选购</button></dd>'+
//							'</dl>'+
//							'<dl>'+
//								'<dt><img src="'+data[i].imgSrc+'" /></dt>'+
//								'<dd><a href="#">'+data[i].imgName+'</a><button>选购</button></dd>'+
//							'</dl>'+
//							'<dl>'+
//								'<dt><img src="'+data[i].imgSrc+'" /></dt>'+
//								'<dd><a href="#">'+data[i].imgName+'</a><button>选购</button></dd>'+
//							'</dl>'+
//							'<dl>'+
//								'<dt><img src="'+data[i].imgSrc+'" /></dt>'+
//								'<dd><a href="#">'+data[i].imgName+'</a><button>选购</button></dd>'+
//							'</dl>'+
//						'</div>';
		var div = document.createElement("div");
		div.className = "box-item ";
		var length = data[i].imgSrc1.length;
		div.style.width = 234*Math.ceil(length/6) + "px";
		var imgName = data[i].imgName;
		function createHideBox(length,num){
			var div1 = document.createElement("div");
			div1.className = "hidebox";
			for(var j = num;j<length;j++){
				var imgsrc = data[i].imgSrc1[j].imgsrc;
				var dl = document.createElement("dl");
				dl.innerHTML = '<dt><img src="'+ imgsrc +'" /></dt>'+
							   '<dd><a href="#">'+ imgName +'</a><button>选购</button></dd>';
				div1.appendChild(dl);
				div.appendChild(div1);
			}
		}
		//var num = 0;
		if(length<=6){
			createHideBox(length,0);
		}else if(length<=12){
			createHideBox(6,0);
			createHideBox(length,6);
		}else{
			createHideBox(6,0);
			createHideBox(length,6);
			createHideBox(length,12);
		}
		item.appendChild(div);
	}
}
function bindDom1(){
	var lis = document.querySelectorAll("#item li");
	var dvs = document.querySelectorAll("#item .box-item");
	for(var i = 0;i<lis.length;i++){
		lis[i].index = i;
		lis[i].onmouseenter = function(){
			for(var i = 0;i<lis.length;i++){
				lis[i].className = "li-item"
				dvs[i].className = "box-item";
			}
			lis[this.index].className = "li-item active";
			dvs[this.index].className = "box-item active";
		}
	}
	item.onmouseleave = function(){
		for(var i = 0;i<lis.length;i++){
			lis[i].className = "li-item"
			dvs[i].className = "box-item";
		}
	}
}
/*--------左右切换------------*/
var leftb = document.getElementById("left");
var rightb = document.getElementById("right");
var starShop = document.getElementById("starShop");
var left = parseInt(getStylePropertyValue(starShop,"left"));
var titRight = leftb.parentNode;
leftb.onclick = function(){
	var left = parseInt(getStylePropertyValue(starShop,"left"));
	if(left==-1226){
		animate(starShop,{left:0},10);
		animate(rightb,{opacity:100},10);
		animate(leftb,{opacity:50},10);
		this.className = "left default";
	}
}
rightb.onclick = function(){
	if(left==0){
		animate(starShop,{left:-1226},10);
		animate(leftb,{opacity:100},10);
		animate(rightb,{opacity:50},10);
		this.className = "right";
	}
}
var term;
function start(){
	term = setInterval(function(){
		var left = parseInt(getStylePropertyValue(starShop,"left"));
		if(left==0){
			rightb.onclick();
		}
		if(left==-1226){
			leftb.onclick();
		}
	},6000);
}
start();
titRight.onmouseenter = function(){
	clearInterval(term);
}
titRight.onmouseleave = function(){
	start();		
}
leftb.onmouseenter = function(){
	var left = parseInt(getStylePropertyValue(starShop,"left"));
	if(left==-1226){
		this.className = "left active";
	}
}
leftb.onmouseleave = function(){
	this.className = "left default";
}
rightb.onmouseenter = function(){
	var left = parseInt(getStylePropertyValue(starShop,"left"));
	if(left==0){
		this.className = "right active";
	}
}
rightb.onmouseleave = function(){
	this.className = "right";
}
/*--------智能硬件------------*/
var goods = document.querySelectorAll("#yingjian .yingjian-bottom-right .goods");
var yingjianLeft = document.querySelector("#yingjian .yingjian-bottom-left");
yingjianLeft.onmouseenter = function(){
	this.className = "yingjian-bottom-left active";
	animate(this,{top:-3},50);
}
yingjianLeft.onmouseleave = function(){
	this.className = "yingjian-bottom-left";
	animate(this,{top:0},50);
}
for(var i = 0;i<goods.length;i++){
	goods[i].index = i;
	goods[i].onmouseenter = function(){
		for(var j = 0;j<goods.length;j++){
			goods[j].className = "goods";
			animate(goods[j],{top:0},50);
		}
		goods[this.index].className = "goods active";
		animate(goods[this.index],{top:-3},50);
		goods[this.index].onmouseleave = function(){
			this.className = "goods";
			animate(this,{top:0},50);
		}
	}	
}
/*--------搭配------------*/
var tabLists = document.querySelectorAll("#dapei .dapei-right .tab-list");
var dapeis = document.querySelectorAll("#dapei .dapei-bottom .dapei-bottom-right .dapei");
for(var i = 0;i<tabLists.length;i++){
	tabLists[i].index = i;
	tabLists[i].onmouseenter = function(){
		switch(this.index){
			case 0:
				change({src:"images/T1AcE_Bghv1RXrhCrK.jpg",name:"小米移动电源5000mAh",price:"149元",pCount:"9",pj:"很好用",pName:"某某某"});
			break;
			case 1:
				change({src:"images/T1..W_Bvxv1RXrhCrK.jpg",name:"小米移动电源500mAh",price:"249元",pCount:"5",pj:"好用",pName:"某某某1"});
			break;
			case 2:
				change({src:"images/T12HJvByEv1RXrhCrK.jpg",name:"小米移动电源50mAh",price:"649元",pCount:"2",pj:"一般",pName:"某某某2"});
			break;
			default:
				change({src:"images/T190DvB4dv1RXrhCrK.jpg",name:"小米移动电源5mAh",price:"999元",pCount:"0",pj:"差评",pName:"某某某3"});
		}
		for(var j = 0;j<tabLists.length;j++){
			tabLists[j].className = "tab-list";
		}
		tabLists[this.index].className = "tab-list active";
	}
}
var aas = document.querySelectorAll("#dapei .dapei-bottom .dapei-bottom-left a");
for(var i = 0;i<aas.length;i++){
	aas[i].index = i;
	aas[i].onmouseenter = function(){
		for(var j = 0;j<aas.length;j++){
			aas[j].className = "";
			animate(aas[j],{top:0},50);
		}
		aas[this.index].className = "active";
		animate(aas[this.index],{top:-3},50);
		aas[this.index].onmouseleave = function(){
			this.className = "";
			animate(this,{top:0},50);
		}
	}
}
function change(obj){
	for(var i = 0;i<dapeis.length;i++){
		dapeis[i].innerHTML = '<div class="img">'+
									'<a><img src="'+obj.src+'" /></a>'+
							  '</div>'+
								'<a class="sname">'+obj.name+'</a>'+
								'<span class="price">'+obj.price+'</span>'+
								'<p class="p">'+obj.pCount+'万人评价</p>'+
								'<div class="pj">'+
									'<p>'+obj.pj+'</p>'+
									'<p>'+obj.pName+'的评价</p>'+
								'</div>';
	}
}
for(var i = 0;i<dapeis.length;i++){
	dapeis[i].index = i;
	dapeis[i].onmouseenter = function(){
		var pjDiv = dapeis[this.index].lastElementChild;
		for(var j = 0;j<dapeis.length;j++){
			dapeis[j].className = "dapei";
			animate(dapeis[j],{top:0},20);
			//animate(pjDiv,{height:0},30);
		}
		dapeis[this.index].className = "dapei active";
		animate(dapeis[this.index],{top:-3},20);
		animate(pjDiv,{height:95},20);
		dapeis[this.index].onmouseleave = function(){
			this.className = "dapei";
			animate(this,{top:0},20);
			animate(pjDiv,{height:0},20);
		}
	}
}
/*--------内容------------*/
var contentItems = document.querySelectorAll("#content .content .content-list .content-item");
var itemLists = document.querySelectorAll("#content .content .content-list .content-item .item-list");
for(var i = 0 ;i<contentItems.length;i++){
	contentItems[i].currentNum = 0;
	contentItems[i].index = i;
	contentItems[i].onmouseenter = function(){
		var lButton = this.lastElementChild.firstElementChild;
		var rButton = this.lastElementChild.lastElementChild;
		var pages = this.lastElementChild.previousElementSibling.firstElementChild.children;
		contentItems[this.index].className = "content-item active";
		animate(contentItems[this.index],{top:-3},30);
		animate(lButton,{opacity:100},30);
		animate(rButton,{opacity:100},30);
		var index = this.index;
		var currentNum = this.currentNum;
		lButton.onclick = function(){
			contentItems[index].currentNum--;
			if(contentItems[index].currentNum<0){
				contentItems[index].currentNum = 0;
			}
			animate(itemLists[index],{left:-contentItems[index].currentNum*296},30);
			for(var i = 0;i<pages.length;i++){
				pages[i].className = "pager";
			}
			pages[contentItems[index].currentNum].className = "pager active";
		}
		rButton.onclick = function(){
			contentItems[index].currentNum++;
			if(contentItems[index].currentNum>3){
				contentItems[index].currentNum = 3;
			}
			animate(itemLists[index],{left:-contentItems[index].currentNum*296},30);
//			animate(itemLists[index],{left:-contentItem[this.index].currentNum*296},30);
			for(var i = 0;i<pages.length;i++){
				pages[i].className = "pager";
			}
			pages[contentItems[index].currentNum].className = "pager active";
		}
		contentItems[this.index].onmouseleave = function(){
			this.className = "content-item";
			animate(lButton,{opacity:0},30);
			animate(rButton,{opacity:0},30);
			animate(this,{top:0},30);
		}
	}
	
}




















/*--------尾部------------*/
