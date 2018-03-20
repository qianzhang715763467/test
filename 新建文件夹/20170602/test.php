<?php
if (!function_exists('imagepng')) {
    echo "GD不存在";
	die;
}
//指定图片路径
$src = './img1/pic2.jpg';
//获取图片信息
$info = getimagesize($src);
//获取图片扩展名
$type = image_type_to_extension($info[2],false);
//动态的把图片导入内存中
$fun = "imagecreatefrom{$type}";
$image = $fun('./img1/pic2.jpg');
//指定字体颜色
$col = imagecolorallocatealpha($image,255,255,255,50);
//指定字体内容
$content = 'tianyuan';
//给图片添加文字
$font='./my.ttf';
imagestring($image,5,50,100,$content,$col);
//指定输入类型
header('Content-type:'.$info['mime']);
//动态的输出图片到浏览器中
$func = "image{$type}";
$func($image);
console.log($image);
?>




