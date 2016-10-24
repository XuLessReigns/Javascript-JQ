/*
 	思路:
 		第一步：获取所要操作的节点对象
 		第二步：获取本地数据，查看本地数据容器中，是否含有商品，若有，则动态生成数据表格。否则，显示购物车里没有商品
 		第三步：
 			若有，读取本地数据，根据本地数据商品的数，动态创建（生成）tr添加到tbody中。
 		第四步：
 			获取tbody下面的所有的checkBox多选框节点对象，为每一个checkBox添加onchange事件：
 			计算总价格赋值给totalPrice节点对象
 				循环遍历所有的checkbox,看那个checkebox被选中就取出其当前行中的小计的价格累加
 			 为全选按钮添加一个onchange事件
 		
 		第五步：
 			为所有商品数量减少按钮和增加按钮添加一个点击事件，更改该商品的数量。
 			怎么来更改？
 				选中该商品，获取本商品的pid的值，根据pid更新本地数据
 				
 		
 		第六步：
 			为删除按钮添加一个点击事件
 			删除当前行
 				tbody.removeChild(tr);
 			更新本地数据
 				[]
 				splice(index,1)
 				
 				
 			
 	
 */

var table = document.getElementById("table");  //获取表格节点对象
var tbody = document.getElementById("tbody");  //获取表格体节点对象
var box = document.getElementById("box");  //获取显示没有商品的节点对象
var h2 = document.getElementById("h2");  //获取显示总价格的容器对象
var totalPrice = document.getElementById("totalPrice"); //显示总价格内容的节点对象
var allCheck = document.getElementById("allCheck");  //全选控制选中节点对象

var total = getTotal();  //商品总数量
/*判断是否含有商品*/
if(total==0){  //没有 -----------------------------------------
	table.className = "hide";  //表格隐藏
	h2.className = "hide";     //总价格隐藏
	box.className = "box";     //显示没有商品容器
}else{  //有----------------------------------------------------
	table.className = "";  //表格隐藏
	h2.className = "";     //总价格隐藏
	box.className = "box hide";     //显示没有商品容器
	var arr = getNewArr(); //从本地获取最新数据

	for(var i = 0,len = arr.length;i<len;i++){
		var good = arr[i];
		//动态创建一个tr
		var tr = document.createElement("tr");
		tr.setAttribute("pid",good.pid)
		//为tr添加表格内容
		tr.innerHTML = '<td>' +
							'<input type="checkbox" class="ck"  />' +
						'</td>' +
						'<td>' +
							'<img src="'+good.imgSrc+'" alt="" />' +
						'</td>' +
						'<td>' +
							good.desc +
						'</td>' +
						'<td>' +
							'<button class="down">-</button><input type="text" value="'+good.count+'" readonly="readonly" /><button class="up">+</button>' +
						'</td>' +
						'<td>' +
							'￥<span>'+good.price+'</span>' +
						'</td>' +
						'<td>' +
							'￥<span>'+good.count*good.price+'</span>' +
						'</td>' +
						'<td>' +
							'<button class="del"  >删除</button>' +
						'</td>' ;
		//把tr添加到tbody中
		tbody.appendChild(tr);
	}
	
	var cks  = document.querySelectorAll("tbody .ck");  //获取tbody下面的所有的checkBox多选框节点对象
	//为tbody下面每一个checkBox添加onchange事件：
	for(var i = 0,len = cks.length;i<len;i++){
		cks[i].onchange = function(){
			var flag = true;  //表示allcheck是否被选中
			//循环遍历检测看是否有 没有选中的checkBox
			for(var i = 0,len = cks.length;i<len;i++){
				//如果其中有一个没有被选中则allcheck不能被选中。
				if(cks[i].checked==false){
					flag = false; 
					break;
				}
			}
			if(flag){
				allCheck.checked = true;
			}else{
				allCheck.checked = false;
			}
			totalPrice.innerHTML = calculateToalPrice();
		}
	}
	
	//为全选按钮添加一个点击事件
	allCheck.onchange = function(){
		if(this.checked){
			for(var i = 0,len = cks.length;i<len;i++){
				cks[i].checked = true;
			}
		}else{
			for(var i = 0,len = cks.length;i<len;i++){
				cks[i].checked = false;
			}
		}
		
		totalPrice.innerHTML = calculateToalPrice();
	}
	//获取所有的减少数量的操作按钮
	var downs = document.querySelectorAll(".down");
	//获取所有的增加数量的操作按钮
	var ups = document.querySelectorAll(".up");
	//循环遍历为那妞添加点击事件更改数量
	for(var i = 0,len = downs.length;i<len;i++){
		downs[i].onclick = function(){
			var tr = this.parentNode.parentNode;
			var pid = tr.getAttribute("pid");
			var count = this.nextElementSibling.value;
			count--;//count = count-1;
			if(count>=1){
				//更新本地数据
				updateGoodCoutById(pid,-1);
				//更新小计
				tr.children[5].firstElementChild.innerHTML = tr.children[4].firstElementChild.innerHTML*count;
				//更新显示数量文本框
				this.nextElementSibling.value = count;
			}
			tr.children[0].firstElementChild.checked = true;
			totalPrice.innerHTML = calculateToalPrice();
			
			
		}
		ups[i].onclick = function(){
			var tr = this.parentNode.parentNode;
			var pid = tr.getAttribute("pid");
			var count = this.previousElementSibling.value;
			count++;//count = count-1;
			//更新本地数据
			updateGoodCoutById(pid,1);
			//更新小计
			tr.children[5].firstElementChild.innerHTML = tr.children[4].firstElementChild.innerHTML*count;
			//更新显示数量文本框
			this.previousElementSibling.value = count;
			tr.children[0].firstElementChild.checked = true;
			totalPrice.innerHTML = calculateToalPrice();
		}
	}
	var dels = document.querySelectorAll(".del");
	for(var i = 0,len = dels.length;i<len;i++){
		dels[i].onclick = function(){
			if(confirm("您老确定不要了吗？")){
				var tr = this.parentNode.parentNode;
				var pid = tr.getAttribute("pid"); 
				tbody.removeChild(tr);
				deleteObjById(pid);
				totalPrice.innerHTML = calculateToalPrice();
			
			}
			
		}
	}
}


/*
 	计算总价格
 */
function calculateToalPrice(){
	var sum = 0;
	cks  = document.querySelectorAll("tbody .ck");  
	for(var i = 0,len = cks.length;i<len;i++){
		if(cks[i].checked){
			var tr = cks[i].parentNode.parentNode; //获取tr
			var xiaoji = tr.children[5].firstElementChild.innerHTML;
			sum = sum + parseInt(xiaoji);
		}
	}
	return sum;
}





















