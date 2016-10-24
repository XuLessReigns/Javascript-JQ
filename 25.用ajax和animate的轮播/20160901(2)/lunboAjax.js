/*
 	思路：
 		第一步：获取所要操作的节点对象
 		第二步：异步请求后台数据
 				ajax
 				数据请求成功之后
 				动态常见轮播项和小按钮 追加到页面中
 				
 */
var lunBo = document.getElementById("lunBo");
var conetent = document.getElementById("content"); //获取轮播项的容器
var rBtn = document.getElementById("rBtn"); //获取右侧切换按钮
var lBtn = document.getElementById("lBtn"); //获取左侧切换按钮
var lunItems; //声明一组轮播项变量
var lis; //声明一组控制按钮的变量
var currentIndex = 1; //控制轮播的索引
var flag = true; //开关，表示是否已开启下一次运动 true开   false关
var list = document.getElementById("list");

ajax({
	method: "get",
	isAsyc: true,
	url: "handler.php",
	success: function(data) {
		var arr = JSON.parse(data);
		createDom(arr);
		bindDom();
	},
	error: function() {

	}
})

//解耦   耦合
/*
 	根据数据量动态创建轮播项和控制按钮
 	arr: 数组
 */
function createDom(arr) {
	var len = arr.length;
	conetent.style.width = (len + 2) * 764 + "px";
	//arr[len-1]
	var dv = document.createElement("div");
	dv.className = "lunBo-item";
	dv.innerHTML = '<a href="' + arr[len - 1].targetSrc + '">' +
		'<img src="' + arr[len - 1].imgSrc + '" alt="" />' +
		'</a>';
	conetent.appendChild(dv);
	for (var i = 0; i < len; i++) {
		var dv = document.createElement("div");
		dv.className = "lunBo-item";
		dv.innerHTML = '<a href="' + arr[i].targetSrc + '">' +
			'<img src="' + arr[i].imgSrc + '" alt="" />' +
			'</a>';
		conetent.appendChild(dv);

		var li = document.createElement("li");
		if (i == 0) {
			li.className = "active";
		}
		list.appendChild(li);

	}

	var dv = document.createElement("div");
	dv.className = "lunBo-item";
	dv.innerHTML = '<a href="' + arr[0].targetSrc + '">' +
		'<img src="' + arr[0].imgSrc + '" alt="" />' +
		'</a>';
	//arr[0]
	conetent.appendChild(dv);
	lunItems = document.querySelectorAll(".lunBo .content .lunBo-item"); //获取一组轮播项
	lis = document.querySelectorAll(".lunBo .controls ul li");

}

function bindDom() {
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
			for (var j = 0; j < len; j++) {
				lis[j].className = "";
			}
			//this.index
			if (currentIndex == 5) {
				lis[0].className = "active";
			} else {
				lis[currentIndex - 1].className = "active";
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
			for (var j = 0; j < len; j++) {
				lis[j].className = "";
			}
			if (currentIndex == 0) {
				lis[3].className = "active"
			} else {
				lis[currentIndex - 1].className = "active"
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
				}, 10, function() {
					flag = true;
				})
			}
		}

	}

	/*
	 循环遍历为每一个li添加一个onmouseenter事件
	 * */
	for (var i = 0, len = lis.length; i < len; i++) {
		lis[i].index = i;
		lis[i].onmouseenter = function() {
			for (var j = 0; j < len; j++) {
				lis[j].className = "";
			}
			//this.index
			currentIndex = this.index + 1;
			lis[this.index].className = "active";
			var v = currentIndex * -764;
			animate(conetent, {
				left: v
			}, 10)
		}
	}

	/*
	 	定时器轮播
	 */
	var termID;

	function autoPlay() {
		termID = setInterval(function() {
			rBtn.click();
		}, 1000)
	}

	lunBo.onmouseenter = function() {
		clearInterval(termID)
	}

	lunBo.onmouseleave = function() {
		autoPlay();
	}

	autoPlay();

}