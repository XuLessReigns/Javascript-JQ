
var MyPlane = function(){
    this.x = 0;
    this.y = 0;
    this.width = 66;
    this.height = 80;
    this.bullHeight = 14;
    this.imgURL = "images/my.gif";
    this.bullImgURL = "images/bullet1.png";
    this.container = null;
    this.bullCreateTime = 500;
    this.bullSpeed = 20;
    this.arrBull = [];
};

MyPlane.prototype = {
    init:function(){
        this.addRemove();
        this.create();
        this.events();
        var that = this;
        setInterval(function(){
            that.createBull();
        },this.bullCreateTime);
    },
    create:function(){
        this.plane = document.createElement("img");
        this.plane.style.cssText = "position:absolute; left:"+this.x+"px; top:"+this.y+"px;";
        this.plane.src = this.imgURL;
        this.container.appendChild(this.plane);
    },
    events:function(){
        var that = this;
        this.container.onmousemove = function(e){
            e = e || event;
            var x = e.clientX - this.offsetLeft - that.width / 2;
            var y = e.clientY - this.offsetTop - that.height / 2;
            that.plane.style.left = Math.max(Math.min(x,this.offsetWidth - that.width),0) + "px";
            that.plane.style.top = Math.max(Math.min(y,this.offsetHeight - that.height),0) + "px";
        };
    },
    createBull:function(){
        this.bull = document.createElement("img");
        this.bull.style.cssText = "position:absolute; left:"+(this.plane.offsetLeft + this.width / 2 - 2)+"px; top:"+(this.plane.offsetTop - 14)+"px;";
        this.bull.src = this.bullImgURL;
        this.container.appendChild(this.bull);
        var bull = this.bull;
        var that = this;
        this.arrBull.push(bull);
        this.bull.timer = setInterval(function(){
            bull.style.top = bull.offsetTop - 3 + "px";
            if(bull.offsetTop <= 0 - that.bullHeight){
                clearInterval(bull.timer);
                bull.parentNode.removeChild(bull);
                that.arrBull.removeDOM(bull);
            }
        },this.bullSpeed);
    },
    addRemove:function(){
        //数组删除方法
        Array.prototype.removeDOM = function(element){
            for(var i = 0; i < this.length; i++){
                if(this[i] == element){
                    this.splice(i,1);
                }
            }
        };
    }
};
