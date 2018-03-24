/**
 * Created by jialuzhang on 2018/3/19.
 */
var http = require('http')
var express = require('express')
var fs = require('fs');

http.createServer(function (request,response) {
    // 发送 HTTP 头部
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});
    // 发送响应数据 "Hello World"
    response.end('Hello World\n');
}).listen(8886);
// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8886/');

//阻塞代码实例 读取文本
var data = fs.readFileSync('input.txt');
console.log(data.toString());


//非阻塞 读取文本
fs.readFile('input2.txt',function (err,data) {
    if (err) return console.error(err);
    console.log(data.toString());
})
console.log('非阻塞，相当于异步读取文本');

//测试监听器
var events = require('events');
var eventEmitter = new events.EventEmitter();
//用过on为data_receive事件绑定监听器，监听器的参数用于传递事件参数，故参数名是什么是无所谓的，学习的时候千万不要死板
eventEmitter.on('data_receive',function (argc1,argc2) {
    console.log('触发了data_receive事件，并且事件参数分别是'+argc1+'和' +argc2);
})
eventEmitter.addListener('data_receive',function (a,b) {
    console.log('触发了data_receive事件，并且事件参数分别是'+b+'和' +a);
})
eventEmitter.emit('data_receive','zjl','yyq');
console.log('eventEmitter的监听器数量是'+eventEmitter.listenerCount('eventEmitter','data_receive'));

var EventEmitter = require('events').EventEmitter;
var events = new EventEmitter();
events.on('some_event',function () {
    console.log('哈哈，一秒后才看到吧，some_event事件被触发了');
});
//一秒后才触发了some_event事件
setTimeout(function () {
    events.emit('some_event');
},1000);