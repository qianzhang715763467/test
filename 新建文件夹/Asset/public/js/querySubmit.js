
// Search bar state
function searchBarState(event){
	// query Button
	var $queryButton = $(event); 
	var $queryBox = $('#date-query');
	var $Form = $queryBox.children();
	// 当前显示页面的ID
	var pageName = $queryButton.parents('.m-flex').attr('id');
	// 显示搜索框
    if ($queryButton.hasClass('flexTab-change')) {
        $queryButton.parent().css('line-height', '70px');
        $queryBox.show();
        $Form.children().show();
	 	$Form.children().show();
        $Form.children('.u-datails').eq(1).find('.datails').children('input').attr('placeholder', '请输入成立日期');
        // 不同页面显示不同搜索
        switch(pageName){
        	// 资产基础信息
        	case 'basic-m-flex':
        		$Form.children(':not(:first)').hide();
        		break;
        	// 放款统计	
        	case 'makeLoans-m-flex':
        		$Form.children(':not(:first)').hide();
	        	$Form.children('hr:first').show();
	        	$Form.children('.u-datails').eq(2).show().find('input').attr('placeholder', '请输入资产放款日');
        		break;
    		// 资产后期费用
        	case 'laterPeriodCosts-m-flex':
	        	$Form.children(':nth-child(1n+3)').hide();
	            $Form.children(':nth-child(5n)').show();
	            $Form.children(':nth-child(5n)').find('.datails').children('input:eq(0)').attr('placeholder', '请输入募集开始日期');
	            $Form.children(':nth-child(5n)').find('.datails').children('input:eq(1)').attr('placeholder', '请输入募集结束日期');
        		break;
        	default:
        		$Form.children('.u-datails').not(':first').show();
        }
       	// submit buttons
        $Form.children('.submit').show();
    }
    // 隐藏搜索
    if ($queryButton.attr('id') == 'date-query') {
        $queryButton.hide();
    }
}

