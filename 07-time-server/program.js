var net = require('net'); // 载入net 模块

// 创建一个新的TCP服务，‘connectionListener’参数是为connection事件自动设置的监听。
var server = net.createServer( function (socket) {
   var nowTime = getNowTime();
   socket.end(nowTime + '\n');

});
server.listen(Number(process.argv[2])); // 监听端口

//获取时间
function getNowTime () {
   var date = new Date();
   var year = date.getFullYear();
   var month = zeroFill(date.getMonth() + 1); // 注意从0开始
   var day = zeroFill(date.getDate());
   var hours = zeroFill(date.getHours());
   var min = zeroFill(date.getMinutes());
   return  year + '-' + month + '-' + day + ' ' + hours + ':' + min;
}
// 0 填充
function zeroFill(i) {
	return (i < 10 ? '0' : '') + i;
}