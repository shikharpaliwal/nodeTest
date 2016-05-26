var express = require('express');
var app = express();
//app.use('/', express.static(__dirname));

app.get('/',function(req, res){
  res.sendFile(__dirname + '/index.html')
})

app.get('/:filename',function(req, res){
  var filename = req.params.filename;
  res.sendFile(__dirname + '/' + filename)
})

app.listen(3000, function() { console.log('listening')});
