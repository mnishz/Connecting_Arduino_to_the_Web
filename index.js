var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.render('index')
});

var buttonValue = 0;

// web page (browser) ���� server ����³�����ä��Ȥ���ư������
// ��³���� socket ���֥������Ȥ����������Τǡ����������Ȥ��Ƽ�����äƤ���
// socket.on�ϡ�������³���Ф���''�ǰϤޤ줿����Υ��٥�Ȥ�ȯ���������ν������������
io.on('connection', function(socket){
    // log�����
    console.log('Connection to client established');
    // socket����³���б�(ʣ��)���Ƥ��ơ�io�ϥ�����(ñ��)���б����Ƥ���Ϥ�
    // io(�����С�ʣ����socket��«�ͤ�¸��)��emit, broadcast(����)���Ƥ�Ȼפ���
    // �����web page�˽���ͤ�Ϳ���뤿���ɬ��
    io.emit('clicked message', buttonValue);
    // ��³�� 'clicked message' ��emit���� (������ä�) �Ȥ��ν���
    socket.on('clicked message', function(msg){
        buttonValue = 1 - buttonValue;
        // �������줿���Ƥ�broadcast����
        io.emit('clicked message', buttonValue);
        console.log('Receive message from client!', msg);
    });
    // ��³���ڤ줿����ư������
    socket.on('disconnect', function(){
        console.log('Server has disconnected');
    });
});

server.listen(3000, function() {
    console.log('Listening on port 3000...');
});
