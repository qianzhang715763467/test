var index = {
	modules : {
		// 滑块
		swiper : function(){
			var html = '<div class="swiper-slide">\
		    	<div class=" demo-card-header-pic swiper-card">\
					<div valign="bottom" class="card-header color-white no-border no-padding">\
						<img class="card-cover" src="{{imgs}}" alt="">\
					</div>\
					<div class="swiper-card-content">\
						<div class="card-content-inner">\
							<p class="color-bold">{{title}}</p>\
							<p class="color-gray">{{activity}}</p>\
						</div>\
					</div>\
				</div>\
		    </div>';
			return html; 
		},
	    // 单个商品
	   commodityCard : function(){
	   		var html = '<a href="#commodity-details" class="item-inner JumpDetailsPage" data-page="commodity-details">\
				<div class="card demo-card-header-pic">\
					<div valign="bottom" class="card-header color-white no-border no-padding">\
						<img class="card-cover" src="{{src}}" alt="">\
					</div>\
					<div class="card-content">\
						<div class="card-content-inner">\
							<p class="card-content-inner-text">{{tradeName}}</p>\
							<p class="color-gray card-content-inner-text">{{activity}}</p>\
						</div>\
					</div>\
					<div class="card-footer">\
						<p class="link price">{{currentPrice}}<i>{{originalPrice}}</i></p>\
						<span class="collect">❤</span>\
					</div>\
				</div>\
			</a>';
	   		return html;
	   },
	   // 评论
	   comments : function(){
	   		var html = '<li class="item-content">\
				<div class="item-media">\
					<img src="http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg" width="44">\
				</div>\
				<div class="item-inner">\
					<div class="item-title-row">\
						<div class="item-title">标题</div>\
					</div>\
					<div class="item-subtitle">☆☆☆☆☆</div>\
				</div>\
				<div class="card-footer">\
					<section class="card-footer-content">\
						<span>2015/01/15</span>\
						<span>5 评论</span>\
					</section>\
				</div>\
				<span class="comment-time">\
					2015-01-15\
					<svg class="icon iconFont iconTime" aria-hidden="true">\
                        <use xlink:href="#icon-shijian"></use>\
                    </svg>\
                </span>\
			</li>';
			return html;
	   },
	   // 分享
	   share : function(){
	   		var html = {
	   			'微信'		:'<div class="link-icon"><svg class="icon iconFont weChart" aria-hidden="true"><use xlink:href="#icon-weixin"></use></svg></div>微信',
	   			'朋友圈'		:'<div class="link-icon"><svg class="icon iconFont PengYouQuan" aria-hidden="true"><use xlink:href="#icon-pengyouquan"></use></svg></div>朋友圈',
	   			'QQ'		:'<div class="link-icon"><svg class="icon iconFont" aria-hidden="true"><use xlink:href="#icon-QQ"></use></svg></div>QQ',
	   			'Qzone'		:'<div class="link-icon"><svg class="icon iconFont Qzone" aria-hidden="true"><use xlink:href="#icon-qqkongjian"></use></svg></div>Qzone',
	   			'微博'		:'<div class="link-icon"><svg class="icon iconFont" aria-hidden="true"><use xlink:href="#icon-weibo"></use></svg></div>微博',
	   			'复制链接'	:'<div class="link-icon"><svg class="icon iconFont" aria-hidden="true"><use xlink:href="#icon-lianjie"></use></svg></div>复制链接'
	   		};
	   		return html;
	   }
	},
	requestData:function(url,cb){ // 请求数据传入回调
		$.ajax({
    		type:"get",
    		url:url,
    		async:true,
    		success:function(resData){
    			if(!resData)return;
    			try{
    				cb(resData);
    			}catch(e){
    				//TODO handle the exception
    			}
    		},
    		error:function(err){
    			console.log(err);
    		}
    	})
	},
	parseAndAssemblTheModules:function(){ // 解析请求到的数据,与拼接modules拼接
		
	},
	JumpPage : function(ev,el){ // 跳转页面,参数(事件,对象 )
		var self = this;
		$(document).on(ev,el,function(){
			var page = $(this).attr('data-page');
    		if(page){
    			self.requestData(page+'.html',function(resData){
    				$('#'+page).html(resData);
    			})
    		}
		});
	},
	swiper : function(parameter){
		var h = this.modules.swiper();
		var d = parameter;
		var newH = '<div class="swiper-container" data-space-between="'+d.spaceBetween
						+'" data-pagination="'+d.pagination
						+'" data-autoplay="'+d.autoplay
						+'"><div class="swiper-wrapper">';
		// 获取当前显示页面的ID,用id指向后代元素.防止类名冲突
		if(!$('.page').is(':hidden')){
			if($('.page').attr('id')){
				d.warp = "#"+ $('.page').attr('id');
				d.el   = d.warp+" "+d.el;
			}
		}
		// ajax
	    this.requestData(d.url,function(resData){
	    	// 替换自定义值
			for(var i = 0;i < resData.length; i++){
    			var obj = h;
    			for(var n in resData[i]){
    				var str = "{{"+n+"}}";
    				obj = obj.replace(str,resData[i][n]);
    			}
    			newH += obj;
    		}
			newH += '</div><p class="'+d.pagination.split('.')[1]+'" style="opacity:'+ d.opacity+';"></p></div>';
			$(d.el).before(newH);
			// 重启插件
			$(d.warp+" .swiper-container").swiper({
				spaceBetween: d.spaceBetween, 
				pagination: d.pagination, 
				autoplay: d.autoplay
			});
	    });
	},
	comments:function(data){
		var pageId	= data.pageId,
			main	= pageId+' '+data.main,
			warp	= pageId+' '+data.warp,
			heightDifference = Number(data.heightDifference);
		var loading = false;
	    var maxItems = 100;
	    var itemsPerLoad = 20;
		var html1 = this.modules.comments();
		var html2 = this.modules.commodityCard();
	    function addItems(number, lastIndex) {
            var html = '';
            if(pageId.indexOf('commodity') > -1){
            	for (var i = lastIndex + 1; i <= lastIndex + number; i++) {
	                html += html1;
	            }
            }else{
            	// 模拟数据结构
            	var obj1 = [
						{
							src : '//gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg',
							tradeName:'精选商品特卖上新 抄底价限时秒杀',
							activity:'满两件享8.8折',
							currentPrice:'￥539',
							originalPrice:'￥799'
						}
					];
            	for (var i = lastIndex + 1; i <= lastIndex + number; i++) {
	            	var cloneDom = html2;
	            	for(var n in obj1[0]){ // 复制模板结构并替换事先定义好的值；
	            		var str = "{{"+n+"}}";
	            		cloneDom = cloneDom.replace(str,obj1[0][n]);
	            	}
	            	// 每一个li中都有一组dom,根据当前循环拼接li结构；
	            	if(i%2 == 0){
	            		html += cloneDom+'</li>';
	            	}else{
	            		html += '<li class="item-content">'+cloneDom;
	            	}
	            }
            }
            // 插入
            $(main).append(html);
        }
	    addItems(itemsPerLoad, 0);
	    
	    var lastIndex = 20;
	    $(warp).scroll(function(){
			if(!$('.pages').is(':hidden')){
				var h = $('.pages').height()+heightDifference;
				if($(this).scrollTop() > h){
					// 如果正在加载，则退出
			        if (loading) return;
			        // 设置flag
			        loading = true;
			        setTimeout(function() {
			            loading = false;
			            if (lastIndex >= maxItems) {
			                $.detachInfiniteScroll($(pageId+' .infinite-scroll'));
			                $(pageId+' .infinite-scroll-preloader').remove();
			                return;
			            }
			            addItems(itemsPerLoad, lastIndex);
			            lastIndex = $(pageId+' .list-container li').length;
			        }, 1000);
				}
			}
		})
	},
	share:function(ev,el){
		var data = this.modules.share();
		// 分享
		$(document).on(ev,el, function() {
			var buttons1 = [{
					text: data['微信'],
					bold: true,
					color: 'decadence',
					onClick: function() {
						$.alert("你选择了“微信“");
					}
				},
				{
					text: data['朋友圈'],
					bold: true,
					color: 'decadence',
					onClick: function() {
						$.alert("你选择了“朋友圈“");
					}
				},
				{
					text: data['QQ'],
					onClick: function() {
						$.alert("你选择了“QQ“");
					}
				},
				{
					text: data['Qzone'],
					bold: true,
					color: 'decadence',
					onClick: function() {
						$.alert("你选择了“Qzone“");
					}
				},
				{
					text: data['微博'],
					bold: true,
					color: 'decadence',
					onClick: function() {
						$.alert("你选择了“微博“");
					}
				},
				{
					text: data['复制链接'],
					bold: true,
					color: 'decadence',
					onClick: function() {
						$.alert("你选择了“复制链接“");
					}
				}
			];
			var buttons2 = [{
				text: '取消',
				bg: 'danger'
			}];
			var groups = [buttons1, buttons2];
			$.actions(groups);
		});
	},
	init:function(){ // 初始化加载的数据
		index.swiper({
			url:'01-01.json',
			el:'.entry-nav',
			spaceBetween:10,
			pagination:'.swiper1-pagination',
			autoplay:'1000',
			opacity:0
		});
		
		index.JumpPage('click',".tab-item");
		index.JumpPage('click','.JumpDetailsPage');
	}
}