// query condition
function querySubmit(event){
	var queryBox = $(event).parents('#date-query');
	var flex = $('.m-flex');
	var Collect = queryBox.find('.u-datails:eq(2)').find('.datails').children('input:eq(0)').val();
	var InvestmentLendingDayStart = queryBox.find('.u-datails:last').find('.date-datails').children('input:eq(0)').val();
	var InvestmentLendingDayEnd = queryBox.find('.u-datails:last').find('.date-datails').children('input:eq(1)').val();
	if( flex.is(':hidden')) return;
	if( flex.attr('id') == 'laterPeriodCosts-m-flex' && Collect.replace(/\s+/g,"").length == 10){
	   /*   当前显示页面为 ‘资产后期费用’ & 募集日正确
        *   1.清除text，
        *   2.发送请求日期，重新加载数据
        * */
        var mydate = new Date();
       	var str = "" + mydate.getFullYear() + "-";
		   	str += (mydate.getMonth()+1) > 9? (mydate.getMonth()+1) + "-" : '0'+(mydate.getMonth()+1) + "-";
		   	str += mydate.getDate() > 9? mydate.getDate() : '0'+mydate.getDate();
       	var endTime = queryBox.find('.u-datails:eq(2)').find('.datails').children('input:eq(1)').val();
       	if(Collect > str)return alert('开始日期不能大于当前日期！');
       	if(endTime.replace(/\s+/g,"").length == 0)endTime = str;
   		if(endTime.replace(/\s+/g,"").length == 10){
   			if(endTime < Collect)return alert('开始日期不能大于结束日期！');
   			//  日期效验正确，请求数据
   			$('#laterPeriodCosts-m-flex').empty();
	        //  加载 tab 外层模块
	        costs.wrap.append(Pages.tabModule(4));
	        var html = '<a href="javascript:;" class="flexTab-change">查询</a>';
	        costs.wrap.find('.flexTab-u-nav').append(html);
	        var details = {
	            Url: 'http://ds.idc.xiwanglife.com/dataservice/getconfig.do?id=95&start_date='+Collect+'&end_date='+endTime,
	            Array: costs.arr[0],
	            main: costs.wrap.children(':first'),
	            laterName:'later'
	        }
	        Pages.getFullFetchData(details);
	        queryBox.hide();
   		}
	}else if( flex.attr('id') == 'makeLoans-m-flex'){
	   /*   当前显示页面为 ‘放款统计’ & 资产放款日正确
        *   1.清除text，
        *   2.前端筛选日期，重新加载数据;
        * 	3.当前页面存在合并行，所以筛选备用数据。用筛选过后的数据替换原有数据;
        * */
        var $tbody = $('#makeLoans-m-flex').find('#randomTa').find('tbody');
        $tbody.empty();
		$('#makeLoans-m-flex').find('.footer').remove()
		var arr = ["loan_id","assets_name","","total_amount","assets_no","amount","amount","assets_cost",
					"inception_date","due_date","product_limit","per_year_date","profit","profit","project_name",
					"","","","","","","","","","","","","no_loan_amount","no_loan_amount"];
		var colgroupHtml = "",
            amount = 0,
            profit = 0,
            count = 0,
            makeLoan=[];
        var startDate=$(".u-datails:eq(2)").children('div').find('input').eq(0);
        var endDate=$(".u-datails:eq(2)").children('div').find('input').eq(1);
        var startDateOldVal=startDate.val();
        var endDateOldVal=endDate.val();
        var startDateNewVal;
        var endDateNewVal;
        for (var i = 0; i < useObj.length; i++) {
        	// 查询信息
	       	if(queryBox.find('.date-datails').children('input').length < 2){
	       		var val  = queryBox.find('.date-datails').children('input').val();
                if(val.length<=0){
                    alert('"请输入查询信息"不能为空！');
                    return;
                }
                if(JSON.stringify(useObj[i]).indexOf(val) >= 0){
	       			var $tbodyTr = $('<tr></tr>');
	                // each thead,The tbody content and thead consistent sequence
	                for(var n = 0; n < Array.length; n++) {
	                	var field = Array[n].field;
	                	var job = useObj[i][field];
                        var td = $('<td></td>');
	                		if(job != undefined && job.toString().indexOf(val) >= 0){
	                			td.css('color','#eca313');
                			}
                		// 序号
	                    if (field == 'loan_id') {
	                    	td.html(count+1);
	                        // 投资收益合计;
	                    } else if (field == '底层资产投资收益') {
	                        profit += Number(job);
	                        // 投资金额合计
	                    } else if (field == '底层资产投资金额') {
	                        amount += Number(job);
	                        // 保留三位
	                    } else if (field == 'marketing_extra_yield_rate' || field == 'real_rate') {
	                        var nub = parseFloat(job).toFixed(3);
	                        td.html(nub).addClass("pointer flexTab-create");
	                        // 资产编号特殊设置，用于操作下级tab;
	                    } else {
	                    	if(job == undefined){
	                    		td.html("");
	                    	}else{
	                    		td.html(job);
	                    	}
	                    }

	                    //金额显示特殊处理
	                    if (!isNaN(Number(job))) {
	                        if ($.trim(job).length < 1 || field == 'loan_bank_no' || field == 'repay_bank_no'
	                                || field == 'rate_days' || field == 'loan_id' || field == 'month_category'
	                                || field == 'product_limit' || field == 'per_year_date' || field == 'product_limit'
	                                || field == 'asset_manager_bank_acct' || field == 'prod_issuer_bank_acct'
	                                || field == 'marketing_extra_yield_rate' || field == 'real_rate'
	                        ) {
	                            false
	                        } else {
	                            var t = parseFloat(job).toFixed(2);
	                            if (t.indexOf('.00') >= 0) {
	                            	td.html(parseFloat(t).toLocaleString() + '.00');
	                            } else {
	                            	td.html(parseFloat(t).toLocaleString());
	                            }
	                        }
	                    }

                    	$tbodyTr.append(td);
                	}
	                count++
	       		}
            	$tbody.append($tbodyTr);

			}else{
				// 资产放款日
                $('#makeLoans-m-flex').find('tr').remove();
				var startDateString=Date.parse(new Date(startDate.val()));
				var endDateString=Date.parse(new Date(endDate.val()));
				if(startDateString>endDateString){
					alert("结束日期不能小于开始日期!");
					return;
				}
				if((startDateString>=useObj[i]['资产放款日'] && startDateString<=useObj[i]['资产还款日'])||(endDateString>=useObj[i]['资产放款日']&&endDateString<=useObj[i]['资产还款日'])){
					makeLoan.push(useObj[i]);
                    count++;
				}
			}
		};
        if(queryBox.find('.date-datails').children('input').length >= 2){
            ajaxData(makeLoan);
		}
		queryBox.hide();
        var tip = '<span id="tip"class="Auto">符合当前条件数据 共：' + count + '条</span>';
        $('.m-flex').children(':first').parent().append(tip);
        $('#data-item').children(':first').html(count);
        $('#data-item').children(':last').html("").prev().hide();
        // 发送数据
        //queryBox.hide();
        setTimeout(function () {
            $('#tip').remove();
            count = 0
        }, 1000);
	}else{
		// query if start
		if($('.date-datails').parent().index() == 6){
			// 售卖进度 ==》 售卖时间查询
			sellingTime($('.date-datails'));
		}else{
			var val  = [],
	        	Checked = $('.date-datails').children('input'), // 选中的搜索框
	            Placeholder = $(Checked).eq(0).attr('placeholder');// 搜索框提示信息 
	        for (var i = 0; i < Checked.length; i++) {
	            // val = [当前搜索框提示信息第4位开始：当前搜索框value];
	            if ($(Checked[i]).val() == "") {
	                val.push($(Checked[i]).attr("placeholder").substring(3) + ':null');
	            } else {
	                val.push($(Checked[i]).attr("placeholder").substring(3) + ':' + $(Checked[i]).val());
	            }
	        }
	    	// 搜索条件为 "";
	        if (val[0].split(':')[1] == "null") {
	            alert('"' + Placeholder + '"不能为空！');
	            $(Checked[0]).focus();
	        } else {
	            var obj = [],
	                index1,
	                index2,
	                $this,
	                listText = [];// 复制用数据
	            // 用新的变量 obj 接收修改过的数组 val
	            for (var i = 0; i < val.length; i++) {
	                if (val[i].split(':')[0] == "成立日期")
	                    val[i] = '成立日:' + val[i].split(':')[1];
	                if (val[i].split(':')[1] != 'null') {
	                    obj.push(val[i])
	                }
	            }
	            // 根据查询值，找寻对应tabHead>th,并获取其下标；
	            for (var i = 0; i < obj.length; i++) {
	                // 定位对应搜索区域，并获取相应table表头索引号;
	                if (!$('.m-flex').is(':hidden')) {
	                    $this = $('.m-flex').children(':first');
	                    var thList = $this.find('th');
	                    for (var n = 0; n < thList.length; n++) {
	                    	// 判断查询条件有几条
	                        if (i == 0) {
	                            if ($(thList[n]).text().indexOf(obj[i].split(':')[0]) > -1)
	                                index1 = $(thList[n]).index();
	                        } else {
	                            if ($(thList[n]).text().indexOf(obj[i].split(':')[0]) > -1)
	                                index2 = $(thList[n]).index();
	                        }
	                    }
	                }
	            }
		    	/* 根据获取到的th下标对比td值；
		         * $this.parent() = xxx.html; 当前加载页面
		         */
	            var listTr = $this.find('td').parent();//tr
				var count = 0;
				var condition1 = obj[0].split(':');
				var condition2 = (obj[1] == undefined ? undefined : obj[1].split(':'));
				for (var i = 0; i < listTr.length; i++) {
					var $tr = $(listTr[i]);
					/*// 判断当前显示页面是否有多个子模块，正常只有一个;
				    if ($this.parent().children().length > 1) {
				        $this.next().remove();
				        $this.css('width', '100%');
				    }*/
				   // 开始&结束时间只要有一个包含判断条件就显示；
				   	if(condition1[0] == '募集开始时间'){
				   		var start = $tr.children().eq(index1).text();
			   			var end   = $tr.children().eq(index1).next().text();
			   			// 只存在募集开始条件
			   			if(condition2 == undefined){
			   				if(start >= condition1[1]|| end >= condition1[1]){
					   			$tr.show();
					   			count++
					   		}else{
					        	$tr.hide();
					        }
		   				}else{
	   					// 募集开始&结束条件都存在
		   					if(start >= condition1[1]|| end >= condition1[1]){
		   						// 当前 tab 募集结束时间为空？ 开始时间 <= 募集结束条件 ： 开始||结束< = 募集时间 ;
		   						if($.trim(end).length < 1){
		   							if(start <= condition2[1]){
						   				$tr.show();
							            count++
						   			}else{
							        	$tr.hide();
							        }
		   						}else{
		   							if(start <= condition2[1] || end <= condition2[1]){
						   				$tr.show();
							            count++
						   			}else{
							        	$tr.hide();
							        }
		   						}
					   		}else{
					   			$tr.hide();
					   		}
			   			}
				   	}else{
				   		// 只有一个条件 
				   		if(condition2 == undefined){
				   			// condition that "查询信息"
					        if (condition1[0] == '查询信息') {
					            if($tr.text().indexOf(condition1[1]) < 0) {
					                $tr.hide();
					            }else{
					            	$tr.show();
					            	var newText = '<i style="color:#eca313;">'+condition1[1]+'</i>';
					            	// 高亮显示
					            	$tr.find('td').each(function(){
					            		if($(this).text().indexOf(condition1[1]) >= 0 ){
					            			// 这里，利用 JS 的 RegExp 对象，将 g 参数单拿了出来，同时，正则的内容可以用变量来代替了！
					            			$(this).html($(this).text().replace(new RegExp(condition1[1],'g'),newText))
					            		}
					            	})
					                count++
					            }
					        // condition that "XX日期"
					        }else{
					            if($tr.children().eq(index1).text() >= condition1[1]) {
					                $tr.show();
					                count++
					            }else{
					                $tr.hide();
					            }
					        }
				        // 存在两个条件
				   		}else{
				   			if($tr.children().eq(index1).text() >= condition1 && $tr.children().eq(index2).text() <= condition2[1]) {
					            $tr.show();
					            count++
					        }else{
					            $tr.hide();
					        }
				   		}
				   	}
				}
	            var tip = '<span id="tip"class="Auto">符合当前条件数据 共：' + count + '条</span>';
	            $this.parent().append(tip);
	            $('#data-item').children(':first').html(count);
	            $('#data-item').children(':last').html("").prev().hide();
	            // 发送数据
	            queryBox.hide();
	            setTimeout(function () {
	                $('#tip').remove();
	                count = 0
	            }, 1000);
	        }
		}
    }
}

