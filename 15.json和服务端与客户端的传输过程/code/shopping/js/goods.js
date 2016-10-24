//通过pid来检测本地容器中是否已添加该商品
function isHasGoodsByPid(pid){
	var jsonStr = getCookie("datas");
	var jsonArr = JSON.parse(jsonStr);
	for(var i = 0,len = jsonArr.length;i<len;i++){
		if(jsonArr[i].pid==pid){
			return true;
		}
	}
	return false;
}


//更新数据   就是使cookie里的数据跟你添加后的listArr一样
function updateData(listArr){
	var jsonstr = JSON.stringify(listArr);
	setCookie({
		name:"datas",
		value:jsonstr,
		expires:new Date("2116/8/19")
	});
}

//计算总额
function getMoney(){
	var allPrice = 0;
	for(var y = 0;y<cks.length;y++){
		if(cks[y].checked){
			allPrice+=listArr[y].count*listArr[y].price;
		}
	}
	return allPrice;
}
