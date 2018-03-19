var index = {};
	index.creations = {
		data : {
			0:{
				img   : 'img/cbd.jpg',
				title : 'Posted on January 18, 2016',
				name  : '这里显示文章摘要，让读者对文章内容有个粗略的概念...',
				rulingPrice  : '1090￥',
				originalPrice: '3980￥'
			},
			1:{
				img   : 'img/muwu.jpg',
				title : 'Posted on January 18, 2016',
				name  : '这里显示文章摘要，让读者对文章内容有个粗略的概念...',
				rulingPrice  : '1090￥',
				originalPrice: '3980￥'
			},
			2:{
				img   : 'img/shuijiao.jpg',
				title : 'Posted on January 18, 2016',
				name  : '这里显示文章摘要，让读者对文章内容有个粗略的概念...',
				rulingPrice  : '1090￥',
				originalPrice: '3980￥'
			},
			3:{
				img   : 'img/yuantiao.jpg',
				title : 'Posted on January 18, 2016',
				name  : '这里显示文章摘要，让读者对文章内容有个粗略的概念...',
				rulingPrice  : '1090￥',
				originalPrice: '3980￥'
			}
		},
		creatMoudel : function(dom){
			var self = this;
			for(var n = 0; n < $(dom).length; n++){
				var li = "";
				for(var i = 1; i < 41; i++){
					var a = '<a href="javascript:;" class="mui-cardBox">'
							+'<div class="mui-card">'
								+'<div class="mui-card-header mui-card-media" style="height:40vw;background-image:url('+self.data[n].img+')"></div>'
								+'<div class="mui-card-content">'
									+'<div class="mui-card-content-inner">'
										+'<p>'+self.data[n].title+'</p>'
										+'<p style="color: #333;">'+self.data[n].name+'</p>'
									+'</div>'
								+'</div>'
								+'<div class="mui-card-footer">'
									+'<span class="mui-card-link">'+self.data[n].rulingPrice+'</span>'
									+'<span class="mui-card-link">'+self.data[n].originalPrice+'</span>'
								+'</div>'
							+'</div>'
						+'</a>';
					if( i%2 != 0){
						li += '<li class="mui-table-view-cell">'+a;
					}else{
						li += a+'</li>';
					}
				};
				if($(dom).eq(n).children('.scroll-item-content').length > 0){
					$(dom).eq(n).children('.scroll-item-content').append(li);
				}else{
					var ul = '<ul class="scroll-item-content">'+li+'</ul>';
					$(dom).eq(n).append(ul);
				}
			}
		}
	};
	
	/*=================    slider     ================*/
	index.slider = {
		moveVal:{},
		touchs : function(ev,cb){
			var self = this;
			self.warp.delegate('.scroll-item',ev,function(event){
				//event.stopPropagation()
				//event.preventDefault();
		        if (!event.originalEvent.targetTouches.length && ev != "touchend") return;
		        var touch = event.originalEvent.targetTouches[0];
				cb(touch,self,this);
			});
		},
		start:function(touch,self,el){
			self.init = {
				el 	  : $(el),
				time  : new Date().getTime(),
				pageY : touch.clientY,
				pageX : touch.pageX,
				offsl : Math.round(self.warp.parent().scrollLeft())// 记录触发touch事件是dom居左的坐标,用于事件结束时返回当前位置
			};
			self.init.width	= self.init.el.outerWidth();
			self.init.index	= self.init.el.index();
			self.warp.parent().css('overflow-x','scroll');
		},
		move:function(touch,self,el){
			if(!self.init){
				return;
			}
			self.moveVal.pageY = touch.clientY;
			self.moveVal.pageX = touch.pageX;
		},
		end:function(touch,self,el){
			setTimeout(function(){
				self.warp.parent().css('overflow-x',"hidden");
			},0);
			var size = self.warp.parent().scrollLeft() - self.init.offsl;// 移动距离
			if(size > 0 && size >= self.init.width/3){//向左滑
				self.animate(self.init.offsl+self.init.width ,$(self.navDom[self.init.index+1]));
				self.init.el.removeClass('scroll-active').next().addClass('scroll-active'); // 改变类名
				
				console.log("左------------")
				console.log(size)
				
			}else if(size < 0 && Math.abs(size) >= self.init.width/3){//向右滑
				self.animate(self.init.offsl-self.init.width , $(self.navDom[self.init.index]));
				self.init.el.removeClass('scroll-active').prev().addClass('scroll-active'); // 改变类名
				
				console.log("右----------")
				console.log(size)
			}else{
				self.animate(self.init.offsl);
				console.log("不变---------")
				console.log(self.init.offsl)
			};
		},
		navclick:function(){
			var self = this;
			self.navDom.click(function(){
				var width 	= $(self.sliderDom[$(this).index()-1]).outerWidth(),// 对应tabPage的宽度
					size 	= ($(this).index()-1) * width;					// 偏移量
				self.animate(size , $(this));
			})
		},
		// tabPage 偏移量,对应nav变化
		animate:function(size,navEl){
			this.warp.parent().scrollLeft(size);
			if(!navEl)return;
			this.navDom.removeClass('mui-active');
			navEl.addClass('mui-active');
		},
		run : function(obj){
			this.warp = obj.warp;
			this.sliderDom = obj.sliderDom;
			this.navDom = obj.navDom;
			this.touchs("touchstart",this.start);
			this.touchs("touchmove",this.move);
			this.touchs("touchend",this.end);
			this.navclick();
		}
	};
	index.creations.creatMoudel('.scroll-item');
	index.slider.run({
		warp : $('.my-slider-warp'),
		sliderDom:$('.scroll-item'),
		navDom : $('#classify .mui-tab-item')
	});
