var express = require('express');
var app     = express();
var http    = require('http').Server(app);
// var io      = require('socket.io')(http);
var del = require('key-del');

var config  = require('./config.json');

app.use(express.static(__dirname + '/../client'));

var players = {}

// io.on('connection', function (socket) {} );

var serverPort = process.env.PORT || config.port;

http.listen(serverPort, function() {
  console.log("Server is listening on port " + serverPort);
});
