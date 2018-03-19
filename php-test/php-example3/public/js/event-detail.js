var formatSql2;
var switch_msg;
var useObj;
var tradingObj;
var detail = [
	{'atFixedPeriod':[
			{"string": "券id"},
			{"string": "券名称"},
			{"int"	 : "券发放人数"},		
			{"int"	 : "券发放张数"},		
			{"string": "交易日期"},
			{"double": "投资总金额"},
			{"double": "定期投资总金额"},
			{"double": "活期投资总金额 "},
			{"double": "活包定投资总金额"},
			{"int"	 : "投资人数"},			
			{"int"	 : "定期投资人数"},		
			{"int"	 : "活期投资人数"},		
			{"int"	 : "活包定投资人数"},	
			{"double": "用券投资额"},
			{"int"	 : "用券投资人数"},		
			{"string": "转化率"},     
			{"int"	 : "券使用张数"},		
			{"string": "券使用率"}, 
			{"double": "折扣金额"},
			{"double": "加息金额"},
			{"double": "券成本"},
			{"double": "短信成本"},
			{"double": "营销总成本"},
			{"double": "用券人全部投资额"},
			{"double": "查询日期总交易额"},
			{"string": "交易占比"}
		]
	},
	{'dueOnDemand':[                        
			{"str"		: "券id"},   
			{"str"		: "券名称"},          
			{"int"		: "券发放人数"},           
			{"int"		: "券发放张数"},           
			{"string"	: "交易日期"},           
			{"double"	: "投资总金额"},           
			{"double"	: "定期投资总金额"},           
			{"double"	: "活期投资总金额"},           
			{"double"	: "活包定投资总金额"},              
			{"int"		: "投资人数"},           
			{"int"		: "定期投资人数"},           
			{"int"		: "活期投资人数"},           
			{"int"		: "活包定投资人数"},           
			{"double"	: "用券投资额"},           
			{"int"		: "用券投资人数"},           
			{"str"		: "转化率"},          
			{"int"		: "券使用张数"},           
			{"string"	: "券使用率"},           
			{"int"		: "活期余额大于0人数"},              
			{"string"	: "活期留存率"},           
			{"double"	: "折扣金额"},           
			{"double"	: "加息金额"},           
			{"dou"		: "券成本"},          
			{"double"	: "短信成本"},           
			{"double"	: "营销总成本"},           
			{"double"	: "用券人全部投资额"},              
			{"double"	: "查询日期总交易额"},              
			{"string"	: "交易占比"}       
		]
	},
	{'trading_situation':[                        
			{"string"	: "交易日期"},    
			{"int"		: "交易人数"},     
			{"int"		: "交易订单数"},    
			{"double"	: "交易金额"},     
			{"double"	: "现金券折扣金额"},  
			{"double"	: "加息券加息金额"},  
			{"double"	: "营销贴息金额"},   
			{"string"	: "交易额占比"},    
			{"string"	: "交易转化率"}   
		]                                     
	}                                     
];

