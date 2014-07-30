// my first io 
// 加载 fs模块 
var fs = require('fs'); 
var filePath = process.argv[2]; // 输入的第一个参数
var buf = fs.readFileSync(filePath);
var bufString = buf.toString(); //获取buffer对象并转换成字符串
//console.log(bufString);
var arry = bufString.split("\n"); //以‘\n’为界定符，将字符串转换成数组
console.log(arry.length);