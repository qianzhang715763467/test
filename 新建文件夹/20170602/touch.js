(function(){
	var tx = 0,
		ty = 0,
		ex = 0,
		ey = 0,
		timeX = 0,
        timeY = 0,
        timerID = 0;

    var state = 0; // 0: 待机，1：按下，2：滑动中，3：滑动，4：长按

    $.touchLZ = function(selector){
    	$(selector).on('touchstart', function(e){
    		e.preventDefault();
    		timerID = setTimeout(timeout, 1000);
    		if(state == 0){
				t = e.touches ? e.touches[0] : e.originalEvent.touches[0];
				ex = tx = t.pageX;
				ey = ty = t.pageY;
				timeX = e.timeStamp;
				state = 1;
			}
    	});
		$(selector).on('touchmove', function(e){
			if(state == 1 && timerID != 0){
				clearTimeout(timerID);
				timerID = 0;
			}
			if(state == 1 || state == 2){
		 		e.preventDefault();
				t = e.touches ? e.touches[0] : e.originalEvent.touches[0];
				ex = t.pageX;
				ey = t.pageY;
				state = 2;
			}
		});
		$(selector).on('touchend', function(e){
			if(state == 1 && timerID != 0){
				clearTimeout(timerID);
				timerID = 0;
			}
			if(state == 2){
				var dx = ex - tx,
					dy = ey - ty,
					timeY = e.timeStamp;
					dt = timeY - timeX;

				var dis = Math.sqrt(dx*dx + dy*dy),
					factor = Math.abs(dy/dx);

				var event = document.createEvent('Event');
				if(factor > 1 && dis > 30 && dt > 100){
					if(dy < 0){
						event.initEvent('slideUp', true, true);
						e.target.dispatchEvent(event);
					}else{
						event.initEvent('slideDown', true, true);
						e.target.dispatchEvent(event);
					}
				}

				if(factor < 1 && dis > 30 && dt > 100){
					if(dx < 0){
						event.initEvent('slideLeft', true, true);
						e.target.dispatchEvent(event);
					}else{
						event.initEvent('slideRight', true, true);
						e.target.dispatchEvent(event);
					}
				}
		        tx = ty = ex = ey = timeX = timeY = 0,
				state = 0;
			}
		});

		function timeout(){
			// 长按时间到达
			if(state == 1){
				$(selector).trigger('longTap');
				state = 0;
			}
			timerID = 0;
		}
	}
})();