var Enemy = function(){
    this.x = 0;
    this.y = 0;
    this.width = 34;
    this.height = 24;
    this.imgURL = "images/enemy1_fly_1.png";
    this.container = null;
    this.createTime = 500;
    this.speed = 20;
};

Enemy.prototype = {
    init:function(){
        var that = this;
        setInterval(function(){
            that.create();
        },this.createTime);
    },
    create:function(){
        var x = parseInt((this.container.offsetWidth - this.width) * Math.random());
        this.enemy = document.createElement("img");
        this.enemy.style.cssText = "position:absolute; left:"+ x +"px; top:"+(0 - this.height)+"px;";
        this.enemy.src = this.imgURL;
        this.container.appendChild(this.enemy);
        var enemy = this.enemy;
        var speed = parseInt(Math.random() * 5) + 2;
        this.enemy.timer = setInterval(function(){
            enemy.style.top = enemy.offsetTop + speed + "px";
            if(enemy.offsetTop >= enemy.parentNode.offsetHeight){
                clearInterval(enemy.timer);
                enemy.parentNode.removeChild(enemy);
            }
        },this.speed);
    }
};
