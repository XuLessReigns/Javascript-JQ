<?php 
	header("Content-Type:text/html;   charset=utf-8");
	//http://localhost/test/demo03/images/1.jpg
	$fnName=$_GET["callback"];
	echo $fnName.'(["http://localhost/test/demo03/images/0.jpg","http://localhost/test/demo03/images/1.jpg","http://localhost/test/demo03/images/2.jpg","http://localhost/test/demo03/images/3.jpg","http://localhost/test/demo03/images/4.jpg","http://localhost/test/demo03/images/5.jpg","http://localhost/test/demo03/images/6.jpg","http://localhost/test/demo03/images/7.jpg","http://localhost/test/demo03/images/8.jpg","http://localhost/test/demo03/images/9.jpg"])';
?>