var bodyHeight;
(function($){
	bodyHeight=$('body').height();
	console.log(bodyHeight)
})(jQuery)
window.onload=function(){
	var newWidth=($('.sizeWidth').parent('td').width()-10)/100;// td children i width size
	$('.sizeWidth').css("width",newWidth+'rem');
	sizeTableHeight();
}

$(window).resize(sizeTableHeight);
// 判断页面缩放
$('body').on("mousewheel DOMMouseScroll", function () {
	if($('body').height()!=bodyHeight){
		sizeTableHeight();		
	}
});

function sizeTableHeight(){	
	var newWidth=($('.sizeWidth').parent('td').width()-10)/100;// td children i width size
	var containerH=($('body').height()-$('.container_header').height())/100+'rem';//  table height 	
	$('.sizeWidth').css("width",newWidth+'rem');
	$('.container').css('height',containerH);
	var new_height=($('.container').height()-$('.table-head table').outerHeight()-18)/100+"rem";
	$('.table-body').css("max-height",new_height);

}
