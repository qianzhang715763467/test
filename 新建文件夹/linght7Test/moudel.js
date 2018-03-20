var a = {
	pageWarp:{ // 每个页面对应的外层固定结构
		page1:function(){
		},
		page2:function(){},
		page3:function(){},
		commonality:{ // 不同页面共用模块
			swiper:function(d){
				var html = '<div class="swiper-container" data-space-between="'+d.spaceBetween+'" data-pagination="'+d.pagination+'" data-autoplay="'+d.autoplay+'">'     
							+'<div class="swiper-wrapper">'+ d.swiperHtml +'</div>'
							+'<p class="'+d.pagination.split('.')[1]+'" style="opacity:'+ d.opacity+';"></p>'
						+'</div>';
				return html;
			}
		}
	},
	pageMain:{ // 每个页面对应的动态数据模块
		page1:function(){},
		page2:function(){},
		page3:function(){},
		commonality:function(){
			swiper:function(d){
				var html = '<div class="swiper-slide">'
				    	+'<div class=" demo-card-header-pic swiper-card">'
							+'<div valign="bottom" class="card-header color-white no-border no-padding">'
								+'<img class="card-cover" src="'+d.img+'" alt="">'
							+'</div>'
							+'<div class="swiper-card-content">'
								+'<div class="card-content-inner">'
									+'<p class="color-bold">'+d.title+'</p>'
									+'<p class="color-gray">'+d.activity+'</p>'
								+'</div>'
							+'</div>'
						+'</div>''
				    +'</div>';
			    return html;
			}
		}
	},
	pageData:{// 每个页面对应的动态数据
		page1:function(){},
		page2:function(){},
		page3:function(){}
	},
	compositionMoudel:{// 每个页面对应的完整的盒模型
		page1:function(){},
		page2:function(){},
		page3:function(){}
	},
	append:{// 插入到指定dom中
		page1:function(){},
		page2:function(){},
		page3:function(){}
	}
}
