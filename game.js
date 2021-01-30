let canvas;
let ctx;
let character_x = 200;
let character_y = 150;
let character_energy = 100;
let final_boss_energy = 100;
let bg_ground = 0;
let bg_sky = 0;
let bg_hills = 0;
let bg_shadows = 0;
let isMovingRight = false;
let isMovingLeft = false;
let isJumping = false;
let lastJumpStarted = 0;
let isFacingRight = true;
let isFacingLeft = false;
let isFallingDown = false;
let isSleeping = false;
let isThrowingRight = false;
let isThrowingLeft = false;
let isHurt = false;
let isDead = false;
let lastStandStarted = 0;
let lastHurtStarted = 0;
let timePassedSinceHurt = 0;
let deadStarted = 0;
let timePassedSinceDead = 0;
let currentCharacterImage = './img/pepe/I-1.png';
let characterGraphicsStandRight = ['./img/pepe/I-1.png', './img/pepe/I-2.png', './img/pepe/I-3.png', './img/pepe/I-4.png', './img/pepe/I-5.png', './img/pepe/I-6.png', './img/pepe/I-7.png', './img/pepe/I-8.png', './img/pepe/I-9.png', './img/pepe/I-10.png'];
let characterGraphicsStandLeft = ['./img/pepe/IL-1.png', './img/pepe/IL-2.png', './img/pepe/IL-3.png', './img/pepe/IL-4.png', './img/pepe/IL-5.png', './img/pepe/IL-6.png', './img/pepe/IL-7.png', './img/pepe/IL-8.png', './img/pepe/IL-9.png', './img/pepe/IL-10.png'];
let characterGraphicsSleepRight = ['./img/pepe/I-11.png', './img/pepe/I-12.png', './img/pepe/I-13.png', './img/pepe/I-14.png', './img/pepe/I-15.png', './img/pepe/I-16.png', './img/pepe/I-17.png', './img/pepe/I-18.png', './img/pepe/I-19.png', './img/pepe/I-20.png'];
let characterGraphicsSleepLeft = ['./img/pepe/IL-11.png', './img/pepe/IL-12.png', './img/pepe/IL-13.png', './img/pepe/IL-14.png', './img/pepe/IL-15.png', './img/pepe/IL-16.png', './img/pepe/IL-17.png', './img/pepe/IL-18.png', './img/pepe/IL-19.png', './img/pepe/IL-20.png'];
let characterGraphicsWalkRight = ['./img/pepe/W-21.png', './img/pepe/W-22.png', './img/pepe/W-23.png', './img/pepe/W-24.png', './img/pepe/W-25.png', './img/pepe/W-26.png'];
let characterGraphicsWalkLeft = ['./img/pepe/WL-21.png', './img/pepe/WL-22.png', './img/pepe/WL-23.png', './img/pepe/WL-24.png', './img/pepe/WL-25.png', './img/pepe/WL-26.png'];
let characterGraphicsJumpRight = ['./img/pepe/J-31.png', './img/pepe/J-32.png', './img/pepe/J-33.png', './img/pepe/J-34.png', './img/pepe/J-35.png', './img/pepe/J-38.png', './img/pepe/J-38.png'];
let characterGraphicsJumpLeft = ['./img/pepe/JL-31.png', './img/pepe/JL-32.png', './img/pepe/JL-33.png', './img/pepe/JL-34.png', './img/pepe/JL-35.png', './img/pepe/JL-38.png', './img/pepe/JL-39.png'];
let characterGraphicsHurtRight = ['./img/pepe/D-51.png', './img/pepe/D-52.png', './img/pepe/D-53.png', './img/pepe/D-54.png', './img/pepe/D-55.png', './img/pepe/D-56.png'];
let characterGraphicsHurtLeft = ['./img/pepe/DL-51.png', './img/pepe/DL-52.png', './img/pepe/DL-53.png', './img/pepe/DL-54.png', './img/pepe/DL-55.png', './img/pepe/DL-56.png'];
let characterGraphicsDeadRight = ['./img/pepe/H-41.png', './img/pepe/H-42.png', './img/pepe/H-43.png', './img/pepe/J-40.png'];
let characterGraphicsDeadLeft = ['./img/pepe/HL-41.png', './img/pepe/HL-42.png', './img/pepe/HL-43.png', './img/pepe/J-40.png'];
let characterGraphicIndex = 0;
let characterHurtGraphicIndex = 0;
let cloudOffset = 0;
let chickens = [];
let currentChickenImage = './img/chicken/chicken1.png';
let chickenGraphics = ['./img/chicken/chicken1.png', './img/chicken/chicken2.png', './img/chicken/chicken3.png'];
let chickenGraphicIndex = 0;
let currentHenImage = './img/chicken/hen1.png';
let hens = [];
let hensGraphics = ['./img/chicken/hen1.png', './img/chicken/hen2.png', './img/chicken/hen3.png'];
let hensGraphicIndex = 0;
let currentBossImage = './img/boss/G5.png';
let bossAlertGraphics = ['./img/boss/G5.png', './img/boss/G6.png', './img/boss/G7.png', './img/boss/G8.png', './img/boss/G9.png', './img/boss/G10.png', './img/boss/G11.png', './img/boss/G12.png'];
let bossWalkLeftGraphics = ['./img/boss/G1.png', './img/boss/G2.png', './img/boss/G3.png', './img/boss/G4.png'];
let bossWalkRightGraphics = ['./img/boss/GR1.png', './img/boss/GR2.png', './img/boss/GR3.png', './img/boss/GR4.png'];
let bossAttackLeftGraphics = ['./img/boss/G13.png', './img/boss/G14.png', './img/boss/G15.png', './img/boss/G16.png', './img/boss/G17.png', './img/boss/G18.png', './img/boss/G19.png', './img/boss/G20.png'];
let bossAttackRightGraphics = ['./img/boss/GR13.png', './img/boss/GR14.png', './img/boss/GR15.png', './img/boss/GR16.png', './img/boss/GR17.png', './img/boss/GR18.png', './img/boss/GR19.png', './img/boss/GR20.png'];
let bossHurtLeftGraphics = ['./img/boss/G21.png', './img/boss/G22.png', './img/boss/G23.png', './img/boss/G21.png', './img/boss/G22.png', './img/boss/G23.png'];
let bossHurtRightGraphics = ['./img/boss/GR21.png', './img/boss/GR22.png', './img/boss/GR23.png', './img/boss/GR21.png', './img/boss/GR22.png', './img/boss/GR23.png'];
let bossDeadLeftGraphics = ['./img/boss/G24.png', './img/boss/G25.png', './img/boss/G26.png'];
let bossDeadRightGraphics = ['./img/boss/GR24.png', './img/boss/GR25.png', './img/boss/GR26.png'];
let bossGraphicIndex = 0;
let bossIsFacingRight = false;
let bossIsFacingLeft = true;
let bossIsWalking = false;
let bossIsAlerted = true;
let bossIsAttacking = false;
let bossIsHurt = false;
let bossIsDead = false;
let index_hurt;
let index_attack;
let bossEnergyGraphics = ['./img/bars/bossenergy1.png', './img/bars/bossenergy2.png', './img/bars/bossenergy3.png', './img/bars/bossenergy4.png', './img/bars/bossenergy5.png', './img/bars/bossenergy6.png'];
let currentBossEnergyImage = './img/bars/bossenergy1.png';
let bottleGraphics = ['./img/bottle/bottle.png', './img/bottle/bottle3.png', './img/bottle/bottle4.png', './img/bottle/bottle5.png'];
let tabascoImages = ['./img/bottle/tabasco1.png', './img/bottle/tabasco2.png', './img/bottle/tabasco3.png', './img/bottle/tabasco4.png', './img/bottle/tabasco5.png', './img/bottle/tabasco6.png'];
let currentBottleImage = './img/bottle/bottle.png';
let bottleGraphicIndex = 0;
let coinGraphics = ['img/coins/coin1.png', 'img/coins/coin2.png'];
let currentCoinImage = 'img/coins/coin1.png';
let coinGraphicIndex = 0;
let placedBottles = [];
let placedCoins = [];
let collectedBottles = 0;
let collectedCoins = 0;
let bottleThrowTime = 0;
let thrownBottle_x = 0;
let thrownBottel_y = 0;
let bottleIsBroken = false;
let bossDefeatedAt = 0;
let game_finished = false;
let lastKeyPressed = 0;

