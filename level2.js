/**
 * This function loads level 2.
 */
function startLevel2() {
  character_x = 200;
  character_energy = 300;
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

/**
 * This function loads level 2.
 */
function loadLevel2() {
  gamestart = true;
  document.getElementById('level-description').classList.add('d-none');
  createChickenList2();
  createCoinList2();
  createHenList2();
  createJumpBarList();
  createAlternatingHenList();
  AUDIO_FINAL_BOSS.muted = true;
}

/**
 * This function creates a list of alternating hens.
 */
function createAlternatingHenList() {

  alternatingHens = [
    createAlternatingHen(1950, 1950, 215, 250),
    createAlternatingHen(2600, 2600, 215, 100),
    createAlternatingHen(3300, 3300, 215, 100),
    createAlternatingHen(4950, 4950, 140, 250)
  ];

}

/**
 * This function generates the alternate moving hens.
 * 
 * 
 * @param {integer} position_x - Position on the x-axis.
 */
function createAlternatingHen(start_position, position_x, position_y, path_length) {
  return {
    'start_position': start_position,
    'position_x': position_x,
    'position_y': position_y,
    'path_length': path_length,
    'scale': 0.28,
    'speed': 3,
    'dead': false,
    'henIsFacingLeft': true,
    'henIsFacingRight': false,
    'currentAlternatingHenImage': './img/chicken/hen1.png'
  };
}

/**
 * This function creates a list of jump bars.
 */
function createJumpBarList() {
  jumpBars = [
    createJumpBars(1700, 275, 300),

    createJumpBars(2500, 275, 150),
    createJumpBars(3200, 275, 150),

    createJumpBars(4460, 300, 100),
    createJumpBars(4580, 250, 100),
    createJumpBars(4700, 200, 300)
  ]
}


/**
* This creates a list of chickens.
*/
function createChickenList2() {
  chickens = [
    createChicken(700),
    createChicken(800),
    createChicken(1000),
    createChicken(1400),
    createChicken(1600),
    createChicken(3800),
    createChicken(3400),
    createChicken(3600),
    createChicken(3800),
    createChicken(4200),
    createChicken(4500)
  ];
}

/**
* This creates a list of hens.
*/
function createHenList2() {
  hens = [
    createChicken(800),
    createChicken(2800)
  ];
}

/**
* This function generates a list of coins.
*/
function createCoinList2() {
  placedCoins = [
    placedCoin(1650, 50),
    placedCoin(1700, 50),
    placedCoin(1750, 50),
    placedCoin(1800, 50),
    placedCoin(1850, 50),
    placedCoin(1900, 50),

    placedCoin(2450, 100),
    placedCoin(2500, 100),
    placedCoin(2550, 100),
    placedCoin(2600, 100),

    placedCoin(3150, 100),
    placedCoin(3200, 100),
    placedCoin(3250, 100),
    placedCoin(3300, 100),

    placedCoin(4650, 0),
    placedCoin(4700, 0),
    placedCoin(4750, 0),
    placedCoin(4800, 0),
    placedCoin(4850, 0),
    placedCoin(4900, 0)
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