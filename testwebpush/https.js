var https = require('https');
var express = require('express');
var app = express();
var fs = require('fs');
var sslOptions = {
  key: fs.readFileSync('./ssl/server.key'),
  cert: fs.readFileSync('./ssl/server.crt'),
  ca: fs.readFileSync('./ssl/ca.crt'),
  requestCert: true,
  rejectUnauthorized: false
};
var secureServer = https.createServer(sslOptions,app).listen('3030', function(){
  console.log("Secure Express server listening on port 3030");
});
