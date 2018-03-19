<?php
	$servername = "localhost"; 	// mysql服务器主机地址
	$username   = "root";		// mysql用户名
	$password	= "tttttt";	// mysql密码
	$dbname		= "wind_cloud";  // mysql表名

	// 创建连接
	$conn = new mysqli($servername,$username,$password,$dbname);
	// 检测连接
	if($conn->connect_error){
		die("连接失败：".$conn->connect_error);
	}
	//mysqli_set_charset($conn, "utf8");
	//mysqli_query($conn,"SET NAMES utf8");
	$conn->query("SET NAMES utf8");
	// 从 wind_cloud 数据库的 interface 表读取了 id ~ interface_descript 列的数据,并赋值给变量 $result
	$sql = "SELECT id, interface_name, interface_url, interface_descript FROM interface";
	$result = $conn->query($sql);
	// 函数 num_rows()判断返回的数据，如果是多条
	if($result->num_rows > 0){
		// 函数 fetch_assoc（）将结合集（字符集）赋给变量 $row ，并循环输出
		while($row = $result->fetch_assoc()){
			echo "ID："					.$row["id"]
				."<br>"
				."interface_name："		.$row["interface_name"]
				."<br>"
				."interface_url："		.$row["interface_url"]
				."<br>"
				."interface_descript："	.$row["interface_descript"]
				."<br>";
		}
		// 取一行数据
		$row = $result->fetch_row();
		echo $row[1];// 输出第一个字段的值
	}else{
		echo "结果为 0 ";
	}
	// 关闭连接
	$conn->close();
?>