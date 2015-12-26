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