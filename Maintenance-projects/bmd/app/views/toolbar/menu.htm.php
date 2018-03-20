<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<!-- 优先使用最新版本IE & Chrome -->
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<!-- 360使用Chrome Frame -->
		<meta name="renderer" content="webkit">
		<!-- 360 使用 Chrome内核 -->
		<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
		<!-- `width=device-width` 会导致 iPhone 5 添加到主屏后以 WebApp 全屏模式打开页面时出现黑边 http://bigc.at/ios-webapp-viewport-meta.orz -->
		<meta name ="viewport" content ="width=device-width,initial-scale=0.5, maximum-scale=1, minimum-scale=0.5, user-scalable=yes">
		<!-- 禁止数字识自动别为电话号码 -->
		<meta name="format-detection" content="telephone=no"/>
		<title></title>
		<!--<meta name="viewport" content="initial-scale=1, maximum-scale=1">-->


        <link rel="stylesheet" type="text/css" href="/js/dlmenu/default.css" />
        <link rel="stylesheet" type="text/css" href="/js/dlmenu/component.css" />


        <script type='text/javascript' src='/js/jquery.min.js'></script>
        <script type="text/javascript" src="/js/tools.js"></script>
        <script src="/js/jquery.cookie.js"></script>
        <script type="text/javascript" src="/js/dlmenu/modernizr.custom.js"></script>
        <script type="text/javascript" src="/js/dlmenu/dlmenu.js"></script>

		<style type="text/css">
			body {
                font-size:15px;
                height: 100%;
                overflow: hidden;
                font-family: "微软雅黑";
            }
			.busi{margin:30px;height: 30px;line-height: 30px;color:#000;cursor: pointer}
		</style>
        <script type="text/javascript">

			var business_id = 0;
			var menu_html = "";
            $(document).ready(function () {
                $(".busi").click(function(){
                    var id = $(this).attr("id");
                    $.ajax({
                        url: "/toolbar/getmenu",
                        type: 'get',
                        data:{business_id:id},
                        success: function (text, status) {

                            $("#menu").children().remove();
                            $("#menu").append('<span class="dl-trigger" style="width:23px;height:21px;"></span>');
                            var html = createMenu(JSON.parse(text));

                            $("#menu").append(html);
                            $("#menu").find("ul").each(function(){
                                if($(this).html() === ""){
                                    $(this).remove();
								}
							});

							var menu = $('.dl-menu:first').dlmenu({
								animationClasses: {classin: 'dl-animate-in-3', classout: 'dl-animate-out-3'}
							});

                            $("#menu .dl-trigger").trigger("click");

                            business_id = id;
                            menu_html = html;
                        }
                    });
                });
            });

            var level = 1;
            var dd = {};
            var tmp = {};
            var kv = {};
            function createMenu(d) {

				for(var i=0;i<d.length;i++){

                    if(level === (d[i]["level"] - 2)){
                        level++;
                    }

				    if(d[i]["level"] > level){
                        tmp = kv[d[i]["pre_text"]];
					}else{
                        //level 1
					}

					if(!d[i]["leaf"] || d[i]["leaf"].length === 0){//not leaf
				        if(d[i]["pre_id"] > 0){//sub
                            tmp[d[i]["text"]] = [];
                            kv[d[i]["text"]] = tmp[d[i]["text"]];
						}else{//level 1
                            dd[d[i]["text"]] = [];
                            kv[d[i]["text"]] = dd[d[i]["text"]];
						}
					}else if(d[i]["leaf"] && (d[i]["pre_id"] == 0)){
                        dd[d[i]["text"]] = {text:d[i]["text"], link_uri:d[i]["link_uri"], page_id:d[i]["page_id"]};
                        kv[d[i]["text"]] = dd[d[i]["text"]];
					}else{
					    tmp.push({text:d[i]["text"], link_uri:d[i]["link_uri"], page_id:d[i]["page_id"]});
					}


				}

				console.debug(dd);
                var html = "";
                html = traversal(dd, html);
                html = "<ul class='dl-menu'>" + html + "</ul>";

                return html;
            }

            function traversal(dd, html){

                for(var index in dd){
                    html += ("<li>");
					if(Object.prototype.toString.call(dd[index]).toString() === "[object Array]"){
                        html += ("<a class='dl-has-sub'>" + index + "</a>");
                        html += ("<ul class='dl-submenu'>");
                        html = traversal(dd[index], html);
                        html += ("</ul>");
					}else {
					    console.debug(dd[index].link_uri)
                        html += ("<a href='javascript:void(0);' onclick='g.loadPage(\""+dd[index].link_uri+"\", \""+dd[index].page_id+"\", false, null, true, false)'>" + dd[index].text + "</a>")
					}
                    html += ("</li>");
                }
                return html ;
			}

			function submit () {
                $.ajax({
                    url: "/toolbar/submitMenu",
                    type: 'post',
                    data:{business_id:business_id, menu_html: menu_html},
                    success: function (text, status) {
						console.debug(text);
                    }
                });
            }


        </script>
	</head>
    <body>
	<?php foreach ($business as $b) { ?>
		<div class="busi" id="<?php echo $b['id']; ?>"><?php echo $b['desc']; ?></div>
	<?php } ?>

	<div class="demo-3">
		<div id="menu" class="dl-menu dl-menuwrapper" style="height: 300px;width: 200px">

		</div>
	</div>

	<button id="submit" onclick="submit()" type="button" style="width:100px;height:30px;border-radius: 5px">提交</button>

	</body>
</html>