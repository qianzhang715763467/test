<?php
	namespace yii\rhy;
	use yii\base\Object;
	use yii\helpers\Html;
	//对config相头类型数据的控制
	class Config extends Object
	{
		/**
		 * [toHtml 把数据生成html表单返回]
		 * @param  [type] $data [array('name'=>'名称','key'=>'name','value'=>'','html'=>'text','option'=>'')]
		 * @param  string $page [数据模型名称]
		 * @return [type]       [description]
		 */
		public static function toHtml($data,$page='Setting')
		{
			foreach($data as $k => $v)
			{
				switch($v['html'])
				{
					case 'text':
						$form = "<input name='$page"."[{$v['key']}]' type='text' class='input' size='60' value='".Html::encode($v['value'])."' />";
						break;
					case 'image':
						$form = "<input type='text' class='input' id='{$v['key']}' name='$page"."[{$v['key']}]' size='38' value='{$v['value']}'>
								    <a class='button bg-blue button-small  js-img-upload' data='{$v['key']}' id='{$v['key']}_upload' preview='{$v['key']}_preview' href='javascript:;' >
								    	<span class='icon-upload'> 上传</span>
								    </a>
								    <a class='button bg-blue button-small icon-picture-o' id='{$v['key']}_preview' href='javascript:;' > 预览</a>
								    <div class='input-note'></div>
								";
						
						break;
					case 'textarea':
						//百度 编辑器
						$form = "<textarea name='$page"."[{$v['key']}]'  class='input' cols='60' rols='6'>{$v['value']}</textarea>";
						break;
					case 'texts':
						//<textarea></textarea>
						$form = Html::textarea($page."[{$v['key']}]", $v['value'], ['class' => 'input js-editor','style' => 'width:300px;height:400px;']);
						break;
					case 'time':
						//日期选择器

						break;
					case 'radio':
						if(is_array($v['option'])){
							$option = $v['option'];
						}else{
							$arr = explode(',',$v['option']);
							$option = Array();
							foreach($arr as $v2)
							{
								$option[$v2]=$v2;
							}
						}

						$form = Html::radioList($page."[{$v['key']}]",empty($v['value']) ? array_keys($option)[0] : $v['value'],$option);
						break;
					case 'select':
						//select		
									
						if(is_string($v['option']))
						{
							$new_option = array();
							$option = explode(',',$v['option']);	
							foreach($option as $v2)
							{
								$new_option[$v2] = $v2;
							}
							$v['option'] = $new_option;

						}

						$form = Html::dropDownList("$page"."[{$v['key']}]",$v['value'],$v['option'],['class' => 'input','style'=>'min-width:400px;','id'=>$v['key']]);
						break;
					/*case 'tree':
						//生成树状结构的表
						$form = self::createTable($v);
						break;*/
					default:
						//默认为input text
						$form = "<input name='$page"."[{$v['key']}]' type='text' class='input' size='60' value='{$v['value']}' />";
						break;
				}
				$data[$k]['form'] = "<div class='form-group'>
                                <div class='label'><label>{$v['name']}</label></div>
                                <div class='field'>".$form."
                                </div>
                            </div>
                            ";
			}
			return $data;
		}

		/**
		 * [createTable 创建数状表格]
		 * @param  [多维数组]  $data  [父包含子]
		 * @param  [string]  $code  [行中的操作(删除/修改等)]
		 * @param  integer $layer [第几层]
		 * @return [string]         [html代码]
		 */
		public static function createTable($data,$code,$layer=0,$ncode='')
		{

			$table = '';
			if(empty($ncode)){
	
				$ncode = $code;
			}
			$option = $data['option'];
			$fields = $data['fields'];
			if($layer == 0)
			{
			//表格开始
			$table =  <<<EOT
<table id="table" class="table table-hover table-tr-hide">
                <tbody>
                    <tr class="trshow">
EOT;


				
				foreach($fields as $v)
				{
					$table .= "<th>$v</th>";
				}
                $table .='<th>操作</th>';
              	$table .='</tr>';
			}
			

			//添加中间的内容
			foreach($option as $v)
			{	
				//行头

				$table .= '<tr ';
				if(empty($v['pid'])){
					$table .= 'class="trshow" trid="'.$v['id'].'">';
				}
				else{
					$table .= 'style="display:none;" pid="'.$v['pid'].'" trid="'.$v['id'].'" >';
				}

				//加中间的td
				foreach($fields as $field => $v2)
				{
					if($field == 'name' && !empty($v['child']))
					{//name字段,而且有子层
						$table .= '<td style="width:35%;">'.str_repeat('&nbsp;',$layer*16-4 < 0 ? 0 : $layer*16-4).'<a href="#" class="a-btn icon-plus-square">&nbsp&nbsp&nbsp&nbsp;'.$v[$field].'</td>';
					}
					elseif($field == 'name' && empty($v['child']))
					{//name字段,没有子层
						$table .= '<td style="width:35%;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'.str_repeat('&nbsp;',$layer*16).$v[$field].'</td>';	
					}
					elseif(in_array($field,['icon','image']) && !empty($v[$field])){
						$img_ = empty($v[$field]) ? '' : '<a href="'.Html::encode($v[$field]).'" target="_blank"><img style="max-height:50px;" src="'.Html::encode($v[$field]).'" /></a>';
						$table .= '<td>'.$img_.'</td>';		
					}elseif(in_array($field,['dt']) && !empty($v[$field])){
						$table .= '<td>'.date('Y-m-d H:i',$v[$field]).'</td>';		
					}
					else
					{//其他字段
						$table .= '<td>'.Html::encode($v[$field]).'</td>';	

					}
				}

				//行尾，加上操作按钮
				if(empty($v['pid']) || !empty($v['child'])){
					$table .= '<td>'.str_replace("{id}",$v['id'],$code).'</td>';
				}else{
					$table .= '<td>'.str_replace("{id}",$v['id'],$ncode).'</td>';
				}
				$table .='</tr>';

				//如果有子节点
				if(!empty($v['child']))
				{
				
					$table .= self::createTable(['option'=>$v['child'],'fields'=>$fields],$code,$layer+1,$ncode);
				}
			}
			
			//表格结束
			if($layer == 0)
			{
				$table .='</table>';
			}

			return $table;
		}
		
	}

?>