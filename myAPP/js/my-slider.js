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
				var ul = '<ul class="scroll-item-content">';
				for(var i = 1; i < 20; i++){
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
						ul += '<li class="mui-table-view-cell">'+a;
					}else{
						ul += a+'</li>';
					}
				};
				$(dom).eq(n).append(ul);
			}
		}
	};
	
	/*=================    slider     ================*/
	index.slider = {
		touchs : function(ev,cb){
			var self = this;
			self.sliderDom.on(ev,function(event){
				//event.preventDefault();
		        if (!event.originalEvent.targetTouches.length && ev != "touchend") return;
		        var touch = event.originalEvent.targetTouches[0];
				cb(touch,self,this);
			});
		},
		start:function(touch,self,el){
			self.init = {
				time	: new Date().getTime(),
				pageY	: touch.pageY,
				pageX	: touch.pageX
			};
			console.log(self.init)
		},
		move:function(touch,self,el){
			self.moveVal = {
				time	: new Date().getTime(),
				pageY	: touch.pageY,
				pageX	: touch.pageX
			};
		},
		end:function(touch,self,el){
				self.index 	= $(el).index();
				self.outerW = Math.abs($(el).outerWidth())* -1;
				self.nav 	= $(self.navDom).eq(self.index);
			var w = $(el).outerWidth();
			var X = self.init.pageX - self.moveVal.pageX,
				Y = self.init.pageY - self.moveVal.pageY;
			// 左划	
			if ( Math.abs(X) > Math.abs(Y) && X > 5) {
				if(X > w/2 || (self.moveVal.time - self.init.time) < 3){
					if($(el).index() == self.list)return;
					self.animate($(el).next(),self.nav.next(),true);
				}
		    }
			// 右划
		    else if ( Math.abs(X) > Math.abs(Y) && X < 0 ) {
		    	if(-X > w/2 || (self.moveVal.time - self.init.time) < 3){
		    		if($(el).index() == 0)return;
					self.animate($(el).prev(),self.nav.prev(),false);
				}
		    }
		},
		navclick:function(){
			var self = this;
			self.navDom.each(function(){ // 监听导航条点击事件
				if(this.attachEvent){
					this.attachEvent('click',function(){
						aa($('.mui-tab-item.mui-active').index());
					});
					this.attachEvent('tap',function(){
						aa($('.mui-tab-item.mui-active').index());
					});
				}else{
					this.addEventListener('click',function(){
						aa($('.mui-tab-item.mui-active').index());
					},false);
					this.addEventListener('tap',function(){
						aa($('.mui-tab-item.mui-active').index());
					},false);
				}
			});
			
			/*self.navDom.click(function(){
				aa($(this).index());
			})*/
			
			function aa(index){
				var el 	 = self.sliderDom.eq(index),// 需要切换到的tabPage
				 	size = $(self.sa).index() - index; // 当前显示tabPage的索引 - 需要切换到的tabPage索引;
				self.outerW = Math.abs(self.sliderDom.eq(0).outerWidth());// tabPage切换需要移动的绝对值距离
				
				if(size < 0){//右划
					self.animate(el,false,true);
				}else if(size > 0){//左划
					self.animate(el);
				}else{// 不变
				}
			};
		},
		// 要显示的页面，相对应的导航，左/右
		animate:function(el,nav,orientation){
			if(orientation){// 向左滑动
				$(this.sa).css({'left':this.outerW,'opacity':"0"}).removeClass('scroll-active');
				$(el).css({'left':0,'opacity':"1"}).addClass('scroll-active');
			}else{// 向右滑动
				var oldDom = $(this.sa);//防止 .scroll-active 指向变更
				oldDom.removeClass('scroll-active');
				$(el).css({'left':this.outerW,'opacity':"0"});
				$(el).css({'left':0,'opacity':"1"}).addClass('scroll-active');
				setTimeout(function(){ // 解决向右滑动动画衔接不到位导致白边
					oldDom.css({'left':0,'opacity':"0"});
				},180);
			}
			if(nav)nav.addClass('mui-active').siblings().removeClass('mui-active');
		},
		run : function(obj){
			this.sliderDom = obj.sliderDom;
			this.navDom = obj.navDom;
			this.sa = '.scroll-active'; // 选项卡页选中
			this.na = '.mui-active'; 	// 导航选中
			this.list = this.sliderDom.length-1;
			this.touchs("touchstart",this.start);
			this.touchs("touchmove",this.move);
			this.touchs("touchend",this.end);
			this.navclick();
		}
	};
	index.creations.creatMoudel('.scroll-item');
	index.slider.run({
		sliderDom:$('.scroll-item'),
		navDom : $('.mui-tab-item')
	});