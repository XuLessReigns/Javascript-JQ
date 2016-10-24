/*
	思路：
		用户名
			获取焦点
				1.当用户名获取焦点时，如果文本框为空，则显示（默认）的提示信息
				2.当用户名获取焦点时，如果文本框为不为空，则显示错误的提示信息
			失去焦点
				1.如果文本框的内容为空，则隐藏提示信息
				2.否则，则显示错误的提示信息
			点击注册按钮时
				验证追踪！
				1.当用户名为空或者格式或者长度不正确时，显示错误信息
			文本框输入时
				1.验证文本框各种状态（是否为空，长度不合法，格式是否合法）
				2.验证通过时，则显示正确的状态
		密码
			获取焦点
				1.当用户名获取焦点时，如果文本框为空，则显示（默认）的提示信息
				2.当用户名获取焦点时，如果文本框为不为空，则显示错误的提示信息
			失去焦点
				1.如果文本框的内容为空，则隐藏提示信息
				2.否则，则显示错误的提示信息
			点击注册按钮时
				验证追踪！
				1.当用户名为空或者格式或者长度不正确时，显示错误信息
			文本框输入时
				1.验证文本框各种状态（是否为空，长度不合法，密码的安全级别）
					密码级别：
						弱：单纯字母、数字、其他字符
						中：混合两种
						强：混合三种
				2.验证通过时，则显示正确的状态
*/
/*--------------------------------用户名---------------------------------*/
var userName = document.getElementById("userName");//获取用户名节点对象
userName.onfocus = userName.onblur = userName.onkeyup = checkUserName; 
function checkUserName(e){
	//兼容
	var _e = window.event||e;
	var v = userName.value;//用户名的内容
	var box = userName.parentNode;
	var tip = box.nextElementSibling;//获取信息提示容器的节点对象
	var span = tip.lastElementChild;//获取信息提示的span节点对象
	//判断触发的事件类型
	if(_e.type=="focus"){//获取焦点事件
		if(v.length==0){//文本框的内容为空时
			tip.className = "tip default";
			box.className = "box";
			span.innerHTML = "仅支持汉字，数字，字母，-和_组成，4-20个字符";
			return false;
		}
	}
	if(_e.type=="blur"){
		if(v.length==0){
			tip.className = "tip hide";
			box.className = "box";
			return false;
		}
	}
	/*
	 	var xhr;//创建异步对象
	 			//兼容ie6
	 			if(window.XMLHttpRequest){
	 				xhr = new XMLHttpRequest();
	 			}else{
	 				xhr = new ActiveXObject();
	 			}
	 			//连接服务器
	 			xhr.open("POST","register.php",true);
	 			//发送
	 			var data = v;
	 			xhr.send(data);
	 			//模拟表单提交
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	 			//监听响应
	 			xhr.onreadystatechange = function(){
	 				if(xhr.readyState==4){
	 					if(status==200){//状态码正常接收成功
	 						if(xhr.responseText==1){
	 							box.className = "box error";
						 		tip.className = "tip error";
						 		span.innerHTML = "该用户名已被注册";
						 		return false;
	 						}else{
	 							box.className = "box right";
							 	tip.className = "tip hide";
							 	return true;
	 						}
	 					}
	 				}
	 			}
	 
	 */

	//其他情况（用户点击按钮btn.onclick和输入onkeyup的时候）
	if(v.length==0){//文本框的内容为空时
	 	box.className = "box error";
	 	tip.className = "tip error";
	 	span.innerHTML = "请输入用户名";
	 	return false;
	}else{//文本框的内容不为空时
	 	//var reg = /^([\u4e00-\u9fa5]|[a-z-_])([\u4e00-\u9fa5]|[0-9a-z-_]){3,19}$/i;//全部规则
	 	//var reg = /^([\u4e00-\u9fa5]|[a-z-_])+$/i;//不限数量
	 	if(regExpManger.userNameReg.test(v)){//规则正确
	 		if(v.length>=4&&v.length<=20){//判断长度是否为4-20	
	 			var xhr;//创建异步对象
	 			//兼容ie6
	 			if(window.XMLHttpRequest){
	 				xhr = new XMLHttpRequest();
	 			}else{
	 				xhr = new ActiveXObject();
	 			}
	 			//连接服务器
	 			xhr.open("POST","../js/register.php",true);
	 			//发送
	 			var data = v;
	 			xhr.send(data);
	 			//模拟表单提交
				//xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	 			//监听响应
	 			xhr.onreadystatechange = function(){
	 				if(xhr.readyState==4){
	 					if(status==200){//状态码正常接收成功
	 						if(xhr.responseText==1){
	 							box.className = "box error";
						 		tip.className = "tip error";
						 		span.innerHTML = "该用户名已被注册";
						 		return false;
	 						}else{
	 							box.className = "box right";
							 	tip.className = "tip hide";
							 	return true;
	 						}
	 					}
	 				}
	 			}
	 			//box.className = "box right";
	 			//tip.className = "tip hide";
	 			//return true;
	 		}else{
	 			box.className = "box error";
	 			tip.className = "tip error";
	 			span.innerHTML = "长度只能在4-20个字符之间";
	 			return false;
	 		}
	 	}else{//规则不正确
	 		box.className = "box error";
	 		tip.className = "tip error";
	 		span.innerHTML = "格式错误，仅支持汉字、字母、数字、“-”“_”的组合，4-20个字符!!!";
	 		return false;
	 	}
	}
}

