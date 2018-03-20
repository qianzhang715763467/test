var oldData = {
	"0":{"city":"杭州","lng":"120.10","lat":"30.16","text":"杭州的 XXX<br/>投资1000万元 ",
		"val":{
			"t":"1",
			"l":"2",
			"r":"3",
			"b":"4",
			"x":"5",
			"y":"6",
			"className":"NoticeLeft"
		}
	}
};

var newData = {
	"0":{"city":"郑州市","lng":113.4,"lat":34.46,"text":"郑州市的XXX<br/>投资71万元"},,
	"1":{"city":"安阳市","lng":114.21,"lat":36.06,"text":"安阳市的XXX<br/>投资59万元"},
	"2":{"city":"邢台市","lng":114.3,"lat":37.04,"text":"邢台市的XXX<br/>投资47万元"},
	"3":{"city":"杭州","lng":"120.10","lat":"30.16","text":"杭州的 XXX<br/>投资1000万元 "}
}
var projection = d3.geoMercator();

var count = 0;
// 生产
//function queryNewData(){
//	if(Object.getOwnPropertyNames(newData).length > 0){
//		console.debug("newData 还有未消费完的数据, 不发起 ajax...");
//  	return;
//	}
//	console.debug("发起 ajax.....");
//  for(var i = 0;i<10;i++) {
//      newData[count+""] = Math.round(Math.random() * 100);
//      if(count >=10000)
//          count = 0;
//      else
//          count++;
//  }
//}


