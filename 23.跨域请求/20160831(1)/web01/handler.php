<?php 
	header("Content-Type:text/html;   charset=utf-8"); 
	// $_GET 和 $_POST 
	//$result = $_GET["uName"];
	$cName = $_GET["fnName"];
	echo $cName.'(["张三","李四","王五","赵六","陈其","留疤"])';
?>
