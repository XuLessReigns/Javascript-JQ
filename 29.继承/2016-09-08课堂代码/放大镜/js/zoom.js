var Zoom = function(){
    this.width = 300;
    this.height = 300;
    this.scale = 4;
    this.imgURL = "img/1.jpg";
    this.container = null;
};

//徐崇耀   微信：xcy9243139
//利用对象动态创建属性向原型中添加方法
// Zoom.prototype.createDOM
// Zoom.prototype.bindEvents

//利用字面量创建对象方式重写原型属性

Zoom.prototype = {
    constructor:Zoom,
    init:function(){
        //23种设计模式中的一种（外观模式）
        this.createDOM();
        this.bindEvents();
    },
    createDOM:function(){
        //创建中图的DIV
        this.imgDiv = document.createElement("div");
        this.imgDiv.style.cssText = "width:"+this.width+"px; height:"+this.height+"px; position:relative;";
        this.container.appendChild(this.imgDiv);

        //创建中图
        this.img = document.createElement("img");
        this.img.src = this.imgURL;
        this.img.style.cssText = "width:"+this.width+"px; height:"+this.height+"px;";
        this.imgDiv.appendChild(this.img);

        //创建放大滤镜
        this.lay = document.createElement("div");
        this.lay.style.cssText = "width:"+(this.width / this.scale)+"px; height:"+(this.height / this.scale)+"px; position:absolute; left:0; top:0; display:none; overflow:hidden; box-shadow:0 0 10px #333;";
        this.imgDiv.appendChild(this.lay);

        //创建滤镜层中的图片
        this.layImg = document.createElement("img");
        this.layImg.src = this.imgURL;
        this.layImg.style.cssText = "width:"+this.width+"px; height:"+this.height+"px;";
        this.lay.appendChild(this.layImg);

        //创建放大区域
        this.zoomDiv = document.createElement("div");
        this.zoomDiv.style.cssText = "width:"+this.width+"px; height:"+this.height+"px; position:absolute; left:"+(this.imgDiv.offsetLeft + this.width + 10)+"px; top:"+this.imgDiv.offsetTop+"px; overflow:hidden; display:none;";
        this.container.appendChild(this.zoomDiv);

        //创建放大图片
        this.zoomImg = document.createElement("img");
        this.zoomImg.src = this.imgURL;
        this.zoomImg.style.cssText = "width:"+(this.width * this.scale)+"px; height:"+(this.height * this.scale)+"px;";
        this.zoomDiv.appendChild(this.zoomImg);
    },
    bindEvents:function(){
        var that = this;
        this.imgDiv.onmouseover = function(){
            that.hover(true);
            this.onmousemove = function(e){
                e = e || event;
                var x =  e.clientX - that.imgDiv.offsetLeft - that.lay.offsetWidth / 2;
                var y = e.clientY - that.imgDiv.offsetTop - that.lay.offsetHeight / 2;
                that.lay.style.left = Math.max(Math.min(x,that.width - that.lay.offsetWidth),0) + "px";
                that.lay.style.top = Math.max(Math.min(y,that.height - that.lay.offsetHeight),0) + "px";
                that.move();
            };
        };
        this.imgDiv.onmouseout = function(){
            that.hover(false);
        };
    },
    hover:function(type){
        this.lay.style.display = type === true ? "block" : "none";
        this.zoomDiv.style.display = type === true ? "block" : "none";
        this.img.style.webkitFilter = type === true ? "blur(5px)" : "blur(0px)";
    },
    move:function(){
        this.zoomImg.style.marginLeft = this.lay.offsetLeft * this.scale * -1 + "px";
        this.zoomImg.style.marginTop = this.lay.offsetTop * this.scale * -1 + "px";
        this.layImg.style.marginLeft = this.lay.offsetLeft * -1 + "px";
        this.layImg.style.marginTop = this.lay.offsetTop * -1 + "px";
    }
};
