// 封装成一个module 

var fs = require('fs');  // 载入fs module
var path = require('path'); // 载入 path module

// 定义一个 module
module.exports = function (dir, filterStr, callback) { // callback 为传入的方法名
	fs.readdir(dir, function (err, list) {
		if (err) {
			return callback(err);
		} else {
			list = list.filter(function (file) {
				return path.extname(file) === '.' + filterStr;
			});
		}
		callback(null, list); //接受过滤后的list
	});
}