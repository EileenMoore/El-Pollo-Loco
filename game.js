let canvas;
let ctx;
let character_x = 100;
let character_y = 250;
let bg_elements = 0;

let isMovingRight = false;
let isMovingLeft = false;
let lasJumpStarted = 0;
let currentCharacterImage = 'img/charakter_1.png';
let characterGraphicsRight = ['img/charakter_1.png', 'img/charakter_2.png', 'img/charakter_3.png', 'img/charakter_4.png'];
let characterGraphicsLeft = ['img/charakter_left_1.png', 'img/charakter_left_2.png', 'img/charakter_left_3.png', 'img/charakter_left_4.png'];
let characterGraphicIndex = 0;
let cloudOffset = 0;
let chickens = [];

// -------------------------Game config-------------------------

let JUMP_TIME = 300; // in ms
let GAME_SPEED = 7;
let AUDIO_RUNNING = new Audio('audio/running.mp3');
let AUDIO_JUMP = new Audio('audio/jump.mp3');

function init() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext("2d");
  createChickenList();
  checkForRunning();
  draw();
  calculateCloudOffset();
  listenForKeys();
  calculateChickenPosition();
}

function calculateChickenPosition() {

  setInterval( function() {
    for (let index = 0; index < chickens.length; index++) {
      let chicken = chickens[index];
      chicken.position_x = chicken.position_x - chicken.speed;
  
    } 
  } ,50);

}

function createChickenList() {
  chickens = [
    createChicken(1, 200),
    createChicken(2, 400),
    createChicken(1, 700),
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
      AUDIO_RUNNING.play();
      let index = characterGraphicIndex % characterGraphicsRight.length;
      currentCharacterImage = characterGraphicsRight[index];
      characterGraphicIndex = characterGraphicIndex + 1;
    }

    if (isMovingLeft) {
      AUDIO_RUNNING.play();
      let index = characterGraphicIndex % characterGraphicsLeft.length;
      currentCharacterImage = characterGraphicsLeft[index];
      characterGraphicIndex = characterGraphicIndex + 1;
    }

    if(!isMovingRight && !isMovingLeft)
    AUDIO_RUNNING.pause();

  }, 100);

}

function draw() {
  drawBackground();
  updateCharacter();
  drawChicken();
  requestAnimationFrame(draw);
}

function drawChicken() {

  for (let index = 0; index < chickens.length; index++) {
    let chicken = chickens[index];
    addBackgroundobject(chicken.img, chicken.position_x, chicken.position_y, chicken.scale, 1);
  }

}

function createChicken(type, position_x) {
  return {
    'img': 'img/chicken' + type + '.png',
    'position_x': position_x,
    'position_y': 325,
    'scale': 0.6,
    'speed': (Math.random() * 5)
  };
}

function updateCharacter() {
  let base_image = new Image();
  base_image.src = currentCharacterImage;

  let timePassedSinceJump = new Date().getTime() - lasJumpStarted;
  if (timePassedSinceJump < JUMP_TIME) {
    character_y = character_y - 10;
  } else {

    //check falling 

    if (character_y < 250) {
      character_y = character_y + 10;
    }
  }

  if (base_image.complete) {
    ctx.drawImage(base_image, character_x, character_y, base_image.width * 0.35, base_image.height * 0.35);
  };
}

function drawBackground() {

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawGround()

  //Draw clouds
  addBackgroundobject('img/cloud1.png', 100 - cloudOffset, 20, 0.8, 1);
  addBackgroundobject('img/cloud2.png', 500 - cloudOffset, 20, 0.6, 1);
  addBackgroundobject('img/cloud1.png', 800 - cloudOffset, 20, 1, 1);
  addBackgroundobject('img/cloud2.png', 1300 - cloudOffset, 20, 0.6, 1);
}


function drawGround() {

  if (isMovingRight) {
    bg_elements = bg_elements - GAME_SPEED;
  }

  if (isMovingLeft) {
    bg_elements = bg_elements + GAME_SPEED;
  }

  addBackgroundobject('img/bg_elem_1.png', 0, 195, 0.6, 0.4);
  addBackgroundobject('img/bg_elem_2.png', 450, 120, 0.6, 0.5);
  addBackgroundobject('img/bg_elem_1.png', 700, 255, 0.4, 0.6);
  addBackgroundobject('img/bg_elem_2.png', 1150, 260, 0.3, 0.2);

  addBackgroundobject('img/bg_elem_1.png', 1300, 195, 0.6, 0.4);
  addBackgroundobject('img/bg_elem_2.png', 1450, 120, 0.6, 0.5);
  addBackgroundobject('img/bg_elem_1.png', 1700, 255, 0.4, 0.6);
  addBackgroundobject('img/bg_elem_2.png', 2000, 260, 0.3, 0.2);

  // Draw ground
  ctx.fillStyle = "#FFE699";
  ctx.fillRect(0, 375, canvas.width, canvas.height - 375);

  for (let index = 0; index < 10; index++) {
    addBackgroundobject('img/sand.png', index * canvas.width, 375, 0.36, 0.3);
  }

}

function addBackgroundobject(src, offsetX, offsetY, scale, opacity) {
  if (opacity != undefined) {
    ctx.globalAlpha = opacity;
  }
  let base_image = new Image();
  base_image.src = src;
  if (base_image.complete) {
    ctx.drawImage(base_image, offsetX + bg_elements, offsetY, base_image.width * scale, base_image.height * scale);
  }
  ctx.globalAlpha = 1;
}

function listenForKeys() {

  document.addEventListener("keydown", e => {
    const k = e.key;
    console.log(e.key);

    if (k == 'ArrowRight') {
      // character_x = character_x + 5;
      isMovingRight = true;
    }

    if (k == 'ArrowLeft') {
      // character_x = character_x - 5;
      isMovingLeft = true;
    }

    let timePassedSinceJump = new Date().getTime() - lasJumpStarted;

    if (e.code == 'Space' && timePassedSinceJump > JUMP_TIME * 2) {
      AUDIO_JUMP.play();
      lasJumpStarted = new Date().getTime();
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