// Selling time ------------------------------------------------------------
function sellingTime(e){
	var searchVal = {},
		time      = new Date(),
        today     = time.getFullYear()+'-'+((time.getMonth()+1) >10 ? (time.getMonth()+1) : '0'+(time.getMonth()+1))+'-'+(time.getDate())+' '+time.getHours(),
    	selectSearchList = $('.date-datails input'),// 选中的搜索框
    	promptMessage    = $(selectSearchList[0]).attr('placeholder');// 搜索框提示信息 
    // 过滤所有空格
    var startTime = ($(selectSearchList[0]).val()).replace(/\s+/g,"");
    // 日期&时间之间不存在空格，拼接空格进去
    if(startTime.length == 12) $(selectSearchList[0]).val(startTime.substring(0,10)+' '+startTime.substring(10,13));
    // 售卖开始时间有误
    if(startTime.length == ""){
    	alert(promptMessage.substring(3)+'不能为空！');
    }else if(startTime.length == 11 || startTime.length > 12){
    	alert('售卖开始时间格式不正确！');
    }else if(today < $(selectSearchList[0]).val()){
    	alert(promptMessage.substring(3)+'不能大于当前时间！');
    }else{
    // 售卖条件成立
    var endTime   = ($(selectSearchList[1]).val()).replace(/\s+/g,"");
    	// 开始时间：字节有误，重新拆分拼接；
    	if($(selectSearchList[0]).val().length > 13){
    		searchVal[0] = startTime.substring(0,10)+' '+startTime.substring(10,13);
    	}else if(startTime.length == 10 ){
    		searchVal[0] = $(selectSearchList[0]).val()+' 00';
    	}else{
    		searchVal[0] = $(selectSearchList[0]).val();
    	}
        // 结束时间：字节有误，重新拆分拼接；
        // 日期&时间之间不存在空格，拼接空格进去
    	if(endTime.length == 12) $(selectSearchList[1]).val(endTime.substring(0,10)+' '+endTime.substring(10,13));
    	// 当前为null
    	/*if(endTime.length == ""){
    		searchVal[1] = today;
    	}else */
    	if(endTime.length == 12 && $(selectSearchList[1]).val().length > 13){
    		searchVal[1] = endTime.substring(0,10)+' '+endTime.substring(10,13);
    	}else if(endTime.length > 12){
    		alert('售卖结束时间格式不正确！');
    	}else if(endTime < startTime){
    		alert('售卖结束时间不能小于售卖开始时间！');
    	}else{ 
    		if(endTime.length == 10 ){
    			searchVal[1] = $(selectSearchList[1]).val()+' 00';
			}else{
				searchVal[1] = $(selectSearchList[1]).val();
			}
    		flexSellTime = searchVal;
    		$('#flexTab-m-flex').empty();
	        //  加载 tab 外层模块
	        flex.wrap.append(Pages.tabModule(1));
	        var html = '<a href="javascript:;" class="flexTab-change">查询</a>';
	        flex.wrap.find('.flexTab-u-nav').append(html);
	        var details = {
                Url: dataUrl.flexTab.queryTable+'&start_time='+searchVal[0]+'&end_time='+searchVal[1],
	            Array: flex.arr[2],
	            main: flex.wrap.children(':first'),
	            status:true
	        }
	        Pages.getFullFetchData(details);
	        $('#date-query').hide();
    	}
    }
}
