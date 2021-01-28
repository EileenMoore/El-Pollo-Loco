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
let characterGraphicsJumpRight = ['./img/pepe/J-31.png', './img/pepe/J-32.png', './img/pepe/J-33.png', './img/pepe/J-34.png', './img/pepe/J-35.png', './img/pepe/J-36.png', './img/pepe/J-37.png', './img/pepe/J-38.png', './img/pepe/J-38.png'];
let characterGraphicsJumpLeft = ['./img/pepe/JL-31.png', './img/pepe/JL-32.png', './img/pepe/JL-33.png', './img/pepe/JL-34.png', './img/pepe/JL-35.png', './img/pepe/JL-36.png', './img/pepe/JL-37.png', './img/pepe/JL-38.png', './img/pepe/JL-39.png'];
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
let lastBossHurt = 0;
let bossEnergyGraphics = ['./img/bars/bossenergy1.png', './img/bars/bossenergy2.png', './img/bars/bossenergy3.png', './img/bars/bossenergy4.png', './img/bars/bossenergy5.png', './img/bars/bossenergy6.png'];
let currentBossEnergyImage = './img/bars/bossenergy1.png';
let bottleGraphics = ['./img/bottle/bottle.png', './img/bottle/bottle3.png', './img/bottle/bottle4.png', './img/bottle/bottle5.png'];
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
let BOSS_HURT_TIME = 2000;
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

function init() {
  preloadImages();
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext("2d");
  draw();
}

function showDescription() {
  document.getElementById('start-button').classList.add('d-none');
  document.getElementById('level-description').classList.remove('d-none');
}

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
  checkForCollision();
  calculateCloudOffset();
  listenForKeys();
  calculateChickenPosition();
  calculateHenPosition();
  checkForCollision();
  lastKeyPressed = new Date().getTime();
  checkIfGameIsFinished();
}

