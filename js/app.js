
// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x >= 505) {
        this.x = 0;
    }
    checkCollision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function (x, y, speed) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};


Player.prototype.update = function () {
    if (player.y === 0) {
        score++;
        this.x = 202.5;
        this.y = 383;
        updateScore(score);
    }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Handles input for the game based on key press for the player
Player.prototype.handleInput = function (keyPress) {
    if (keyPress == 'left') {
        this.x -= this.speed;
    }
    if (keyPress == 'up') {
        this.y -= this.speed;
    }
    if (keyPress == 'right') {
        this.x += this.speed;
    }
    if (keyPress == 'down') {
        this.y += this.speed;
    }
    //handle boundary conditions
    if (this.y < 0) this.y = 0;
    if (this.y > 383) this.y = 383;
    if (this.x < 0) this.x = 0;
    if (this.x > 402.5) this.x = 402.5;
};

//Checks collision based on enemy and player range
function checkCollision(enemy) {
    var enemyrange_min = enemy.y - 25;
    var enemyrange_max = enemy.y + 25;
    var playerrange_min = player.x + 83;
    var playerrange_max = player.x - 83;

    if ((player.y >= enemyrange_min) && (player.y <= enemyrange_max) && (enemy.x >= playerrange_max) &&(enemy.x <= playerrange_min)) {
        player.x = 202.5;
        player.y = 383;
    }
}

function updateScore(score) {
  document.getElementById('score').value = score;
  document.getElementById("level").value = 1;
}    
window.onload=function() {
  updateScore(score);
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var score = 0;
var enemy1 = new Enemy(0, 155, 50);
var enemy2 = new Enemy(0, 70, 75);
var enemy3 = new Enemy(0, 220, 100);

allEnemies.push(enemy1, enemy2, enemy3);

var player = new Player(202.5, 383, 50);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});