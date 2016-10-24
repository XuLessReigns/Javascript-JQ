var Zoom = function(){
	this.width = 300;
	this.height = 300;
	this.scale = 4;
	this.imgURL = "2.jpg";
	this.container = null;
};
Zoom.prototype = {	
		constructor:Zoom,
		init:function(){
			this.createDom();
			this.bindEvents();
		},
		createDom:function(){
		//创建中图区域
		this.imgDiv = document.createElement("div");
		this.imgDiv.style.cssText = "width:"+this.width+"px;height:"+this.height+"px;border:1px solid #ccc;position:relative;";
		this.container.appendChild(this.imgDiv);
		
		//创建中图
		this.img = document.createElement("img");
		this.img.style.cssText = "width:"+this.width+"px;height:"+this.height+"px;position:absolute;";
		this.img.src = this.imgURL;
		this.imgDiv.appendChild(this.img);

		//创建tool
		this.tool = document.createElement("div");
		this.tool.style.cssText = "width:"+(this.width /this.scale)
			+"px;height:"+(this.height /this.scale )+"px;display:none;overflow:hidden;background:#fff;opacity:.7;filter:alpha(opacity=70);position:relative;";
		this.imgDiv.appendChild(this.tool);
		
		//创建tool中的图片
		this.smallImg = document.createElement("img");
		this.smallImg.style.cssText = "width:"+this.width+"px;height:"+this.height+"px;position:absolute;";
		this.smallImg.src = this.imgURL;
		this.tool.appendChild(this.smallImg);

		//创建大图盒子
		this.bigDiv = document.createElement("div");
		this.bigDiv.style.cssText = "width:"+this.width+"px;display:none;height:"+this.height+"px;border:1px solid #ccc;position:absolute;overflow:hidden;left:"+(this.imgDiv.offsetLeft + this.width + 10)+"px;top:"+this.imgDiv.offsetTop+"px;";
		this.container.appendChild(this.bigDiv);

		//创建大图
		this.bigImg = document.createElement("img");
		this.bigImg.style.cssText = "width:"+(this.width * this.scale)+"px;height:"+(this.height * this.scale)+"px;border:1px solid #ccc;position:absolute;";
		this.bigImg.src = this.imgURL;
		this.bigDiv.appendChild(this.bigImg);
	},
	bindEvents:function(){
		var that = this;//这个this是指zoom对象
		this.imgDiv.onmouseenter = function(){
			//在函数里的this指的是中图盒子
			that.tool.style.display = "block";
			that.bigDiv.style.display = "block";
			that.img.style.webkitFilter = "blur(5px)";
			/*
			this.onmousemove = function(e){
				var e = window.event||e;
				var x = e.clientX - that.imgDiv.offsetLeft - that.tool.offsetWidth/2;
				var y = e.clientY - that.imgDiv.offsetTop - that.tool.offsetHeight/2;
				that.tool.style.left = Math.max(Math.min(x,that.imgDiv.offsetWidth-that.tool.offsetWidth),0) + "px";
				that.tool.style.top = Math.max(Math.min(y,that.imgDiv.offsetHeight-that.tool.offsetHeight),0) + "px";
				that.bigImg.style.left = -that.tool.offsetLeft*that.scale + "px";
				that.bigImg.style.top = -that.tool.offsetTop*that.scale + "px";
			}
			*/
		}
		this.imgDiv.onmouseleave = function(){
			that.tool.style.display = "none";
			that.bigDiv.style.display = "none";
			that.img.style.webkitFilter = "blur(0px)";
		}
		this.imgDiv.onmousemove = function(e){
			var e = window.event||e;
			var x = e.clientX - that.imgDiv.offsetLeft - that.tool.offsetWidth/2;
			var y = e.clientY - that.imgDiv.offsetTop - that.tool.offsetHeight/2;
			that.tool.style.left = Math.max(Math.min(x,that.imgDiv.offsetWidth-that.tool.offsetWidth),0) + "px";
			that.tool.style.top = Math.max(Math.min(y,that.imgDiv.offsetHeight-that.tool.offsetHeight),0) + "px";
			that.bigImg.style.left = -that.tool.offsetLeft*that.scale + "px";
			that.bigImg.style.top = -that.tool.offsetTop*that.scale + "px";
			that.smallImg.style.left = -that.tool.offsetLeft + "px";
			that.smallImg.style.top = -that.tool.offsetTop + "px";
		}

	}
};