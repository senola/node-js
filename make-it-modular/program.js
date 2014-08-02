var filterFn = require('./filter_modular.js'); // 加载自定义模块
var dir = process.argv[2]; // 获取目录
var filterStr = process.argv[3]; 

filterFn(dir, filterStr, function (err, list) {
   if (err) {
      return console.error('There was an error:', err);
   } else {
   	 list.forEach(function (file) { //遍历list
        console.log(file);
   	 });
   }
});