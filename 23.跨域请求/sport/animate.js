/*
 	动画
 		运动属性
 		透明度    1-100
 	参数：
 		dom：要运动的节点对象
 		propertyName:  width  height  left top...
 		target:目标值
 		属性名：目标值 、属性名：目标值 、属性名：目标值 ....
 		dataObj
 			对象
 			{width:300,height:400,opacity:90,left:500}
 			for in
 			for(var attr in dataObj){
 				attr
 				dataObj[attr]   目标值
 				
 			}
 		
 */
function animate(dom,obj,time,fn){//节点对象，{属性：属性值...}，频率（秒过多少秒执行一次），回调函数）
	clearInterval(dom.termId);
	dom.termId = setInterval(function(){
		var flag = true;
		for(var attr in obj){//每过time时间遍历一次属性attr是每一个属性读执行下面的代码
			//获取当前值
			if(attr=="opacity"){//因为attr是变量所以只能用【】
				//透明度
				var value = getStylePropertyValue(dom,"opacity")*100;//按照1-100来算
			}else{//其他属性
				var value = parseInt(getStylePropertyValue(dom,attr) );
			}
			//设置step,根据运动的方向，确定步子的方向
			/*
			if(obj[attr]>value){
				var step = 10;
			}esle{
				var step = -10;
			}
			*/
			//缓存  当加到小数点的时候会忽略不计这是bug
			var step = (obj[attr]-value)/10;
			//step = step>0?Math.ceil(step):Math.floor(step);
			//解决方法
			if(step>0){
				step = Math.ceil(step);	//1最小值
			}else{
				step = Math.floor(step);//-1最大值
			}
			//判断目标是否已经到达
			if(value==obj[attr]){
				continue;////结束本次函数的执行
			}else{
				flag = false;
			}
			//改变样式属性的值
			if(attr=="opacity"){
				value+=step;//改变属性值
				dom.style["opacity"] = value/100;
				dom.style["filter"] = "alpha(opacity=" + value + ")";
			}else{
				value+=step;//改变属性值
				dom.style[attr] = value + "px";
			}
		}
		
		if(flag){//停止计时器
			clearInterval(dom.termId);
			//结束后是否执行其它函数
			if(fn){
				fn();
			}
		}
	},time);
}

//获取指定样式的值
function getStylePropertyValue(dom,propertyName){
	if(window.getComputedStyle){
		return getComputedStyle(dom,null)[propertyName];
	}else{
		return dom.currentStyle[propertyName];
	}
}