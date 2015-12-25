var ENEMY_SPEED = 200.0;  // pixels per second
var DAMAGE = 5; // per second in range

var calculateDistance = function (player, enemy) {
	return Math.sqrt(Math.pow(player.x-enemy.x, 2) + Math.pow(player.y-enemy.y, 2))
}

var calculateNextEnemyPosition = function (target, enemy, bounds, timeDelta) {
	var $target = $('#' + target.id);
	var $enemy = $('#' + enemy.id);

	var currentX = parseInt($enemy.css('left'), 10);
	var currentY = parseInt($enemy.css('top'), 10);

	var targetX = parseInt($target.css('left'), 10);
	var targetY = parseInt($target.css('top'), 10);

	// want to normalize direction and make speed 20 px/s
	var dX = (targetX - currentX);
	var dY = (targetY - currentY);

	var distToHuman = Math.sqrt((dX * dX) + (dY * dY));

	var deltaX = (dX/distToHuman) * ENEMY_SPEED * timeDelta + (Math.random() * 1.5);
	var deltaY = (dY/distToHuman) * ENEMY_SPEED * timeDelta + (Math.random() * 1.5);

	var newX = currentX + deltaX;
	var newY = currentY + deltaY;

	newX = (newX > bounds.right || newX < bounds.left)? currentX : newX;
	newY = (newY > bounds.bottom || newY < bounds.top)? currentY : newY;

	return {x: newX, y: newY}
}

var moveEnemies = function (enemies, bounds, timeDelta) {
	for (var enemyID in enemies) {
		var e = enemies[enemyID];
		var $enemy = $('#'+e.id);

		var lowestDistance = 10000;
		var target = false;

		for (var playerID in players) {
			var p = players[playerID];
			if (p.room == e.room) {
				var distance = calculateDistance(p, e);
				if (distance < lowestDistance) {
					lowestDistance = distance;
					target = p
				}
			}
		}

		// if (target === false) {
		// 	target = roomConsole[e.room];
		// }

		var nextPos = calculateNextEnemyPosition(target, e, bounds, timeDelta);

		$enemy.css('top', nextPos.y.toString()+"px");
		$enemy.css('left', nextPos.x.toString()+"px");
	};
}

var Enemy = function(type, room) {
	this.id = Math.random().toString(36).slice(-8);
	var vents = [
		{x: 110, y: 85}, // top left coordinates
		{x: 385, y: 85}, // top right
		{x: 110, y: 295}, // bottom right
		{x: 385, y: 295} // bottom left
	];

	this.location = vents[Math.floor(Math.random()*4)];

	this.src = "http://www.clker.com/cliparts/4/v/k/K/4/E/triceratops-hi.png";
	this.x = this.location.x;
	this.y = this.location.y;
	this.health = 100;

	this.type = type;
	this.room = room;
	this.damage = DAMAGE;

	this.init();
};

Enemy.prototype.init = function () {
	$('#field').append('<img src="'+this.src+'" class="enemy" id="'+this.id+'" />');

	$('#'+this.id).css('top', this.y.toString()+"px");
	$('#'+this.id).css('left', this.x.toString()+"px");
}

Enemy.prototype.hurt = function (points) {
	this.health -= points;
	if (this.health <= 0) {
		this.die();
	}
}

Enemy.prototype.attack = function (player) {
	player.hurt(this.damage);
}

Enemy.prototype.die = function () {
	$('#'+this.id).remove();
	delete enemies[this.id];
}
