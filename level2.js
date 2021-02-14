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
  bossIsDead = false;
  level2 = true;
  BOSS_POSITION = 10000;

  document.getElementById('level-description').innerHTML = `
  <h2>LEVEL 2</h2>
  <span>Collect all the coins and kill the chicken boss with the tabasco bottles!</span>
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

/**
* This creates a list of chickens.
*/
function createChickenList2() {
  chickens = [
    createChicken(700),
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
function createBottleList2() {
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