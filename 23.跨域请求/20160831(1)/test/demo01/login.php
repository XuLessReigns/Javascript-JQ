
<?php 
	//启动seesion
	session_start(); 
?>

<?php 
	//告诉浏览器渲染的时候，用utf-8的编码形式展示
	header("Content-Type:text/html;   charset=utf-8");
	//http://localhost/test/demo01/login.php?uName=abc&pd=123456
	//$_GET 和 $_POST 
	//假如 用户名是admin 并且密码是123456  登录成功  否则，登录失败
	/*
	if($_GET["uName"]=="admin"&&$_GET["pd"]=="123456"){
		$u = $_GET["uName"];
		$_SESSION["uName"]=$u;
		echo "1";
		
	}else{
		echo "0";
	}
	*/

	if($_POST["uName"]=="admin"&&$_POST["pd"]=="123456"){
		
		$_SESSION["userName"]=$_POST["uName"];
		echo "1";
		//登录成功  
		
		
	}else{
		echo "0";
		//用名或密码错误   0
	}
	
?>