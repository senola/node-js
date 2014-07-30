`fs`模块中readFile()函数的API文档(注意，先看API文档，吼吼~)

#### fs.readFile(filename, [options], callback)  ####
- filename String
- options Object
  - encoding String | Null default = null
  - flag String default = 'r'
- callback Function

Asynchronously reads the entire contents of a file. Example:

	fs.readFile('/etc/passwd', function (err, data) {
	  if (err) throw err;
	  console.log(data);
	});

The callback is passed two arguments (err, data), where data is the contents of the file.

If no encoding is specified, then the raw buffer is returned.

## MY FIRST ASYNC I/O 提示
----
Instead of fs.readFileSync() you will want to use fs.readFile() and instead of u
sing the return value of this method you need to collect the value from a callba
ck function that you pass in as the second argument.

Remember that idiomatic Node.js callbacks normally have the signature:

    function callback (err, data) { /* ... */ }

so you can check if an error occurred by checking whether the first argument is
truthy. If there is no error, you should have your Buffer object as the second a
rgument. As with readFileSync(), you can supply 'utf8' as the second argument an
d put the callback as the third argument and you will get a String instead of a
Buffer.

Documentation on the fs module can be found by pointing your browser here:
  file://C:\Users\forsenola\AppData\Roaming\npm\node_modules\learnyounode\node_a
pidoc\fs.html