let musicIsOn = true;
let musicIsOff = false;
let soundIsOn = true;
let soundIsOff = false;

// -------------------------Game config-------------------------

let JUMP_TIME = 350; // in ms
let HURT_TIME = 700;
let DEAD_TIME = 500;
let GAME_SPEED = 7;
let BOSS_POSITION = 5000;
let AUDIO_RUNNING = new Audio('audio/running.mp3');
let AUDIO_JUMP = new Audio('audio/jump.mp3');
let AUDIO_HURT = new Audio('audio/hurt.mp3');
let AUDIO_BOTTLE = new Audio('audio/bottle.mp3');
let AUDIO_COIN = new Audio('audio/coin.mp3');
let AUDIO_THROW = new Audio('audio/throw.mp3');
let AUDIO_GLASS = new Audio('audio/glass.mp3');
let AUDIO_HEN = new Audio('audio/hen.mp3');
let AUDIO_CRACK = new Audio('audio/crack.mp3');
let AUDIO_FINAL_BOSS = new Audio('audio/final_boss.mp3');
let AUDIO_FINAL_BOSS2 = new Audio('audio/final_boss2.mp3');
let AUDIO_WIN = new Audio('audio/win.mp3');
let AUDIO_BACKGROUND_MUSIC = new Audio('audio/music.mp3');
AUDIO_BACKGROUND_MUSIC.loop = true;
AUDIO_BACKGROUND_MUSIC.volume = 0.2;

/**
 * This function initializes the game and the canvas.
 */
function init() {
  preloadImages();
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext("2d");
  draw();
}

/**
 * This function shows the start-button and the level-description.
 */
function showDescription() {
  document.getElementById('start-button').classList.add('d-none');
  document.getElementById('level-description').classList.remove('d-none');
}

/**
 * This function loads the game.
 */
