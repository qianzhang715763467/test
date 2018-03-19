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
class IndexSearch extends Profit
{

    public $create_time; // 搜索开始时间
    public $order_time; // 搜索结束时间
    public $update_time;
    public $pay_time;

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

        $query = Profit::find()->asArray();

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

        if( !empty($params['IndexSearch']['create_time']) ){
            $query->andFilterWhere(['>=', 'order_time', strtotime( $params['IndexSearch']['create_time'] . '00:00:00')]);
            $this -> create_time = $params['IndexSearch']['create_time'];
        }

        if( !empty($params['IndexSearch']['order_time']) ){
            $query->andFilterWhere(['<=', 'order_time', strtotime( $params['IndexSearch']['order_time'] . '23:59:59')]);
            $this -> order_time = $params['IndexSearch']['order_time'];
        }
        if( !empty($params['IndexSearch']['update_time']) ){
            $query->andFilterWhere(['>=', 'pay_time', strtotime( $params['IndexSearch']['update_time'] . '00:00:00')]);
            $this -> update_time = $params['IndexSearch']['update_time'];
        }

        if( !empty($params['IndexSearch']['pay_time']) ){
            $query->andFilterWhere(['<=', 'pay_time', strtotime( $params['IndexSearch']['pay_time'] . '23:59:59')]);
            $this -> pay_time = $params['IndexSearch']['pay_time'];
        }
        return $dataProvider;
    }
}
