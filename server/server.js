var express = require('express');
var app     = express();
var http    = require('http').Server(app);
// var io      = require('socket.io')(http);
var del = require('key-del');

var config  = require('./config.json');

app.use(express.static(__dirname + '/../client'));

var KEY_W = 87,
  KEY_A = 65,
  KEY_S = 83,
  KEY_D = 68;

var players = {}

// io.on('connection', function (socket) {
//   console.log(socket.id + " connected!");

//   socket.on('newPlayer', function(data) {
//   	data = JSON.parse(data);
//   	data.id = socket.id
//   	players[socket.id] = data;
//   	socket.broadcast.emit('playerJoined', JSON.stringify(data));
//   })
  
//   socket.on('updatePos', function(data) {
//   	data = JSON.parse(data);
//   	socket.broadcast.emit('updateOthersPos', JSON.stringify(data));
//   });

//   socket.on('disconnect', function(data) {
//   	console.log('hit disconnect', socket.id);
//   	players = del(players, socket.id);
//   });
// });

var serverPort = process.env.PORT || config.port;

http.listen(serverPort, function() {
  console.log("Server is listening on port " + serverPort);
});
