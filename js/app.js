// Enemies our player must avoid
class Enemy {

    /**
    * @description Represents an enemy in the game
    * @param {number} x - X coordinate where enemy starts
    * @param {number} y - Y coordinate where enemy starts
    */
    constructor(x, y) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        this.x = x;
        this.y = y;
        this.speed = getRandomInt(150, 400);
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
    }

    /**
    * @description Update the enemy's position and reset their position once off screen
    * @param {DateConstructor} dt - DateTime object from engine.js, a time delta between ticks
    */
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.   
        this.x += dt * this.speed;
        // If an enemy moves offscreen reset their location and pick a 
        // random lane to run down
        if (this.x > 550) {
            this.x = -100;
            this.y = lanes[getRandomInt(0, lanes.length)];
        }

        // Check for player collision
        // Using 51 since png for bugs are 101 pixels in width
        const collideFront = (player.x > this.x && player.x < this.x + 51)
        const collideRear = (player.x < this.x && player.x > this.x - 51)
        const collideInLane = (this.y == player.y)
        if ((collideFront || collideRear) && collideInLane) {
            // Reset player position upon collision
            player.x = playerStartX;
            player.y = playerStartY;
            lives.update();
        }

    }

    /**
    * @description Draw the enemy on the canvas
    */
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {

    /**
    * @description Represents a player in the game
    * @param {number} x - X coordinate where player starts
    * @param {number} y - Y coordinate where player starts
    */
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-boy.png';
        this.horizontalMove = 100;
        this.verticalMove = 85;
    }

    /**
    * @description Update a player's position when they reach the water
    */
    update() {
        if (this.y === -25) {
            this.x = playerStartX;
            this.y = playerStartY;
        }
    }

    /**
    * @description Draw a player on the canvas
    */
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    /**
    * @description Handles player movement.
    * @param {string} direction - Direction player is moving: 'up', 'left', 'right', or 'down'
    */
    handleInput(direction) {
        switch (direction) {
            // Prevent the player from leaving the canvas
            case 'left':
                if (this.x > 0) {
                    this.x -= this.horizontalMove;
                }
                break;
            case 'up':
                if (this.y > -25) {
                    this.y -= this.verticalMove;
                }
                break;
            case 'right':
                if (this.x < 400) {
                    this.x += this.horizontalMove;
                }
                break;
            case 'down':
                if (this.y < 400) {
                    this.y += this.verticalMove;
                }
                break;
            default:
                break;
        }
    }

}

class GameLives {

    /**
    * @description Represents the lives the player has in the game
    */
    constructor() {
        this.lives = 3;
        this.maxLives = 5;
        this.sprite = 'images/Heart.png';
        this.spriteHeight = 40;
        this.spriteWidth = 60;
        this.spriteCoords = [
            { x: 460, y: -5 },
            { x: 420, y: -5 },
            { x: 380, y: -5 },
            { x: 340, y: -5 },
            { x: 300, y: -5 }
        ];
    }

    /**
    * @description Render the player's lives on the canvas
    */
    render() {
        for (let i = 0; i < this.lives; i++) {
            ctx.drawImage(Resources.get(this.sprite), this.spriteCoords[i].x, this.spriteCoords[i].y, this.spriteHeight, this.spriteWidth);
        }
    }

    /**
    * @description Update the player's lives and handle when game ends
    */
    update() {
        if (this.lives > 0) {
            this.lives -= 1;
        }
        if (this.lives === 0) {
            document.removeEventListener('keyup', keyUpInput);
            let modal = document.getElementById('game-over');
            modal.classList.remove('modal-hide');
            modal.classList.add('modal-show');
        }
    }
}

/**
* @description Generate a random integer
* From the MDN docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_integer_between_two_values
* @param {number} min - Minimum number (inclusive)
* @param {number} max - Maximum number (exclusive)
*/
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

/**
* @description This listens for key presses and sends the keys to your
* Player.handleInput() method. You don't need to modify this.
* @param {EventTarget} e - Event object from the browser
*/
keyUpInput = function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if (e.keyCode in allowedKeys) {
        player.handleInput(allowedKeys[e.keyCode]);
    }
};

// Move player event
document.addEventListener('keyup', keyUpInput);
// Add event to restart the game
document.getElementById('modal-button').addEventListener('click', function() {
    // Since the game is simple, restarting will simply be loading the document again
    document.location.reload();
});

// Global Variables
// Now instantiate your objects.
const playerStartX = 201;
const playerStartY = 400;
const lanes = [60, 145, 230]; // these are the lanes the enemies run on
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemyOne = new Enemy(0, lanes[0], 1);
const enemyTwo = new Enemy(0, lanes[1], 1);
const enemyThree = new Enemy(0, lanes[2], 1);
const enemyFour = new Enemy(-1000, lanes[0], 1);
const player = new Player(playerStartX, playerStartY); // used by engine.js to render the player
const lives = new GameLives();
const allEnemies = [enemyOne, enemyTwo, enemyThree, enemyFour]; // used by engine.js to render the enemies

