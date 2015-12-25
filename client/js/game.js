
var players = {}
var enemies = {}

function Game() { };

Game.prototype.setup = function() {
  setInterval(function() {
    var newRaptor = new Enemy('raptor', 1);
    enemies[newRaptor.id] = newRaptor;
  }, 3000);
}
Game.prototype.handleNetwork = function(socket) {}

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
  
  var currentTime = Date.now();
  var timeDelta = (currentTime - lastTime) / 1000.0;

  moveEnemies(enemies, bounds, timeDelta);
  
  lastTime = currentTime;
}

var $playerImage = $('#player');
var lastPos = {x: 250, y: 200};

Game.prototype.handleGraphics = function() {
  if (lastPos.x != player.x || lastPos.y != player.y) {
    $playerImage.css('top', player.y.toString()+'px');
    $playerImage.css('left', player.x.toString()+'px');
  }
  lastPos = {x: player.x, y: player.y}
}
