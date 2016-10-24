<?php 
	//启动seesion
	session_start(); 
?>
<!doctype html>
<html lang="en">
 <head>
  <meta charset="UTF-8">
  <meta name="Generator" content="EditPlus®">
  <meta name="Author" content="">
  <meta name="Keywords" content="">
  <meta name="Description" content="">
  <title>Document</title>
  <script></script>
 </head>
 <body>
	<?php
		echo "<h1>欢迎光临".$_SESSION["userName"]."</h1>"
	?>
 </body>
</html>
