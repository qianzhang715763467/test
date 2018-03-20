 $(function(){ 
 	//选项卡
		var liw=$('.top-nav2-down-boxli').width();	
	    $(".top-nav-wrap .nav-wrap").mouseover(function(){
	    	var index = $(this).parent("li").index();	
	    	if(index>0&&index<6){
	    		$(this).addClass('active-button').closest("li").siblings().find(".nav-wrap").removeClass('active-button');
	    		$('.top-nav2-down-box').find(".top-nav2-down-boxli").eq(index-1).stop().fadeIn(500).siblings().stop().fadeOut(300);
				$(".top-nav-ul-parent").animate({height:'278px'},300);
				$(".top-nav-ul-parent").css({"border":"1px solid #d3d3d3","border-bottom":"5px solid #c30d22"});
				$("#gxn-top-slide").css("z-index","-9")//用于兼容，ie7以下不支持二级nav-位于slide轮播图之上（slide得给负值）
	    	}else{
	    	    $('.top-nav-ul-parent').animate({height:'0px'},300);
	    	    $(".top-nav-ul-parent").css("border","none");
	    	}
		});
		
		$("#gxn-top-nav").mouseleave(function(){
		    $(".top-nav-wrap .nav-wrap").removeClass('active-button');
			$(".top-nav-ul-parent").animate({height:'0px'},300);
			$(".top-nav-ul-parent").css("border","none");
			$("#gxn-top-slide").css("z-index","0")//不恢复slide的z-index会影响轮播tab按钮的滑动效果；
		})
		
    //轮播图
        //创建控制小圆点
        var imgLis = $('#gxn-top-slide>.slide-wrap .slider-panel');
         console.log(imgLis.length);
        for(i=0;i<imgLis.length;i++){
            $('<li class="slider-item" order='+i+'></li>').appendTo('.slide-tab');
        }
        //在第一个小圆点添加类名“active”
        $('.slide-tab li').eq(0).addClass('slide-active');
        //将放置图片的容器ul里第一份”li“复制一份，追加到ul后面
        imgLis.first().clone().appendTo('.slide-wrap');
//      console.log(imgLis.length);
        $('.slide-wrap').width($('.slide-wrap li').width()*(imgLis.length+1));

        var num = 0;
        var timer = null;
        //状态预设，是为防止用户连续点击左右按钮，导致短时间内图片切换频率过高而犯神经，程序反应不来
        var state = true;
        function play(){
            //从左向右时，判断num，是否大于最大值
            if(num < 0){
                num = imgLis.length-1;
                $('.slide-wrap').css({left:-imgLis.length*1000+'px'});
            }
            //从右向左时，判断num，是否大于最大值
            if(num > imgLis.length){
                num = 1;
                $('.slide-wrap').css({left:'0'});
            }
            var left = num*1000;
            $('.slide-wrap').animate({left:-left+'px'},function(){
                state = true;
            });
            //焦点
            $('.slide-tab li').removeClass('slide-active');
            $('.slide-tab li').eq(num).addClass('slide-active');
            if(num >= imgLis.length){
                $('.slide-tab li').first().addClass('slide-active');
            }
        }
        //自动播放
        function autoPlay(){
                timer = setInterval(function(){
                num++;
                play();
            },1500);
        }
        //添加鼠标移入暂停，移出继续事件
        $('#gxn-top-slide').mouseover(
            function(){
                clearInterval(timer);
                timer = null;
            }
        ).mouseout(
            function(){
                autoPlay();
            }
        );        
        //给焦点添加点击事件
         $('.slide-tab .slider-item').on('click',function() {
		    num = $(this).index();
             play();
		});
        
        autoPlay();
    });