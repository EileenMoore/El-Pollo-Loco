/**
 * This function initializes the game and the canvas.
 */
function init() {
    level1 = true;
    preloadImages();
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    draw();
    checkForScreenOrientation();
}

/**
 * This function shows the start-button and the level-description.
 */
function showDescription() {
    document.getElementById('start-button').classList.add('d-none');
    document.getElementById('level-description').classList.remove('d-none');
}

/**
 * This function loades level 1.
 */
function loadLevel1() {
    gamestart = true;
    document.getElementById('level-description').classList.add('d-none');
    createChickenList1();
    createBottleList1();
    createCoinList1();
    createHenList1();
    createJumpBarList1();
}

/**
 * This function creates a list of jump bars.
 */
function createJumpBarList1() {
    jumpBars = [
      createJumpBars(0, 0, 0)
    ]
  }

/**
* This creates a list of chickens.
*/
function createChickenList1() {
    chickens = [
        createChicken(700),
        createChicken(1800),
        createChicken(3000),
        createChicken(3300),
        createChicken(3800),
        createChicken(4500)
    ];
}

/**
 * This creates a list of hens.
 */
function createHenList1() {
    hens = [
        createChicken(1400),
        createChicken(2500),
        createChicken(4200)
    ];
}

/**
 * This function generates a list of coins.
 */
function createCoinList1() {
    placedCoins = [
        placedCoin(600, 150),
        placedCoin(700, 100),
        placedCoin(800, 50),
        placedCoin(900, 100),
        placedCoin(1000, 150),

        placedCoin(2600, 150),
        placedCoin(2700, 100),
        placedCoin(2800, 50),
        placedCoin(2900, 100),
        placedCoin(3000, 150),

        placedCoin(3600, 150),
        placedCoin(3700, 100),
        placedCoin(3800, 50),
        placedCoin(3900, 100),
        placedCoin(4000, 150),

        placedCoin(4600, 150),
        placedCoin(4700, 100),
        placedCoin(4800, 50),
        placedCoin(4900, 100),
        placedCoin(5000, 150)
    ];
}

/**
 *This function generates a list of bottles on the ground. 
 */
function createBottleList1() {
    placedBottles = [
        placedBottle(500, 1),
        placedBottle(1000, 2),
        placedBottle(1700, 1),
        placedBottle(2500, 2),
        placedBottle(2800, 2),
        placedBottle(3500, 1),
    ];
}

/**
 * This function shows the screen when the game is finished.
 */
function drawFinalScreen1() {

    document.getElementById('level-description').classList.remove('d-none');
    gamestart = false;
    level1 = false;

    document.getElementById('level-description').innerHTML = `
    <h1>You won!</h1>
    <button onclick="startLevel2()">Level 2</button>`;

    if (isDead) {
        document.getElementById('level-description').innerHTML = `
   <h1>You lost!</h1>
   <button onclick="restart()">Play again</button>`;
    }

}