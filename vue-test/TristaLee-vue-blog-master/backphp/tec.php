<?php
include "conn_sql.php";
header("Content-Type:text/html;charset=utf-8");
header("Access-Control-Allow-Origin:*");

/**
* 
*/
// class Tec extends ConnMySQL
// {
// 	public function getData(){
// 		$allTec = parent::makeConnect('tec');
// 		print_r($allTec);
// 		echo '<?br>';
// 	}

// }

// $test = new Tec();
// $test->getData();

// echo "<br>";
$conn = new ConnMySQL;
function options($conn,$post){
	$params = $post;

	if(key_exists("type",$params)&&key_exists("operate",$params)){
		$type = $params["type"];
		$operate = $params["operate"];
		$results = null;
		// print_r(expression)
		$results = $conn -> makeConnect($type,$operate,$params);


			// $results = $conn -> makeConnect($type,$operate,$params);
		
		echo $results;
		
		
	}

	// $conn -> test();
	// $conn -> hosttest();
}

options($conn,$_POST);

?>