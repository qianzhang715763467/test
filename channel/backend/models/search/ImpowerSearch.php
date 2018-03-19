<?php

namespace backend\models\search;

use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use backend\models\Profit;
use backend\models\Agent;
use yii\linslin\Curl;
/**
 * OrderSearch represents the model behind the search form about `backend\models\Order`.
 */
class ImpowerSearch extends Profit
{
    public $buyer_name;
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
        //根据level判断显示成员
        if(Yii::$app->session['isLanYe']){
            $query = Profit::find();

        }else{
            $query = Profit::find();
            if(Yii::$app->session['level'] === Agent::LEVEL_ROOT){

                $query->where(['level0_id'=>Yii::$app->user->identity->agent_id])->all();
            }
            if(Yii::$app->session['level']==Agent::LEVEL_FIRST){

                $query->where(['level1_id'=>Yii::$app->user->identity->agent_id])->all();
            }
        }



        //查询
        if($params){
            if( $params['ImpowerSearch']['end_time']!='0' ){
                    if($params['ImpowerSearch']['end_time']==Profit::ONE_WEEK){
                        $time = strtotime('+1 week');
                        $this->end_time = Profit::ONE_WEEK;
                    }
                    if($params['ImpowerSearch']['end_time']==Profit::ONE_MONTH){
                        $time = strtotime('+1 month');
                        $this->end_time = Profit::ONE_MONTH;
                    }
                    if($params['ImpowerSearch']['end_time']==Profit::THREE_MONTH){
                        $time = strtotime('+3 month');
                        $this->end_time = Profit::ONE_MONTH;
                    }
                    $query->andFilterWhere(['>=', 'end_time', time()]);
                    $query->andFilterWhere(['<', 'end_time', $time]);
            }
            if( !empty($params['ImpowerSearch']['buyer_name']) ){
                $this->buyer_name = $params['ImpowerSearch']['buyer_name'];
                $query->andFilterWhere(['like', 'buyer_name', $params['ImpowerSearch']['buyer_name']]);
            }

        }

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'pagination' => [
                'pageSize' => 10,
            ],
        ]);

        if (!$this->validate()) {

            return $dataProvider;
        }
        return $dataProvider;

    }


}
