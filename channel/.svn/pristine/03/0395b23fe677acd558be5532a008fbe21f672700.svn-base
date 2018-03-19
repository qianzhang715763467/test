<?php
	namespace yii\rhy;
	//操作数状的表
	//树状结构必须包含 parentId上级ID 跟 id自己ID
	class Tree_model extends \yii\db\ActiveRecord
	{
		
	
		/**
		 * [getTree 把指定结点及子结点数据取出]
		 * @param  integer $parentId    [父ID 0表示所有数据]
		 * @param  string  $fields [description]
		 * @return [二维数组]   [子数组放到父数组里面]
		 */
	    public static function getTree($parentId = 0,$fields = '*')
	    {

	        $trees = self::find()
	                    ->select($fields)
	                    ->where(['parentId'=>$parentId])
	                    ->orderBy('order,id')
	                    ->asArray()
	                    ->all();
	        //继续找子菜单

	        foreach($trees as $k => $v)
	        {
	            $child = self::getTree($v['id'],$fields);
	            if(!empty($child)){
	            	$trees[$k]['child'] = $child;
	            }
	        }
	        return $trees;
	    }

	    
	    /*取菜单的树形数据结构  直接给select使用的一维数组*/
	    public static function getSelectTree($parentId = 0,$layer = 0)
	    {

	        $trees = self::find()
	                    ->select(['id','name'])
	                    ->where(['parentId'=>$parentId])
	                    ->orderBy('order,id')
	                    ->asArray()
	                    ->all();

	        //继续找子菜单
	        $options = array();
	        foreach($trees as $k => $v)
	        {
	            $options[$v['id']] = str_repeat("—————",$layer).($layer > 0 ? '| ' : '') . $v['name'];
	            $child = self::getSelectTree($v['id'],$layer+1);
	            $options = array_join($options,$child);
	        }  
	        return empty($options) ? array() : $options;
	    }


		/**
		 * 删除这个结点，及下面的子结点
		 * @param $id =>结点ID
		 * @return bool
		 * @throws \Exception
		 */
		public static function delTree($id)
		{

			 $child = self::find()
	                    ->select(['id','name'])
	                    ->where(['parentId'=>$id])
	                    ->all();
			foreach($child as $v)
			{
				self::delTree($v['id']);
			}

			self::deleteAll('parentId > :parentId', [':parentId' => $id]);
			self::findOne($id)->delete();
			return true;
		}

		/*验证父级ID不能是自己，而parentId不是自己的子ID*/
	    public function noeqid()
	    {
	        if(!empty($this->id) && $this->id == $this->parentId)
	        {
	            $this->addError('id', '自己的上级不能是自己.');
				return false;
	        }elseif(!empty($this->id) && !empty($this->parentId)){
	        	return $this->pnos($this->parentId);
	        }
			return true;

	    }

		/**
		 * @param $parentId 父点 
		 * @param $attr
		 * @return bool  不返回，有问题 addError添加到问题里面
		 */
	    public function pnos($parentId)
	    {
	    	if(!empty($this->id) && !empty($parentId)){
	        	$pp = $this->findOne($parentId);
	        	if($pp->parentId == $this->id){
	        		$this->addError('id', '自己的上级不能是自己的下级.');
	        		return false;
	        	}elseif(!empty($pp->parentId)){
	        		return $this->pnos($pp->parentId);
	        	}
	        }
			return true;
	    }

		/**
		 * 验证a是否是b的子结点
		 * @param $sub	子ID
		 * @param $top	父id
		 * @return bool  true/是   false/不是
		 */
		public function aisbsun($sub,$top)
		{
			$subInfo = $this->findOne(['id'=>$sub]);
			//为空返回假
			if(empty($subInfo) or empty($subInfo->parentId)){
				return false;
			}
			//成功
			if($subInfo->parentId == $top){
				return true;
			}
			//继续向上找
			return $this->aisbsun($subInfo->parentId,$top);
		}

		/**
		 * [childs 找出他的子ID]
		 * @param  [type] $id [分类ID]
		 * @return [array $result]     [一组数组]
		 */
		public static function childs($id,$layer=0){
			$data = self::find()->select(['parentId','id'])->where("parentId='$id'")->asArray()->all();
			
			foreach($data as $r){
				$subdata = self::childs($r['id'],$layer+1);
				if(!empty($subdata)){
					$data = array_merge($data,$subdata);
				}
			}
			if($layer>0){
				return $data;		//不是顶成，直接返回数据
			}else{
				$result = array();
				//顶层，重新弄数组上再上传
				foreach($data as $k => $v){
					$result[] = $v['id'];
				}
				return $result;
			}
		}

		/**
		 * 取最顶层的，二维数组，下标是id
		 */
		public static function gettop($parentId=0)
		{
			$query = self::find()->where(['parentId'=>$parentId])->asArray()->all();
			$data = [];
			foreach($query as $v){
				$data[$v['id']] = $v['name'];
			}
			return $data;
		}

		/**
		 * [parents 取$id的祖宗节点]
		 * @param  [type] $id [description]
		 * @return [type]     [二维数组，最顶级的下标为0]
		 */
		public static function parents($id)
		{
			$data = self::findOne(['id'=>$id]);
			if(empty($data)){
				return [];
			}
			$newdata[] = ['id'=>$data['id'],'name'=>$data['name']];
			if(!empty($data['parentId'])){
				$subdata = self::parents($data['parentId']);
				if(!empty($subdata)){
					$newdata = array_merge($subdata,$newdata);
				}
			}
			return $newdata;
		}

		/**
		 * [parents 看自己是否有子结点]
		 * @param  [type] $id [description]
		 * @return [type]     [二维数组，最顶级的下标为0]
		 */
		public static function hasChild($id)
		{
			$data = self::findOne(['parentId'=>$id]);
			if($data){
				return true;
			} else {
				return false;
			}
		}
	}


?>