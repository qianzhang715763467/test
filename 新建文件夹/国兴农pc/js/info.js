	$(function(){	
		   //滑动兼容性调试
//			function setScrollTop(scroll_top) {  
//		        document.documentElement.scrollTop = scroll_top;  
//		        window.pageYOffset = scroll_top;  
//		        document.body.scrollTop = scroll_top;  
//		    }
            //五环联动模式
		    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop; 
		    $.each($(".fiveloop_tab_cont li"),function(i){	    	
					$(this).click(function(){
						$(this).find("a").addClass("active_cuur").closest("li").siblings().find("a").removeClass("active_cuur ahover");
						var offsetH = $(".fiveloop_content_wrap").find(".fiveloop_cont:eq("+i+")").offset().top-176;//页面top的高，始终保持置顶但不能让top遮挡
						$("body").animate({"scrollTop":offsetH},800);
					})
			})
//		    var loopList= $("#gxn-content ul.section-wrap-cont li.wrap-cont");		console.log(loopList.length)	    
         
		 
		    //关于国兴农
			$.each($(".companyPro_tab_cont li"),function(i){
					$(this).click(function(){
						$(this).find("a").addClass("active_cuur").closest("li").siblings().find("a").removeClass("active_cuur ahover");
						var offsetH = $(".companyPro_content_wrap").find(".companyPro_cont:eq("+i+")").offset().top-176;//页面top的高，始终保持置顶但不能让top遮挡
						$("body").animate({"scrollTop":offsetH},800);
					})
			})
			//联系国兴农
			$.each($(".contact_tab_cont li"),function(i){
				$(this).click(function(){
					$(this).find("a").addClass("active_cuur").closest("li").siblings().find("a").removeClass("active_cuur ahover");
					var offsetH = $(".contact_content_wrap .contact_content1").find(".contact_cont:eq("+i+")").offset().top-181;//页面top的高，始终保持置顶但不能让top遮挡
//					$("body").animate({"scrollTop":offsetH},800);
					$("body").animate({scrollTop:offsetH},800);	
					console.log(scrollTop)
//					setScrollTop(offsetH);
				})
			})
			
	});
		