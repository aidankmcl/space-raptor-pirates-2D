var calculateNextEnemyPosition = function ($player, enemy, bounds) {
	var enemy = $(enemy);

	var currentX = enemy.offset().left;
	var currentY = enemy.offset().top;
	var deltaX = ($player.offset().left - currentX)/100000000.0;
	var deltaY = ($player.offset().top - currentY)/100000000.0;

	console.log("coordinates:", currentX, currentY, " |  delta:", deltaX, deltaY)

	var newX = currentX + deltaX;
	var newY = currentY + deltaY;

	var safeX = newX > bounds.left && newX < bounds.right;
	var safeY = newY > bounds.top && newY < bounds.bottom;
	
	if (!safeX || !safeY) {
		newX = currentX;
		newY = currentY;
	}
	return {x: newX, y: newY}
}

var moveEnemies = function (enemies, bounds) {
	var player = $('#player');

	enemies.each(function(index, enemy) {
		var nextPos = calculateNextEnemyPosition(player, enemy, bounds);
		console.log('nexties', nextPos.x, nextPos.y);
		$(enemy).css('top', (bounds.top + nextPos.y).toString()+"px");
		$(enemy).css('left', (bounds.left + nextPos.x).toString()+"px");
	});
}

var incrementEnemies = function() {};
