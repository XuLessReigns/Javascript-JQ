	/*
		创建cookie的完整格式：
			document.cookie  = “name=value(必有的)[;expires=date][;path=path-to-resource][;domain=域名][;secure]”
			name=value 是必须有的
			[]中的部分，是可选的

	 */

	 //增加、修改、删除、获取
	 /*
		功能：增加或修改cookie
			name:cookie的名字；
			value:cookie的值
			expires：过期时间 （毫秒表示）
			path：路径限制
			domain:域名限制
			secure:安全标志
	  */
	 function setCookie(name,value,expires,path,domain,secure){
		var dec = encodeURIComponent(name) + "=" + encodeURIComponent(value);  // 必有的name=value
		//失效时间
		if(expires){
			var date = new Date();
			date.setTime(date.getTime()+expires);
			dec = dec + ";expires="+date;
		}

		//路径限制
		if(path){
			dec = dec + ";path="+path;
		}

		//域名限制
		if(domain){
			dec = dec + ";domain="+domain;
		}

		//安全标志
		if(secure=="secure"){
			dec = dec + ";secure";
		}

		document.cookie = dec;
	 }
	

	 /*
		删除cookie
			根据cookie的名字来删除
			name:cookie的名字
	  */
	  function removeCookie(name){
		setCookie(name,getCookie(name),-1);
	  }
	  
	  /*
		获取cookie的值
			根据cookie的名字来来获取
			name:cookie的名字
	  */
	  function getCookie(name){
		 var cookies = document.cookie;
		 //gender=男; age=18; uName=雷锋
		 var arr = cookies.split("; ");  //返回一个数组  arr[index] --->gender=男
		 for(var i = 0;i<arr.length;i++){
			var strs = arr[i].split("=");    //strs[0] name strs[1] value
			if(encodeURIComponent(name)==strs[0]){
				return decodeURIComponent(strs[1]);
			}
		 }

	  }