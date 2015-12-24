
var players = {}

function Game() { };

Game.prototype.setup = function() {}

Game.prototype.handleNetwork = function(socket) {

  // socket.on('updateOthersPos', function(data) {
  //   data = JSON.parse(data);
  //   players[socket.id] = data
  // });

  // socket.on('playerJoined', function(data) {
  //   data = JSON.parse(data);
  //   players[data.id] = data;
  // });

  // setInterval(function() {
  //   socket.emit('updatePos', JSON.stringify(player))
  // }, 15);
}

var lastTime = Date.now();

Game.prototype.handleLogic = function() {
  var newX = player.x + player.xSpeed;
  var newY = player.y + player.ySpeed;

  var safeX = newX > bounds.left && newX < bounds.right;
  var safeY = newY > bounds.top && newY < bounds.bottom;

  if (safeX && safeY) {
    player.x = newX;
    player.y = newY;
  }

  var enemies = $('.enemy');
  
  var currentTime = Date.now();
  var timeDelta = (currentTime - lastTime) / 1000.0;

  moveEnemies(enemies, bounds, timeDelta);
  
  lastTime = currentTime;
}

var $playerImage = $('#player');

Game.prototype.handleGraphics = function() {
  $playerImage.css('top', player.y.toString()+'px');
  $playerImage.css('left', player.x.toString()+'px');
}
