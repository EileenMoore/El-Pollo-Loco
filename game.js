let canvas;
let ctx;
let character_x = 100;
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
let lasJumpStarted = 0;
let isFacingRight = true;
let isFacingLeft = false;
let currentCharacterImage = './img/pepe/I-1.png';
let characterGraphicsRight = ['./img/pepe/W-21.png', './img/pepe/W-22.png', './img/pepe/W-23.png', './img/pepe/W-24.png', './img/pepe/W-25.png', './img/pepe/W-26.png'];
let characterGraphicsLeft = ['./img/pepe/WL-21.png', './img/pepe/WL-22.png', './img/pepe/WL-23.png', './img/pepe/WL-24.png', './img/pepe/WL-25.png', './img/pepe/WL-26.png'];
let characterGraphicsJumpRight = ['./img/pepe/J-32.png', './img/pepe/J-33.png', './img/pepe/J-34.png', './img/pepe/J-35.png', './img/pepe/J-36.png', './img/pepe/J-37.png', './img/pepe/J-38.png'];
let characterGraphicsJumpLeft = ['./img/pepe/JL-32.png', './img/pepe/JL-33.png', './img/pepe/JL-34.png', './img/pepe/JL-35.png', './img/pepe/JL-36.png', './img/pepe/JL-37.png', './img/pepe/JL-38.png'];
let characterGraphicIndex = 0;
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
let bossHurtGraphics = ['./img/boss/G21.png', './img/boss/G22.png', './img/boss/G23.png', './img/boss/G21.png', './img/boss/G22.png', './img/boss/G23.png'];
let bossDeadGraphics = ['./img/boss/G24.png', './img/boss/G25.png', './img/boss/G26.png'];
let bossGraphicIndex = 0;
let bossIsAlerted = true;
let bossIsHurt = false;
let bossIsDead = false;
let placedBottles = [500, 1000, 1700, 2500, 2800, 3300];
let collectedBottles = 0;
let bottleThrowTime = 0;
let thrownBottle_x = 0;
let thrownBottel_y = 0;
let bossDefeatedAt = 0;
let game_finished = false;
let character_lost_at = 0;

// -------------------------Game config-------------------------

let JUMP_TIME = 300; // in ms
let GAME_SPEED = 7;
let BOSS_POSITION = 5000;
let AUDIO_RUNNING = new Audio('audio/running.mp3');
let AUDIO_JUMP = new Audio('audio/jump.mp3');
let AUDIO_BOTTLE = new Audio('audio/bottle.mp3');
let AUDIO_THROW = new Audio('audio/throw.mp3');
let AUDIO_GLASS = new Audio('audio/glass.mp3');
let AUDIO_HEN = new Audio('audio/hen.mp3');
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

function loadGame() {
  document.getElementById('start-button').classList.add('d-none');
  AUDIO_BACKGROUND_MUSIC.play();
  createChickenList();
  createHenList();
  checkForRunning();
  checkForJump();
  checkForChicken();
  checkForHens();
  checkForBoss();
  calculateCloudOffset();
  listenForKeys();
  calculateChickenPosition();
  calculateHenPosition();
  checkForCollision();
}

