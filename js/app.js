// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        this.x = x;
        this.y = y;
        this.speed = speed;
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += dt * 400;
        if (this.x > 505) {
            this.x = -100;
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/char-boy.png';
    }
    
    update(dt) {
        return;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(direction) {
        switch (direction) {
            // TODO: Define game constants for player movement limits
            case 'left':
                if (this.x > 0) {
                    this.x -= 100;
                }
                break;
            case 'up':
                if (this.y > -25) {
                    this.y -= 85;
                }
                break;
            case 'right':
                if (this.x < 400) {
                    this.x += 100;
                }
                break;
            case 'down':
                if (this. y < 400) {
                    this.y += 85;
                }
                break;
            default:
                break;
        }
    }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let enemyOne = new Enemy(0, 60, 1);
let enemyTwo = new Enemy(0, 140, 1);
let enemyThree = new Enemy(0, 220, 1);
let player = new Player(200, 400, 1);
let allEnemies = [enemyOne, enemyTwo, enemyThree];

// NOTE: Should move about 100 units is about distance for one square on the canvas

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if (e.keyCode in allowedKeys) {
        player.handleInput(allowedKeys[e.keyCode]);
    }
});
