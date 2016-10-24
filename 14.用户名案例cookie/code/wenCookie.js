/*
		需求：封装cookie操作
			添加
			修改
			删除
			查找
			封装的依据：
				完整形式：[]中是可选项
				document.cookie  = “name=value[;expires=date][;path=path-to-resource][;domain=域名][;secure]”
	*/
	
	//传对象 添加和修改
	/*
		设置cookie(含有添加和修改的功能)
		参数：o 表示一个对象
			  o.name		cookie的名称
			  o.value		cookie的值
			  o.expires		过期时间
			  o.path		cookie限定的路径
			  o.domain		cookie域名的限定
			  o.secure		http协议限定 是否是https 
	*/
	function setCookie(obj){
		var cookieStr = encodeURIComponent(obj.name) + "=" + encodeURIComponent(obj.value);
		if(obj.expires){
			cookieStr+=";expires=" + obj.expires; 
		}
		if(obj.path){
			cookieStr+=";path=" + obj.path; 
		}
		if(obj.domain){
			cookieStr+=";domain=" + obj.domain; 
		}
		if(obj.secure){
			cookieStr+=";secure"; 
		}
		document.cookie = cookieStr;
	}
	
	
	
	//删除工具
	/*
		删除cookie
		参数：
			name:o.name,
			value:o.value,
			expires:date,
			path:o.path,
			domain:o.domain,
			secure:o.secure
	*/
	function removeCookie(obj){
		var date = new Date();//当前时间
		date.setSeconds(-1);//GMT   //设置当前的时间比当前时间早一秒，也就是过期
		//重新设置cookie即可
		setCookie({
		name:obj.name,
		expires:date,
		path:obj.path,
		domain:obj.domain,
		secure:obj.secure
		});
	}
	
	
	//查找功能
	/*
		获取指定cookie的值
		参数：
			name:cookie名称
	*/
	function getCookie(cname){
		var str = document.cookie;
		var arr1 = str.split("; ");
		for(var i = 0;i<arr1.length;i++){
			var arr2 = arr1[i].split("=");
			if(cname==decodeURIComponent(arr2[0]) ){
			//decodeURIComponent(arr[0]);  //cookie的名称
			//decodeURIComponent(arr[1]);  //cookie的值
				return decodeURIComponent(arr2[1]);
			}
		}
		return "";
	}