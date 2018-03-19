<?php
	echo "<table border='1' cellspacing='0' cellpadding='0'>";
	echo "<tr><th>ID</th><th>Firstname</th><th>Lastname</th><th>type</th></tr>";
	
	class TableRows extends RecursiveIteratorIterator {
		function __construct($it){
			parent::__construct($it, self::LEAVES_ONLY);
		}
		function current(){
			return "<td style='width:150px;border:1px solid black;'>" . parent::current() . "</td>";
		}
		function beginChildren(){
			echo "<tr>";
		}
		function endChildren(){
			echo "</tr>" . "\n";
		}
	}
	
	$servername = "localhost";
	$username	= "root";
	$password	= "tttttt";
	$dbname		= "RUNOOB";
	$fromname   = "interface";
	$fromfield 	= "id, interface_name, interface_url, interface_descript"; 
	try{
		// 建立表连接
		$conn = new PDO("mysql:host=$servername;dbname=$dbname",$username,$password);
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$conn->query('SET NAMES utf8');
		$stmt = $conn->prepare("SELECT "+$fromfield+" FROM "+$fromname);
		$stmt->execute();
		// 设置结果为关联数组
		$result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
		foreach(new TableRows(new RecursiveArrayIterator($stmt->fetchAll())) as $k=>$v ){
			echo $v;
		}
	} catch (PDOException $e){
		echo "Error:  " . $e->getMessage();
	}
	$conn = null;
	echo "</table>";
?>