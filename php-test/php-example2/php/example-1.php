<?php
	$dbhost = 'localhost';  // mysql服务器主机地址
	$dbuser = 'root';            // mysql用户名
	$dbpass = 'tttttt';          // mysql用户名密码
	$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
	if(! $conn )
	{
	    die('Could not connect: ' . mysqli_error());
	}
	echo "数据库连接成功\n";
	echo "<br />";
	
	// 选择数据库
	$retval = mysqli_select_db($conn,"RUNOOB");
	if(!$retval){
		
		
		// 创建数据库
    	$sql = "CCREATE DATABASE RUNOOB 
			GO
			use RUNOOB
			CREATE TABLE [syco] (
			[departcode] varchar(2) NOT NULL,
			[departname] varchar(40) NULL
			)";
		$retval = mysqli_query($conn,$sql);
		
		if(!$retval)
		{
		    die('创建数据库失败: ' . mysqli_error($conn));
		}
		echo "数据库 RUNOOB 创建成功\n";
		echo "<br />";
		/*// 使用 sql 创建数据表
		$sql = "CREATE TABLE MyGuests (
			id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
			firstname VARCHAR(30) NOT NULL,
			lastname VARCHAR(30) NOT NULL,
			email VARCHAR(50),
			reg_date TIMESTAMP
			)";
		
		if ($conn->query($sql) === TRUE) {
		    echo "创建数据表 MyGuests 成功";
		} else {
		    echo "创建数据表错误: " . $conn->error;
		}*/
		
	}else{
		
		// 删除数据库
		$sql = 'DROP DATABASE RUNOOB';
		$retval = mysqli_query( $conn,$sql);
		if(! $retval )
		{
		    die('删除数据库失败: ' . mysqli_error($conn));
		}
		echo "数据库 RUNOOB 删除成功\n";
	}
	
	
	mysqli_close($conn);
?>