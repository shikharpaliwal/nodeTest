var express = require('express');
var https = require('https');
var fs = require('fs');

var privateKey  = fs.readFileSync('server.key', 'utf8');
var certificate = fs.readFileSync('server.crt', 'utf8');
var credentials = { key: privateKey, cert: certificate };
//app.use('/', express.static(__dirname));

var PORT = 3000;
var app = express();

server = https.createServer(credentials, app).listen(PORT);
console.log('HTTPS Server listening on %s', PORT);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html')
});

app.get('/gcm_registration_id', function(req, res){
  console.log(req.query.endpoint);
  res.writeHead(200);
  res.end();
});

app.get('/:filename', function(req, res){
  var filename = req.params.filename;
  res.sendFile(__dirname + '/' + filename)
})

//app.listen(3000, function() { console.log('listening')});