creartTipDomAndSvgAnimation();
// 消费
// 创建提示框dom & svg动画
 function creartTipDomAndSvgAnimation(){
 	this.data; // 单个城市data
    var index;
  	if(Object.getOwnPropertyNames(newData).length === 0){
        console.debug("没有数据消费");
        return;
    }
    console.debug("消费一条数据");
    for(var i in newData){
        index = i;		  // 记录当前数据key 
        this.data = newData[i];// 另存当前数据
        delete newData[i];// 删除当前数据
        break;			  // 跳出循环
    }
 	// 遍历当前 newObj 计算状态坐标、边线、检测碰撞、创建dom、放入旧的 oldObj 中；
 	this.init = function(){
 		for(var i in this.data){
 			var coors = projection([this.data[i]['lng'],this.data[i]['lat']]);// 经纬度转化为X、Y
 			this.styleOffset(coors);
 			this.collisionDetection(i);
 		};
 	}
 	// 计算4种样式的坐标、offset距离
 	this.styleOffset = function(coors){
 		var initL =  $('#map-countent').offset().left, // 要添加节点父级的offsetLeft
			initT =  $('#map-countent').offset().top,  // 要添加节点父级的offsetTop
			initW =  120, // 要添加dom的宽度
			inith =  50;  // 要添加dom的高度
		this.data.val = { // 计算出对应城市提示框的4种状态坐标 & 边线
			"NoticeLeft":{
				"className":"NoticeLeft",
				"x"	: coors[0]-10,
				"y"	: coors[1]-initH-30,
				"t"	: coors[1]-initH-30+initT,
				"r"	: coors[0]+initW+initL+10,
				"b"	: coors[1]+initT-10,
				"l"	: coors[0]+initL	
			},
			"NoticeTop":{
				"x"	: coors[0]-10,
				"className":"NoticeTop",
				"y"	: coors[1]+20,
				"t"	: coors[1]+initT+20,
				"r"	: coors[0]+initW+initL+10,
				"b"	: coors[1]+initH+initT+20,
				"l"	: coors[0]+initL
			},
			"NoticeRight":{
				"className":"NoticeRight",
				"x"	: coors[0]-initW-10,
				"y"	: coors[1]+20,
				"t"	: coors[1]+20+initT,
				"r"	: coors[0]+initL+10,
				"b"	: coors[1]+initH+initT+30,
				"l"	: coors[0]-initW-10+initL	
			},
			"NoticeBottom":{
				"className":"NoticeBottom",
				"x"	: coors[0]-initW-10,
				"y"	: coors[1]-initH-30,
				"t"	: coors[1]-initH-30+initT,
				"r"	: coors[0]+initL,
				"b"	: coors[1]+initT-20,
				"l"	: coors[0]-initW-10+initL
			}
		};
 	};
 	// 检测碰撞 & 返回错误值
 	this.collisionDetection = function(){
 		// 错误数据记录
		var er = {
			"count":0,
			"domList":[],
			"cN":""
		}
 		for(var n in this.data.val){// 4种状态坐标
 			var adjCount  = 0; // 记录正确值
 			var errorCount= 0;
 			var errorList = [];
 			var t1 = this.data.val[n].t,
 				r1 = this.data.val[n].r,
 				b1 = this.data.val[n].b,
 				l1 = this.data.val[n].l,
 				cN = this.data.val[n]['className'];
			// 循环已生成dom的数据 oldData
			for(var x in oldData.length){
				var t2 = oldData[x]['val']['t'],
					r2 = oldData[x]['val']['r'],
					b2 = oldData[x]['val']['b'],
					l2 = oldData[x]['val']['l'];
				// 检测与已生成的dom是否碰撞
				if(b1 < t2 || l1 > r2 ||t1 > b2 ||r1 < l2){// 当前数据没有碰撞,则计数器+1
					adjCount ++;
				}else{
					terrorCount++;     // 多少个碰撞
					errorList.push(x); // 存在碰撞的oldData数据的key
				}
			};
			if(adjCount == oldData.length){// 如果当前数据与所有已存在数据均无碰撞,则根据当前数据生成dom。并将值写入oldData中，跳出当前循环
				this.creartDom(this.data.val[n]);
				break;
			}else{// 存在碰撞？ 记录下来每种状态的碰撞数量 & 碰撞dom的ID。之后进行对比获取最优样式
				if(er['count'] >  terrorCount){// 当前样式错误更少？
					er = {
						"count":terrorCount,
						"domList":errorList,
						"cN":cN
					};
				}
			}
 		};
 		if(er['count'] > 0){
 			// 获取错误最少的样式
 			this.creartDom(this.data.val[er['cN']]);
 			this.deleteDataAndDom(er);
 		};
 		
 		
 	};
 	//生成dom
 	this.creartDom = function(val){
 		oldData[index] = this.data;
		oldData[index]['val'] = {
			"t":val['t'],
			"l":val['l'],
			"r":val['r'],
			"b":val['b'],
			"x":val['x'],
			"y":val['y'],
			"className":val['className']
		};
		// 创建dom
		var dom = '<section class="puff-content">'
		        	+'<div class="Notice '+ oldData[index]['val'][className]+'" id="Notice'+index+'"></div>'
		        		+'<img src="/js/puff.svg"/>'
		        	+'</section>';
		oldData[index]['el'] = $(dom);
		$(puff).append(dom);
 	};
 	// 删除存在碰撞的数据 & dom
 	this.deleteDataAndDom = function(er){
 		for(var i = 0;i < er.domList.length; i++){
 			oldData[er.domList[i]].el.remove();// 删除dom
 			delete oldData[er.domList[i]];     // 删除数据
 		}
 	};
 	// 数据长度超出规定值，删除第一个
 	this.deleteFirstDataAndDom = function(){
 		
 	};
 	// 运行脚本
 	this.running = function(){
 		init();
 	}
 	return this.running();
 };






/*objs = {};

_obj = {
	1:{
		a,b,c,d,
		[1,2]
	},
	2:{
		a,b,c,d,
		[1,2,3]
	},
	3:{
		a,b,c,d,
		[1,2,3,4]
	},
	4:{
		a,b,c,d,
		[3,4]
	},
};



判断{
	for(var c in objs){

	}
	var obj = _obj[4];
	obj.el = $();

	......


	deleteDataAndDom(index);
}


count = 0;

objs[count++ + ""] = obj;

//objs[count++ + ""] = obj;


function deleteFirstDataAndDom{
	for(var index in objs){
		deleteDataAndDom(index);
		break;
	}
}



function deleteDataAndDom(index){
	objs[index].el.remove();
	delete objs[index];
}*/
