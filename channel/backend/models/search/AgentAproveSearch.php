<?php

namespace backend\models\search;

use common\models\AgentAprove;
use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;

/**
 * AdSearch represents the model behind the search form about `backend\models\Ad`.
 */
class AgentAproveSearch extends AgentAprove
{
    public $create_time;
    public $end_time;
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
        ];
    }

    /**
     * @inheritdoc
     */
    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params)
    {

        if(Yii::$app->session['isLanYe']){
            $query = AgentAprove::find();
        }else{
            $query = AgentAprove::find();
            if(Yii::$app->session['level'] === AgentAprove::LEVEL_0){

                $query->where(['level0_id'=>Yii::$app->user->identity->agent_id])->all();
            }
            if(Yii::$app->session['level']==AgentAprove::LEVEL_1){

                $query->where(['level1_id'=>Yii::$app->user->identity->agent_id])->all();
            }
        }
        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'pagination' => [
                'pageSize' => 10,
            ],
        ]);
       
        //设置前端显示数据
        if($params){
            $this->create_time = $params['AgentAproveSearch']['create_time'];
            $this->end_time = $params['AgentAproveSearch']['end_time'];
        }
        

       

        if( !empty($params['AgentAproveSearch']['create_time']) ){
            $query->andFilterWhere(['>=', 'create_time', strtotime( $params['AgentAproveSearch']['create_time'] . '00:00:00')]);
        }

        if( !empty($params['AgentAproveSearch']['end_time']) ){
            $query->andFilterWhere(['<=', 'create_time', strtotime( $params['AgentAproveSearch']['end_time'] . '23:59:59')]);
        }
        
        //$query->andFilterWhere(['like', 'status', $this->status])
        //    ->andFilterWhere(['like', 'level', $this->level]);


        /* 排序 */
        $query->orderBy([
            'id' => SORT_DESC,
        ]);
        
        return $dataProvider;
    }
}
