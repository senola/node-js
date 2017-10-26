###  net module 

---
* net.createServer([options], [connectionLister])

创建一个新的TCP服务，‘connectionListener’参数是为connection事件自动设置的监听。

`options` 是一个默认的拥有以下属性的对象 

    {
       allowHalfOpen: fale
    }

如何`allowHalfOpen`设置为`true`,那么`socket`将不会自动发送一个`FIN`数据包，即当一个一个`FIN`数据包发送结束时候不会再接着发送。此时，`socket`变为不可读，但是依旧可以写。你可以调用`end()`方法。如下：
   
    var net = require('net');
	var server = net.createServer(function(c) { //'connection' listener
	  console.log('server connected');
	  c.on('end', function() {
	    console.log('server disconnected');
	  });
	  c.write('hello\r\n');
	  c.pipe(c);
	});
	server.listen(8124, function() { //'listening' listener
	  console.log('server bound');
	});

测试可以使用`telnet`
   
    telnet localhost 8124

### Write a TCP time server!

Your server should listen to TCP connections on the port provided by the first a
rgument to your program. For each connection you must write the current date & 2
4 hour time in the format:

    "YYYY-MM-DD hh:mm"

followed by a newline character. Month, day, hour and minute must be zero-filled
 to 2 integers. For example:

    "2013-07-06 17:42"

-------------------------------------------------------------------------------

## HINTS

For this exercise we'll be creating a raw TCP server. There's no HTTP involved h
ere so we need to use the net module from Node core which has all the basic netw
orking functions.

The net module has a method named net.createServer() that takes a callback funct
ion. Unlike most callbacks in Node, the callback used by createServer() is calle
d more than once. Every connection received by your server triggers another call
 to the callback. The callback function has the signature:

    function callback (socket) { /* ... */ }

net.createServer() also returns an instance of your server. You must call server
.listen(portNumber) to start listening on a particular port.

A typical Node TCP server looks like this:

    var net = require('net')
    var server = net.createServer(function (socket) {
      // socket handling logic
    })
    server.listen(8000)

Remember to use the port number supplied to you as the first command-line argume
nt.

The socket object contains a lot of meta-data regarding the connection, but it i
s also a Node duplex Stream, in that it can be both read from, and written to. F
or this exercise we only need to write data and then close the socket.

Use socket.write(data) to write data to the socket and socket.end() to close the
 socket. Alternatively, the .end() method also takes a data object so you can si
mplify to just: socket.end(data).

Documentation on the net module can be found by pointing your browser here:

  file://C:\Users\forsenola\AppData\Roaming\npm\node_modules\learnyounode\node_a
pidoc\net.html

To create the date, you'll need to create a custom format from a new Date() obje
ct. The methods that will be useful are:

    date.getFullYear()
    date.getMonth()     // starts at 0
    date.getDate()      // returns the day of month
    date.getHours()
    date.getMinutes()

Or, if you want to be adventurous, use the strftime package from npm. The strfti
me(fmt, date) function takes date formats just like the unix date command. You c
an read more about strftime at: [https://github.com/samsonjs/strftime](https://g
ithub.com/samsonjs/strftime)
