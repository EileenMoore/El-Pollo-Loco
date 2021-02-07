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

  document.getElementById('level-description').innerHTML = `
  <h2>LEVEL 2</h2>
  <span>Collect all the coins and kill the chicken boss with the tabasco bottles!</span>
  <button onclick="loadLevel2()">OK</button>`

}

function loadLevel2() {
  gamestart = true;
  document.getElementById('level-description').classList.add('d-none');
  draw();
}


// /**
//  * This function loads level2.
//  */
// function loadLevel2() {
//     gamestart = true;
//     document.getElementById('level-description').classList.add('d-none');
//     // createChickenList();
//     // createBottleList();
//     // createCoinList();
//     // createHenList();
//     createCharacter();
//     checkForSleep();
//     checkForRunning();
//     checkForJump();
//     checkIfHurt();
//     checkIfDead();
//     checkForChicken();
//     checkForHens();
//     checkForBoss();
//     checkBossEnergy();
//     checkForBottle();
//     checkForCoin();
//     calculateCloudOffset();
//     listenForKeys();
//     calculateChickenPosition();
//     calculateHenPosition();
//     checkForCollision();
//     lastKeyPressed = new Date().getTime();
//     checkIfGameIsFinished();
// }

// function drawLevel2() {
// updateCharacter();

// }