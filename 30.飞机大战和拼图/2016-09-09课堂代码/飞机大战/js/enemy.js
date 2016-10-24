var Enemy = function(){
    this.x = 0;
    this.y = 0;
    this.width = 34;
    this.height = 24;
    this.imgURL = "images/enemy1_fly_1.png";
    this.boom = "images/enemy1_fly_3.gif";
    this.container = null;
    this.createTime = 500;
    this.speed = 20;
    this.bullList = [];
    this.boomTime = 400;
    this.counter = 0;
    this.endCounter = 1;
    // this.plane = null;
};

Enemy.prototype = {
    init:function(){
        // this.plane.addRemove();
        var that = this;
        var count = 0;
        setInterval(function(){
            count++;
            if(count == 15){
                count = 0;
                that.create();
            }
        },this.createTime);
    },
    create:function(){
        var x = parseInt((this.container.offsetWidth - this.width) * Math.random());
        this.enemy = document.createElement("img");
        this.enemy.style.cssText = "position:absolute; left:"+ x +"px; top:"+(0 - this.height)+"px;";
        this.enemy.src = this.imgURL;
        this.enemy.isImpact = true;
        this.container.appendChild(this.enemy);
        var enemy = this.enemy;
        var speed = parseInt(Math.random() * 5) + 2;
        var that = this;
        this.enemy.timer = setInterval(function(){
            enemy.style.top = enemy.offsetTop + speed + "px";
            if(enemy.offsetTop >= enemy.parentNode.offsetHeight){
                clearInterval(enemy.timer);
                enemy.parentNode.removeChild(enemy);
            }
            that.impact(enemy);
        },this.speed);
    },
    impact:function(enemy){
        for(var i = 0; i < this.bullList.length; i++){
            var bull = this.bullList[i];
            if(bull.offsetLeft + bull.offsetWidth > enemy.offsetLeft && bull.offsetLeft < enemy.offsetLeft + enemy.offsetWidth){
                if(bull.offsetTop + bull.offsetHeight > enemy.offsetTop && bull.offsetTop < enemy.offsetTop + enemy.offsetHeight){
                    //子弹与敌机发生碰撞了
                    clearInterval(bull.timer);
                    this.bullList.removeDOM(bull);
                    bull.parentNode.removeChild(bull);
                    this.counter++; //1
                    if(enemy.isImpact && this.counter >= this.endCounter){
                        //利用动态属性存储一个常量值，来标识该物体是否参与图片切换
                        //一旦敌机与子弹发生碰撞后就不再进行图片切换操作了
                        this.counter = 0;
                        enemy.isImpact = false;
                        enemy.src = this.boom;
                        setTimeout(function(){
                            enemy.parentNode.removeChild(enemy);
                        },this.boomTime);
                        clearInterval(enemy.timer);
                    }
                }
            }
        }
    }
};


var MiddEnemy = function(){
    Enemy.call(this);
    this.imgURL = "images/enemy2_fly_1.png";
    this.boom = "images/enemy2_fly_3.gif";
    this.boomTime = 500;
    this.endCounter = 5;
    this.width = 46;
    this.height = 60;
};
MiddEnemy.prototype = Enemy.prototype;

var BigEnemy = function(){
    Enemy.call(this);
    this.imgURL = "images/enemy3_fly_1.png";
    this.boom = "images/enemy3_fly_3.gif";
    this.boomTime = 600;
    this.endCounter = 10;
    this.width = 110;
    this.height = 170;
};
BigEnemy.prototype = Enemy.prototype;
