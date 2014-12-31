var socketio = require("socket.io"); // 加载socket.io 模块
var io;
var guestNumber = 1;
var nickNames = {};
var namesUsed = [];
var currentRoom = {};

exports.listen = function(server) {
	io = socketio.listen(server); // 启动so服务器，允许它搭载在已有的http服务器上
	io.set('log level', 1);

	io.sockets.on('connection', function(socket){
		guestNumber = assignGuestName(socket, guestNumber, nickName, namesUsed); //在用户连接上来时候附一个访客名字

		joinRoom(socket, 'Lobby'); // 在用户连接上来时把他放入指定的聊天室里

        // 处理用户的消息，更名，以及聊天室的创建和变更
		handleMessageBroadcasting(socket, nickName);  
		handleNameChangeAttempts(socket, nickNames, namesUsed);
		handleRoomJoining(socket);

		socket.on('romms', function() { // 用户发出请求时候向其提供已经被占用的聊天室列表
			socket.emit('rooms', io.sockets.manager.rooms);
		});

		handleClientDisconnection(socket, nickNames, namesUsed); // 定义用户断开连接后的清除逻辑
	});

}

// 分配用户昵称
function assignGuestName(socket, guestNumber, nickName, namesUsed) {
	var name = "guest" + guestNumber; // 生成新的昵称
	nickNames[socket.id] = name; // 存储当前用户名
	socket.emit('nameResult', {  // 让用户知道他们的昵称
		"success": true,
		"name": name
	});
	namesUsed.push(name); // 存放已经占用的昵称

	return guestNumber + 1;
}

//进入聊天室
function joinRoom(socket, room) {
	socket.join(room); // 让用户进入房间
	currentRoom[socket.id] = room; // 记录当前房间
	socket.emit('joinResult', {"room": room}); // 让用户知道他们进入的房间
	socket.broadcast.to(room).emit('message', function() {
		"text": nickName[socket.id] + 'has joined' + room + '.';
	});

	var usersInRoom = io.sockets.clients(room); // 确定有哪些用户在这个房间里
	if(usersInRoom.length > 1) {
		var usersInRoomSummary = 'Users currently in' + room + '.';
		for(var index in usersInRoom) {
			var userSocketId = usersInRoom[index].id;
			if(userSocketId != socket.id) {
				if(index > 0) {
					usersInRoomSummary += ', ';
				}
				usersInRoomSummary += nickNames[userSocketId];
			}
		}
	}
	usersInRoomSummary += ".";
	socket.emit("message",{
		"text": usersInRoomSummary
	});
}

// 处理昵称变更请求 不用一guest 开头或者已被占用的昵称
function handleNameChangeAttempts(socket, nickNames, namesUsed) {
	socket.on('nameAttempt', function(name){
		if(name.toUpperCase().indexOf('GUEST') == 0) {
			socket.emit('nameResult', function(){
				"success": false,
				"message": '你输入的用户名不能包含guest！'
			});
		} else {
			if(namesUsed.indexOf(name) == -1) { // 判断该名字是否被占用
				var previousName = nickNames[socket.id];
				var previousNameIndex = namesUsed.indexOf(previousName);
				namesUsed.push(name);
				nickNames[socket.io] = name;
				delete namesUsed[previousNameIndex];  //删除之前用的用户名

				socket.emit('nameResult',function(){
					"success": true,
					"name": name
				});

				socket.broadcast.to(currentRoom[socket.id]).emit('message', {
					"text": previousName + ' is now kown as ' + name + "."
				});
			} else {  // 昵称被占用
				socket.emit("nameResult", {
					"success": false,
					"message": '你输入的用户名已存在！'
				});
			}
		}
	});
}    

// 发送聊天消息
function handleMessageBroadcasting(socket, nickName) {
	socket.on("message", function(message) {
		socket.broadcast.to('message.room').emit('message', {
			"text": nickNames[socket.id] + ': ' + message.text;
		});
	});
}

// 创建房间
function handleRoomJoining(socket) {
	socket.on("join", function(room){
		socket.leave(currentRoom[socket.id]);
		joinRoom(socket, room.newRoom);
	});
}

// 用户断开连接
function handleClientDisconnection(socket, nickNames, namesUsed) {
	socket.on("disconnect", function() {
		var nameIndex = namesUsed.indexOf(nickNames[socket.id]);
		delete namesUsed[socket.id];
		delete nickNames[socket.id];
	});
}