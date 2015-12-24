
var bounds = {
  left: 20,
  top: 15,
  right: 480,
  bottom: 360,
}

var hCenter,
  vCenter;

var KEY_W = 87,
  KEY_A = 65,
  KEY_S = 83,
  KEY_D = 68,
  SPACE = 32;

var activeKeys = {
    87: false,
    65: false,
    83: false,
    68: false,
    32: false
}

var SPEED = 5;

function Player() {
  this.id = "";
  this.on = false;
  this.x = 250;
  this.y = 200;
  this.xSpeed = 0;
  this.ySpeed = 0;
  this.room = 1,
  this.health = 100,

  this.options = {
    rightDoor: false,
    leftDoor: false,
    elevator: false,
    terminal: false
  }
}

var players = {}
// var enemies = []

var player = new Player();

function checkBounds(x, y, boundaryCircle) {
  var circleX = boundaryCircle[0];
  var circleY = boundaryCircle[1];
  var radius = boundaryCircle[2];

  return Math.sqrt(Math.pow(x - circleX, 2) + Math.pow(y - circleY, 2)) < radius;
}

var sendKey = function (activeK) {
  player.xSpeed = 0;
  player.ySpeed = 0;
  
  if (activeK[KEY_W]) {
      player.ySpeed = -SPEED;
  }
  if (activeK[KEY_A]) {
      player.xSpeed = -SPEED;
  }
  if (activeK[KEY_S]) {
      player.ySpeed = SPEED;
  }
  if (activeK[KEY_D]) {
      player.xSpeed = SPEED;
  }
  if (activeK[SPACE]) {
      activate(player)
  }
}

document.onkeydown = function(e) {
  if (activeKeys.hasOwnProperty(e.keyCode)) {
    activeKeys[e.keyCode] = true;
    sendKey(activeKeys)
  }
}

document.onkeyup = function(e) {
  if (activeKeys.hasOwnProperty(e.keyCode)) {
    activeKeys[e.keyCode] = false;
    sendKey(activeKeys)
  }
}

var $playerImage = $('#player');

function Game() { };

Game.prototype.setup = function() {
  // bounds.left = window.innerWidth/2-240;
  // bounds.right = window.innerWidth/2+240;
  // socket.emit('newPlayer', JSON.stringify(player));
}

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
  moveEnemies(enemies, bounds);
}

Game.prototype.handleGraphics = function() {
  $playerImage.css('top', player.y.toString()+'px');
  $playerImage.css('left', player.x.toString()+'px');

  // gfx.clearRect(0, 0, c.width, c.height);
  
  // for (var keyID in players) {
  //   gfx.beginPath();
  //   gfx.arc(players[keyID].x, players[keyID].y, 10, 0, 2 * Math.PI, false);
  //   gfx.fillStyle = 'cornflowerblue';
  //   gfx.fill();
  //   gfx.lineWidth = 2;
  //   gfx.strokeStyle = 'blue';
  //   gfx.stroke();
  // }

  // gfx.beginPath();
  // gfx.arc(player.x, player.y, 10, 0, 2 * Math.PI, false);
  // gfx.fillStyle = 'cornflowerblue';
  // gfx.fill();
  // gfx.lineWidth = 2;
  // gfx.strokeStyle = 'blue';
  // gfx.stroke();
}