function checkForCollision() {
  setInterval(function () {

    //Check hen 
    for (let index = 0; index < hens.length; index++) {
      let hen = hens[index];
      let hen_x = hen.position_x + bg_ground;

      if ((hen_x - 40) < character_x && (hen_x + 40) > character_x) {
        if (character_y > 110) {
          if (character_energy > 0) {
            character_energy -= 10;
          } else {
            character_lost_at = new Date().getTime();
            game_finished = true;
          }
        }
      }

      if ((hen_x - 400) < character_x && (hen_x + 400) > character_x) {
        // AUDIO_HEN.play();
      }
    }

    //Check chicken
    for (let index = 0; index < chickens.length; index++) {
      let chicken = chickens[index];
      let chicken_x = chicken.position_x + bg_ground;

      if ((chicken_x - 40) < character_x && (chicken_x + 40) > character_x) {
        if (character_y > 110) {
          if (character_energy > 0) {
            character_energy -= 10;
          } else {
            character_lost_at = new Date().getTime();
            game_finished = true;
          }
        }
      }
    }

    //Check bottle
    for (let index = 0; index < placedBottles.length; index++) {
      let bottle_x = placedBottles[index] + bg_ground;

      if ((bottle_x - 40) < character_x && (bottle_x + 40) > character_x) {
        if (character_y > 110) {
          placedBottles.splice(index, 1);
          // AUDIO_BOTTLE.play();
          collectedBottles++;
        }
      }
    }

    //Check final boss 
    if (thrownBottle_x > BOSS_POSITION + bg_ground - 100 && thrownBottle_x < BOSS_POSITION + bg_ground + 100) {

      if (final_boss_energy > 0) {
        final_boss_energy = final_boss_energy - 10;
        AUDIO_GLASS.play();
        bossIsAlerted = false;
        bossIsHurt = true; 

        setTimeout(function () {
        AUDIO_FINAL_BOSS2.play();
      }, 500);


      } else if (bossDefeatedAt == 0) {
        bossDefeatedAt = new Date().getTime();
        bossIsDead = true;

        setTimeout(function () {
          finishLevel();
        }, 1500);

      }
    }
  }, 100);
}

function finishLevel() {

  // AUDIO_WIN.play();
  game_finished = true;

}

function calculateChickenPosition() {

  setInterval(function () {
    for (let index = 0; index < chickens.length; index++) {
      let chicken = chickens[index];
      chicken.position_x = chicken.position_x - chicken.speed;

    }
  }, 50);

}

