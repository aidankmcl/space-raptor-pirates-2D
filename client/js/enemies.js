var calculateNextEnemyPosition = function ($player, enemy, bounds) {
	var enemy = $(enemy);

	var currentX = parseInt(enemy.css('left'), 10);
	var currentY = parseInt(enemy.css('top'), 10);

	var deltaX = (currentX - parseInt($player.css('left'), 10))/75;
	var deltaY = (currentY - parseInt($player.css('top'), 10))/75;

	var newX = currentX - deltaX + (Math.random()*1.25);
	var newY = currentY - deltaY - (Math.random()*1.25);

	return {x: newX, y: newY}
}

var moveEnemies = function (enemies, bounds) {
	var $player = $('#player');

	enemies.each(function(index, enemy) {
		var nextPos = calculateNextEnemyPosition($player, enemy, bounds);
		$(enemy).css('top', nextPos.y.toString()+"px");
		$(enemy).css('left', nextPos.x.toString()+"px");
	});
}

var incrementEnemies = function() {};
