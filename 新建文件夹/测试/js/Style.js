function Style(even,Class){
	$(even).children().click(function(){
		$(this).addClass(Class).siblings().removeClass(Class);
	})
}
//  营销洞察总览
function marketingInsighLond(dom,clasS,_text){
	$(clasS).remove();
	$('body article').hide();
	var htmlAdd=$(dom).load(_text).animate({"margin-left":"50%"},400);
	$('body').append(htmlAdd);
};