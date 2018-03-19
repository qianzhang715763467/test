<?php

namespace backend\models\search;

use common\models\Agent;
use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;

/**
 * AdSearch represents the model behind the search form about `backend\models\Ad`.
 */
class AgentSearch extends Agent
{
    public $searchKeywords;
    
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
//            [['status', 'level',  'create_time', 'update_time'], 'integer'],
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
        $query = Agent::find();

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

        if( !empty($params['AgentSearch']['level']) || (isset($params['AgentSearch']['level']) && $params['AgentSearch']['level'] == '0') ){
             $query->andFilterWhere([ 'level' => $params['AgentSearch']['level'] ]);
            $this->level = $params['AgentSearch']['level'];
        }

        if( !empty($params['AgentSearch']['level0_id']) ){
             $query->andFilterWhere([ 'level0_id' => $params['AgentSearch']['level0_id'] ]);
            $this->level0_id = $params['AgentSearch']['level0_id'];
        }

        if( !empty($params['AgentSearch']['level1_id']) ){
             $query->andFilterWhere([ 'level1_id' => $params['AgentSearch']['level1_id'] ]);
            $this->level1_id = $params['AgentSearch']['level1_id'];
        }

        if( !empty($params['AgentSearch']['searchKeywords']) ){
            $query->andFilterWhere( ['like', 'agent_name', $params['AgentSearch']['searchKeywords'] ]);
            $this->searchKeywords = $params['AgentSearch']['searchKeywords'];
        }

        /* 排序 */
        $query->orderBy([
            'id' => SORT_DESC,
        ]);
//debug($query->createCommand()->getRawSql());
        return $dataProvider;
    }
}
