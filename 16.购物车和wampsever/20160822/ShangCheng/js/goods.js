/*
 	操作本地数据的程序
 */

/*
 	通过pid来检测本地容器中是否含有指定商品
 	参数：
 		id:商品编号
 */
function isHasGoodsByPid(id){
	var jsonObj = getNewArr();
	for(var i = 0,len = jsonObj.length;i<len;i++){
		if(jsonObj[i].pid==id){
			return true;
		}
	}
	return false;
}

/*
 	更新本地cookie
 	参数：
 		arr 数组对象
 */
function updateData(arr){
	var jsonStr = JSON.stringify(arr);
	setCookie({
		name:"datas",
		value:jsonStr,
		expires:new Date("2116/8/19")
	})
}

/*
 	通过商品编号更改商品的数量
 	参数：
 		id:商品的 编号
 */
function updateGoodCoutById(id,num){
	var arr = getNewArr();
	/*循环遍历本地数据，通过对比id找到对应商品对象*/
	for(var i = 0,len = arr.length;i<len;i++){
		var good = arr[i];
		if(good.pid==id){
			good.count = good.count + num;
			//alert(good.count)   //测试
			break;
		}
		
	}
	updateData(arr);
}

/*
 	获取本商品的总数量
 */
function getTotal(){
	var arr = getNewArr();
	var sum = 0;
	for(var i = 0,len = arr.length;i<len;i++){
		var good = arr[i];
		sum = sum + good.count;
	}
	return sum;
}

/*
 	获取最新的本地数据转换成数组对象
 */
function getNewArr(){
		var jsonStr = getCookie("datas");
		var arr = JSON.parse(jsonStr);
		return arr;
}
/*
 	删除数据并更新到本地
 * */
function deleteObjById(id){
	var arr = getNewArr();
	for(var i = 0,len = arr.length;i<len;i++){
		if(id==arr[i].pid){
			//i 
			arr.splice(i,1);
			break;
		}
	}
	updateData(arr);
}













