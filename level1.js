
/**
 * This function initializes the game and the canvas.
 */
function init() {
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
* This function loads level1.
*/
function loadLevel1() {
    game_finished = false;
    gamestart = true;
    document.getElementById('level-description').classList.add('d-none');
    AUDIO_BACKGROUND_MUSIC.play();
    createChickenList();
    createBottleList();
    createCoinList();
    createHenList();
    createCharacter();
    checkForSleep();
    checkForRunning();
    checkForJump();
    checkIfHurt();
    checkIfDead();
    checkForChicken();
    checkForHens();
    checkForBoss();
    checkBossEnergy();
    checkForBottle();
    checkForCoin();
    calculateCloudOffset();
    listenForKeys();
    calculateChickenPosition();
    calculateHenPosition();
    checkForCollision();
    lastKeyPressed = new Date().getTime();
    checkIfGameIsFinished();
}

/**
* This creates a list of chickens.
*/
function createChickenList() {
    chickens = [
        createChicken(700),
        createChicken(1800),
        createChicken(3000),
        createChicken(3300),
        createChicken(3800),
        createChicken(4500),
    ];
}

/**
 * This creates a list of hens.
 */
function createHenList() {
    hens = [
        createChicken(1400),
        createChicken(2500),
        createChicken(4200),
    ];
}


/**
 * This function generates a list of coins.
 */
function createCoinList() {
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
        placedCoin(3600, 150),
        placedCoin(3700, 100),
        placedCoin(3800, 50),
        placedCoin(3900, 100),
        placedCoin(4000, 150),
    ];
}

/**
 *This function generates a list of bottles on the ground. 
 */
function createBottleList() {
    placedBottles = [
        placedBottle(500, 1),
        placedBottle(1000, 2),
        placedBottle(1700, 1),
        placedBottle(2500, 2),
        placedBottle(2800, 2),
        placedBottle(3300, 1),
        placedBottle(3600, 2),
    ];
}

/**
 * This function shows the screen when the game is finished.
 */
function drawFinalScreen() {

    document.getElementById('level-description').classList.remove('d-none');
    gamestart = false;
  
    document.getElementById('level-description').innerHTML = `
    <h1>You won!</h1>
    <button onclick="startLevel2()">Level 2</button>`
  
    if (isDead) {
      document.getElementById('level-description').innerHTML = `
   <h1>You lost!</h1>
   <button onclick="restart()">Play again</button>`
    }
  
  }