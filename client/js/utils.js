
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

function checkBounds(x, y, boundaryCircle) {
  var circleX = boundaryCircle[0];
  var circleY = boundaryCircle[1];
  var radius = boundaryCircle[2];

  return Math.sqrt(Math.pow(x - circleX, 2) + Math.pow(y - circleY, 2)) < radius;
}

var sendKey = function (activeK) {
  if (players[playerOne.id] == undefined) {
    return false;
  }
  players[playerOne.id].xSpeed = 0;
  players[playerOne.id].ySpeed = 0;
  
  if (activeK[KEY_W]) {
      players[playerOne.id].ySpeed = -players[playerOne.id].speed;
  }
  if (activeK[KEY_A]) {
      players[playerOne.id].xSpeed = -players[playerOne.id].speed;
  }
  if (activeK[KEY_S]) {
      players[playerOne.id].ySpeed = players[playerOne.id].speed;
  }
  if (activeK[KEY_D]) {
      players[playerOne.id].xSpeed = players[playerOne.id].speed;
  }
  if (activeK[SPACE]) {
      activate(players[playerOne.id])
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

var detectCollision = function (playerXY, shotXY, enemyXY, radius) {
	var localPlayerPos = {x: playerXY.x - enemyXY.x, y: playerXY.y - enemyXY.y}
	var localShotPos = {x: shotXY.x - enemyXY.x, y: shotXY.y - enemyXY.y}

	var enemySide = (enemyXY.x > playerXY.x)? 'right' : 'left';
	var shotSide = (shotXY.x > playerXY.x)? 'right' : 'left';

	if (enemySide !== shotSide) {
		return false;
	}

	var shotMinusPlayerV = {
		x: localShotPos.x - localPlayerPos.x,
		y: localShotPos.y - localPlayerPos.y
	}

	var a = (shotMinusPlayerV.x) * (shotMinusPlayerV.x) + (shotMinusPlayerV.y) * (shotMinusPlayerV.y);
	var b = 2 * ((shotMinusPlayerV.x * localPlayerPos.x) + (shotMinusPlayerV.y * localPlayerPos.y));
	var c = (localPlayerPos.x * localPlayerPos.x) + (localPlayerPos.y * localPlayerPos.y) - Math.pow(radius, 2);

	var delta = Math.pow(b, 2) - (4 * a * c);

	return delta >= 0;
}