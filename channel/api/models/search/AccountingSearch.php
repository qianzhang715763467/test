<?php

namespace api\models\search;

use common\models\Accounting;
use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;

/**
 * AdSearch represents the model behind the search form about `backend\models\Ad`.
 */
class AccountingSearch extends Accounting
{
    public $create_time;
    public $end_time;
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [];
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
     * 查询待入账明细
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params){
        $query = Accounting::find();
        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'pagination' => [
                'pageSize' => 10,
                'page' => $params['page']
            ],
        ]);

        $this->load($params);
        if (!$this->validate()) {
            return $dataProvider;
        }
        if( isLanYe() ){
            $query->andFilterWhere( ['account_id' => $params['account_id'] ] );
        }else{
            $query->andFilterWhere( ['account_id' => $params['account_id'] ] );
        }

        $query->andFilterWhere([
            'doc_type' => Accounting::DOC_TYPE_INCOME,
        ]);
        $query->andFilterWhere(['>', 'account_date', strtotime(date("Y-m-d 23:59:59"))]);

        if( !empty($params['create_time']) ){
            $query->andFilterWhere(['>=', 'account_date', $params['start_time']]);
        }

        if( !empty($params['end_time']) ){
            $query->andFilterWhere(['<=', 'account_date', $params['end_time']]);
        }


        /* 排序 */
        $query->orderBy([
            'id' => SORT_DESC,
        ]);

        return $dataProvider;
    }

    /**
     * 查询收入明细
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function incomeAndOutcome($params){
        $query = Accounting::find();
        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'pagination' => [
                'pageSize' => 10,
                'page' => $params['page']
            ],
        ]);

        $this->load($params);
        if (!$this->validate()) {
            return $dataProvider;
        }
        if( isLanYe() ){
            $query->andFilterWhere( ['account_id' => $params['account_id'] ] );
        }else{
            $query->andFilterWhere( ['account_id' => $params['account_id'] ] );
        }

        $query->andFilterWhere([
            'status' => Accounting::STATUS_ACTUAL,
        ]);
        $query->andFilterWhere(['<=', 'account_date', strtotime(date("Y-m-d 23:59:59"))]);

        if( !empty($params['start_time']) ){
            $query->andFilterWhere(['>=', 'account_date', $params['start_time']]);
        }else{
            //默认一个月前至今
            $onMonthBefore =  date( "Y-m-d",strtotime( "-1 month" ) ). ' 00:00:00';
            $query->andFilterWhere(['>=', 'account_date', strtotime( $onMonthBefore )]);
        }

        if( !empty($params['end_time']) ){
            $query->andFilterWhere(['<=', 'account_date', $params['end_time']]);
        }


        /* 排序 */
        $query->orderBy([
            'id' => SORT_DESC,
        ]);

        return $dataProvider;
    }
}
