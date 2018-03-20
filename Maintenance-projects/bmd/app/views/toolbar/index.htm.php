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
        </script>
	</head>
    <body>
	<?php foreach ($business as $b) { ?>
		<div class="busi" id="<?php echo $b['id']; ?>"><?php echo $b['desc']; ?></div>
	<?php } ?>
	</body>
</html>