function calculateHenPosition() {

  setInterval(function () {
    for (let index = 0; index < hens.length; index++) {
      let hen = hens[index];
      hen.position_x = hen.position_x - hen.speed;

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

function checkForRunning() {
  setInterval(function () {

    if (isMovingRight) {
      isFacingRight = true;
      isFacingLeft = false;
      // AUDIO_RUNNING.play();
      let index = characterGraphicIndex % characterGraphicsRight.length; //Schleife, die sich undendlich wiederholt
      currentCharacterImage = characterGraphicsRight[index];
      characterGraphicIndex = characterGraphicIndex + 1;
    }

    if (isMovingLeft) {
      isFacingRight = false;
      isFacingLeft = true;
      // AUDIO_RUNNING.play();
      let index = characterGraphicIndex % characterGraphicsLeft.length;
      currentCharacterImage = characterGraphicsLeft[index];
      characterGraphicIndex = characterGraphicIndex + 1;
    }

    if (!isMovingRight && !isMovingLeft) {
      AUDIO_RUNNING.pause();
    }

  }, 100);
}

function checkForJump() {

  setInterval(function () {

    let index;
    let timePassedSinceJump = new Date().getTime() - lasJumpStarted;

    //Jump right

    if (isJumping && isFacingRight) {
      if (timePassedSinceJump < 2 * JUMP_TIME) {
        index = characterGraphicIndex % characterGraphicsJumpRight.length;
      } else {
        index = 0;
        characterGraphicIndex = 0;
      }
      currentCharacterImage = characterGraphicsJumpRight[index];
      characterGraphicIndex = characterGraphicIndex + 1;
    }

    //Jump left 

    if (isJumping && isFacingLeft) {
      if (timePassedSinceJump < 2 * JUMP_TIME) {
        index = characterGraphicIndex % characterGraphicsJumpLeft.length;
      } else {
        index = 0;
        characterGraphicIndex = 0;
      }
      currentCharacterImage = characterGraphicsJumpLeft[index];
      characterGraphicIndex = characterGraphicIndex + 1;
    }


  }, 100);
}


function draw() {
  drawBackground();
  if (game_finished) {
    drawFinalScreen();
    //Draw success screen
  } else {
    updateCharacter();
    drawChicken();
    drawHen();
    drawBottles();
    requestAnimationFrame(draw);
    drawEnergyBar();
    drawInformation();
    drawThrowBottle();
  }
  drawFinalBoss();
}

function drawFinalScreen() {
  ctx.font = '80px Bradley Hand ITC';
  let msg = 'YOU WON!';

  if (character_lost_at > 0) {
    msg = 'YOU LOST!';
  }
  ctx.fillText(msg, 150, 200);
}

function drawFinalBoss() {
  let chicken_x = BOSS_POSITION;
  let chicken_y = 98;

  // if (bossDefeatedAt > 0) {
  //   let timePassed = new Date().getTime() - bossDefeatedAt;

  //   chicken_x = chicken_x + timePassed * 0.7;
  //   chicken_y = chicken_y - timePassed * 0.3;
  // }

  addBackgroundobject(currentBossImage, chicken_x, bg_ground, chicken_y, 0.25, 1);

  ctx.globalAlpha = 0.5;
  ctx.fillStyle = "red";
  ctx.fillRect(BOSS_POSITION - 30 + bg_ground, 75, 2 * final_boss_energy, 10);
  ctx.globalAlpha = 0.2;
  ctx.fillStyle = "black";
  ctx.fillRect(BOSS_POSITION - 35 + bg_ground, 70, 210, 20);
  ctx.globalAlpha = 1;
}

function drawThrowBottle() {
  let timePassed = new Date().getTime() - bottleThrowTime;
  let gravity = Math.pow(9.81, timePassed / 300);
  thrownBottle_x = 125 + (timePassed * 0.7);
  thrownBottel_y = 300 - (timePassed * 0.6 - gravity);

  let base_image = checkBackgroundImageCache('./img/bottle/bottle1.png');
  ctx.drawImage(base_image, thrownBottle_x, thrownBottel_y, base_image.width * 0.25, base_image.height * 0.25);

}

function drawInformation() {

  let base_image = checkBackgroundImageCache('./img/bottle/bottle.png');
  ctx.drawImage(base_image, 0, 5, base_image.width * 0.2, base_image.height * 0.2);
  ctx.globalAlpha = 1;

  ctx.font = '30px Bradley Hand ITC';
  ctx.fillText('x' + collectedBottles, 40, 35);
}

function drawBottles() {
  for (let index = 0; index < placedBottles.length; index++) {
    let bottle_x = placedBottles[index];
    addBackgroundobject('./img/bottle/bottle1.png', bottle_x, bg_ground, 318, 0.2, 1);
  }
}

function drawEnergyBar() {
  ctx.globalAlpha = 0.5;
  ctx.fillStyle = "blue";
  ctx.fillRect(500, 15, 2 * character_energy, 30);
  ctx.globalAlpha = 0.2;
  ctx.fillStyle = "black";
  ctx.fillRect(495, 10, 210, 40);
  ctx.globalAlpha = 1;
}


function drawChicken() {

  for (let i = 0; i < chickens.length; i++) {
    let chicken = chickens[i];
    addBackgroundobject(currentChickenImage, chicken.position_x, bg_ground, chicken.position_y, chicken.scale, 1);
  }

}

function drawHen() {

  for (let i = 0; i < hens.length; i++) {
    let hen = hens[i];
    addBackgroundobject(currentHenImage, hen.position_x, bg_ground, hen.position_y, hen.scale, 1);
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

  setInterval(function () {

    console.log(bossIsHurt);
    console.log(index_hurt);

    if (bossIsAlerted) {
      //Boss alert
      let index = bossGraphicIndex % bossAlertGraphics.length; //Schleife, die sich undendlich wiederholt
      currentBossImage = bossAlertGraphics[index];
      bossGraphicIndex = bossGraphicIndex + 1;
    }

    if (bossIsHurt) {
      //Boss hurt
      if(index_hurt == 5) {

        setTimeout(function(){
          bossIsAlerted = true;
          bossIsHurt = false;
          index_hurt = 0;

        }, 250);

      } else {
        index_hurt = bossGraphicIndex % bossHurtGraphics.length; 
        currentBossImage = bossHurtGraphics[index_hurt];
        bossGraphicIndex = bossGraphicIndex + 1;
      }
    }

    if (bossIsDead) {
      //Boss dead
      bossIsAlerted = false;
      let index = bossGraphicIndex % bossDeadGraphics.length; //Schleife, die sich undendlich wiederholt
      currentBossImage = bossDeadGraphics[index];
      bossGraphicIndex = bossGraphicIndex + 1;
    }

  }, 150);
}

function createChicken(position_x) {
  return {
    'position_x': position_x,
    'position_y': 325,
    'scale': 0.28,
    'speed': (Math.random() * 6) + 1
  };
}

function updateCharacter() {

  let base_image = checkBackgroundImageCache(currentCharacterImage);

  let timePassedSinceJump = new Date().getTime() - lasJumpStarted;
  if (timePassedSinceJump < JUMP_TIME) {
    character_y = character_y - 10;
  } else {

    //check falling 

    if (character_y < 150) {
      character_y = character_y + 10;
    }
  }

  ctx.drawImage(base_image, character_x, character_y, base_image.width * 0.2, base_image.height * 0.2);

}

function drawBackground() {

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawSky();
  drawHills();
  drawShadows();
  drawGround();

  //Draw clouds

  for (let index = -2; index < 10; index++) {
    addBackgroundobject('img/background/clouds.png', (index * 1920) - cloudOffset, bg_ground, -50, 0.5, 0.5);
  }
}


function drawSky() {
  if (isMovingRight) {
    bg_sky = bg_sky - GAME_SPEED;
  }

  if (isMovingLeft && bg_ground < 500) {
    bg_ground = bg_ground + GAME_SPEED;
  }
  for (let index = -2; index < 20; index++) {
    addBackgroundobject('./img/background/sky.png', index * 955, bg_ground, -80, 0.5);
  }

}

function drawHills() {

  if (isMovingRight) {
    bg_hills = bg_hills - (0.25 * GAME_SPEED);
  }

  if (isMovingLeft && bg_ground < 500) {
    bg_hills = bg_hills + (0.25 * GAME_SPEED);
  }

  for (let index = -2; index < 10; index++) {
    addBackgroundobject('./img/background/ground3.png', index * 1920, bg_hills, -140, 0.5);
  }

}

function drawShadows() {

  if (isMovingRight) {
    bg_shadows = bg_shadows - (0.5 * GAME_SPEED);
  }

  if (isMovingLeft && bg_ground < 500) {
    bg_shadows = bg_shadows + (0.5 * GAME_SPEED);
  }

  for (let index = -2; index < 10; index++) {
    addBackgroundobject('./img/background/ground2.png', index * 1920, bg_shadows, -110, 0.5);
  }

}

function drawGround() {

  if (isMovingRight) {
    bg_ground = bg_ground - GAME_SPEED;
  }

  if (isMovingLeft && bg_ground < 500) {
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
      // character_x = character_x + 5;
      isMovingRight = true;
    }

    if (k == 'ArrowLeft') {
      // character_x = character_x - 5;
      isMovingLeft = true;
    }

    if (k == 'd' && collectedBottles > 0) {
      let passedTime = new Date().getTime() - bottleThrowTime;

      if (passedTime > 1000) {
        // AUDIO_THROW.play();
        collectedBottles--;
        bottleThrowTime = new Date().getTime();
      }
    }

    let timePassedSinceJump = new Date().getTime() - lasJumpStarted;

    if (e.code == 'Space' && timePassedSinceJump > JUMP_TIME * 2) {
      isJumping = true;
      // AUDIO_JUMP.play();
      lasJumpStarted = new Date().getTime();

      setTimeout(function () {
        isJumping = false;
      }, 700);
    }

  });

  document.addEventListener("keyup", e => {
    const k = e.key;
    if (k == 'ArrowRight') {
      // character_x = character_x + 5;
      isMovingRight = false;
    }

    if (k == 'ArrowLeft') {
      // character_x = character_x - 5;
      isMovingLeft = false;
    }
  });
}
