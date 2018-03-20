var base = {
	wrap: $('.index-container'), 	// 外层
    header: $('header'), 	// 顶部
    main: $('.index-rightBox'), 		// 主体内容
    nav: $('.index-leftBox'), 			// 导航条
    particular: 'particular', 	// 单行数据独立显示模块
   
    navSwitch: 'toggle'         // 导航开关
}
base.init = function(){
	var initFn = {
		layDate:function(){
			var dataUser = $.cookie('US_SESSION_ID'); 
			$('#userName').html($.cookie('fuser'));
			!function(){
				laydate.skin('molv');//切换皮肤，请查看skins下面皮肤库
				laydate({elem: '#demo'});//绑定元素
			}();
		
			//日期范围限制
			var start = {
			    elem: '#start',
			    format: 'YYYY-MM-DD',
			    min: laydate.now(), //设定最小日期为当前日期
			    max: '2099-06-16', //最大日期
			    istime: true,
			    istoday: false,
			    choose: function(datas){
			         end.min = datas; //开始日选好后，重置结束日的最小日期
			         end.start = datas //将结束日的初始值设定为开始日
			    }
			};
			var end = {
			    elem: '#end',
			    format: 'YYYY-MM-DD',
			    min: laydate.now(),
			    max: '2099-06-16',
			    istime: true,
			    istoday: false,
			    choose: function(datas){
			        start.max = datas; //结束日选好后，充值开始日的最大日期
			    }
			};
			laydate(start);
			laydate(end);
			
			//自定义日期格式
			laydate({
			    elem: '#test1',
			    format: 'YYYY年MM月DD日',
			    festival: true, //显示节日
			    choose: function(datas){ //选择日期完毕的回调
			        alert('得到：'+datas);
			    }
			});
			
			//日期范围限定在昨天到明天
			laydate({
			    elem: '#hello3',
			    min: laydate.now(-1), //-1代表昨天，-2代表前天，以此类推
			    max: laydate.now(+1) //+1代表明天，+2代表后天，以此类推
			});
			// 退出登录
			function exit() {
			    var date = new Date();
			    date.setTime(date.getTime() - 10000);
			    document.cookie = 'pp'    + "=" + null + "; expires=" + date.toGMTString();
			    document.cookie = 'user'  + "=" + null + "; expires=" + date.toGMTString();
			    document.cookie = 'puser' + "=" + null + "; expires=" + date.toGMTString();
			    document.cookie = 'pec'   + "=" + null + "; expires=" + date.toGMTString();
			    document.cookie = 's'     + "=" + null + "; expires=" + date.toGMTString();
			    document.cookie = 'fuser' + "=a; expires=" + date.toGMTString();
			    location.href='/login';
			}
		},
		chart:function(){
			
		}
	}
	return initFn;
}
base.modules = function(){
	var contentModule = {
		mainHtml :function(){ // 主体内容模块
			var mainHtml = '<div class="content-leftBox content-boxItem">'
					+'<svg xmlns="http://www.w3.org/2000/svg"'
					    +'xmlns:xlink="http://www.w3.org/1999/xlink"'
					    +'version="1.1" width="100%" height="100%" id="svg" style="position: absolute; background-color: transparent;">'
						+'<defs>'
				   			+'<marker id="arrow"'
				   				+'markerUnits="strokeWidth"'
				   				+'markerWidth="8"'
				   				+'markerHeight="8"'
				   				+'viewBox="0 0 12 12"'
				   				+'refX="6"'
				   				+'refY="6"'
				   				+'orient="auto">'
				   				+'<path d="M2,2 L10,6 L2,10 L6,6 L2,2" sytle="fill:#000;"></path>'
				   			+'</marker>'
					   	+'</defs>'
					+'</svg>'
					+'<svg class="icon totalTip" aria-hidden="true">'
	                    +'<use xlink:href="#icon-rili1"></use>'
	                +'</svg>'
					+'<section id="content">'
					+'</section>'
				+'</div>'
				+'<div class="content-rightBox content-boxItem">'
					+'<section id="amount"  class="echart"></section>'
					+'<section id="peoples" class="echart"></section>'
				+'</div>';
			return mainHtml;
		},
		circularHtml : function(){ // 主体内容里面圆形
			var circularHtml = '<div class="site-items">'
					+'<div class="item"></div>'
					+'<div class="item"></div>'
					+'<div class="item"></div>'
					+'<div class="item"></div>'
					+'<div class="item"></div>'
					+'<div class="item"></div>'
					+'<div class="Withdraw">'
						+'<h5 style="margin-bottom:5px;">总金额：<i id="totalAmount"></i></h5>'
						+'<h6>总人数：<i id ="totalPeople"></i></h6>'
					+'</div>'
				+'</div>';
			return circularHtml;
		},
		loginHtml : function(){ // 加载动画
			var loginHtml = '<article id="loading">'
		    		+'<div class="loader">'
					  	+'<section>'
					  		+'<span></span>'
						  	+'<span></span>'
						  	+'<span></span>'
						  	+'<span></span>'
						  	+'<span></span>'
						  	+'<span></span>'
						  	+'<span></span>'
						  	+'<span></span>'
						  	+'<span></span>'
					  	+'</section>'
					+'</div>'
				+'</article>';
			return loginHtml;
		}
	};
	return contentModule; 
}
base.init().layDate()
//base1.module().circularHtml()
