<?php

namespace backend\models\search;

use common\models\Settlement;
use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;

/**
 * AdSearch represents the model behind the search form about `backend\models\Ad`.
 */
class SettlementSearch extends Settlement
{
    public $create_time;
    public $end_time;
    /**
     * 获取审核类别
     */
    public static function getOperationApplyMap(){
        return [
            self::ASK_STATUS_WAIT => '待审核',
            self::ASK_STATUS_PASS => '已通过',
            self::ASK_STATUS_REJECT => '已驳回',
        ];
    }
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


        $query = Settlement::find();
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

        if( !empty($params['SettlementSearch']['create_time']) ){
            $query->andFilterWhere(['>=', 'create_time', strtotime( $params['SettlementSearch']['create_time'] . '00:00:00')]);
        }

        if( !empty($params['SettlementSearch']['update_time']) ){
            $query->andFilterWhere(['<=', 'create_time', strtotime( $params['SettlementSearch']['update_time'] . '23:59:59')]);
        }
        if( !empty($params['SettlementSearch']['ask_status'])){
            $query->andFilterWhere(['=', 'ask_status', $params['SettlementSearch']['ask_status']]);
        }
        if(!empty($params['SettlementSearch']['settlement_name'])){
            $query->andFilterWhere(['like', 'settlement_name', $params['SettlementSearch']['settlement_name']]);
        }




        /* 排序 */
        $query->orderBy([
            'id' => SORT_DESC,
        ]);

        return $dataProvider;
    }

    
    /**
     * 打款列表
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function playMoneySearch($params)
    {


        $query = Settlement::find();
        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'pagination' => [
                'pageSize' => 10,
            ],
        ]);
       
        if( isset($params['SettlementSearch']) ){
            foreach($params['SettlementSearch'] as $k => $v){
                $this->{$k} = $v;
            }
        }
        

        $this->load($params);
        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }
        $query->where([
            'ask_status' => self::ASK_STATUS_PASS
        ]);
        //查申请人名称
        if( !empty($params['SettlementSearch']['settlement_name']) ){
            $query->andFilterWhere(['settlement_name' => $params['SettlementSearch']['settlement_name']]);
        }
        //付款状态
        if( !empty($params['SettlementSearch']['pay_status']) ){
            $query->andFilterWhere(['pay_status' => $params['SettlementSearch']['pay_status']]);
        }
        //结算单号
        if( !empty($params['SettlementSearch']['settlement_no']) ){
            $query->andFilterWhere(['settlement_no' => $params['SettlementSearch']['settlement_no']]);
        }
        //申请时间
        if( !empty($params['SettlementSearch']['create_time']) ){
            $query->andFilterWhere(['>=', 'create_time', strtotime( $params['SettlementSearch']['create_time'] . '00:00:00')]);
            $this->create_time = $params['SettlementSearch']['create_time'];
        }

        if( !empty($params['SettlementSearch']['end_time']) ){
            $query->andFilterWhere(['<=', 'create_time', strtotime( $params['SettlementSearch']['end_time'] . '23:59:59')]);
            $this->end_time = $params['SettlementSearch']['end_time'];
        }

        /* 排序 */
        $query->orderBy([
            'id' => SORT_DESC,
        ]);
//debug($query->createCommand()->getRawSql());
        return $dataProvider;
    }
}
