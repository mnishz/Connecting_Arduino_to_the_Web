var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);
var SerialPort = require('serialport');
var ReadLine = require('@serialport/parser-readline');
var serialport = new SerialPort('/dev/ttyACM0');
var parser = serialport.pipe(new ReadLine({delimiter: '\n'}))
// parser.on('data', console.log);
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
    serialport.on('data', function(data) {
        // data = data.trim();
        data = data.toString('utf8')
        if ((data === '1') || (data === '0')) {
            socket.emit('data', data);
        }
    });
    socket.on('disconnect', function() {
        console.log('disconnected');
    });
});
server.listen(3000, function() {
    console.log('listening on port 3000...');
});
