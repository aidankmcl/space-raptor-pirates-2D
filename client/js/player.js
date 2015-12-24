function Player() {
  this.id = "";
  this.on = false;
  this.x = 250;
  this.y = 200;
  this.speed = 5;
  this.xSpeed = 0;
  this.ySpeed = 0;
  this.room = 1,
  this.health = 100,

  this.shoot = function(mouseX, mouseY) {
    var playerXY = {x: this.x, y: this.y},
      mouseXY = {x: mouseX, y: mouseY};

    $('.enemy').each(function(index, obj) {
      var enemyXY = {
        x: parseInt($(obj).css('left'), 10),
        y: parseInt($(obj).css('top'), 10)
      }

      var hit = detectCollision(playerXY, mouseXY, enemyXY, 20);
    })
  },
  
  this.options = {
    rightDoor: false,
    leftDoor: false,
    elevator: false,
    terminal: false
  }
}

var player = new Player();

$('#field').click(function(e) {
  var x = e.pageX - $(this).offset().left;
  var y = e.pageY - $(this).offset().top;
  player.shoot(x, y)
});