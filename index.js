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

// web page (browser) から server に接続があったときの動作を定義
// 接続時に socket オブジェクトが生成されるので、それを引数として受け取っている
// socket.onは、この接続に対して''で囲まれた特定のイベントが発生した時の処理を定義する
io.on('connection', function(socket){
    // logを出力
    console.log('Connection to client established');
    // socketは接続に対応(複数)していて、ioはサーバ(単数)に対応しているはず
    // io(サーバ、複数のsocketを束ねる存在)にemit, broadcast(通知)してると思われる
    // これはweb pageに初期値を与えるために必要
    io.emit('clicked message', buttonValue);
    // 接続が 'clicked message' をemitした (受け取った) ときの処理
    socket.on('clicked message', function(msg){
        buttonValue = 1 - buttonValue;
        // 更新された内容をbroadcastする
        io.emit('clicked message', buttonValue);
        console.log('Receive message from client!', msg);
    });
    // 接続が切れた時の動作を定義
    socket.on('disconnect', function(){
        console.log('Server has disconnected');
    });
});

server.listen(3000, function() {
    console.log('Listening on port 3000...');
});
