
var userName = document.getElementById("userName");
	var pwd = document.getElementById("pwd");
	var btn = document.getElementById("btn");
	btn.onclick = function(){
			var uValue = userName.value;
			var pValue = pwd.value;
			var xhr;
			//创建异步对象
			if(window.XMLHttpRequest){
				xhr = new XMLHttpRequest();
			}else{
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
			//连接服务器
			xhr.open("POST","login.php",true);
			var data = "uName=" + uValue + "&pd=" + pValue;
			//发送
			xhr.send(data);
			//模拟表单提交
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			
			//监听响应
			xhr.onreadystatechange = function(){
				if(xhr.readyState==4){//读取完成不一定成功
					if(xhr.status==200){//状态码为200才成功
						if(xhr.responseText==1){
							//alert("登入成功");
							location.href = "index.php";
						}else{
							alert("用户名或密码错误");
						}
					}else{
						alert("请求失败");
					}
				}
			}			
		}
	