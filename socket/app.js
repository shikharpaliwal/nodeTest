var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var redis = require('redis');
var redisClient = redis.createClient();

io.on('connection', function(client){
  console.log('Client connected..');
  //client.emit('messages', { hello: 'world' });
  client.on('join', function(data){
    client.nickname = data;
    redisClient.lrange('messages', 0, -1, function(err, messages){
      messages = messages.reverse();
      messages.forEach(function(message){
        client.emit('messages', message);
      });
    });
  });
  client.on('messages', function(data){
    var nickname = client.nickname;
    var message = nickname + ': ' + data;
    client.broadcast.emit('messages', message);
    redisClient.lpush('messages', message, function(err, response){
      redisClient.ltrim('messages', 0, 9);
    });
  });
});

app.use(express.static(__dirname + '/bower_components'));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

server.listen(8080, function(){ console.log ('Listening on port: 8080')});
