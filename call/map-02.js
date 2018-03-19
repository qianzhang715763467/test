var fs = require('fs');
fs.readFile("F:/cs/cityCoordinates_1.json",function(err,data){
    if(err) throw err;

    var jsonObj = JSON.parse(data);
    var space = ' ';
    var newLine = '\n';
    var chunks = [];    
    var length = 0;

    for(var i=0,size =jsonObj.length; i<size;i++){
        var one = jsonObj[i];
        //what value you want 
        var value1 = one['values'];
      	for(var n in value1){
            var rr = Math.random() * 10000;
      		
			var str = '{"city":"'+value1[n]['city']+'","lng":'+value1[n]['lng']+',"lat":'+value1[n]['lat']+',"text":"'+value1[n]['city']+"的XXX投资"+ Math.ceil(rr%100)+'万元"},\r\n';
	        var buffer = new Buffer(str);
	        chunks.push(buffer);
	        length += buffer.length;
		}
        
    }
    var resultBuffer = new Buffer(length);
    for(var i=0,size=chunks.length,pos=0;i<size;i++){
        chunks[i].copy(resultBuffer,pos);
        pos += chunks[i].length;
        console.log(pos)
    }
    
    fs.writeFile('map-02.txt',resultBuffer,function(err){
        if(err) throw err;
        console.log('has finished');
    });
    
});