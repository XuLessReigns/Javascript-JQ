function startMove(element,attrJSON,fn){
	clearInterval(element.timer); 
	element.timer = setInterval(function(){
		var targetCount = 0;
		var attrJSONCount = 0;
		for(var attrName in attrJSON){
			var cur = attrName == "opacity" ? Math.round(getStyle(element,attrName) * 100) : parseInt(getStyle(element,attrName));

			var speed = (attrJSON[attrName] - cur) / 5;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

			if(attrName == "opacity"){
				element.style.opacity = (cur + speed) / 100;
				element.style.filter = "alpha(opacity:"+ (cur + speed) +")";
			}
			else{
				element.style[attrName] = cur + speed + "px";
			}

			attrJSONCount++;
			if(cur == attrJSON[attrName]){
				targetCount++;
			}
		}
		if(attrJSONCount == targetCount){
			clearInterval(element.timer);
			if(fn){
				fn();
			}
		}
	},30);
}

function getStyle(element,attr){
	if(element.currentStyle){
		return element.currentStyle[attr];
	}
	else{
		return window.getComputedStyle(element,null)[attr];
	}
}