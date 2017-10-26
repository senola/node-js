// my first io 
// 加载 fs模块 
let fs = require('fs');
let filePath = process.argv[1]; // 输入的第一个参数
let buf = fs.readFileSync(filePath); // 同步读取当前文件“program.js”
console.log("同步读取:" + getRowNum(buf));

fs.readFile(filePath, function (err, data) {
    if(err) throw err;
    console.log("异步读取:" + getRowNum(data));
});

/**
 * 获取buf的行数
 * @param buf
 * @returns {*}
 */
function getRowNum(buf) {
    if(buf === undefined) return 0;
    let array = buf.toString().split("\n");
    return array.length;
}