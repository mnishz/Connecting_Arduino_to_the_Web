const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const SerialPort = require('serialport');
const ReadLine = require('@serialport/parser-readline');
const serialport = new SerialPort('/dev/ttyACM0');
const parser = serialport.pipe(new ReadLine({delimiter: '\r\n'}));

app.engine('ejs', require('ejs').__express);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.render('index');
});

serialport.on('open', function() {
    console.log('serial port opened');
});

io.on('connection', function(socket) {
    console.log('socket.io connection');

    socket.on('red', function(data) {
        serialport.write(data + 'T');
    });

    socket.on('green', function(data) {
        serialport.write(data + 'T');
    });

    socket.on('disconnect', function() {
        console.log('disconnected');
    });
});

server.listen(3000, function() {
    console.log('listening on port 3000...');
});
