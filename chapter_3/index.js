var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);
var SerialPort = require('serialport');
var ReadLine = require('@serialport/parser-readline');
var serialport = new SerialPort('/dev/ttyACM0');
var parser = serialport.pipe(new ReadLine({delimiter: '\r\n'}))
var curState = 0;
app.engine('ejs', require('ejs').__express);
app.set('view engine', 'ejs');
app.get ('/', function(req, res) {
    res.render('index');
});
serialport.on('open', function() {
    console.log('serial port opened');
});
io.on('connection', function(socket) {
    console.log('socket.io connection');
    parser.on('data', function(data) {
        if (data != curState) {
            if (data == 1) console.log('0 -> 1')
            if (data == 0) console.log('1 -> 0')
            curState = data;
        }
        // console.log('data: ', data);
        socket.emit('data', data);
    });
    socket.on('disconnect', function() {
        console.log('disconnected');
    });
});
server.listen(3000, function() {
    console.log('listening on port 3000...');
});
