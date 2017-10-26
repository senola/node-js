// 方法1
/*var http = require('http');
var receivedNum = 0;
var content = '';
http.get(process.argv[2], function (res) {
   res.setEncoding('utf-8');
   res.on('data',function(data){
       receivedNum += data.length;
       content += data;
   });
   res.on('end',function(){
      console.log(receivedNum);
      console.log(content);
   });
});*/
// 方法2  使用第三方package "bl"
var http = require('http');
var bl = require('bl'); 

http.get(process.argv[2], function (res) {
  res.pipe(bl(function (err, data) {
    if (err) {
      return console.error(err);
    }
    data = data.toString(); //buffer 对象转换成String对象
    console.log(data.length);
    console.log(data);
  }));
});
