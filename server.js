var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var index = fs.readFileSync('index.html');

app.listen(8080);

function handler (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(index);
}

io.on('connection', function (socket) {
  console.log('Client connected');
  socket.emit('news', { hello: 'world' });
  socket.on('file',function(data){
    //let data =  new Buffer(fileData);
    console.log("Received %s bytes",data.length);
    for (var i=0;i<data.length;i++){
      data[i]+=123;
    }

    fs.writeFile((new Date()).getTime()+'.data', data, 'binary', function (err) {
        if (err) {
            console.log("error")
        }else {
            console.log("done")
        }
    });
  });
});
