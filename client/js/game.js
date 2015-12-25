
var playerOne;
var players = {}
var enemies = {}

function Game() { };

Game.prototype.setup = function() {
  // setInterval(function() {
    var newRaptor = new Enemy('raptor', 1);
    enemies[newRaptor.id] = newRaptor;
  // }, 3000);

  playerOne = new Player();
  players[playerOne.id] = playerOne;

  $('#field').click(function(e) {
    var x = e.pageX - $(this).offset().left;
    var y = e.pageY - $(this).offset().top;
    players[playerOne.id].shoot(x, y)
  });
}

Game.prototype.handleNetwork = function(socket) {}

var lastTime = Date.now();

Game.prototype.handleLogic = function() {
  if (players[playerOne.id] == undefined) {
    return false;
  }
  var newX = players[playerOne.id].x + players[playerOne.id].xSpeed;
  var newY = players[playerOne.id].y + players[playerOne.id].ySpeed;

  var safeX = newX > bounds.left && newX < bounds.right;
  var safeY = newY > bounds.top && newY < bounds.bottom;

  if (safeX && safeY) {
    players[playerOne.id].x = newX;
    players[playerOne.id].y = newY;
  }
  
  var currentTime = Date.now();
  var timeDelta = (currentTime - lastTime) / 1000.0;

  moveEnemies(enemies, bounds, timeDelta);
  
  lastTime = currentTime;
}

Game.prototype.handleGraphics = function() {
  for (var id in players) {
    if (players[id].lastPos.x != players[id].x || players[id].lastPos.y != players[id].y) {
      $('#'+id).css('top', players[id].y.toString()+'px');
      $('#'+id).css('left', players[id].x.toString()+'px');
    }
    players[id].lastPos = {x: players[id].x, y: players[id].y}
  }
}
