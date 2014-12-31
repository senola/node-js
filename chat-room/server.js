var http = require("http"); // 内置的http模块提供了http服务器和客户端功能
var fs  = require("fs"); // 文件流操作模块
var path = require("path"); // 内置的path模块提供了与文件系统路径相关的功能
var mime = require("mime"); // 附加的mime模块有根据文件扩展名得出mime类型的能力
var cache = {}; // chche是用来缓存文件内容的对象

// 请求文件不存在时，发送404请求
function send404(response) {
	response.writeHead(404, {'content-Type': 'text/plain'});
	response.write('Error 404: resource not found.');
	response.end();
}

// 文件发送
function sendFile(response, filePath, fileContents) {
	response.writeHead(200, {
		"content-Type": mime.lookup(path.basename(filePath))
	});
	response.end(fileContents);
}

// 读取文件（先检查是否缓存，有，则直接返回，无，则从硬盘中读取）
function serverStatic(response, cache, absPath) {
	if(cache[absPath]) { //检查文件是否缓存在内存（ram）中
		sendFile(response, absPath, cache[absPath]); // 从内存中返回文件
		console.log("get file: '" + absPath + "' from cache!! ");
	}else {
 		fs.exists(absPath, function(exists) {
 			if(exists) {
 				fs.readFile(absPath, function(err, data){
 					if(err) { // 读取文件失败，发送http 404响应
 						send404(response);				
 					}else {
 						//cache[absPath] = data; // 放入缓存
 						console.log("file: '" + absPath + "' cached!!");
 						sendFile(response, absPath, data); //从硬盘中读取文件
 					}
 				});
 			} else { // 文件未找到，发送http 404响应
 				send404(response);
 			}
 		});
	}
}

// 创建http服务，用匿名函数定义对每个请求的处理行为
var server = http.createServer(function(request, response) { 
	var filePath = false;

	if(request.url == '/') {
		filePath = 'public/index.html';
	}else{
		filePath = "public" + request.url;
	}
    console.log("file path----------------->: " + filePath);
	var absPath = "./" + filePath;
	serverStatic(response, cache, absPath); // 返回静态文件
});

// 启动http服务器
server.listen(55555, function() {
	console.log("server listening on port 55555...");
});

var chatserver = require("./lib/chat_server"); // 加载chat_server模块

chatserver.listen(server);