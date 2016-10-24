/*
 	操作本地数据的程序
 */

/*
 	通过pid来检测本地容器中是否含有指定商品
 */
function isHasGoodsByPid(id){
	var jsonStr = getCookie("datas"); 
	var jsonObj = JSON.parse(jsonStr); 
	for(var i = 0,len = jsonObj.length;i<len;i++){
		if(jsonObj[i].pid==id){
			return true;
		}
	}
	return false;
}

function updateData(arr){
	var jsonStr = JSON.stringify(arr);
	setCookie({
		name:"datas",
		value:jsonStr,
		expires:new Date("2116/8/19")
	})
}
