<?php

namespace backend\models\search;

use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use backend\models\Profit;
use backend\models\Agent;
/**
 * OrderSearch represents the model behind the search form about `backend\models\Order`.
 */
class IncomeSearch extends Profit
{

    public $from_date; // 搜索开始时间
    public $to_date; // 搜索结束时间

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
        //$params = $params ? : Yii::$app->request->getQueryParams();
        if(Yii::$app->session['isLanYe']){
            $query = Profit::find()->asArray();
        }else{
            $query = Profit::find();
            if(Yii::$app->session['level'] === Agent::LEVEL_ROOT){

                $query->where(['level0_id'=>Yii::$app->user->identity->agent_id])->asArray()->all();
            }
            if(Yii::$app->session['level']==Agent::LEVEL_FIRST){

                $query->where(['level1_id'=>Yii::$app->user->identity->agent_id])->asArray()->all();
            }
        }

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'pagination' => [
                'pageSize' => 10,
            ],
        ]);


        $this->load($params);

        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }

        if( !empty($params['IncomeSearch']['create_time']) ){
            $query->andFilterWhere(['>=', 'order_time', strtotime( $params['IncomeSearch']['create_time'] . '00:00:00')]);
        }

        if( !empty($params['IncomeSearch']['order_time']) ){
            $query->andFilterWhere(['<=', 'order_time', strtotime( $params['IncomeSearch']['order_time'] . '23:59:59')]);
        }
        if( !empty($params['IncomeSearch']['update_time']) ){
            $query->andFilterWhere(['>=', 'pay_time', strtotime( $params['IncomeSearch']['update_time'] . '00:00:00')]);
        }

        if( !empty($params['IncomeSearch']['pay_time']) ){
            $query->andFilterWhere(['<=', 'pay_time', strtotime( $params['IncomeSearch']['pay_time'] . '23:59:59')]);
        }

        /* 排序 */
        $query->orderBy([
            'create_time' => SORT_DESC,
        ]);
        return $dataProvider;
    }
}
