/*
	思路：
		第一步：获取所要操作的节点对象
		第二步：给btn添加点击事件
		第三步：	通过当前按钮    找到dl节点对象
				通过dl节点对象找到对应商品信息
					如：商品编号，图片路径，商品名称，商品描述，价格，还有默认的（数量）
				把商品信息添加到购物车中，实际上就是将  对象商品组织好的信息  添加到容器中本地容器就是cookie，
			cookie就是一个字符串数组对象[]
				添加商品信息的时候，首先读取本地数据（就相当于查看购物车），看本地数据中是否已经添加过该商品信息
			如果添加过了，则把该商品(对象)拿出来修改数量count后，放回容器。
				否则，就用对象组织好的商品信息添加到本地容器中，count默认为1.
				统计商品总数量：
					循环遍历本地容器中的所有对象，取出每个对象的count属性值并累加
*/
//获取按钮节点对象
var btns = document.querySelectorAll(".list button");
//alert(btns.length);//4
//获取总数量的节点对象
var ccount = document.getElementById("ccount");
//alert(ccount.nodeName);//i标签
var datas = getCookie("datas");//从本地容器读取数据
var listArr;//转换后JSON对象（就是数据）
if(datas){//本地有容器
	//alert("有了");
	listArr = JSON.parse(datas);
	if(listArr.length){
		//alert(listArr.length);
		var num = 0;
		for(var j = 0,len1 = listArr.length;j<len1;j++){	
			//alert(listArr.length);
			if(!listArr[j].count){
				listArr[j].count = 0;
			}
			num+=listArr[j].count;
			ccount.innerHTML = num;
		}
	}
	//alert(typeof listArr);//object
	//alert(listArr instanceof Array);//true
	//alert(listArr.length);//一开始0
}else{
	//alert("没有");
	setCookie({
		name:"datas",
		value:"[]"
	});
	listArr = [];
}
//遍历并添加点击事件
for(var i = 0,len = btns.length;i<len;i++){
	btns[i].index = i;
	btns[i].onclick = function(){
		var dl = this.parentNode.parentNode;//dl节点对象
		//alert(dl.nodeName);//dl标签
		var arr = dl.children;//dl下面的所有子元素节对象
		//alert(arr.length);//5
		var pid = dl.getAttribute("pid");//商品编号
		//alert(pid);//1001...
		var flag = isHasGoodsByPid(pid);//是否已经存在该商品
		//alert(flag);//点第一下false第二下true
		if(flag){//存在就修改其数量加1
			listArr[this.index].count++;
			/*
			var jsonStr = JSON.stringify(listArr);
			setCookie({
				name:"datas",
				value:jsonStr
			});*/
			if(listArr[this.index].count>20){
				listArr[this.index].count = 20;
				return;
			}
			updateData(listArr);//更新数据
			//alert(listArr[this.index].count);
		}else{//不存在，创建一个对象添加到listArr
			var imgSrc = arr[0].firstElementChild.src;//图片的路径
			var pName = arr[1].innerHTML;	//商品名称
			var desc = arr[2].innerHTML;	//商品的描述
			var price = arr[3].firstElementChild.innerHTML;	//图片的路径
			var obj = {
				pid:pid,
				imgSrc:imgSrc,
				pName:pName,
				desc:desc,
				price:price,
				count:1
			};
			listArr.push(obj);	
			updateData(listArr);
			//alert(listArr);
		}	
		if(listArr.length){
			//alert(listArr.length);
			var num = 0;
			for(var j = 0,len1 = listArr.length;j<len1;j++){	
				//alert(listArr.length);
				if(!listArr[j].count){
					listArr[j].count = 0;
				}
				num+=listArr[j].count;
				ccount.innerHTML = num;
			}
		}
	}	
}
