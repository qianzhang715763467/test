$(document).ready(function(){
	var playing = true;
	var touching = false,
		tx = 0,
		ty = 0,
		ex = 0,
		ey = 0,
		timeX = 0,
		timeY = 0;
	var ratio = 1.78;         // 原始图的高/宽
	
	preloadImg();

	// 音乐播放处理
	$('.audioButton').click(function(){
		if (playing){
			$('audio')[0].pause();
			playing = false;
		}else{
			$('audio')[0].play();
			playing = true;
		}
	});

	
   
	// 上下滑动事件处理
	var curPage = 1;
	var cpObj;
	var slideUp = true;
	$('#framecontianer').on('slideUp', function(e){
		// 上划逻辑
		slideUp = true;
		if(curPage === 7){
			$('#page6').toggleClass('post');
			$('#page1').toggleClass('current');
			$('#page1').toggleClass('next');
			$('#page2').toggleClass('next');
			$('#page7').toggleClass('current');
			curPage = 1;
			return;
		}
		cpObj = $('#page' + curPage);
		cpObj.prev('.tt').removeClass('post');
		cpObj.addClass('post');
		cpObj.removeClass('current');
		cpObj.next('.tt').addClass('current');
		cpObj.next('.tt').removeClass('next');
		curPage++;
		cpObj = $('#page' + curPage);
		cpObj.next('.tt').addClass('next');
		if(curPage === 7){
			$('#page1').toggleClass('next');
		}
		
	}).on('slideDown', function(e){
		// 下划逻辑
		if(curPage <= 1){
			return;
		}
		if(curPage === 7){
			$('#page1').toggleClass('next');
		}
		cpObj = $('#page' + curPage);
		cpObj.next('.tt').removeClass('next');
		cpObj.addClass('next');
		cpObj.removeClass('current');
		cpObj.prev('.tt').addClass('current');
		cpObj.prev('.tt').removeClass('post');
		curPage--;
		cpObj = $('#page' + curPage);
		cpObj.prev('.tt').addClass('post');
		//cpObj = $('#page' + curPage);
	});
	
	// 页面初始化，根据显示屏幕的大小，给页面的主容器设置合适的宽高
	var sHeight = document.documentElement.clientHeight;
	var sWidth = document.documentElement.clientWidth;
	var r = sHeight / sWidth;
	var w, h, d;
	var frame = $('#framecontianer');
	
	if(r > ratio){
		// 屏幕细长，宽度100%，重新计算高度，上下留黑边
		w = sWidth;
		h = Math.floor(sWidth * ratio);
		d = Math.floor((sHeight - h)/2);
		frame.css('width', w + 'px');
		frame.css('height', h + 'px');
		frame.css('top', d + 'px');
	}else{
		// 屏幕扁宽，高度100%，重新计算宽度，左右留黑边
		h = sHeight;
		w = Math.floor(sHeight/ratio);
		d = Math.floor((sWidth - w)/2);
		frame.css('width', w + 'px');
		frame.css('height', h + 'px');
		frame.css('left', d + 'px');
	}

	function startShow(){
		$('#page1').toggleClass('current');
		$('#page1').toggleClass('next');
		$('#page2').toggleClass('next');
	}

	function preloadImg(){
		var imgs = [
			
		];

		//console.log(paths);
		var defer = $.imgpreloader({paths:imgs});
		defer.progress(function($image, $allImages, $properImages, $brokenImages, isBroken, percentage){
			// 显示进度
			$('.progress').text(percentage + '%');
			if(percentage == 100){
				$('.cover').css("display", "none");
				startShow();
			}
		});
	}
});