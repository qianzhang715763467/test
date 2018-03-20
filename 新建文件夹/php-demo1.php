<?php
	$list = array('$SERVER','$GET','$POST');
	// 有序的索引
	$list1 = array(
		1 => '$SERVER',
		2 => '$GET'
	);
	// 没有指定 键？ 自行延续已有的索引
	$list1[] = '$POST';
	// 更有意义的索引
	$list2 = array(
		'name' => $_POST['name'],
		'age' => '18',
		'gender' => 'boy'
	);
	// 显示数组内容
	print_r ($list1);
	echo '<br />';
	// 以更加详细的格式呈现数组的结构
	var_dump($list2);
	echo '<br/>';
	$a='hello ';
	$b='<p class="title">php world!<p>';
	// echo 只能输出 标量类型数据
	echo $a,$b,'<br/>';//echo 可以用逗号分隔字符串变量来显示print $a.$b.'<br />';//而print不能使用逗号，只能用点号分隔，print $a,$b.'<br />';//使用逗号时报错。
	var_dump ($_SERVER);
//	echo    命令和    print    命令    相同，没有区别  
//	echo    函数    和    print    函数    有区别。  
//	echo()    无返回值，与echo    命令相同  
//	print()    有返回值，成功，返1，false,返0.    
//	printf()    和    sprintf()    类似，均为格式化输出，不同的是前者输出到标准输出，后者输出到变量 
?>