// add th
var t = {
		warp : $('#activity-Particulars'),
    	tab  : $('#activity-Particulars .table-head').children(),
    	data : detail,
    	initData : function(){
    		var msg = getActivityList;// 主页传递参数
	        $('#_id').html(msg.id);
	        $('#_name').html(msg.name);
	        $('#_create_time').html(msg.create_time);
	        $('#_task_status').html(msg.task_status);
	        $('#_list_count').html(msg.count);
	       	msg.task_status == '已完成' ? $('#exportJump').css({"background-color": "#00cccc", "cursor": "pointer"}) :$('#exportJump').css({"background-color": "#ccc", "cursor": "not-allowed"});
	        // 其他模块
	      	rosterStatus($('#exclude'),msg.excepts);
	        rosterStatus($('#contain'),msg.includes);
			var groups2 = htagGroups2("lableGroup");
	        groups2.loadData(eval(msg.tags));
	        //不要删除下面注释  重要
	        console.debug(msg.final_sql);
	        console.debug(msg.hive_table);
	        // 初始化 名单导出与查询按钮 style
	        if(msg.task_status === '等待执行' || msg.task_status=== '已取消' )
	        	$('.but').css({'background-color':'#ccc','cursor': 'no-drop'});
	        this.getDetails(msg.id);
	        // 日期插件调用
	        $('.dt').fdatepicker({
				format: 'yyyy-mm-dd',
				pickTime: false
			});
			// HQL 复制
		   $('#pre-sql2').click(function(){
		   		formatSql2 = $.format(getActivityList.final_sql,{method: 'sql'});
		    	$.dialog({
		            title: '',
		            content: "<pre class='brush:sql;'>"+formatSql2+"</pre>",
		            columnClass: 'col-md-1',
		            animation: 'top',
		            closeAnimation: 'bottom'
		        });
		        SyntaxHighlighter.highlight();
		   });
    	},
    	// push(th)
    	addTh  : function(e){
    		var index = e.index();
    		// 判断是否已经存在th
    		if(e.hasClass('existTh'))return;
    		e.addClass('existTh');
    		var tr = $('<tr></tr>');
    		// 插入 th行
    		var datas = this.data[index][Object.getOwnPropertyNames(this.data[index])];
    		var size = datas.length*130;// tab 新的宽度
    		for(var i = 0;i < datas.length; i++){
    			tr.append('<th>'+ datas[i][Object.getOwnPropertyNames(datas[i])] +'</th>');
    		};
    		$(this.tab[index]).children('thead').append(tr);
    		var initW = $(document).width()*.9-40;
    		// 改变table & tBox 宽度
    		if(size > initW){
    			$(this.tab[index]).css('width',size).parent().css('width',size).parent().css('width',size).parent().css('overflow-x','auto');
	    		this.warp.find('.table-body').eq(index).css({'width':size+16,'overflow-x':'hidden'}).children().css('width',size);
    		}else{
    			$(this.tab[index]).css('width','auto').parent().css('width','auto').parent().css('width','auto');
	    		this.warp.find('.table-body').eq(index).css({'width':'auto','overflow-x':'hidden'});
    		};
    	},
    	// 获取数据
    	getDetails: function(id){
	    	// 通过 ID 获取data
			$.ajax({
				url:"/get/promEffect",
				type:"get",			
				data:{
					prom_id:id
				},
				beforeSend:function (){
		        	$('.loading').show();
		        },
				success: function (data) {
					var data=JSON.parse(data);
					// 使用券dom,交易dom
					var $ticket = $('#use_situation'),$deal=$('#trading_situation');
						switch_msg = data;	
					// data typeof 													
					if(!data || data.length==0){
						// 动画停止
						setTimeout(function(){$('.loading').hide()});
						return ;
					}else{		
						// each data					
						for(var i=0;i<data.length;i++){
							 ifData(data[i],data.length);
						}
					}
					setTimeout(function(){$('.loading').hide()});
				}
			})
    	},
    	
    };
    
