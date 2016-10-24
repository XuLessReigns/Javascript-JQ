/*
  	思路：
  		第一步：获取所要使用节点对象
  		第二步：为右侧的按钮添加一个点击事件
  				运动切换轮播项
  				改变content节点对象的left值（每次走一个轮播项的宽度）
  				如果运动走到最后一个的话
  				马上不运动的改变content的left值为0
  				
  				left:  最大值0
  					      最小值： -4584px
  				每一轮播项的宽度：
  					764
  				
  				5张图片：
  					索引： 0	  1   2   3   4  5
  					      
  			         最后一个轮播                                    第一个轮播项
  			         
  			         按钮     0+1 1+1 2+1 3+1 
  				
 */
var lunBo = document.getElementById("lunBo");
var conetent = document.getElementById("content");  //获取轮播项的容器
var rBtn = document.getElementById("rBtn");//获取右侧切换按钮
var lBtn = document.getElementById("lBtn");//获取左侧切换按钮
var lunItems = document.querySelectorAll(".lunBo .content .lunBo-item");  //获取一组轮播项
var lis = document.querySelectorAll(".lunBo .controls ul li");
var currentIndex = 1; //控制轮播的索引
var flag = true; //开关，表示是否已开启下一次运动 true开   false关

/*为右侧按钮添加点击事件实现切换*/
rBtn.onclick = function() {
	//是否可以进行下次切换
	if (flag) {
		flag = false; //进门之后关门   
		currentIndex++; //索引递增
		/*
		 	索引范围控制
		 */
		if (currentIndex > lunItems.length - 1) {
			currentIndex = 1;
		}
		//1 - 5
		for(var j = 0;j<len;j++){
			lis[j].className = "";
		}
		//this.index
		if(currentIndex==5){
			lis[0].className = "active";
		}else{
			lis[currentIndex-1].className = "active";
		}
		
		
		//求出要运动的目标值（索引和轮播项的关系）
		var v = currentIndex * -764;
		
		/*
		 	如果达到最后一项的时候，则马上改变content的left的值
		 */
		if (currentIndex == lunItems.length - 1) {
			animate(content, {
				left: v
			}, 10, function() {
				conetent.style.left = -764 + "px";
				currentIndex = 1;
				flag = true;
			})
		} else {
			animate(content, {
				left: v
			}, 10, function() {
				flag = true;
			})
		}
	}

}

/*
 	为左侧按钮添加一个点击事件实现切换
 */
lBtn.onclick = function() {
	if (flag) {
		flag = false;
		currentIndex--;
		if (currentIndex < 0) {
			currentIndex = 4;
		}
		for(var j = 0;j<len;j++){
			lis[j].className = "";
		}
		if(currentIndex==0){
			lis[3].className = "active"
		}else{
			lis[currentIndex-1].className = "active"
		}
		console.log(currentIndex)
		var v = currentIndex * -764;

		if (currentIndex == 0) {
			animate(conetent, {
				left: v
			}, 10, function() {
				currentIndex = lunItems.length - 2;
				conetent.style.left = currentIndex * -764 + "px";
				flag = true;
			})
		} else {
			animate(conetent, {
				left: v
			}, 10,function(){
				flag = true;
			})
		}
	}


}

/*
 循环遍历为每一个li添加一个onmouseenter事件
 * */
for(var i = 0,len = lis.length;i<len;i++){
	lis[i].index = i;
	lis[i].onmouseenter = function(){
		for(var j = 0;j<len;j++){
			lis[j].className = "";
		}
		//this.index
		currentIndex = this.index + 1;
		lis[this.index].className = "active";
		var v = currentIndex*-764;
		animate(conetent,{left:v},10)
	}
}

/*
 	定时器轮播
 */
var termID;
function autoPlay(){
	termID = setInterval(function(){
		rBtn.click();
	},1000)
}


lunBo.onmouseenter = function(){
	clearInterval(termID)
}

lunBo.onmouseleave = function(){
	autoPlay();
}

autoPlay();
















