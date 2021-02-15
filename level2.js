function startLevel2() {
  character_x = 200;
  character_energy = 100;
  final_boss_energy = 100;
  bg_ground = 0;
  bg_sky = 0;
  bg_hills = 0;
  bg_shadows = 0;
  chickens = [];
  hens = [];
  placedBottles = [];
  placedCoins = [];
  game_finished = false;
  collectedBottles = 0;
  collectedCoins = 0;
  bossIsDead = true;
  level2 = true;
  BOSS_POSITION = 10000;

  document.getElementById('level-description').innerHTML = `
  <h2>LEVEL 2</h2>
  <span>Collect all the coins!</span>
  <button onclick="loadLevel2()">OK</button>`

}

function loadLevel2() {
  gamestart = true;
  document.getElementById('level-description').classList.add('d-none');
  createChickenList2();
  createBottleList2();
  createCoinList2();
  createHenList2();
  createJumpBarList();
  AUDIO_FINAL_BOSS.muted = true;
}


function createJumpBarList() {
  jumpBars = [
    createJumpBars(440, 300, 100),
    createJumpBars(570, 250, 100),
    createJumpBars(700, 200, 200),
    // createJumpBars(500, 300, 250),
    // createJumpBars(1500, 300, 250),
    // createJumpBars(2500, 300, 250),
    // createJumpBars(3440, 300, 100),
    // createJumpBars(3570, 250, 100),
    // createJumpBars(3700, 200, 200)
  ]
}


/**
* This creates a list of chickens.
*/
function createChickenList2() {
  chickens = [
    createChicken(700),
    createChicken(750),
    createChicken(800),
    createChicken(850),
    createChicken(900),
    // createChicken(1000),
    // createChicken(1200),
    // createChicken(1400),
    // createChicken(1600),
    // createChicken(3800),
    // createChicken(3200),
    // createChicken(3400),
    // createChicken(3600),
    // createChicken(3800)
  ];
}

/**
* This creates a list of hens.
*/
function createHenList2() {
  hens = [
    createChicken(800),
  ];
}

/**
* This function generates a list of coins.
*/
function createCoinList2() {
  placedCoins = [
    placedCoin(650, 0),
    placedCoin(700, 0),
    placedCoin(750, 0),
    placedCoin(800, 0),
    placedCoin(850, 0)
    // placedCoin(450, 100),
    // placedCoin(500, 100),
    // placedCoin(550, 100),
    // placedCoin(600, 100),
    // placedCoin(650, 100),

    // placedCoin(1450, 100),
    // placedCoin(1500, 100),
    // placedCoin(1550, 100),
    // placedCoin(1600, 100),
    // placedCoin(1650, 100),

    // placedCoin(2450, 100),
    // placedCoin(2500, 100),
    // placedCoin(2550, 100),
    // placedCoin(2600, 100),
    // placedCoin(2650, 100),

    // placedCoin(3650, 0),
    // placedCoin(3700, 0),
    // placedCoin(3750, 0),
    // placedCoin(3800, 0),
    // placedCoin(3850, 0)
  ];
}

/**
*This function generates a list of bottles on the ground. 
*/
function createBottleList2() {
  placedBottles = [

  ];
}

/**
 * This function shows the screen when the game is finished.
 */
function drawFinalScreen2() {

  document.getElementById('level-description').classList.remove('d-none');
  gamestart = false;
  level1 = false;

  document.getElementById('level-description').innerHTML = `
  <h1>You won!</h1>
  <button onclick="startLevel2()">Level 3</button>`

  if (isDead) {
    document.getElementById('level-description').innerHTML = `
 <h1>You lost!</h1>
 <button onclick="restart()">Play again</button>`
  }

}