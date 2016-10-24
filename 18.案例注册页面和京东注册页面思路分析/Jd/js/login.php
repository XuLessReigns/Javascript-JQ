
<?php
	//告诉浏览器渲染的时候，用utf-8的编码形式展示
	header("Content-Type:text/html;   charset=utf-8");
	if($_GET["uName"]=="admin"&&$_GET["pd"]=="123456"){
		echo "1";
	}else{
		echo "0";
	}
	
?>