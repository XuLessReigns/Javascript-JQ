function getData(){
	/*
	 	后端（服务端）会从数据库把数据读取出来，并且会把读取出来的数据转换成对象。
	 	转换成对象后，再通过后端JSON转换，把对象转换成JSON
	 */
	   var arr = [
			{pid:"1001",price:111,pName:"手机1"},
			{pid:"1002",price:111,pName:"手机2"},
			{pid:"1003",price:111,pName:"手机3"},
			{pid:"1004",price:111,pName:"手机4"},
			{pid:"1005",price:111,pName:"手机5"},
		]
	   
	   var json = JSON.stringify(arr); //将对象转换成字符串json
	   return json;
}
