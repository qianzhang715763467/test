// 递归转换json的每个值
var recursion = function(json) {
	// 如果是数组，则读取数组里面的每个元素，将每元素中的string值，作为key，进行转换
	if (json instanceof Array) {
		var newJson = {};
		for ( var i in json) {
			// 需要转换的数组
			// 如：d:[{k1:v1},{k2:v2}] ==>> d:{v1:{k1:v1},v2:{k2:v2}}
			for ( var key in json[i]) {
				if (typeof json[i][key] == "string") {
					newJson[json[i][key]] = recursion(json[i], key);
				}
			}
		}
		return newJson;
	}
	// 如果是对象，则循环转换Object每个值
	if (typeof json == "object") {
		var newJson = {};
		for ( var key in json) {
			// 递归转换json的每个值
			newJson[key] = recursion(json[key]);
			// 保留原有数组，方便用于做sum、count等聚合计算，用下划线做key
			if (json[key] instanceof Array) {
				newJson[key]["_"] = json[key];
			}
		}
		return newJson;
	}
	// 如果是字符串、数字、布尔，则直接返回
	if (typeof json == "string" || typeof json == "number" || typeof json == "boolean") {
		return json;
	}
	// 或者其他情况
	return json;
};

// 获得arr数组中key的值，并进行sum计算
var sum = function(arr, key) {
	var val = 0;
	// 读取原有数组进行聚合计算。
	for ( var i in arr["_"]) {
		val += parseFloat(arr["_"][i][key]);
	}
	return val;
};

// 获得arr数组中key的值，并进行avg计算
var avg = function(arr, key) {
	var val = 0;
	// 读取原有数组进行聚合计算。
	for ( var i in arr["_"]) {
		val += parseFloat(arr["_"][i][key]);
	}
	return val / arr["_"].length;
};

// 获得arr数组的长度
var length = function(arr) {
	return arr["_"].length;
};

// 获得arr数组中key的值，并进行max计算
var max = function(arr, key) {
	var val = 0;
	// 读取原有数组进行聚合计算。
	for ( var i in arr["_"]) {
		var val_tmp = parseFloat(arr["_"][i][key]);
		val = val < val_tmp ? val_tmp : val;
	}
	return val;
};

// 获得arr数组中key的值，并进行min计算
var min = function(arr, key) {
	var val = 0;
	// 读取原有数组进行聚合计算。
	for ( var i in arr["_"]) {
		var val_tmp = parseFloat(arr["_"][i][key]);
		val = val > val_tmp ? val_tmp : val;
	}
	return val;
};
