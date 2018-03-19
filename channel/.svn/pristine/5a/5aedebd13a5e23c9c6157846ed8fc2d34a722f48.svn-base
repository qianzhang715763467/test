<?php
namespace yii\rhy;
/**
 * 图像处理
 */
class image {

	/**
	 * [watermark 给图片增加水印]
	 * @param  [type] $src_f [要增加水印的图片]
	 * @param  [type] $dst_f [水印图片]
	 * @return [type]        [description]
	 */
	public static function watermark($src_f,$dst_f)
	{

		/*if(!file_exists($src_f) or !file_exists($dst_f)){
			return false;
		}*/
		$groundImg = $src_f;
		$groundInfo = getimagesize($groundImg);

		$ground_w = $groundInfo[0];
		//print_r($groundInfo);
		$ground_h = $groundInfo[1];
		switch($groundInfo[2]){
		case 1:
		$ground_im = imagecreatefromgif($groundImg);
		break;
		case 2:
		$ground_im = imagecreatefromjpeg($groundImg);
		break;
		case 3:
		$ground_im = imagecreatefrompng($groundImg);
		break;
		}

		$waterImg = $dst_f;
		$imgInfo =getimagesize($waterImg);
		$water_w = $imgInfo[0];
		$water_h = $imgInfo[1];

		switch($imgInfo[2]){
		case 1:
		$water_im = imagecreatefromgif($waterImg);
		break;
		case 2:
		$water_im = imagecreatefromjpeg($waterImg);
		break;
		case 3:
		$water_im = imagecreatefrompng($waterImg);
		break;
		}
		$start_x = $ground_w - $water_w;
		$start_y = $ground_h - $water_h;
		/*echo "ground_w:$ground_w<br/>";
		echo "ground_h:$ground_h<br/>";
		echo "water_w:$water_w<br/>";
		echo "water_h:$water_h<br/>";
		echo "start_x:$start_x<br/>";
		echo "start_y:$start_y<br/>";*/

		imagecopy($ground_im,$water_im,$start_x,$start_y,0,0,$water_w,$water_h);
		imagejpeg($ground_im,$src_f); 
	}
}
?>