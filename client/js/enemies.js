var calculateNextEnemyPosition = function ($player, enemy, bounds, timeDelta) {
	var enemy = $(enemy);

	var currentX = parseInt(enemy.css('left'), 10);
	var currentY = parseInt(enemy.css('top'), 10);

	var playerX = parseInt($player.css('left'), 10);
	var playerY = parseInt($player.css('top'), 10);

	// want to normalize direction and make speed 20 px/s
	var dX = (playerX - currentX);
	var dY = (playerY - currentY);

	var distToHuman = Math.sqrt((dX * dX) + (dY * dY));

	var deltaX = (dX/distToHuman) * 200.0 * timeDelta + (Math.random() * 1.25);
	var deltaY = (dY/distToHuman) * 200.0 * timeDelta + (Math.random() * 1.25);

	var newX = currentX + deltaX;
	var newY = currentY + deltaY;

	return {x: newX, y: newY}
}

var moveEnemies = function (enemies, bounds, timeDelta) {
	var $player = $('#player');

	enemies.each(function(index, enemy) {
		var nextPos = calculateNextEnemyPosition($player, enemy, bounds, timeDelta);
		$(enemy).css('top', nextPos.y.toString()+"px");
		$(enemy).css('left', nextPos.x.toString()+"px");
	});
}

var Enemy = function() {
	
};