/*-------------------------------密码--------------------------------*/
var pwd = document.getElementById("pwd");//获取用户名节点对象
pwd.onfocus = pwd.onblur = pwd.onkeyup = checkPwd; 
function checkPwd(e){
	//兼容
	var _e = window.event||e;
	var v = pwd.value;//用户名的内容
	var box = pwd.parentNode;
	var tip = box.nextElementSibling;//获取信息提示容器的节点对象
	var span = tip.lastElementChild;//获取信息提示的span节点对象
	//判断触发的事件类型
	if(_e.type=="focus"){//获取焦点事件
		if(v.length==0){//文本框的内容为空时
			tip.className = "tip default";
			box.className = "box";
			span.innerHTML = "请输入密码";
			return false;
		}
	}
	if(_e.type=="blur"){
		if(v.length==0){
			tip.className = "tip hide";
			box.className = "box";
			return false;
		}
	}
	//其他情况（用户点击按钮btn.onclick和输入onkeyup的时候）
	 if(v.length==0){//文本框的内容为空时
	 	box.className = "box error";
	 	tip.className = "tip error";
	 	span.innerHTML = "请输入密码";
	 	return false;
	 }else{//文本框的内容不为空时
	 	if(regExpManger.pwdReg.test(v)){//规则正确
	 		if(v.length>=6&&v.length<=20){//判断长度是否为6-20
	 			box.className = "box right";
	 			tip.className = "tip hide";
	 			var level = getLevel(v);
	 			switch(level){
	 				case 1:
	 					tip.className = "tip ruo";
	 				break;
	 				case 2:
	 					tip.className = "tip zhong";
	 				break;
	 				default:
	 					tip.className = "tip qiang";
	 			}
	 			return true;
	 		}else{
	 			box.className = "box error";
	 			tip.className = "tip error";
	 			span.innerHTML = "长度只能在6-20个字符之间";
	 			return false;
	 		}
	 	}else{//规则不正确
	 		box.className = "box error";
	 		tip.className = "tip error";
	 		span.innerHTML = "格式错误，不支持汉字，6-20个字符!!!";
	 		return false;
	 	}
	 }
}
//判断等级
function getLevel(v){
	var level = 0;
	var isHasWord = false;
	var isHasNumber = false;
	var isOthers = false;
	for(var i = 0;i<v.length;i++){
		if(regExpManger.wordReg.test(v[i]) ){
			isHasWord = true;		
		}else if(regExpManger.numberReg.test(v[i]) ){
			isHasNumber = true;
		}else{
			isOthers = true;
		}
	}
	level = isHasNumber + isHasWord + isOthers;
	return level;
}
/*----------------------------------确认密码---------------------------------*/
var pwd2 = document.getElementById("pwd2");//获取用户名节点对象
pwd2.onfocus = pwd2.onblur = pwd2.onkeyup = checkTpwd; 
function checkTpwd(e){
	//兼容
	var _e = window.event||e;
	var v = pwd2.value;//用户名的内容
	var box = pwd2.parentNode;
	var tip = box.nextElementSibling;//获取信息提示容器的节点对象
	var span = tip.lastElementChild;//获取信息提示的span节点对象
	//判断触发的事件类型
	if(_e.type=="focus"){//获取焦点事件
		if(v.length==0){//文本框的内容为空时
			tip.className = "tip default";
			box.className = "box";
			span.innerHTML = "请再次输入密码";
			return false;
		}
	}
	if(_e.type=="blur"){
		if(v.length==0){
			tip.className = "tip hide";
			box.className = "box";
			return false;
		}
	}
	//其他情况（用户点击按钮btn.onclick和输入onkeyup的时候）
	 if(v.length==0){//文本框的内容为空时
	 	box.className = "box error";
	 	tip.className = "tip error";
	 	span.innerHTML = "请再次输入密码";
	 	return false;
	 }else{//文本框的内容不为空时
	 	if(pwd.value==pwd2.value){//密码一致
 			box.className = "box right";
 			tip.className = "tip hide";
 			return true;
	 	}else{//密码不一致
	 		box.className = "box error";
	 		tip.className = "tip error";
	 		span.innerHTML = "两次输入的密码不一致";
	 		return false;
	 	}
	 }
}
/*--------------------------------邮箱验证---------------------------------------*/
var email = document.getElementById("email");//获取用户名节点对象
email.onfocus = email.onblur = email.onkeyup = checkemail; 
function checkemail(e){
	//兼容
	var _e = window.event||e;
	var v = email.value;//用户名的内容
	var box = email.parentNode;
	var tip = box.nextElementSibling;//获取信息提示容器的节点对象
	var span = tip.lastElementChild;//获取信息提示的span节点对象
	//判断触发的事件类型
	if(_e.type=="focus"){//获取焦点事件
		if(v.length==0){//文本框的内容为空时
			tip.className = "tip default";
			box.className = "box";
			span.innerHTML = "完成邮箱验证，可以使用该邮箱登入及找回密码";
			return false;
		}
	}
	if(_e.type=="blur"){//失去焦点事件
		if(v.length==0){
			tip.className = "tip hide";
			box.className = "box";
			return false;
		}
	}
	//其他情况（用户点击按钮btn.onclick和输入onkeyup的时候）
	 if(v.length==0){//文本框的内容为空时
	 	box.className = "box error";
	 	tip.className = "tip error";
	 	span.innerHTML = "请输入邮箱";
	 	return false;
	 }else{//文本框的内容不为空时
	 	if(regExpManger.emailReg.test(v)){//格式正确
	 			box.className = "box right";
	 			tip.className = "tip hide";
	 			return true;
	 	}else{//格式不正确
	 		box.className = "box error";
	 		tip.className = "tip error";
	 		span.innerHTML = "该邮箱不存在";
	 		return false;
	 	}
	 }
}
/*--------------------------------手机验证---------------------------------------*/
var mobile = document.getElementById("mobile");//获取用户名节点对象
mobile.onfocus = mobile.onblur = mobile.onkeyup = checkmobile; 
function checkmobile(e){
	//兼容
	var _e = window.event||e;
	var v = mobile.value;//用户名的内容
	var box = mobile.parentNode;
	var tip = box.nextElementSibling;//获取信息提示容器的节点对象
	var span = tip.lastElementChild;//获取信息提示的span节点对象
	//判断触发的事件类型
	if(_e.type=="focus"){//获取焦点事件
		if(v.length==0){//文本框的内容为空时
			tip.className = "tip default";
			box.className = "box";
			span.innerHTML = "完成手机验证，可以使用手机验证找回密码";
			return false;
		}
	}
	if(_e.type=="blur"){//失去焦点事件
		if(v.length==0){
			tip.className = "tip hide";
			box.className = "box";
			return false;
		}
	}
	//其他情况（用户点击按钮btn.onclick和输入onkeyup的时候）
	 if(v.length==0){//文本框的内容为空时
	 	box.className = "box error";
	 	tip.className = "tip error";
	 	span.innerHTML = "请输入手机号";
	 	return false;
	 }else{//文本框的内容不为空时
	 	if(regExpManger.mobileReg.test(v)){//格式正确
	 			box.className = "box right";
	 			tip.className = "tip hide";
	 			return true;
	 	}else{//格式不正确
	 		box.className = "box error";
	 		tip.className = "tip error";
	 		span.innerHTML = "该手机号不存在";
	 		return false;
	 	}
	 }
}
/*------------------------------------验证码验证--------------------------------*/
var yzm = document.getElementById("yzm");//获取用户名节点对象
var v1 = document.getElementById("v1");
var btn1 = document.getElementById("btn1");
var arr = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
btn1.onclick = function(){
	var str = "";
	for(var i = 0;i<5;i++){
		var index = parseInt(arr.length*Math.random());
		str+=arr[index];
	}
	btn1.innerHTML = str;
	v1.value = str;
}
yzm.onfocus = yzm.onblur = yzm.onkeyup = checkYzm; 
function checkYzm(e){
	//兼容
	var _e = window.event||e;
	var v = yzm.value;//用户名的内容
	var box = yzm.parentNode;
	var tip = box.nextElementSibling;//获取信息提示容器的节点对象
	var span = tip.lastElementChild;//获取信息提示的span节点对象
	//判断触发的事件类型
	if(_e.type=="focus"){//获取焦点事件
		if(v.length==0){//文本框的内容为空时
			tip.className = "tip default";
			box.className = "box";
			span.innerHTML = "需要和下面图片的内容一致,忽略大小写";
			return false;
		}
	}
	if(_e.type=="blur"){//失去焦点事件
		if(v.length==0){
			tip.className = "tip hide";
			box.className = "box";
			return false;
		}
	}
	//其他情况（用户点击按钮btn.onclick和输入onkeyup的时候）
	 if(v.length==0){//文本框的内容为空时
	 	box.className = "box error";
	 	tip.className = "tip error";
	 	span.innerHTML = "请输入验证码";
	 	return false;
	 }else{//文本框的内容不为空时
	 	var str1 = yzm.value;
		var str = v1.value;
		var reg = new RegExp("^" + str + "$","ig");
		var result = reg.test(str1);
	 	if(result){//验证成功
	 			box.className = "box right";
	 			tip.className = "tip hide";
	 			return true;
	 	}else{//验证码不正确
	 		box.className = "box error";
	 		tip.className = "tip error";
	 		span.innerHTML = "你输入的验证码错误";
	 		return false;
	 	}
	 }
}


/*------------------------------------获取注册按钮--------------------------------*/
var btn = document.getElementById("btn");
btn.onclick = function(){
	var ck = document.getElementById("ck");
	var box = ck.parentNode;
	var tip = box.nextElementSibling;//获取信息提示容器的节点对象
	var span = tip.lastElementChild;//获取信息提示的span节点对象
	if(ck.checked){//选中的情况下
		box.className = "box";
		tip.className = "tip hide";
		if(checkUserName()&&checkPwd()&&checkTpwd()&&checkemail()&&checkmobile()&&checkYzm()){//利用&&的短路实现追踪
			alert("可以注册了");
		}
	}else{//未选中	
		box.className = "box error";
	 	tip.className = "tip error";
	 	span.innerHTML = "请同意协议!!!";
	}
}
