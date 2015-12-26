function Player() {
  this.id = Math.random().toString(36).slice(-8);
  this.on = false;
  
  this.x = 250;
  this.y = 200;
  this.lastPos = {x: 250, y: 200};
  this.speed = 5;
  this.xSpeed = 0;
  this.ySpeed = 0;
  
  this.room = 1;
  this.health = 100;
  
  this.options = {
    rightDoor: false,
    leftDoor: false,
    elevator: false,
    terminal: false
  }

  this.init();
}

Player.prototype.init = function () {
  $('#field').append('<img id="'+this.id+'" class="player" src="http://orig03.deviantart.net/758a/f/2012/258/c/4/acrocanthosaurus_sprite_by_clubpenguindino-d5esrsy.png" alt="">');

  $('#'+this.id).css('top', this.y.toString()+"px");
  $('#'+this.id).css('left', this.x.toString()+"px");
}

var $overlay = $('#overlay');

Player.prototype.shoot = function(mouseX, mouseY) {
  var playerXY = {x: this.x, y: this.y},
    mouseXY = {x: mouseX, y: mouseY};

  var didHit = false;
  for (var id in enemies) {
    
    var enemyXY = {
      x: parseInt($('#'+id).css('left'), 10),
      y: parseInt($('#'+id).css('top'), 10)
    }

    var hit = detectCollision(playerXY, mouseXY, enemyXY, 20);
    if (hit) {
      enemies[id].hurt(20);
      didHit = true;
    }
  }
  var overlayColor = (didHit)? 'orange' : 'white';

  $overlay.css('background-color', overlayColor);

  $overlay.addClass('overlay-animation');
  setTimeout(function() {
    $overlay.removeClass('overlay-animation');
  }, 250);
}

Player.prototype.move = function (direction) {
  switch (direction) {
    case 'left':
      this.room = ((this.room - 1) % 5 == 0)? 4 : this.room - 1;
      this.x = 475;
      break;
    case 'right':
      this.room = ((this.room + 1) % 5 == 0)? 1 : this.room + 1;
      this.x = 25;
      break;
  }

  $('#map').attr('src', 'images/Sector'+this.room+'.png');
  $('#sectorHealth').css('width', roomConsoles.room[this.room].health+'%');

  for (var enemyId in enemies) {
    if (enemies[enemyId].room === this.room) {
      $('#'+enemyId).show();
    } else {
      $('#'+enemyId).hide();
    }
  }
}

Player.prototype.activate = function () {
  var health = roomConsoles.room[this.room].health;

  if (checkBounds(this.x, this.y, roomConsoles) && health < 100) {
    roomConsoles.room[this.room].health += 2;
    $('#sectorHealth').width(roomConsoles.room[this.room].health.toString()+'%');
  } else if (checkBounds(this.x, this.y, {x: 25, y: 200, radius: 50})) {
    this.move('left')
  } else if (checkBounds(this.x, this.y, {x: 475, y: 200, radius: 50})) {
    this.move('right')
  }
}

Player.prototype.hurt = function (points) {
  this.health -= points;

  $('#playerHealth').css('width', this.health+'%');

  if (this.health <= 0) {
    this.die();
  }
}

Player.prototype.die = function () {
  requestAnimFrame = function () {};
  $('#'+this.id).remove();
  delete players[this.id];
}