t.initData();
t.addTh($('.markup'));
/*-----------------------------------------  Initialize function  ------------------------------------------*/
    // 名单状态
	function rosterStatus(_node,data){
		if(data && data.length>0){
			data=data.split(',');
			for(var i = 0 ; i < data.length ; i ++){
				if( i == data.length-1 ){
					var html = '<span>'+ data[i] +'</span>';
				}else{
					var html = '<span>'+ data[i] +',&nbsp;&nbsp;</span>';
				}
				$(_node).append(html);
			}
		}
		$(_node).find('span').length < 1 ? $(_node).parent('.entries_group').hide():$(_node).parent('.entries_group').show();
	}
	
	    
	// 判断数据类型，载入tab 
	function ifData(data,list){
		var dom;
		var info = JSON.parse(data.query_params);
		if(data.start == "" || info.start == "")return;
		if(data.type == '定期情况'){
			dom = $('#atFixedPeriod');
			// 展示查询条件
			dom.show().find('.table-head tr').show();
            dom.find('#issue_stamps1').children('.startTime').val(info.start);
            dom.find('#issue_stamps1').children(".endTime").val(info.end);
            dom.find('#Use_coupons1').children('.startTime').val(info.start2);
            dom.find('#Use_coupons1').children(".endTime").val(info.end2);
			dom.find('#coupos1').val(info.coupos);	
		}
		if(data.type == '活期情况'){
			dom = $('#dueOnDemand');
			dom.find('#issue_stamps2').children('.startTime').val(info.start);
            dom.find('#issue_stamps2').children(".endTime").val(info.end);
            dom.find('#Use_coupons2').children('.startTime').val(info.start2);
            dom.find('#Use_coupons2').children(".endTime").val(info.end2);
			dom.find('#coupos2').val(info.coupos);	
		}
		if(data.type == '交易情况'){
			dom=$('#trading_situation');
			dom.find('.startTime').val(data.start);
			dom.find('.endTime').val(data.end);
			dom.find('#procs3').val(info.procs);
		}
		appTab(data,dom);
	}
	// 加载 tab 数据
	function appTab(data,dom){
		if(data.status=='已完成'){
			var tabData=data.head200;
			// 复制用数据
			useObj = data.head200;
			console.log(tabData)
            if(!tabData || tabData.length < 1){
            	$('#numberEntries').html('没有数据！');
               return ;
            }
            // 克隆表格标题
            t.addTh($('.ma').eq(dom.index()));
            var th = dom.find('.table-head').find('tr:last').clone();
            dom.find('.table-body table').append(th);
            dom.css('overflow','auto');
			var obj=tabData.split('\n');
			for(var i=0;i<obj.length-1;i++){
				var arr=obj[i].split('\t');
				if(i == obj.length-2){
					var html=$('<tr style="background-color:#e9faf9;"></tr>');
				}else{
					var html=$('<tr></tr>');
				}
				for(var n=0;n<arr.length;n++){
					if(dom.attr('id').indexOf('atFixedPeriod')> -1){
						if( n == 5 || n == 7 || n == 19) arr[n] = Math.round(new Number(arr[n]));
					};
					if(dom.attr('id').indexOf('dueOnDemand')> -1){
						if( n == 5 || n == 13 || n == 21 || n == 22) arr[n] = Math.round(new Number(arr[n]));
					}
					var td='<td>'+arr[n]+'</td>';
					html.append(td);
				}
				dom.find('.table-body table').append(html);
			}
			dom.find('.pre-copy').addClass('cursor');
		}else{
			// ‘查询中’ style 
			queryData(dom);
		}
		itemCount(dom);
	} 
	
	/* --------------------------------     状态区      ------------------------------------*/
	
	// 当前table 条目数
	function itemCount(e){
		if(e.hasClass('showTab')){
			var count=e.find('.table-body').find('tr').length-1;
			if(count >= 0 ){
				$('#numberEntries').html('共：<i style="colr:#666;padding-right:3px;">'+count+'</i>条');
			}else{
				$('#numberEntries').html('');
			}	
		}else{
			return false;
		}
	}
	
	/*---------------------------------     功能区         -----------------------------------*/
	
	// table 切换
	function tabSwitchover(e){
		$('.table_nav').find('li').removeClass('markup');
		$(e).addClass('markup');
		t.addTh($(e));
		// 对象索引对应的 table ,选项卡切换类型;
		var $this=$('.content_table .table_content').eq($(e).index());
		$this.siblings().removeClass('showTab');
		$this.addClass('showTab');
		// 数据是否存在	
		if(!switch_msg || switch_msg.length<1){	
			return;
		}else{
			itemCount($this);
		}
	}
	
	// ‘查询中’ style
	function queryData(e){	
		// 输入框改为不可写入状态
		e.find('input').attr('disabled','true').css({'background-color':'rgba(248, 248, 248,0.7)','color':'#999'});
		// 查询按钮改为 “正在查询”，且为不可选中，不可点击
		e.find('.inquire').html('正在查询').css({'background-color':'#ccc','cursor': 'no-drop'});
		// 取消查询 按钮高亮，且可点击；
		e.find('.cancel_query').attr('title','取消查询').css({'background-color':'#00CCCC','cursor':'pointer'});
		// 复制按钮不可点击，灰色
		e.find('.pre-copy').removeClass('cursor');
		elicitData();
	}
	// 查询
	// The date format to judge
	function dateJudge(e) {
		if($('#_task_status').html() !== '等待执行' && $('#_task_status').html() !== '已取消'){
			e=$(e).parents('table');
			var isTime = true
		    // 获取 date start and end的值；
		    var inquireName=$(e).find('.names').val(); 
		    var ID=$('#_id').html();
		    if($(e).parents('.table_content').attr('id') == 'atFixedPeriod' || $(e).parents('.table_content').attr('id') == 'dueOnDemand'){
		    	var startTime=$(e).find('.issue_stamps').children('.startTime').val();
		    	var endTime = $(e).find('.issue_stamps').children(".endTime").val();
		    	var startTime2=$(e).find('.Use_coupons').children('.startTime').val();
		    	var endTime2 = $(e).find('.Use_coupons').children(".endTime").val();
		    	if (startTime != "" && endTime != "" && startTime2 != "" && endTime2 != "") {
			    	if(endTime < startTime && endTime2 < startTime2){
			    		isTime = false;
			    	}else{
			    		isTime = true;
			    	}
				    if (isTime != true) {
				    	$('#globalTip p').html("错误信息：");
				    	$('#globalTip strong').html("");
				        $('#globalTip i').html("结束时间必须晚于开始时间！");
				        Myclick();
				    }else{
				    	if(inquireName!='' && inquireName.length>0){
			    			var inquire=$(e).find('.inquire'); 
			    			if(inquire.html()==='查询'){
					    		// sbumite inquire
						    	var typeName=$('.markup').children().html();
		                        var params = {};
		                        params.start = startTime;
		                        params.end = endTime;
		                        params.start2 = startTime2;
		                        params.end2 = endTime2;
		                        params.type = typeName;
		                        params.id = ID;
		                        params.coupos = inquireName;
		                        params.hive_table = getActivityList.hive_table;
		                        params.param = JSON.stringify(params);
		                        submitPromEffect(params);
		                        queryData(e.parents('.table_content'));
		                        return
				    		}else{ 
				    			return
				    		}
				    	}else{
				    		$('#globalTip p').html("错误信息：");
					    	$('#globalTip strong').html("");
					        $('#globalTip i').html("券名称不能为空！");
					        Myclick();
					        return false;
				    	}		    		    	
				    }
			    } else {
			    	$('#globalTip p').html("错误信息：");
			    	$('#globalTip strong').html("");
			        $('#globalTip i').html("请填写完整日期！");
			        Myclick();
			        return false;
			    }
		    }else{
		    	var startTime=$(e).find('.startTime').val();
		    	var endTime = $(e).find(".endTime").val();
		    	if (startTime != "" && endTime != "") {
			    	endTime < startTime ? isTime = false:isTime = true;
				    if (isTime != true) {
				    	$('#globalTip p').html("错误信息：");
				    	$('#globalTip strong').html("");
				        $('#globalTip i').html("结束时间必须晚于开始时间！");
				        Myclick();
				    }else{
				    	var inquire=$(e).find('.inquire'); 
		    			if(inquire.html()==='查询'){
				    		// sbumite inquire
					    	var typeName=$('.markup').children().html();
					    	var inquireName=$(e).find('.names').val();
		                    var params = {};
		                    params.start = startTime;
		                    params.end = endTime;
		                    params.type = typeName;
		                    params.id = ID;
		                    params.procs = inquireName;
		                    params.hive_table = getActivityList.hive_table;
		                    params.param = JSON.stringify(params);
		                    submitPromEffect(params);
		                    queryData(e.parents('.table_content'));
		                    return
			    		}else{ 
			    			return
			    		}  	
				    }
			    } else {
			    	$('#globalTip p').html("错误信息：");
			    	$('#globalTip strong').html("");
			        $('#globalTip i').html("请填写完整日期！");
			        Myclick();
			        return false;
			    }
		    }
		}else{
			false;
		}
	}
	// 正在查询  每3秒获取一次数据
	function elicitData(){
		$('.inquire').each(function(){
			if($(this).html() == '正在查询'){
				$(this).parents('.table-head').next().find('tbody').find('tr').remove();
			 	elicit=setInterval(function(){
					window.location.reload();
				},1000*60)
			}
		})
	}

	//  取消查询
	function cancelQuery(e){
		if($(e).attr('title')==='取消查询'){
			clearInterval(elicit)
			// 获取 date start and end的值；
		    var startTime=$(e).parent('th').siblings().children('.startTime').val();
		    var endTime = $(e).parent('th').siblings().children(".endTime").val();
		    var inquireName=$(e).parent('th').siblings().children('.names').val(); 
		    var ID=$('#_id').html();
			$(e).attr('title','');		   						
			$(e).css({'background-color':'#ccc'});
	        $(e).html('取消查询');
	        $(e).parent('th').siblings().children('.inquire').html('查询');
	       	$(e).parent('th').siblings().children('.inquire').css({'background-color':'#00CCCC', "cursor": "auto"});
	       	$(e).parents('tr').find('input').css({'background-color':'white','color':'#333'});	    
	        $(e).parents('tr').find('input').removeAttr('disabled');
		}else{
			return;
		}
	}
	function submitPromEffect(params){
	   console.debug(params);
	   $.ajax({
	       url: "/get/submitPromEffect",
	       async: true,
	       type: 'POST',
	       data:params,
	       success:function(text){
	           try{
	            console.debug(text);
	            var o = JSON.parse(text);
	            if(o.code === 1){
	                $('#globalTip p').html("提交失败");
	                $('#globalTip strong').html("");
	                $('#globalTip i').html(o.message);
	                Myclick();
	            }
	           }catch(e){}
	       }
	   }); 
	}
	
	function cancelPromEffect(prom_id){
	    $.ajax({
	       url: "/get/cancelPromEffect",
	       async: false,
	       type: 'POST',
	       data:{prom_id:prom_id},
	       success:function(text){
	           try{
	            //console.debug(text);
	            var o = JSON.parse(text);
	            if(o.code === 1){
	                $('#globalTip p').html("取消失败");
	                $('#globalTip strong').html("");
	                $('#globalTip i').html(o.message);
	                Myclick();
	            }
	           }catch(e){}
	       }
	   }); 
	}
	
/*===================================       插件区              =================================*/		

	/*//   Date 插件   start
	$('#ca').calendar({
	    width: 320,
	    height: 320,
	    data: [
	        {
	            date: '2015/12/24',
	            value: 'Christmas Eve'
	        },
	        {
	            date: '2015/12/25',
	            value: 'Merry Christmas'
	        },
	        {
	            date: '2016/01/01',
	            value: 'Happy New Year'
	        }
	    ],
	    onSelected: function (view, date, data) {
	    }
	});*/
