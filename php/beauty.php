<?php  
	require "conn.php";

	$result=mysql_query("select *,rand() as r from new order by r limit 0,7");//"SELECT *,RAND() as r FROM NEW ORDER BY r LIMIT 0,5"

	$arrdata=array();
	for($i=0;$i<mysql_num_rows($result);$i++){
		$arrdata[$i]=mysql_fetch_array($result,MYSQL_ASSOC);
	}

	echo json_encode($arrdata);
?>