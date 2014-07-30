## 提示
----

在fs model中，所有同步式（或异步式）文件系统方法都是以‘Sync’结尾,如读取一个人文件，可以使用“fs.readFileSync('/path/to/file')” 这个方法将会返回一个 包含改文件的全部内容的 Buffer 对象。readFileSync 在文档中的解释如下：
   
	fs.readFileSync(filename, [options])：
	Synchronous version of fs.readFile. Returns the contents of the filename.
	If the encoding option is specified then this function returns a string. Otherwise it returns a buffer. 

Buffer 对象是 `Node`用来将数据表现成数组的一种高效方法（TM 超难翻译），不管它是`ASCII`、`Binary`或其他格式，`Buffer`对象通过调用`toString()`方法可以很简单的转换成`String`。如： var str = buf.toString();




To perform a filesystem operation you are going to need the fs module from the N
ode core library. To load this kind of module, or any other "global" module, use
 the following incantation（咒语）:

    var fs = require('fs')

Now you have the full fs module available in a variable named fs.

All synchronous (or blocking) filesystem methods in the fs module end with 'Sync
'. To read a file, you'll need to use fs.readFileSync('/path/to/file'). This met
hod will return a Buffer object containing the complete contents of the file.

Documentation on the fs module can be found by pointing your browser here:
  file://C:\Users\13073012\AppData\Roaming\npm\node_modules\learnyounode\node_ap
idoc\fs.html

Buffer objects are Node's way of efficiently representing arbitrary arrays of da
ta, whether it be ascii, binary or some other format. Buffer objects can be conv
erted to strings by simply calling the toString() method on them. e.g. var str =
 buf.toString().

Documentation on Buffers can be found by pointing your browser here:
  file://C:\Users\13073012\AppData\Roaming\npm\node_modules\learnyounode\node_ap
idoc\buffer.html

If you're looking for an easy way to count the number of newlines in a string, r
ecall that a JavaScript String can be .split() into an array of substrings and t
hat '\n' can be used as a delimiter. Note that the test file does not have a new
line character ('\n') at the end of the last line, so using this method you'll e
nd up with an array that has one more element than the number of newlines.