## bl(bufferList)
----
* 安装方法: $ npm install bl

   
此时，安装一下两个最新版本的package   

* [http://npm.im/bl](http://npm.im/bl)   
* [http://npm.im/concat-stream](http://npm.im/concat-stream)

使用`var bl = require('bl')` 加载该module。此时，`node`会首先查找核心模块，如果没有找到`bl`就去`node_modules`目录下查找。

## HINTS

There are two approaches you can take to this problem:

1) Collect data across multiple "data" events and append the results together pr
ior to printing the output. Use the "end" event to determine when the stream is
finished and you can write the output.

2) Use a third-party package to abstract the difficulties involved in collecting
 an entire stream of data. Two different packages provide a useful API for solvi
ng this problem (there are likely more!): bl (Buffer List) and concat-stream; ta
ke your pick!

  [http://npm.im/bl](http://npm.im/bl)
  [http://npm.im/concat-stream](http://npm.im/concat-stream)

To install a Node package, use the Node Package Manager npm. Simply type:

    $ npm install bl

And it will download and install the latest version of the package into a subdir
ectory named node_modules. Any package in this subdirectory under your main prog
ram file can be loaded with the require syntax without being prefixed by './':

    var bl = require('bl')

Node will first look in the core modules and then in the node_modules directory
where the package is located.

If you don't have an Internet connection, simply make a node_modules directory a
nd copy the entire directory for the package you want to use from inside the lea
rnyounode installation directory:

  file://C:\Users\forsenola\AppData\Roaming\npm\node_modules\learnyounode\node_m
odules\bl
  file://C:\Users\forsenola\AppData\Roaming\npm\node_modules\learnyounode\node_m
odules\concat-stream

Both bl and concat-stream can have a stream piped in to them and they will colle
ct the data for you. Once the stream has ended, a callback will be fired with th
e data:

    response.pipe(bl(function (err, data) { /* ... */ }))
    // or
    response.pipe(concatStream(function (data) { /* ... */ }))

Note that you will probably need to data.toString() to convert from a Buffer.

Documentation for both of these modules has been installed along with learnyouno
de on your system and you can read them by pointing your browser here:

  file://C:\Users\forsenola\AppData\Roaming\npm\node_modules\learnyounode\docs\b
l.html
  file://C:\Users\forsenola\AppData\Roaming\npm\node_modules\learnyounode\docs\c
oncat-stream.html