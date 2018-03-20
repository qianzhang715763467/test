var costs = {};
    costs.arr = {0:[{'field':'loan_id','title':'序号'},
			{'field':'assets_no','title':'资产编号'},
			{'field':'project_type','title':'交易结构'},
			{'field':'trans_name','title':'企业名称'},
			{'field':'project_name','title':'项目名称'},
			{'field':'int_pay_mode','title':'计息方式'},
			{'field':'zichan_type','title':'资产类型'},
			{'field':'total_amount','title':'总规模'},
			{'field':'assets_cost','title':'资产成本（%）'},
			{'field':'assert_manager_name','title':'资产通道机构名'},
			{'field':'assert_manager_bank_account','title':'资产通道开户名'},
			{'field':'asset_manager_bank_acct','title':'资产银行账号'},
			{'field':'prod_issuer_bank_acct','title':'SPV银行账号'},
			{'field':'assert_issuer_bank_account','title':'SPV开户行'},
			{'field':'assert_issuer_bank_holder','title':'SPV开户名'},
			{'field':'assets_name','title':'资管份额名'},
			{'field':'assets_scale','title':'资管份额规模'},
			{'field':'min_trans_time','title':'募集起始日'},
			{'field':'max_trans_time','title':'募集结束日'},
			{'field':'base_prod_name','title':'基础产品名'},
			{'field':'base_prod_scale','title':'基础产品规模'},
			{'field':'fund_trans_amount','title':'基础产品已募集规模'},
			{'field':'display_rate','title':'app显示年化收益'},
			{'field':'marketing_extra_yield_rate','title':'营销贴息'},
			{'field':'real_rate','title':'实际年化利率'},
			{'field':'inception_date','title':'产品成立日'},
			{'field':'due_date','title':'产品到期日'},
			{'field':'product_limit','title':'产品期限'},
			{'field':'per_year_date','title':'产品年天数'},
			{'field':'category_name','title':'产品期限月'},
			{'field':'deduction_amt','title':'现金券成本'},
			{'field':'add_rate_amt','title':'加息成本'},
			{'field':'marketing_extra_yield','title':'营销贴息成本'}
	]};
	
	costs.wrap = $('#laterPeriodCosts-m-flex');

$(document).ready(function(){
		//  加载 tab 外层模块
		costs.wrap.append(Pages.tabModule(4));
		var html = '<a href="javascript:;" class="flexTab-change">查询</a>';
		costs.wrap.find('.flexTab-u-nav').append(html);
		
		// 前一周时间
		var myDate = new Date(),
		 	date = new Date(myDate.getTime() - 7 * 24 * 3600 * 1000);
		 	month = (date.getMonth()+1) < 10 ? '0'+(date.getMonth()+1) : (date.getMonth()+1),
		 	myDay = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
		var startDate = myDate.getFullYear() +'-'+ month +'-'+ myDay;
		var endDate = "" + myDate.getFullYear() + "-";
		   	endDate += (myDate.getMonth()+1) > 9? (myDate.getMonth()+1) + "-" : '0'+(myDate.getMonth()+1) + "-";
		   	endDate += myDate.getDate() > 9? myDate.getDate() : '0'+myDate.getDate();
		var details = {
			Url:dataUrl.laterPeriodCosts+'&start_date='+startDate+'&end_date='+endDate,     //资产后期费用url
			Array:costs.arr[0],
			main:costs.wrap.children(':first')
		}
		Pages.getFullFetchData(details);
	})
	
