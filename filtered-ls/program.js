var fs = require('fs'); // 加载文件操作模块
var dirPath = process.argv[2]; // 目录
var ext = process.argv[3]; // 要过滤的后缀名

fs.readdir(dirPath, function(err, list) {
	for(var i = 0; i < list.length; i++) {
		if(list[i].indexOf('.') > -1) { // 除去有后缀名的文件
            var _ext = list[i].substring(list[i].lastIndexOf('.') + 1, list[i].length);
	        if (_ext === ext) {
	        	console.log(list[i]);
	        } 
		}
	}
});

// var fs = require('fs')
// var path = require('path')

// fs.readdir(process.argv[2], function (err, list) {
//   list.forEach(function (file) {
//     if (path.extname(file) === '.' + process.argv[3])
//       console.log(file)
//   })
// })