/*
 	思路：
 		第一步：获取所要操作的节点对象
 		第二步：判断本地容器是否有数据，诺没有的话，table的类名依旧是active，box依旧是.box.active，h2的类名为active
 		诺有的话，把table的类名改为空，box则为.box，h2的类名为空，然后删除第一个tr，添加节点tr，
 		第三步：给-，+添加点击事件同时更新数量单价小计和选中多选框以及更新本地数据和总价格更新数据
 		然后判断数量小于1和大于20的那时候不让其继续添加。
 		第四部：当ck全部选中时这是allck应被选中，点击allck时ck应全被选中，
 		第五步：给删除按钮添加点击事件，删除节点tr	
 */
//获取所要操作的节点对象
//var downs = document.querySelectorAll("#tbody.down");//- 只有一个？
var downs = document.getElementsByClassName("down");
//var ups = document.querySelectorAll("#tbody .up");//+    只有一个？
var ups = document.getElementsByClassName("up");
//var dels = document.querySelectorAll(".del");//删除                只有一个？
var dels = document.getElementsByClassName("del");
var table = document.getElementById("table");//table节点对象
var allCheck = document.getElementById("allCheck");//allck节点对象
var tbody = document.getElementById("tbody");//tbody节点对象
//var cks = document.querySelectorAll("#tbody .ck");//ck
var cks = tbody.getElementsByClassName("ck");//ck
var box = document.getElementById("box");//box节点对象
var h2 = document.getElementById("h2");//h2节点对象
var totalPrice = document.getElementById("totalPrice");//总价格
//判断本地容器是否有数据...
var datas = getCookie("datas");
var listArr = JSON.parse(datas);
if(listArr.length){
	table.className = "";
	box.className = "box";
	h2.className = "";
}else{
	table.className = "active";
	box.className = "box active";
	h2.className = "active";
}
//删除第一个tr
var tr1 = tbody.firstElementChild;
tbody.removeChild(tr1);
//添加tr节点
for(var i = 0,len2 = listArr.length;i<len2;i++){
	addTr(listArr[i]);
}
//给-添加点击事件同时更新数量单价小计和选中多选框以及更新本地数据和总价格更新数据
for(var j = 0,len = downs.length;j<len;j++){
	downs[j].index = j;
	downs[j].onclick = function (){
		var td = this.parentNode;
		var arr = td.children;
		listArr[this.index].count--;
		if(listArr[this.index].count<1){
			listArr[this.index].count = 1;
			return;
		}
		arr[1].value = listArr[this.index].count;
		for(var i = 0,len = cks.length;i<len;i++){
			cks[this.index].checked = "checked";
		}	
		updateData(listArr);
		//更新小计
		var arr1 = td.parentNode.children;
		arr1[5].firstElementChild.innerHTML = listArr[this.index].count*listArr[this.index].price;
		//计算总额
		totalPrice.innerHTML = getMoney();
		//是否全选了
		for(var n = 0;n<cks.length;n++){
			var num1 = 0;
			for(var n = 0;n<cks.length;n++){
				num1+=cks[n].checked;
			}
			if(num1==4){
				allCheck.checked = "checked";
			}else{
				allCheck.checked = "";
			}
			totalPrice.innerHTML = getMoney();
		}

	}
}

//给+添加点击事件同时更新数量单价小计和选中多选框以及更新本地数据和总价格更新数据
for(var x = 0,len3 = ups.length;x<len3;x++){
	ups[x].index = x;
	ups[x].onclick = function (){
		var td = this.parentNode;
		var arr = td.children;
		listArr[this.index].count++;
		if(listArr[this.index].count>20){
			listArr[this.index].count = 20;
			return;
		}
		arr[1].value = listArr[this.index].count;
		for(var i = 0,len = cks.length;i<len;i++){
			cks[this.index].checked = "checked";
		}
		updateData(listArr);
		//更新小计
		var arr1 = td.parentNode.children;
		arr1[5].firstElementChild.innerHTML = listArr[this.index].count*listArr[this.index].price;
		//计算总额
		totalPrice.innerHTML = getMoney();
		//是否全选了
		for(var n = 0;n<cks.length;n++){
			var num1 = 0;
			for(var n = 0;n<cks.length;n++){
				num1+=cks[n].checked;
			}
			if(num1==4){
				allCheck.checked = "checked";
			}else{
				allCheck.checked = "";
			}
			totalPrice.innerHTML = getMoney();
		}

	}
}
//当ck全部选中时这是allck应被选中，点击allck时ck应全被选中，并计算总额
allCheck.onclick = function(){
	if(allCheck.checked){
		for(var y = 0;y<cks.length;y++){
			cks[y].checked = "checked";
		}
		totalPrice.innerHTML = getMoney();
	}else{
		for(var y = 0;y<cks.length;y++){
			cks[y].checked = "";
		}
		totalPrice.innerHTML = getMoney();
	}
}
//当ck全被选中的时候，选中allck，并计算总额
for(var n = 0;n<cks.length;n++){
	cks[n].onclick = function(){
		var num1 = 0;
		for(var n = 0;n<cks.length;n++){
			num1+=cks[n].checked;
		}
		if(num1==4){
			allCheck.checked = "checked";
		}else{
			allCheck.checked = "";
		}
		totalPrice.innerHTML = getMoney();
	}
}

//删除节点
for(var z = 0,len4 = dels.length;z<len4;z++){
	dels[z].index = z;
	dels[z].onclick = function (){
		var tr= this.parentNode.parentNode;
		var flag = confirm("你真的不后悔吗");
		if(flag){
			tbody.removeChild(tr);	
			listArr.splice(this.index,1);
			updateData(listArr);
			totalPrice.innerHTML = getMoney();
			console.log(listArr);
			for(var z = 0;z<dels.length;z++){
				dels[z].index = z;
			}
			if(listArr.length==0){
				table.className = "active";
				box.className = "box active";
				h2.className = "active";
			}
		}
	}
}
/*
//删除节点
for(var z = 0,len4 = dels.length;z<len4;z++){
	dels[z].index = z;
	var index = 0;
	dels[z].onclick = function (){
		var tr= this.parentNode.parentNode;
		var flag = confirm("你真的不后悔吗");
		
		if(flag){
			tbody.removeChild(tr);	
			listArr.splice(this.index-index,1);
			updateData(listArr);
			totalPrice.innerHTML = getMoney();
			index++;
			console.log(listArr);
			if(listArr.length==0){
				table.className = "active";
				box.className = "box active";
				h2.className = "active";
			}
		}
	}
}
*/