function checkForCollision() {

  setInterval(function () {

    //Check hen collision
    for (let index = 0; index < hens.length; index++) {
      let hen = hens[index];
      let hen_x = hen.position_x + bg_ground;

      if ((hen_x - 40) < character_x && (hen_x + 40) > character_x && !hen.dead) {

        if (character_y < 130 && character_y > 110 && isFallingDown) {
          AUDIO_CRACK.play();
          hen.dead = true;
        }
      }
      if ((hen_x - 50) < character_x && (hen_x + 50) > character_x && !hen.dead) {
        if (character_y > 130) {
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

      if ((hen_x - 200) < character_x && (hen_x + 200) > character_x && !hen.dead) {
        AUDIO_HEN.play();

      }
    }

    //Check chicken collision
    for (let index = 0; index < chickens.length; index++) {
      let chicken = chickens[index];
      let chicken_x = chicken.position_x + bg_ground;

      if ((chicken_x - 40) < character_x && (chicken_x + 40) > character_x && !chicken.dead) {

        if (character_y < 130 && character_y > 110 && isFallingDown) {
          AUDIO_CRACK.play();
          chicken.dead = true;
        }
      }
      if ((chicken_x - 50) < character_x && (chicken_x + 50) > character_x && !chicken.dead) {
        if (character_y > 110) {
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

    //Check bottle collect
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

    //Check coin collect
    for (let index = 0; index < placedCoins.length; index++) {
      let coin_x = placedCoins[index]['position_x'] + bg_ground;
      let coin_y = placedCoins[index]['position_y'];

      if ((coin_x - 50) < character_x && (coin_x + 50) > character_x) {
        if ((character_y + 50) > (coin_y - 20) && (character_y - 50) < (coin_y - 20)) {
          placedCoins.splice(index, 1);
          AUDIO_COIN.play();
          collectedCoins++;
        }
      }
    }

    //Check final boss collision
    let boss_x = BOSS_POSITION + bg_ground;

    if ((boss_x - 80) < character_x && (boss_x + 80) > character_x) {
      if (character_y > 10) {
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
  }, 100);
}


function checkBossEnergy() {
  let index = 0;

  setInterval(function () {

    //Check final boss energy
    let timePassed = new Date().getTime() - lastBossHurt;

    if (thrownBottle_x > BOSS_POSITION + bg_ground - 100 && thrownBottle_x < BOSS_POSITION + bg_ground + 100 && timePassed > BOSS_HURT_TIME) {
      if (final_boss_energy > 0) {
        lastBossHurt = new Date().getTime();
        final_boss_energy = final_boss_energy - 20;
        AUDIO_GLASS.play();
        bossIsHurt = true;
        index++;
        currentBossEnergyImage = bossEnergyGraphics[index];

        setTimeout(function () {
          AUDIO_FINAL_BOSS2.play();
        }, 500);

      } else if (bossDefeatedAt == 0) {
        bossDefeatedAt = new Date().getTime();
        bossIsDead = true;
        AUDIO_FINAL_BOSS2.pause();
        AUDIO_FINAL_BOSS.play();
      }
    }
  }, 200);
}


function checkIfGameIsFinished() {

  setInterval(function () {
    let timePassed = new Date().getTime() - bossDefeatedAt;

    if (timePassed > 2000 && collectedCoins == 20 && bossIsDead) {
      AUDIO_WIN.play();
      game_finished = true;
    }
  }, 100);

}

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

function createHenList() {
  hens = [
    createChicken(1400),
    createChicken(2500),
    createChicken(4200),
  ];
}

function calculateCloudOffset() {
  setInterval(function () {
    cloudOffset = cloudOffset + 0.25;
  }, 50);
}

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

function checkForRunning() {
  setInterval(function () {

    if (isMovingRight) {
      isFacingRight = true;
      isFacingLeft = false;
      isSleeping = false;
      AUDIO_RUNNING.play();
      let index = characterGraphicIndex % characterGraphicsWalkRight.length; //Schleife, die sich undendlich wiederholt
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

function checkForJump() {

  let index;

  setInterval(function () {

    //Jump right

    if (isJumping && isFacingRight) {
      // if (index == 8) {
      //   isJumping = false;
      //   index = 0;
      //   characterGraphicIndex = 0;
      //   currentCharacterImage = './img/pepe/I-1.png';
      // }

      setTimeout(function () {
        isJumping = false;
        index = 0;
        characterGraphicIndex = 0;
        currentCharacterImage = './img/pepe/I-1.png';
      }, 2 * JUMP_TIME);

      index = characterGraphicIndex % characterGraphicsJumpRight.length;
      currentCharacterImage = characterGraphicsJumpRight[index];
      characterGraphicIndex = characterGraphicIndex + 1;
    }

    //Jump left 

    if (isJumping && isFacingLeft) {
      // if (index == 8) {
      //   isJumping = false;
      //   index = 0;
      //   characterGraphicIndex = 0;
      //   currentCharacterImage = './img/pepe/I-1.png';
      // }

      setTimeout(function () {
        isJumping = false;
        index = 0;
        characterGraphicIndex = 0;
        currentCharacterImage = './img/pepe/IL-1.png';
      }, 2 * JUMP_TIME);

      index = characterGraphicIndex % characterGraphicsJumpLeft.length;
      currentCharacterImage = characterGraphicsJumpLeft[index];
      characterGraphicIndex = characterGraphicIndex + 1;
    }

  }, 125);
}

function checkIfHurt() {

  let index;

  setInterval(function () {
    if (isHurt && isFacingRight) {

      if (index == 5) {
        currentCharacterImage = './img/pepe/I-1.png';
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
        currentCharacterImage = './img/pepe/IL-1.png';
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


function checkForBottle() {

  setInterval(function () {

    let index = bottleGraphicIndex % bottleGraphics.length;
    currentBottleImage = bottleGraphics[index];
    bottleGraphicIndex = bottleGraphicIndex + 1;

  }, 125);
}

function checkForCoin() {
  setInterval(function () {

    let index = coinGraphicIndex % coinGraphics.length;
    currentCoinImage = coinGraphics[index];
    coinGraphicIndex = coinGraphicIndex + 1;

  }, 250);
}

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

function drawFinalBoss() {
  let chicken_x = BOSS_POSITION;
  let chicken_y = 98;


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

  addBackgroundobject(currentBossImage, chicken_x, bg_ground, chicken_y, 0.25, 1);

  addBackgroundobject(currentBossEnergyImage, BOSS_POSITION - 30, bg_ground, 75, 0.4, 1);

}

function drawThrowBottle() {

  let timePassed = new Date().getTime() - bottleThrowTime;
  let gravity = Math.pow(9.81, timePassed / 300);

  if (isFacingRight) {
    thrownBottle_x = 225 + (timePassed * 0.7);
  } else if (isFacingLeft) {
    thrownBottle_x = 225 - (timePassed * 0.7);
  }
  thrownBottel_y = 280 - (timePassed * 0.6 - gravity);

  let base_image = checkBackgroundImageCache(currentBottleImage);
  ctx.drawImage(base_image, thrownBottle_x, thrownBottel_y, base_image.width * 0.2, base_image.height * 0.2);

}

function drawInformation() {
  drawBottleInformation();
  drawCoinInformation();
  drawEnergyInformation();
}


function drawEnergyInformation() {

  let base_image = checkBackgroundImageCache('./img/bars/live.png');
  ctx.drawImage(base_image, 0, 0, base_image.width * 0.5, base_image.height * 0.5);
  ctx.globalAlpha = 1;

  ctx.font = '30px Tahoma, Verdana, Segoe, sans-serif';
  ctx.fillText(character_energy / 10, 75, 55);

}


function drawBottleInformation() {

  let base_image = checkBackgroundImageCache('./img/bottle/bottle.png');
  ctx.drawImage(base_image, 100, 5, base_image.width * 0.2, base_image.height * 0.2);
  ctx.globalAlpha = 1;

  ctx.font = '30px Tahoma, Verdana, Segoe, sans-serif';
  ctx.fillText(collectedBottles, 160, 55);
}

function drawCoinInformation() {

  let base_image = checkBackgroundImageCache('./img/coins/coin1.png');
  ctx.drawImage(base_image, 150, -30, base_image.width * 0.5, base_image.height * 0.5);
  ctx.globalAlpha = 1;

  ctx.font = '30px Tahoma, Verdana, Segoe, sans-serif';
  ctx.fillText(collectedCoins + '/20', 255, 55);
}

function drawBottles() {

  for (let index = 0; index < placedBottles.length; index++) {
    let bottle_x = placedBottles[index]['position_x'];
    let image = placedBottles[index]['image'];
    addBackgroundobject(image, bottle_x, bg_ground, 318, 0.2, 1);
  }
}

function drawCoins() {

  for (let index = 0; index < placedCoins.length; index++) {
    let coin_x = placedCoins[index]['position_x'];
    let coin_y = placedCoins[index]['position_y'];
    addBackgroundobject(currentCoinImage, coin_x, bg_ground, coin_y, 0.5, 1);
  }
}

function createCoinList() {
  placedCoins = [
    placedCoin(600, 200),
    placedCoin(700, 150),
    placedCoin(800, 100),
    placedCoin(900, 150),
    placedCoin(1000, 200),
    placedCoin(2600, 200),
    placedCoin(2700, 150),
    placedCoin(2800, 100),
    placedCoin(2900, 150),
    placedCoin(3000, 200),
    placedCoin(3600, 200),
    placedCoin(3700, 150),
    placedCoin(3800, 100),
    placedCoin(3900, 150),
    placedCoin(4000, 200),
    placedCoin(3600, 200),
    placedCoin(3700, 150),
    placedCoin(3800, 100),
    placedCoin(3900, 150),
    placedCoin(4000, 200),
  ];
}

function placedCoin(coin_x, coin_y) {
  return {
    'position_x': coin_x,
    'position_y': coin_y,
  }
}

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

function placedBottle(bottle_x, type) {
  return {
    'position_x': bottle_x,
    'image': './img/bottle/bottle' + type + '.png'
  }
}

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

function checkForChicken() {
  setInterval(function () {

    let index = chickenGraphicIndex % chickenGraphics.length; //Schleife, die sich undendlich wiederholt
    currentChickenImage = chickenGraphics[index];
    chickenGraphicIndex = chickenGraphicIndex + 1;

  }, 125);
}

function checkForHens() {
  setInterval(function () {

    let index = hensGraphicIndex % hensGraphics.length; //Schleife, die sich undendlich wiederholt
    currentHenImage = hensGraphics[index];
    hensGraphicIndex = hensGraphicIndex + 1;

  }, 125);
}

function checkForBoss() {

  let index_hurt;
  let index_attack;

  setInterval(function () {

    //Boss is alerted
    if (bossIsAlerted) {
      let index = bossGraphicIndex % bossAlertGraphics.length; //Schleife, die sich undendlich wiederholt
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

    //Boss walks
    if (bossIsWalking && bossIsFacingLeft) {
      let index = bossGraphicIndex % bossWalkLeftGraphics.length; //Schleife, die sich undendlich wiederholt
      currentBossImage = bossWalkLeftGraphics[index];
      bossGraphicIndex = bossGraphicIndex + 1;
    }

    if (bossIsWalking && bossIsFacingRight) {
      let index = bossGraphicIndex % bossWalkRightGraphics.length; //Schleife, die sich undendlich wiederholt
      currentBossImage = bossWalkRightGraphics[index];
      bossGraphicIndex = bossGraphicIndex + 1;
    }

    //Boss attacks
    if (bossIsAttacking && bossIsFacingLeft) {
      index_attack = bossGraphicIndex % bossAttackLeftGraphics.length; //Schleife, die sich undendlich wiederholt
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
      index_attack = bossGraphicIndex % bossAttackRightGraphics.length; //Schleife, die sich undendlich wiederholt
      currentBossImage = bossAttackRightGraphics[index_attack];
      bossGraphicIndex = bossGraphicIndex + 1

      setTimeout(function () {
        bossIsAttacking = false;
        bossIsWalking = true;
        bossGraphicIndex = 0;
        index_attack = 0;
      }, 1000);
    }

    //Boss is hurt
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

    //Boss is dead
    if (bossIsDead && bossIsFacingLeft) {
      bossIsAlerted = false;
      bossIsWalking = false;
      bossIsAttacking = false;
      bossIsHurt = false;
      let index = bossGraphicIndex % bossDeadLeftGraphics.length; //Schleife, die sich undendlich wiederholt
      currentBossImage = bossDeadLeftGraphics[index];
      bossGraphicIndex = bossGraphicIndex + 1;
    }

    //Boss is dead
    if (bossIsDead && bossIsFacingRight) {
      bossIsAlerted = false;
      bossIsWalking = false;
      bossIsAttacking = false;
      bossIsHurt = false;
      let index = bossGraphicIndex % bossDeadRightGraphics.length; //Schleife, die sich undendlich wiederholt
      currentBossImage = bossDeadRightGraphics[index];
      bossGraphicIndex = bossGraphicIndex + 1;
    }
  }, 125);

}

function createChicken(position_x) {
  return {
    'position_x': position_x,
    'position_y': 325,
    'scale': 0.28,
    'speed': (Math.random() * 6) + 1,
    'dead': false
  };
}

function updateCharacter() {

  let base_image = checkBackgroundImageCache(currentCharacterImage);

  let timePassedSinceJump = new Date().getTime() - lastJumpStarted;
  if (timePassedSinceJump < JUMP_TIME) {
    character_y = character_y - 7;
  } else {

    //check falling 

    if (character_y < 150) {
      character_y = character_y + 7;
      isFallingDown = true;

      setTimeout(function () {
        isFallingDown = false;
      }, JUMP_TIME);
    }
  }

  ctx.drawImage(base_image, character_x, character_y, base_image.width * 0.2, base_image.height * 0.2);
}

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

function drawClouds() {

  for (let index = -2; index < 10; index++) {
    addBackgroundobject('img/background/clouds.png', (index * 1920) - cloudOffset, bg_ground, -50, 0.5, 0.5);
  }
}


function drawSky() {

  addBackgroundobject('./img/background/sky.png', 0, 0, -80, 0.5);

}

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

function drawGround() {

  if (isMovingRight && bg_ground > -5500 && timePassedSinceHurt > HURT_TIME && timePassedSinceDead > DEAD_TIME) {
    bg_ground = bg_ground - GAME_SPEED;
  }

  if (isMovingLeft && bg_ground < 500 && timePassedSinceHurt > HURT_TIME && timePassedSinceDead > DEAD_TIME) {
    bg_ground = bg_ground + GAME_SPEED;
  }

  // Draw ground
  for (let index = -2; index < 10; index++) {
    addBackgroundobject('./img/background/ground1.png', index * 1920, bg_ground, -90, 0.5);
  }

}

function addBackgroundobject(src, offsetX, bg_elements, offsetY, scale, opacity) {
  if (opacity != undefined) {
    ctx.globalAlpha = opacity;
  }

  let base_image = checkBackgroundImageCache(src);
  ctx.drawImage(base_image, offsetX + bg_elements, offsetY, base_image.width * scale, base_image.height * scale);
  ctx.globalAlpha = 1;
}

function listenForKeys() {

  document.addEventListener("keydown", e => {

    const k = e.key;

    if (k == 'ArrowRight') {
      isMovingRight = true;
      lastKeyPressed = 0;
    }

    if (k == 'ArrowLeft') {
      isMovingLeft = true;
      lastKeyPressed = 0;
    }

    if (k == 'd' && collectedBottles > 0) {

      let passedTime = new Date().getTime() - bottleThrowTime;
      lastKeyPressed = 0;

      if (passedTime > 1000) {
        AUDIO_THROW.play();
        collectedBottles--;
        bottleThrowTime = new Date().getTime();
      }
    }

    let timePassedSinceJump = new Date().getTime() - lastJumpStarted;

    if (e.code == 'Space' && timePassedSinceJump > JUMP_TIME * 2) {
      lastKeyPressed = 0;
      isJumping = true;
      AUDIO_JUMP.play();
      lastJumpStarted = new Date().getTime();
    }

  });

  document.addEventListener("keyup", e => {
    const k = e.key;

    if (k == 'ArrowRight') {
      isMovingRight = false;
      lastKeyPressed = new Date().getTime();
    }
    if (k == 'ArrowLeft') {
      isMovingLeft = false;
      lastKeyPressed = new Date().getTime();
    }
    if (e.code == 'Space') {
      lastKeyPressed = new Date().getTime();
    }
    if (k == 'd') {
      lastKeyPressed = new Date().getTime();
    }
  });
}

function restart() {
  location.reload();
  loadGame();
}

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

function openFullscreen() {
  if (canvas.requestFullscreen) {
    canvas.requestFullscreen();
  } else if (canvas.webkitRequestFullscreen) { /* Safari */
    canvas.webkitRequestFullscreen();
  } else if (canvas.msRequestFullscreen) { /* IE11 */
    canvas.msRequestFullscreen();
  }
  loadGame();
}
