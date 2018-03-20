function drawCanvas(id,data){
	this.id   = id;
	this.data = JSON.parse(JSON.stringify(data));
	this.clear= []; // 定时器放置 
	this.maxRadius = 0; // 最大半径,圆内折线使用
	this.draw = function(){
		var self = this;
		// 创建拥有时间戳id的 <canvas>
		var h = self.id.offsetHeight;
		var w = self.id.offsetWidth;
		var bor = -(w - self.id.clientWidth)/2;
		var data = new Date().getTime();
		var id = self.id.id+data;
		var myCanvas = document.createElement('canvas');
			myCanvas.setAttribute('width',w+'px');
			myCanvas.setAttribute("height",h+'px');
			myCanvas.setAttribute("id",id);
			$(myCanvas).css({'position':'absolute','top':bor,'left':bor});
		self.id.appendChild(myCanvas);
		// 创建完成，修改 self.id指向
		self.id = document.getElementById(id);
		self.ctx = self.id.getContext('2d');
		for(var i = 0;i < self.data.length;i++){
			if(self.data[i].R > self.maxRadius){
				self.maxRadius = self.data[i].R;
			};
			self.clear.push({'timer':""});
			// 默认居中
			if(!self.data[i].X){
				self.data[i].X = self.id.offsetWidth/2;
			};
			if(!self.data[i].Y){
				self.data[i].Y = self.id.offsetHeight/2;
			};
			// 文字默认样式
			if(!self.data[i].font){
				self.data[i].font  = '12px/150% arial black';
			}
			if(!self.data[i].animate){
				// 作用于提升，解决层级问题
				(function(i){
					var x = i;
					setTimeout(function(){
						self.type(self,x);									
					},self.data[x].zIndex);
				})(i);
			}else{
				(function(i){
					var x = i;
					setTimeout(function(){
						self.animation(x);
					},self.data[x].zIndex*100);
				})(i);
			};
		};
	};
	// 动画
	this.animation = function(x){
		var self = this;// 定时器中 this =>> windiw,所以这里要重新定义一次
		var a = self.data,
			b = self.data[x],
			c = self.ctx;
			b.random = Math.random()*5 + b.zIndex; // 动画执行时间
			b.count  = b.S; 	//起始点
			b.size   = 0.02;	// 起点到终点的绘制长度；
		self.clear[x].timer = setInterval(function(){
			self.type(self,x);
			if(b.count >= b.E){ // 起点 == 终点？ 停止动画；
				clearInterval(self.clear[x].timer);
				// 无限次？
				if(b.animate == 'true'){
					b.count = b.S + 0.01;		// 起点初始值；
					b.size  = b.E - b.S;		// 每次绘制动画的长度；
					// 循环动画开始
					self.clear[x].timer = setInterval(function(){
						// Arr :复制一份绘图数据。目的是判断如果有与当前循环绘制图像重叠的部分，那么会用这组复制的数据将其覆盖。
						// 并用原数据重新绘制所有覆盖的数据。So! 这份用来覆盖的数据颜色只能是与canvas背景色一致才能起到橡皮擦一样的效果。 
						var coverage = JSON.parse(JSON.stringify(b)); // 复制一个当前图像作为覆盖层,并修改基础参数；
							coverage.animate = false;	// 覆盖层不能有动画
							coverage.color = self.id.style.backgroundColor;// 颜色为canvas底色
							coverage.zIndex  = 0;		// 层级为 0;
							coverage.S = 0;		 		// 弧形起点
							coverage.E = 2;		 		// 弧形终点
							coverage.R = coverage.R-1;  // 半径缩小
							coverage.W = coverage.W +3; // 扩大弧形宽度，用来覆盖散点 
						// 重新绘制图像用的新数组
						var Arr = {ctx : c,data:[]};
						Arr.data.push(coverage);
						self.arcW = b.R + b.W-5; 		// 当前弧的总半径；
						for(var i = 0;i < a.length; i++){
							// 其他图像与当前图像有重叠就一起重绘；
							if(self.arcW >= a[i].R && b.R <= a[i].R){
								var obj = a[i];
								if(a[i].animate != 'true'){
									obj.animate = "";
								};
								Arr.data.push(obj);
							};
						};
						for(var i = 0;i < Arr.data.length; i++){
							self.type(Arr,i);
						};
					},60);
				};
			}
		},b.random);
	};
	// 绘制图像的类型
	this.type = function(obj,x){
		if(obj.data[x].type == 'arc'){
			this.arc(obj.ctx,obj.data[x]);
		};
		if(obj.data[x].type == 'Test'){
			this.Test(obj.ctx,obj.data[x]);
		};
		if(obj.data[x].type == 'line'){
			this.line(obj.ctx,obj.data[x]);
		};
		if(obj.data[x].type == 'circle'){
			this.circle(obj.ctx,obj.data[x]);
		};
		if(obj.data[x].type == 'border'){
			this.border(obj.ctx,obj.data[x]);
		}
	};
	// 圆弧 at= {动画次数 ，当前起点}
	this.arc = function(ctx,p){
		var ot = p.status == true ? true : false;
		ctx.beginPath();// 开始一条新的路径，或重置当前路径；
		// 判断当前圆环是否需要动画
		if(!p.animate){
			// 圆环 无动画
			ctx.arc(p.X,p.Y,p.R,p.S*Math.PI,p.E*Math.PI,ot);
		}else{
			// 圆环 有动画
			ctx.arc(p.X,p.Y,p.R,p.count*Math.PI,(p.count+p.size)*Math.PI,ot);
			p.count += 0.01;
		}
		ctx.lineCap = "butt";
		ctx.lineWidth = p.W;// 宽度
		ctx.strokeStyle = p.color;// 颜色
		ctx.stroke();// 绘制
		ctx.closePath();
	};
	// 边框
	this.border = function(ctx,p){
		for(var i = 0; i < p.size.length; i++){
			//.replace(/\w/g , this.id.offsetWidth).replace(/\h/g , this.id.offsetHeight)
			var str = p.size[i].replace(/\h/g , this.id.offsetHeight).replace(/\wi/g,this.id.offsetWidth);
			var s = str.substring(str.indexOf("S")+1,str.indexOf("E"));
			var e = str.substring(str.indexOf("E")+1,str.length).split(' ');
			ctx.beginPath();
			// 宽度数组长度 == 线段数组长度 ? 
			if(p.width.length == p.size.length){
				ctx.lineWidth = p.width[i];
			}else{
				// 如果不相等只使用第一个值; 
				ctx.lineWidth = p.width[0];
			};
			// 颜色数组长度 == 线段数组长度 ?
			if(p.color.length == p.size.length){
				ctx.strokeStyle = p.color[i];
			}else{
				// 如果不相等只使用第一个值; 
				ctx.strokeStyle = p.color[0];
			};
			if(p.cap){
				ctx.lineCap = p.cap;
			}
			ctx.moveTo(eval(s.substring(0,s.indexOf(","))) , eval(s.substring(s.indexOf(",")+1,s.length)));// 起点
			for(var a = 0;a < e.length; a++){
				ctx.lineTo(eval(e[a].substring(0,e[a].indexOf(","))) , eval(e[a].substring(e[a].indexOf(",")+1,e[a].length)));	// 路径
			}
			ctx.stroke();		// 结束
			ctx.closePath();	// 闭合
		}
		
	};
	// 折线
	this.line = function(ctx,p){
		for(var i = 0;i < p.S.length; i++){
			if(!p.S[i] || !p.originRadius[i])return;
			var t = {
				 	angle : 360 - 180*p.S[i],
				 	maxR  : this.maxRadius+15,
				 	minR  : p.originRadius[i],
				 	color : p.color,
					font  : '12px/150% "Lucida Grande", Verdana, Lucida, Arial, Helvetica, 宋体,sans-serif'
			};
			t.coord = this.getCoord(p.X,p.Y,t.minR,t.maxR,t.angle); // X,Y原点、最小半径、最大半径、角度；
			ctx.beginPath();
			ctx.lineWidth = 2;
			ctx.strokeStyle = t.color;
			ctx.moveTo(t.coord.x1, t.coord.y1);
			ctx.lineTo(t.coord.x2, t.coord.y2);
			ctx.lineTo(t.coord.x3, t.coord.y3);
			ctx.stroke();
			ctx.closePath() //闭合路径 
			// 末端小圆
			ctx.beginPath();
			ctx.arc(t.coord.x3,t.coord.y3,3,0,360,false);
			ctx.fillStyle = t.color;//填充颜色,默认是黑色
			ctx.fill();//画实心圆
			ctx.closePath();
			// 不存在文本，跳过当前循环；
			if(!p.values[i])continue ;
			var x = t.coord.x2 > t.coord.x3 ? t.coord.x2 -(t.coord.x2 - t.coord.x3)/2 : t.coord.x3-(t.coord.x3 - t.coord.x2)/2;
			t.text = p.values[i];
			t.X = x;
			t.Y = t.coord.y3-5;
			this.Test(ctx,t);
			ctx.closePath();
		}
	};
	// 圆形
	this.circle = function(ctx,p){
		ctx.beginPath();
		//创建一个径向渐变，从圆心为(X,Y)半径为0的圆周开始沿着半径向圆心为(160120)半径为200的圆周进行径向渐变
		if(!p.color1 || !p.color2){
			if(!p.color1){
				ctx.fillStyle = p.color2;//填充颜色,默认是黑色
			}else if(!p.color2){
				ctx.fillStyle = p.color1;//填充颜色,默认是黑色
			}else{
				ctx.fillStyle = p.color;
			}
		}else{
			var my_gradient= ctx.createRadialGradient(p.X,p.Y,p.minR, p.X,p.Y,p.maxR);  
				my_gradient.addColorStop(1, p.color1);    //定义 渐变色弱，
				my_gradient.addColorStop(0, p.color2);    //定义 渐变色强
			ctx.fillStyle = my_gradient;//填充颜色,默认是黑色
		}
		ctx.arc(p.X,p.Y,p.maxR,p.S*Math.PI,p.E*Math.PI,false);
		ctx.fill();//画实心圆
		ctx.closePath();
	}
	// 文字
	this.Test = function(ctx,p){
		// w ： 文字宽度的一半；
		var w = this.fontW(p);
		ctx.beginPath();
		ctx.font 	  = p.font;
		ctx.fillStyle = p.color;
		ctx.fillText(p.text , p.X-w , p.Y);
		ctx.closePath();
	};
	// 计算文字宽度，用于居中放置
	this.fontW = function(p){
		// 创建一个行内元素。将要绘制的文字、大小、字体 全部赋给这个行内元素。之后计算出一半的宽度再删除掉；
		var span = document.createElement('span');
			span.style.font 	= p.font;
			span.style.opacity 	= 0;
			span.innerHTML 		= p.text;
		document.getElementsByTagName('body')[0].appendChild(span);
		var w = span.offsetWidth/2;
		span.remove();
		return w;
	};
	this.getCoord = function(cx,cy,r1,r2,a){
		var x2 = cx + r2*Math.cos(a*2*Math.PI / 360);
		var x3 = x2 > cx ? cx+r2+50 : cx-r2-50;
		var coord = {
			x1 : cx + r1*Math.cos(a*2*Math.PI / 360),
			y1 : cy - r1*Math.sin(a*2*Math.PI / 360),
			x2 : x2,
			y2 : cy - r2*Math.sin(a*2*Math.PI / 360),
			x3 : x3,
			y3 : cy - r2*Math.sin(a*2*Math.PI / 360)
		};
		return coord;
	}
	//return this.draw();
}