function loadGame() {
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
 * This function checks for collision of the character.
 */
function checkForCollision() {

  setInterval(function () {

    checkForHenCollision();
    checkForChickenCollission();
    checkForBottleCollection();
    checkForCoinCollection();
    checkForBossCollision();

  }, 100);
}

/**
 * This function checks for collision between the character and the hens.
 */
function checkForHenCollision() {
  for (let index = 0; index < hens.length; index++) {
    let hen = hens[index];
    let hen_x = hen.position_x + bg_ground;

    if ((hen_x - 40) < character_x && (hen_x + 40) > character_x && !hen.dead && character_y > 110 && isFallingDown) {
      AUDIO_CRACK.play();
      hen.dead = true;
    }
    if ((hen_x - 50) < character_x && (hen_x + 50) > character_x && !hen.dead && character_y > 130) {
      if (character_energy > 0) {
        if (timePassedSinceHurt > 2 * HURT_TIME) {
          isHurt = true;
          AUDIO_HURT.play();
          lastHurtStarted = new Date().getTime();
          character_energy -= 10;
        }
      } else {
        isDead = true;
        ishurt = false;
        deadStarted = new Date().getTime();
      }
    }
    if ((hen_x - 200) < character_x && (hen_x + 200) > character_x && !hen.dead) {
      AUDIO_HEN.play();

    }
  }
}

/**
 * This function checks for collision between the character and the chickens.
 */
function checkForChickenCollission() {
  for (let index = 0; index < chickens.length; index++) {
    let chicken = chickens[index];
    let chicken_x = chicken.position_x + bg_ground;

    if ((chicken_x - 40) < character_x && (chicken_x + 40) > character_x && !chicken.dead && character_y > 110 && isFallingDown) {
      AUDIO_CRACK.play();
      chicken.dead = true;
    }
    if ((chicken_x - 50) < character_x && (chicken_x + 50) > character_x && !chicken.dead && character_y > 110) {
      if (character_energy > 0) {
        if (timePassedSinceHurt > 2 * HURT_TIME) {
          isHurt = true;
          AUDIO_HURT.play();
          lastHurtStarted = new Date().getTime();
          character_energy -= 10;
        }
      } else {
        isDead = true;
        ishurt = false;
        deadStarted = new Date().getTime();
      }
    }
  }
}

/**
 * This function checks for collision between the character and the chickens.
 */
function checkForBossCollision() {
  let boss_x = BOSS_POSITION + bg_ground;

  if ((boss_x - 80) < character_x && (boss_x + 80) > character_x && character_y > 10) {
    if (character_energy > 0) {
      if (timePassedSinceHurt > 2 * HURT_TIME && !bossIsDead) {
        isHurt = true;
        AUDIO_HURT.play();
        lastHurtStarted = new Date().getTime();
        character_energy -= 10;
      }
    } else {
      isDead = true;
      ishurt = false;
      deadStarted = new Date().getTime();
    }
  }
}

/**
 * This function checks if bottles are collected by the character.
 */
function checkForBottleCollection() {
  for (let index = 0; index < placedBottles.length; index++) {
    let bottle_x = placedBottles[index]['position_x'] + bg_ground;

    if ((bottle_x - 40) < character_x && (bottle_x + 40) > character_x) {
      if (character_y > 110) {
        placedBottles.splice(index, 1);
        AUDIO_BOTTLE.play();
        collectedBottles++;
      }
    }
  }
}

/**
 * This function checks if coins are collected by the character.
 */
function checkForCoinCollection() {
  for (let index = 0; index < placedCoins.length; index++) {
    let coin_x = placedCoins[index]['position_x'] + bg_ground;
    let coin_y = placedCoins[index]['position_y'];

    if ((coin_x - 50) < character_x && (coin_x + 50) > character_x) {
      if ((character_y + 180) > coin_y && character_y < (coin_y + 20)) {
        placedCoins.splice(index, 1);
        AUDIO_COIN.play();
        collectedCoins++;
      }
    }
  }
}

/**
 * This function checks the energy of the chicken boss.
 */
function checkBossEnergy() {
  let index = 0;

  setInterval(function () {

    if (thrownBottle_x > BOSS_POSITION + bg_ground - 100 && thrownBottle_x < BOSS_POSITION + bg_ground + 100 && thrownBottel_y > 50) {
      if (final_boss_energy > 0 && !bossIsHurt) {
        final_boss_energy = final_boss_energy - 20;
        AUDIO_GLASS.play();
        bossIsHurt = true;
        index++;
        currentBossEnergyImage = bossEnergyGraphics[index];
        bottleIsBroken = true;

        setTimeout(function () {
          AUDIO_FINAL_BOSS2.play();
        }, 500);

      }
      if (final_boss_energy == 0) {
        bossDefeatedAt = new Date().getTime();
        bossIsDead = true;
        AUDIO_FINAL_BOSS2.pause();
        AUDIO_FINAL_BOSS.play();
      }
    }
  }, 50);
}

/**
 * This function checks if the game is finished.
 */
function checkIfGameIsFinished() {

  setInterval(function () {
    let timePassed = new Date().getTime() - bossDefeatedAt;

    if (timePassed > 2500 && collectedCoins == 20 && bossIsDead) {
      AUDIO_WIN.play();
      game_finished = true;
    }
  }, 100);

}

/**
 * This function calculates the position of the chickens.
 */
function calculateChickenPosition() {

  setInterval(function () {
    for (let index = 0; index < chickens.length; index++) {
      let chicken = chickens[index];

      if (!chicken.dead) {
        chicken.position_x = chicken.position_x - chicken.speed;
      }

    }
  }, 50);

}

/**
 * This function calculated the position of the hens.
 */
function calculateHenPosition() {

  setInterval(function () {
    for (let index = 0; index < hens.length; index++) {
      let hen = hens[index];

      if (!hen.dead) {
        hen.position_x = hen.position_x - hen.speed;
      }

    }
  }, 50);

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
 * This calculates the offset of the clouds.
 */
function calculateCloudOffset() {
  setInterval(function () {
    cloudOffset = cloudOffset + 0.25;
  }, 50);
}

/**
 * This function determines the current image if the character is standing.
 */
function createCharacter() {
  setInterval(function () {

    if (isFacingRight && !isMovingRight && !isMovingLeft && !isHurt && !isJumping) {
      let index = characterGraphicIndex % characterGraphicsStandRight.length;
      currentCharacterImage = characterGraphicsStandRight[index];
      characterGraphicIndex = characterGraphicIndex + 1;

    }
    if (isFacingLeft && !isMovingRight && !isMovingLeft && !isHurt && !isJumping) {
      let index = characterGraphicIndex % characterGraphicsStandLeft.length;
      currentCharacterImage = characterGraphicsStandLeft[index];
      characterGraphicIndex = characterGraphicIndex + 1;

    }
  }, 125);
}

/**
 * This function checks for the current image if the character is sleeping.
 */
function checkForSleep() {
  setInterval(function () {

    let timePassed = (new Date().getTime() - lastKeyPressed);

    if (lastKeyPressed != 0 && timePassed > 3000) {
      isSleeping = true;
      if (isFacingRight) {
        let index = characterGraphicIndex % characterGraphicsSleepRight.length;
        currentCharacterImage = characterGraphicsSleepRight[index];
        characterGraphicIndex = characterGraphicIndex + 1;
      }
      else if (isFacingLeft) {
        let index = characterGraphicIndex % characterGraphicsSleepLeft.length;
        currentCharacterImage = characterGraphicsSleepLeft[index];
        characterGraphicIndex = characterGraphicIndex + 1;
      }
    } else {
      isSleeping = false;
    }

  }, 125);
}

/**
 * This function checks for the current image if the character is running.
 */
function checkForRunning() {
  setInterval(function () {

    if (isMovingRight) {
      isFacingRight = true;
      isFacingLeft = false;
      isSleeping = false;
      AUDIO_RUNNING.play();
      let index = characterGraphicIndex % characterGraphicsWalkRight.length; //Infinite looü
      currentCharacterImage = characterGraphicsWalkRight[index];
      characterGraphicIndex = characterGraphicIndex + 1;
    }

    if (isMovingLeft) {
      isFacingRight = false;
      isFacingLeft = true;
      isSleeping = false;
      AUDIO_RUNNING.play();
      let index = characterGraphicIndex % characterGraphicsWalkLeft.length;
      currentCharacterImage = characterGraphicsWalkLeft[index];
      characterGraphicIndex = characterGraphicIndex + 1;
    }

    if (!isMovingRight && !isMovingLeft) {
      AUDIO_RUNNING.pause();
    }

  }, 125);
}

/**
 * This function checks for the current image if the character is jumping.
 */
function checkForJump() {
  let index;

  setInterval(function () {

    if (isJumping && isFacingRight) {

      console.log(index);

      if (index == 6) {
        isJumping = false;
        index = 0;
        characterGraphicIndex = 0;
      }

      // setTimeout(function () {
      //   isJumping = false;
      //   index = 0;
      //   characterGraphicIndex = 0;
      // }, 2 * JUMP_TIME);

      index = characterGraphicIndex % characterGraphicsJumpRight.length;
      currentCharacterImage = characterGraphicsJumpRight[index];
      characterGraphicIndex = characterGraphicIndex + 1;
    }

    if (isJumping && isFacingLeft) {

      if (index == 6) {
        isJumping = false;
        index = 0;
        characterGraphicIndex = 0;
      }

      // setTimeout(function () {
      //   isJumping = false;
      //   index = 0;
      //   characterGraphicIndex = 0;
      // }, 2 * JUMP_TIME);

      index = characterGraphicIndex % characterGraphicsJumpLeft.length;
      currentCharacterImage = characterGraphicsJumpLeft[index];
      characterGraphicIndex = characterGraphicIndex + 1;
    }

  }, 125);
}

/**
 * This function checks for the current image if the character is hurt.
 */
function checkIfHurt() {
  let index;

  setInterval(function () {
    if (isHurt && isFacingRight) {

      if (index == 5) {
        isHurt = false;
        index = 0;
        characterHurtGraphicIndex = 0;

      } else {
        index = characterHurtGraphicIndex % characterGraphicsHurtRight.length;
        currentCharacterImage = characterGraphicsHurtRight[index];
        characterHurtGraphicIndex = characterHurtGraphicIndex + 1;
      }
    }

    if (isHurt && isFacingLeft) {
      if (index == 5) {
        isHurt = false;
        index = 0;
        characterHurtGraphicIndex = 0;

      } else {
        index = characterHurtGraphicIndex % characterGraphicsHurtLeft.length;
        currentCharacterImage = characterGraphicsHurtLeft[index];
        characterHurtGraphicIndex = characterHurtGraphicIndex + 1;
      }
    }

  }, 125);
}

/**
 * This function checks for the current image if the character is dead.
 */
function checkIfDead() {
  let index;

  setInterval(function () {

    if (isDead && isFacingRight) {

      setTimeout(function () {
        game_finished = true;
      }, DEAD_TIME);

      index = characterGraphicIndex % characterGraphicsDeadRight.length;
      currentCharacterImage = characterGraphicsDeadRight[index];
      characterGraphicIndex = characterGraphicIndex + 1;
    }

    if (isDead && isFacingLeft) {

      setTimeout(function () {
        game_finished = true;
      }, DEAD_TIME);

      index = characterGraphicIndex % characterGraphicsDeadLeft.length;
      currentCharacterImage = characterGraphicsDeadLeft[index];
      characterGraphicIndex = characterGraphicIndex + 1;
    }

  }, 125);
}

/**
 * This function checks for the current image of the thrown bottle.
 */
function checkForBottle() {

  setInterval(function () {

    if (bottleIsBroken) {
      let index = bottleGraphicIndex % tabascoImages.length;
      currentBottleImage = tabascoImages[index];

    } else {
      let index = bottleGraphicIndex % bottleGraphics.length;
      currentBottleImage = bottleGraphics[index];
    }

    bottleGraphicIndex = bottleGraphicIndex + 1;

  }, 125);
}

/**
 * This function checks for the current image of the coins.
 */
function checkForCoin() {
  setInterval(function () {

    let index = coinGraphicIndex % coinGraphics.length;
    currentCoinImage = coinGraphics[index];
    coinGraphicIndex = coinGraphicIndex + 1;

  }, 250);
}

/**
 * This function is for drawing on the canvas.
 */
function draw() {
  drawBackground();
  if (game_finished) {
    drawFinalScreen();
  } else {
    updateCharacter();
    drawChicken();
    drawHen();
    drawBottles();
    drawCoins();
    requestAnimationFrame(draw);
    drawInformation();
    drawThrowBottle();
  }
  drawFinalBoss();
}

/**
 * This function shows the screen when the game is finished.
 */
function drawFinalScreen() {

  document.getElementById('level-description').classList.remove('d-none');
  AUDIO_WIN.muted = true;

  document.getElementById('level-description').innerHTML = `
  <h1>You won!</h1>
  <button>Level 2</button>`

  if (isDead) {
    document.getElementById('level-description').innerHTML = `
 <h1>You lost!</h1>
 <button onclick="restart()">Play again</button>`
  }

}

/**
 * This function draws the chicken boss on the canvas.
 */
function drawFinalBoss() {
  let chicken_x = BOSS_POSITION;
  let chicken_y = 98;
  let energybar_y = 75;

  if (bossIsWalking && bossIsFacingLeft) {
    BOSS_POSITION = BOSS_POSITION - 5;
  }
  if (bossIsWalking && bossIsFacingRight) {
    BOSS_POSITION = BOSS_POSITION + 5;
  }

  let difference = character_x - (BOSS_POSITION + bg_ground);

  if (bossIsFacingLeft && difference > 500) {
    bossIsFacingLeft = false;
    bossIsFacingRight = true;
  }
  if (bossIsFacingRight && difference < -500) {
    bossIsFacingLeft = true;
    bossIsFacingRight = false;
  }
  if (bossDefeatedAt > 0) {
    let timePassed = new Date().getTime() - bossDefeatedAt;
    chicken_x = chicken_x + timePassed * 0.2;
    chicken_y = chicken_y - timePassed * 0.15;
    energybar_y = -100;
  }

  addBackgroundobject(currentBossImage, chicken_x, bg_ground, chicken_y, 0.25, 1);
  addBackgroundobject(currentBossEnergyImage, BOSS_POSITION - 30, bg_ground, energybar_y, 0.4, 1);
}

/**
 * This function draws the thrown bottle on the canvas.
 */
function drawThrowBottle() {
  let timePassed = new Date().getTime() - bottleThrowTime;
  let gravity = Math.pow(9.81, timePassed / 300);

  if (isThrowingRight) {
    thrownBottle_x = 225 + (timePassed * 0.7);
  } else if (isThrowingLeft) {
    thrownBottle_x = 225 - (timePassed * 0.7);
  }

  thrownBottel_y = 280 - (timePassed * 0.6 - gravity);
  let base_image = checkBackgroundImageCache(currentBottleImage);
  ctx.drawImage(base_image, thrownBottle_x, thrownBottel_y, base_image.width * 0.2, base_image.height * 0.2);
}

/**
 * This function draws information on the canvas.
 */
function drawInformation() {
  drawBottleInformation();
  drawCoinInformation();
  drawEnergyInformation();
}

/**
 * This function draws the information about the energy of the character.
 */
function drawEnergyInformation() {
  let base_image = checkBackgroundImageCache('./img/bars/live.png');
  ctx.drawImage(base_image, 0, 0, base_image.width * 0.5, base_image.height * 0.5);
  ctx.globalAlpha = 1;

  ctx.font = '30px Tahoma, Verdana, Segoe, sans-serif';
  ctx.fillText(character_energy / 10, 75, 55);

}

/**
 * This function draws the information about the collected bottles.
 */
function drawBottleInformation() {
  let base_image = checkBackgroundImageCache('./img/bottle/bottle.png');
  ctx.drawImage(base_image, 100, 5, base_image.width * 0.2, base_image.height * 0.2);
  ctx.globalAlpha = 1;

  ctx.font = '30px Tahoma, Verdana, Segoe, sans-serif';
  ctx.fillText(collectedBottles, 160, 55);
}

/**
 * This funtcion draws information about the collected coins.
 */
function drawCoinInformation() {
  let base_image = checkBackgroundImageCache('./img/coins/coin1.png');
  ctx.drawImage(base_image, 150, -30, base_image.width * 0.5, base_image.height * 0.5);
  ctx.globalAlpha = 1;

  ctx.font = '30px Tahoma, Verdana, Segoe, sans-serif';
  ctx.fillText(collectedCoins + '/20', 255, 55);
}

/**
 * This function draws the bottles on the ground.
 */
function drawBottles() {

  for (let index = 0; index < placedBottles.length; index++) {
    let bottle_x = placedBottles[index]['position_x'];
    let image = placedBottles[index]['image'];
    addBackgroundobject(image, bottle_x, bg_ground, 318, 0.2, 1);
  }
}

/**
 * This function draws the coins
 */
function drawCoins() {

  for (let index = 0; index < placedCoins.length; index++) {
    let coin_x = placedCoins[index]['position_x'];
    let coin_y = placedCoins[index]['position_y'];
    addBackgroundobject(currentCoinImage, coin_x, bg_ground, coin_y, 0.5, 1);
  }
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
 * This function generates the position of a coin.
 * 
 * 
 * @param {integer} coin_x - Position on the x-axis. 
 * @param {integer} coin_y - Positioin on the y-axis.
 */
function placedCoin(coin_x, coin_y) {
  return {
    'position_x': coin_x,
    'position_y': coin_y,
  }
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
 * This function generates the position and image of a bottle on the ground.
 * 
 * 
 * @param {integer} bottle_x - Position on the x-axis.
 * @param {integer} type - Number of type image.
 */
function placedBottle(bottle_x, type) {
  return {
    'position_x': bottle_x,
    'image': './img/bottle/bottle' + type + '.png'
  }
}

/**
 * This function draws the chicken on the canvas.
 */
function drawChicken() {
  for (let i = 0; i < chickens.length; i++) {
    let chicken = chickens[i];
    let image = currentChickenImage;

    if (chicken.dead) {
      image = 'img/chicken/chicken_dead.png';
    }
    addBackgroundobject(image, chicken.position_x, bg_ground, chicken.position_y, chicken.scale, 1);
  }
}

/**
 * This function draws the hens.
 */
function drawHen() {
  for (let i = 0; i < hens.length; i++) {
    let hen = hens[i];
    let image = currentHenImage;

    if (hen.dead) {
      image = 'img/chicken/hen_dead.png';
    }

    addBackgroundobject(image, hen.position_x, bg_ground, hen.position_y, hen.scale, 1);
  }
}

/**
 * This function checks for the current image of the chicken.
 */
function checkForChicken() {
  setInterval(function () {

    let index = chickenGraphicIndex % chickenGraphics.length; //Infinte loop
    currentChickenImage = chickenGraphics[index];
    chickenGraphicIndex = chickenGraphicIndex + 1;

  }, 125);
}

/**
 * This function checks for the current image of the hens.
 */
function checkForHens() {
  setInterval(function () {

    let index = hensGraphicIndex % hensGraphics.length; //Infinite loop
    currentHenImage = hensGraphics[index];
    hensGraphicIndex = hensGraphicIndex + 1;

  }, 125);
}

/**
 * This function checks for the current image of the chicken boss.
 */
function checkForBoss() {

  setInterval(function () {

    bossAlerted();
    bossWalking();
    bossAttacks();
    bossHurt();
    bossDead();

  }, 125);

}

/**
 * This function checks for the current image if the chicken boss is alerted.
 */
function bossAlerted() {
  if (bossIsAlerted) {
    let index = bossGraphicIndex % bossAlertGraphics.length; 
    currentBossImage = bossAlertGraphics[index];
    bossGraphicIndex = bossGraphicIndex + 1;

    if (bg_ground < -4300) {
      setTimeout(function () {
        bossIsWalking = true;
        bossIsAlerted = false;
        bossGraphicIndex = 0;
      }, 1000);
    }
  }
}

/**
 * This function checks for the current image if the chicken boss is walking.
 */
function bossWalking() {
  if (bossIsWalking && bossIsFacingLeft) {
    let index = bossGraphicIndex % bossWalkLeftGraphics.length; 
    currentBossImage = bossWalkLeftGraphics[index];
    bossGraphicIndex = bossGraphicIndex + 1;
  }

  if (bossIsWalking && bossIsFacingRight) {
    let index = bossGraphicIndex % bossWalkRightGraphics.length; 
    currentBossImage = bossWalkRightGraphics[index];
    bossGraphicIndex = bossGraphicIndex + 1;
  }
}

/**
 * This function checks for the current image if the chicken boss is attacking.
 */
function bossAttacks() {
  if (bossIsAttacking && bossIsFacingLeft) {
    index_attack = bossGraphicIndex % bossAttackLeftGraphics.length; 
    currentBossImage = bossAttackLeftGraphics[index_attack];
    bossGraphicIndex = bossGraphicIndex + 1

    setTimeout(function () {
      bossIsAttacking = false;
      bossIsWalking = true;
      bossGraphicIndex = 0;
      index_attack = 0;
    }, 1000);
  }

  if (bossIsAttacking && bossIsFacingRight) {
    index_attack = bossGraphicIndex % bossAttackRightGraphics.length; 
    currentBossImage = bossAttackRightGraphics[index_attack];
    bossGraphicIndex = bossGraphicIndex + 1

    setTimeout(function () {
      bossIsAttacking = false;
      bossIsWalking = true;
      bossGraphicIndex = 0;
      index_attack = 0;
    }, 1000);
  }
}

/**
 * This function checks for the current image if the chicken boss is hurt.
 */
function bossHurt() {
  if (bossIsHurt && bossIsFacingLeft) {
    bossIsAlerted = false;
    bossIsWalking = false;
    bossIsAttacking = false;

    if (index_hurt == 5) {
      bossIsAttacking = true;
      bossIsHurt = false;
      index_hurt = 0;
      bossGraphicIndex = 0;

    } else {
      index_hurt = bossGraphicIndex % bossHurtLeftGraphics.length;
      currentBossImage = bossHurtLeftGraphics[index_hurt];
      bossGraphicIndex = bossGraphicIndex + 1;
    }
  }

  if (bossIsHurt && bossIsFacingRight) {
    bossIsAlerted = false;
    bossIsWalking = false;
    bossIsAttacking = false;

    if (index_hurt == 5) {
      bossIsAttacking = true;
      bossIsHurt = false;
      index_hurt = 0;
      bossGraphicIndex = 0;

    } else {
      index_hurt = bossGraphicIndex % bossHurtRightGraphics.length;
      currentBossImage = bossHurtRightGraphics[index_hurt];
      bossGraphicIndex = bossGraphicIndex + 1;
    }
  }
}

/**
 * This function checks for the current image if the chicken boss is dead.
 */
function bossDead() {
  if (bossIsDead && bossIsFacingLeft) {
    bossIsAlerted = false;
    bossIsWalking = false;
    bossIsAttacking = false;
    bossIsHurt = false;
    let index = bossGraphicIndex % bossDeadLeftGraphics.length; 
    currentBossImage = bossDeadLeftGraphics[index];
    bossGraphicIndex = bossGraphicIndex + 1;
  }

  if (bossIsDead && bossIsFacingRight) {
    bossIsAlerted = false;
    bossIsWalking = false;
    bossIsAttacking = false;
    bossIsHurt = false;
    let index = bossGraphicIndex % bossDeadRightGraphics.length; 
    currentBossImage = bossDeadRightGraphics[index];
    bossGraphicIndex = bossGraphicIndex + 1;
  }
}

/**
 * This function generates a chicken.
 * 
 * 
 * @param {integer} position_x - Position on the x-axis.
 */
function createChicken(position_x) {
  return {
    'position_x': position_x,
    'position_y': 325,
    'scale': 0.28,
    'speed': (Math.random() * 6) + 1,
    'dead': false
  };
}

/**
 * This function  draws the character.
 */
function updateCharacter() {
  let base_image = checkBackgroundImageCache(currentCharacterImage);
  let timePassedSinceJump = new Date().getTime() - lastJumpStarted;

  if (timePassedSinceJump < JUMP_TIME) {
    character_y = character_y - 10;
  } else {

    //check falling 
    if (character_y < 150) {
      character_y = character_y + 10;
      isFallingDown = true;

      setTimeout(function () {
        isFallingDown = false;
      }, JUMP_TIME);
    }
  }
  ctx.drawImage(base_image, character_x, character_y, base_image.width * 0.2, base_image.height * 0.2);
}

/**
 * This function draws the background.
 */
function drawBackground() {

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  timePassedSinceHurt = new Date().getTime() - lastHurtStarted;
  timePassedSinceDead = new Date().getTime() - deadStarted;

  drawSky();
  drawHills();
  drawClouds();
  drawShadows();
  drawGround();
}

/**
 * This function draws the clouds.
 */
function drawClouds() {

  for (let index = -2; index < 10; index++) {
    addBackgroundobject('img/background/clouds.png', (index * 1920) - cloudOffset, bg_ground, -50, 0.5, 0.5);
  }
}

/**
 * This function draws the sky.
 */
function drawSky() {

  addBackgroundobject('./img/background/sky.png', 0, 0, -80, 0.5);

}

/**
 * This function draws the hills.
 */
function drawHills() {

  if (isMovingRight && bg_ground > -5500 && timePassedSinceHurt > HURT_TIME && timePassedSinceDead > DEAD_TIME) {
    bg_hills = bg_hills - (0.25 * GAME_SPEED);
  }
  if (isMovingLeft && bg_ground < 500 && timePassedSinceHurt > HURT_TIME && timePassedSinceDead > DEAD_TIME) {
    bg_hills = bg_hills + (0.25 * GAME_SPEED);
  }
  for (let index = -2; index < 10; index++) {
    addBackgroundobject('./img/background/ground3.png', index * 1920, bg_hills, -140, 0.5);
  }

}

/**
 * This function draws the shadows.
 */
function drawShadows() {

  if (isMovingRight && bg_ground > -5500 && timePassedSinceHurt > HURT_TIME && timePassedSinceDead > DEAD_TIME) {
    bg_shadows = bg_shadows - (0.5 * GAME_SPEED);
  }
  if (isMovingLeft && bg_ground < 500 && timePassedSinceHurt > HURT_TIME && timePassedSinceDead > DEAD_TIME) {
    bg_shadows = bg_shadows + (0.5 * GAME_SPEED);
  }
  for (let index = -2; index < 10; index++) {
    addBackgroundobject('./img/background/ground2.png', index * 1920, bg_shadows, -110, 0.5);
  }

}

/**
 * This function draws the ground.
 */
function drawGround() {

  if (isMovingRight && bg_ground > -5500 && timePassedSinceHurt > HURT_TIME && timePassedSinceDead > DEAD_TIME) {
    bg_ground = bg_ground - GAME_SPEED;
  }
  if (isMovingLeft && bg_ground < 500 && timePassedSinceHurt > HURT_TIME && timePassedSinceDead > DEAD_TIME) {
    bg_ground = bg_ground + GAME_SPEED;
  }
  for (let index = -2; index < 10; index++) {
    addBackgroundobject('./img/background/ground1.png', index * 1920, bg_ground, -90, 0.5);
  }

}

/**
 * This function add objects to the canvas.
 * 
 * 
 * @param {string} src - Image path.
 * @param {integer} offsetX - Position on x-axis.
 * @param {integer} bg_elements - Position of the ground on the x-axis.
 * @param {integer} offsetY - Position on y-axis.
 * @param {integer} scale - Scalation.
 * @param {integer} opacity - Opacity.
 */
function addBackgroundobject(src, offsetX, bg_elements, offsetY, scale, opacity) {
  if (opacity != undefined) {
    ctx.globalAlpha = opacity;
  }

  let base_image = checkBackgroundImageCache(src);
  ctx.drawImage(base_image, offsetX + bg_elements, offsetY, base_image.width * scale, base_image.height * scale);
  ctx.globalAlpha = 1;
}

/**
 * This function executes events on pressed keys.
 */
function listenForKeys() {

  document.addEventListener("keydown", e => {
    const k = e.key;

    if (k == 'ArrowRight') {
      moveright();
    }
    if (k == 'ArrowLeft') {
      moveleft();
    }
    if (k == 'd') {
      throwbottle();
    }
    if (e.code == 'Space') {
      jump();
    }
  });

  document.addEventListener("keyup", e => {
    const k = e.key;

    if (k == 'ArrowRight') {
      stopmoveright();
    }
    if (k == 'ArrowLeft') {
      stopmoveleft();
    }
    if (e.code == 'Space') {
      stopjump();
    }
    if (k == 'd') {
      stopthrowbottle();
    }
  });
}

/**
 * This function moves the character to the right.
 */
function moveright() {
  isMovingRight = true;
  lastKeyPressed = 0;
}

/**
 * This function stops the movement of the character to the right.
 */
function stopmoveright() {
  isMovingRight = false;
  lastKeyPressed = new Date().getTime();
}

/**
 * This function moves the character to the left.
 */
function moveleft() {
  isMovingLeft = true;
  lastKeyPressed = 0;
}

/**
 * This function stops the movement of the character to the left.
 */
function stopmoveleft() {
  isMovingLeft = false;
  lastKeyPressed = new Date().getTime();
}

/**
 * This function makes the character jump.
 */
function jump() {
  let timePassedSinceJump = new Date().getTime() - lastJumpStarted;
  if (timePassedSinceJump > JUMP_TIME * 2) {
    lastKeyPressed = 0;
    isJumping = true;
    AUDIO_JUMP.play();
    lastJumpStarted = new Date().getTime();
  }
}

/**
 * This function recognizes the stop of the jump of the character.
 */
function stopjump() {
  lastKeyPressed = new Date().getTime();
  if (isMovingRight || isMovingLeft) {
    lastKeyPressed = 0;
  }
}

/**
 * This function makes the character throw a bottle.
 */
function throwbottle() {
  if (collectedBottles > 0) {

    let passedTime = new Date().getTime() - bottleThrowTime;
    lastKeyPressed = 0;

    if (passedTime > 2500 && !isThrowingLeft && !isThrowingRight) {
      if (isFacingRight) {
        isThrowingRight = true;
      }
      if (isFacingLeft) {
        isThrowingLeft = true;
      }
      AUDIO_THROW.play();
      collectedBottles--;
      bottleThrowTime = new Date().getTime();

      setTimeout(function () {
        isThrowingRight = false;
        isThrowingLeft = false;
        bottleIsBroken = false;
      }, 2500);
    }
  }
}

/**
 * This function recognizes the stop of the throwing of a bottle.
 */
function stopthrowbottle() {
  lastKeyPressed = new Date().getTime();
}

/**
 * This function restarts the game.
 */
function restart() {
  location.reload();
  loadGame();
}

/**
 * This function turns off the music.
 */
function turnMusicOff() {

  document.addEventListener("keydown", e => {

    if (e.key == 'm' && musicIsOn) {
      AUDIO_BACKGROUND_MUSIC.muted = true;

      setTimeout(function () {
        musicIsOn = false;
        musicIsOff = true;
      }, 100);
    }

    if (e.key == 'm' && musicIsOff) {
      AUDIO_BACKGROUND_MUSIC.muted = false;

      setTimeout(function () {
        musicIsOn = true;
        musicIsOff = false;
      }, 100);
    }

  });
}

/**
 * This function turns off the sound.
 */
function turnSoundOff() {

  document.addEventListener("keydown", e => {

    if (e.key == 'v' && soundIsOn) {
      AUDIO_BOTTLE.muted = true;
      AUDIO_FINAL_BOSS.muted = true;
      AUDIO_FINAL_BOSS2.muted = true;
      AUDIO_GLASS.muted = true;
      AUDIO_HEN.muted = true;
      AUDIO_JUMP.muted = true;
      AUDIO_THROW.muted = true;
      AUDIO_WIN.muted = true;
      AUDIO_RUNNING.muted = true;
      AUDIO_HURT.muted = true;
      AUDIO_CRACK.muted = true;
      AUDIO_COIN.muted = true;
      AUDIO_BACKGROUND_MUSIC.muted = true;

      setTimeout(function () {
        soundIsOn = false;
        soundIsOff = true;
      }, 100);
    }

    if (e.key == 'v' && soundIsOff) {
      AUDIO_BOTTLE.muted = false;
      AUDIO_FINAL_BOSS.muted = false;
      AUDIO_FINAL_BOSS2.muted = false;
      AUDIO_GLASS.muted = false;
      AUDIO_HEN.muted = false;
      AUDIO_JUMP.muted = false;
      AUDIO_THROW.muted = false;
      AUDIO_WIN.muted = false;
      AUDIO_RUNNING.muted = false;
      AUDIO_HURT.muted = false;
      AUDIO_CRACK.muted = false;
      AUDIO_COIN.muted = false;
      AUDIO_BACKGROUND_MUSIC.muted = false;

      setTimeout(function () {
        soundIsOn = true;
        soundIsOff = false;
      }, 100);
    }

  });
}

/**
 * This function opens the fullscreen.
 */
function openFullscreen() {
  document.getElementById('fullscreen-window').classList.add('d-none');
  document.getElementById('expand-icon').classList.add('d-none');
  document.getElementById('exit-icon').classList.remove('d-none');

  if (canvasContainer.requestFullscreen) {
    canvasContainer.requestFullscreen();
  }
  else if (canvasContainer.webkitRequestFullscreen) { /* Safari */
    canvasContainer.webkitRequestFullscreen();
  } else if (canvasContainer.msRequestFullscreen) { /* IE11 */
    canvasContainer.msRequestFullscreen();
  }
}

/**
 * This function closes the fullscreen.
 */
function closeFullscreen() {
  document.getElementById('expand-icon').classList.remove('d-none');
  document.getElementById('exit-icon').classList.add('d-none');

  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}

/**
 * This function closes the "fullscreen-window".
 */
function closeFullscreenWindow() {
  document.getElementById('fullscreen-window').classList.add('d-none');
}

/**
 * This function animated the movement buttons.
 */
function transform() {
  document.getElementById('arrow-right').classList.add('arrow-move');
  setTimeout(function () {
    document.getElementById('arrow-right').classList.remove('arrow-move');
  }, 225);
}

