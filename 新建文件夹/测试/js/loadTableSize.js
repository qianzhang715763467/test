function onlond(){
	// td children i width size
	var newWidth=($('.sizeWidth').parent('td').width()-10)/100;
	$('.sizeWidth').css("width",newWidth+'rem');
	sizeTableHeight();
}
//  table height resize
$(window).resize(sizeTableHeight);
$(document).resize(sizeTableHeight);
function sizeTableHeight(){
	var containerH=$('body').height()-$('.container_header').height();
	var new_height=(containerH-$('.table-head table').outerHeight()-18)/100+"rem";	
	$('.container').css('height',containerH/100+'rem');
	$('.table-body').css("max-height",new_height);
}