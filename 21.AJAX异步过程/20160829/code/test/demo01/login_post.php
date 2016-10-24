<?php
	session_start();
?>
<?php
	if($_POST["uName"]=="admin"&&$_POST=="123456"){
		$_SESSION = $_POST["uName"];
		echo "1";
	}else{
		echo "0";
	}
?>