<?php 
	//告诉浏览器渲染的时候，用utf-8的编码形式展示
	header("Content-Type:text/html;   charset=utf-8");
	//$_GET 和 $_POST 
	//wd=123
	$v = $_GET["wd"];   //获取请求的关键词
	
	//SQL 
	//select * from table where wd = $v

	if($v=="李"||$v=="li"||$v=="l"){
		echo '["李四", "李小龙", "李世民", "李师师", "李斯", "李元霸"]';
	}else if($v=="a"||$v=="ab"||$v=="abc"){
		echo '["a","abcd","aa","abb","abc","aaabb"]';
	}else{
		echo '';
	}

	
?>