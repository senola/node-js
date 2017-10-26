var fs = require('fs'); //加载 fs module
var file = process.argv[1]; // 获取输入的参数

fs.readFile(file, function (err, data) {
  // fs.readFile(file, 'utf8', callback) can also be used
  var lines = data.toString().split('\n').length - 1;
  console.log(lines);
})