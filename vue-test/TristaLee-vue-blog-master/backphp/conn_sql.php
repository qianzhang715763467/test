<?php
/**
* 
*/

class ConnMySQL 
{
	protected $HOST = '127.0.0.1';
	protected $UserName = 'root';
	protected $PassWord = '123456';
	protected $Database = 'tristalee_blog';
	public $TEST = 'test';

	public function makeConnect($type,$operate,$params){
		$db = new mysqli($this->HOST, $this->UserName, $this->PassWord,
			$this->Database);
		$db->set_charset("utf8");
		// Check connection

		if ($db->connect_error) {
    		die('Connect Error (' . $db->connect_errno . ') '
            	. $db->connect_error);
		}
		// if (mysqli_connect_error()) {
		//     die('Connect Error (' . mysqli_connect_errno() . ') '
		//             . mysqli_connect_error());
		// }

		switch ($operate) {
			case 'getlist':
				if($type === "tec"){
					$searchSQL = "SELECT * FROM tec_blog ORDER BY creat_time DESC";
				}else if($type === "art"){
					$searchSQL = "SELECT * FROM art_blog ORDER BY creat_time DESC";
				}
				$result = $db -> query($searchSQL);
				if ($result) {
					while ($row = $result -> fetch_object()){
						$tecData[] = $row;
					}
					// print_r($tecData);
					$status["code"] = 1;
					$status["message"] = "success";
					echo json_encode(array('data'=>$tecData,"status"=>$status));  

				    $result->close();
				}else {
					$status["code"] = 0;
					$status["message"] = "无数据";
					echo json_encode(array("status"=>$status));  
				}

				$db->close();
				break;
			case 'addnew':

				if($params['id']){
				    $editId = $params['id'];
				    $editTitle = $params['title'];
				    $editBrief = $params['brief'];
				    $editContent = $params['content'];

				    if($params["typeupload"] === "tec"){
						$stmt = $db->prepare("UPDATE tec_blog SET title = ?, 
						   brief=?, 
						   content=?  
						   WHERE id=?");
					}else if($params["typeupload"] === "art"){
						$stmt = $db->prepare("UPDATE art_blog SET title = ?, 
						   brief = ?, 
						   content = ? 
						   WHERE id = ?");
					}
					
					$stmt->bind_param('sssi',
					  $editTitle,   
					$editBrief,  
					$editContent,
					$editId);
					$stmt->execute(); 
					$stmt->close();


					$status["code"] = 1;
					$status["message"] = "新记录插入成功";

				}else {
					if($params["typeupload"] === "tec"){
						$stmt = $db->prepare("INSERT INTO tec_blog(title,   
	brief,content) VALUES (?, ?, ?)");    
					}else if($params["typeupload"] === "art"){
						$stmt = $db->prepare("INSERT INTO art_blog(title,   
	brief,content) VALUES (?, ?, ?)");  
					}

					$stmt->bind_param('sss', $params['title'],   
					$params['brief'],  
					$params['content']);
					$stmt->execute();  
					$newId = $stmt->insert_id;  
					$stmt->close();  
					
					$status["code"] = 1;
					$status["message"] = "新记录插入成功";
				}
				
				echo json_encode(array("status"=>$status));  
				// if($type === "tec"){
				// 	$list = $conn -> makeConnect('tec');
				// }else if($type === "art"){
				// 	$list = $conn -> makeConnect('art');
				// }
				// return $list;
				# code...
				break;

			case 'getdetail':
				$type = $params["type"];
				$id = $params["id"];
				if($type === "tec"){
					$searchSQL = "SELECT * FROM tec_blog WHERE id=".$id."";
				}else if($type === "art"){
					$searchSQL = "SELECT * FROM art_blog WHERE id=".$id."";
				}

			    $result = $db->query($searchSQL);
			    if($result){
			    	$row  = $result->fetch_assoc();
				   	$status["code"] = 1;
					$status["message"] = "success";
			    }else {
			    	$row='';
			    	$status["code"] = 0;
					$status["message"] = "error";
			    }
			   	
				echo json_encode(array('data'=>$row,"status"=>$status)); 

				break;
			case 'getrecommend':

				$type = $params["type"];
				if($type === "tec"){
					$recommends =  "(1,2,3,4)";
					$searchSQL = "SELECT * FROM tec_blog WHERE id in ".$recommends."";
				}else if($type === "art"){
					$recommends =  "(3,4)";
					$searchSQL = "SELECT * FROM art_blog WHERE id in ".$recommends."";
				}
				// print_r($searchSQL);
			    $result = $db->query($searchSQL);
			    if($result){

			    	while ($row=$result->fetch_assoc()){
				        $result_arr[] = $row;
				    }
				    // print_r($result_arr);
				   	$status["code"] = 1;
					$status["message"] = "success";
			    }else {
			    	$row='';
			    	$status["code"] = 0;
					$status["message"] = "error";
			    }
			   	
				echo json_encode(array('data'=>$result_arr,"status"=>$status)); 

				break;
			case 'user':
				$type = $params["type"];
				$name = $params["name"];
				$pass = $params["pass"];
				if($type == 'signupForm'){
					$stmt = $db->prepare("INSERT INTO user(user_name,   
	password) VALUES (?, ?)");    
					$stmt->bind_param('ss', $params['name'],   
					$params['pass']);
					$stmt->execute();  
					$newId = $stmt->insert_id;  
					$stmt->close();  
					if($newId==0){
						$data["us_name"] = '';
				    	$data["id"] = '';
						$status["code"] = 0;
						$status["message"] = "已有该用户名";
					}else {
						$data["us_name"] = $name;
				    	$data["id"] = $newId;
						$status["code"] = 1;
						$status["message"] = "新记录插入成功";
					}

					
					echo json_encode(array("data"=>$data,"status"=>$status));  
				}else if($type == 'loginForm'){
					$searchSQL = "SELECT * FROM user WHERE user_name='".$name."' and password='".$pass."'";
					$result = $db->query($searchSQL);
					if($result){
				    	$row  = $result->fetch_assoc();
				    	if($row["id"]){
				    		$data["us_name"] = $row["user_name"];
				    		$data["id"] = $row["id"];
				    		$status["code"] = 1;
							$status["message"] = "success";
				    	}else {
				    		$data = [];
				    		$status["code"] = 0;
							$status["message"] = "error";
				    	}
				    	// print_r($row["id"]==' ');
				    	// echo '<br>';
					   	
				    }else {
				    	$row='';
				    	$data = [];
				    	$status["code"] = 0;
						$status["message"] = "error";
				    }

				    echo json_encode(array("status"=>$status,"data"=>$data)); 
				} 

				break;
			case 'deleteItem':
				$id = $params["id"];

				if($type === "tec"){
					$searchSQL = "DELETE FROM tec_blog WHERE id=".$id."";
				}else if($type === "art"){
					$searchSQL = "DELETE FROM art_blog WHERE id=".$id."";
				}

			    $result = $db->query($searchSQL);
			    if($db->affected_rows){
					$status["code"] = 1;
					$status["message"] = "success";
			    }else{
			    	$status["code"] = 0;
					$status["message"] = "error";
			    }

				echo json_encode(array("status"=>$status)); 

				break;
			default:
				# code...
				break;
		}
	}	


	public function hosttest(){
		echo  $this->HOST;
		echo '<br>';
	}
	public function test(){
		echo $this -> TEST;
		echo '<br>';
	}

	// $mysqli->close();
}
// $mysqli = new mysqli('127.0.0.1', 'root', '123456', 'tristalee_blog');
// if ($mysqli->connect_error) {
//     die('Connect Error (' . $mysqli->connect_errno . ') '
//             . $mysqli->connect_error);
// }
// if (mysqli_connect_error()) {
//     die('Connect Error (' . mysqli_connect_errno() . ') '
//             . mysqli_connect_error());
// }

// echo 'Success... ' . $mysqli->host_info . "\n";

// $mysqli->close();


?>