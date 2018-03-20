var basic = {};
    basic.arr = {0:[{'field':'状态','title':'状态'},
			{'field':'项目名称','title':'项目名称'},
			{'field':'项目类型','title':'项目类型'},
			{'field':'融资主体','title':'融资主体'},
			{'field':'资产编号','title':'资产编号'},
			{'field':'付息方式','title':'付息方式'},
			{'field':'担息金额','title':'担息金额'},
			{'field':'担息天数','title':'担息天数'},
			{'field':'担息原因','title':'担息原因'},
			{'field':'前端费用','title':'前段费用'},
			{'field':'砍头息利率','title':'砍头息利率'},
			{'field':'砍头息','title':'砍头息'},
			{'field':'财顾费率','title':'财顾费率'},
			{'field':'财顾费用','title':'财顾费用'},
			{'field':'砍头息是否扣除','title':'砍头息是否扣除'},
			{'field':'财顾费是否收取','title':'财顾费是否收取'},
			{'field':'是否担保','title':'是否担保'},
			{'field':'担保主体','title':'担保主体'},
			{'field':'担保方式','title':'担保方式'},
			{'field':'是否设立共管','title':'是否设立共管'},
			{'field':'期限','title':'期限（月）'},
			{'field':'放款日期','title':'放款日期'},
			{'field':'总融资规模','title':'总融资规模'},
			{'field':'总成本','title':'总成本'},
			{'field':'成本承担的主体 地产公司','title':'成本承担的主体 地产公司'},
			{'field':'地区公司','title':'地区公司'},
			{'field':'借款人','title':'借款人'},
			{'field':'材料公司','title':'材料公司'},
			{'field':'资管通道','title':'资管通道'},
			{'field':'委贷起始日','title':'委贷起始日'},
			{'field':'委贷终止日','title':'委贷终止日'},
			{'field':'计息天数','title':'计息天数'},
			{'field':'放款开户行','title':'放款开户行'},
			{'field':'放款账号','title':'放款账号'},
			{'field':'还款开户行','title':'还款开户行'},
			{'field':'还款账号','title':'还款账号'},
			{'field':'资产类型','title':'资产类型'}
	]};
	
	basic.wrap = $('#basic-m-flex');
	$(document).ready(function(){
		//  加载 tab 外层模块
		basic.wrap.append(Pages.tabModule(3));
		var html = '<a href="javascript:;" class="flexTab-change">查询</a>';
		basic.wrap.find('.flexTab-u-nav').append(html);
		
		var details = {
			Url:dataUrl.basic,    //资产基础信息url
			Array:basic.arr[0],
			main:basic.wrap.children(':first')
		}
		Pages.getFullFetchData(details);
	})
	
