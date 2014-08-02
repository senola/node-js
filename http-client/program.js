var http = require('http'); // 载入http module

http.get(process.argv[2], function (response) {
	response.setEncoding('utf-8'); //设置utf-8编码
	response.on('data',console.log); // 监听 data
	response.on('error',console.error); // 监听 error
	/*response.on('end', function () { // 监听请求结束
       console.log('request end ... ');
	})*/
});