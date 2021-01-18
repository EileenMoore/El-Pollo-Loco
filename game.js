let canvas;
let ctx;
let character_x = 100;
let character_y = 250;
let character_energy = 100;
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
let placedBottles = [500, 1000, 1700, 2500, 2800, 3300];
let collectedBottles = 0;
let bottleThrowTime = 0;
let thrownBottle_x = 0;
let thrownBottel_y = 0;

// -------------------------Game config-------------------------

let JUMP_TIME = 300; // in ms
let GAME_SPEED = 7;
let AUDIO_RUNNING = new Audio('audio/running.mp3');
let AUDIO_JUMP = new Audio('audio/jump.mp3');
let AUDIO_BOTTLE = new Audio('audio/bottle.mp3');

function init() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext("2d");
  createChickenList();
  checkForRunning();
  draw();
  calculateCloudOffset();
  listenForKeys();
  calculateChickenPosition();
  checkForCollision();
}

function checkForCollision() {
  setInterval(function () {

    //Check chicken
    for (let index = 0; index < chickens.length; index++) {
      let chicken = chickens[index];
      let chicken_x = chicken.position_x + bg_elements;

      if ((chicken_x - 40) < character_x && (chicken_x + 40) > character_x) {
        if (character_y > 210) {
          character_energy--;
        }
      }
    }

    //Check bottle
    for (let index = 0; index < placedBottles.length; index++) {
      let bottle_x = placedBottles[index] + bg_elements;

      if ((bottle_x - 40) < character_x && (bottle_x + 40) > character_x) {
        if (character_y > 210) {
          placedBottles.splice(index, 1);
          AUDIO_BOTTLE.play();
          collectedBottles++;
        }
      }
    }

    //Check final boss 
    if (thrownBottle_x > 5000 + bg_elements - 100 && thrownBottle_x < 5000 + bg_elements + 100) {
      console.log('Treffer');
    }

  }, 100);
}

function calculateChickenPosition() {

  setInterval(function () {
    for (let index = 0; index < chickens.length; index++) {
      let chicken = chickens[index];
      chicken.position_x = chicken.position_x - chicken.speed;

    }
  }, 50);

}

function createChickenList() {
  chickens = [
    createChicken(1, 700),
    createChicken(2, 1400),
    createChicken(1, 1800),
    createChicken(2, 2500),
    createChicken(1, 3000),
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
      let index = characterGraphicIndex % characterGraphicsRight.length; //schleife, die sich undendlich wiederholt
      currentCharacterImage = characterGraphicsRight[index];
      characterGraphicIndex = characterGraphicIndex + 1;
    }

    if (isMovingLeft) {
      AUDIO_RUNNING.play();
      let index = characterGraphicIndex % characterGraphicsLeft.length;
      currentCharacterImage = characterGraphicsLeft[index];
      characterGraphicIndex = characterGraphicIndex + 1;
    }

    if (!isMovingRight && !isMovingLeft)
      AUDIO_RUNNING.pause();

  }, 100);
}

function draw() {
  drawBackground();
  updateCharacter();
  drawChicken();
  drawBottles();
  requestAnimationFrame(draw);
  drawEnergyBar();
  drawInformation();
  drawThrowBottle();
  drawFinalBoss();
}

function drawFinalBoss() {
  let chicken_x = 5000;
  addBackgroundobject('img/chicken_big.png', chicken_x, 98, 0.45, 1);
}

function drawThrowBottle() {
  let timePassed = new Date().getTime() - bottleThrowTime;
  let gravity = Math.pow(9.81, timePassed / 300);
  thrownBottle_x = 125 + (timePassed * 0.7);
  thrownBottel_y = 300 - (timePassed * 0.6 - gravity);

  let base_image = new Image();
  base_image.src = 'img/tabasco.png';
  if (base_image.complete) {
    ctx.drawImage(base_image, thrownBottle_x, thrownBottel_y, base_image.width * 0.5, base_image.height * 0.5);
  }
}


function drawInformation() {

  let base_image = new Image();
  base_image.src = 'img/tabasco.png';
  if (base_image.complete) {
    ctx.drawImage(base_image, 0, 5, base_image.width * 0.5, base_image.height * 0.5);
  }
  ctx.globalAlpha = 1;

  ctx.font = '30px Bradley Hand ITC';
  ctx.fillText('x' + collectedBottles, 40, 35);
}

function drawBottles() {
  for (let index = 0; index < placedBottles.length; index++) {
    let bottle_x = placedBottles[index];
    addBackgroundobject('img/tabasco.png', bottle_x, 318, 0.7, 1);
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
  addBackgroundobject('img/cloud1.png', 1800 - cloudOffset, 20, 1, 1);
  addBackgroundobject('img/cloud2.png', 2300 - cloudOffset, 20, 0.6, 1);
  addBackgroundobject('img/cloud1.png', 2800 - cloudOffset, 20, 1, 1);
  addBackgroundobject('img/cloud2.png', 3500 - cloudOffset, 20, 0.6, 1);

}


function drawGround() {

  if (isMovingRight) {
    bg_elements = bg_elements - GAME_SPEED;
  }

  if (isMovingLeft && bg_elements < 500) {
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

  addBackgroundobject('img/bg_elem_1.png', 2300, 195, 0.6, 0.4);
  addBackgroundobject('img/bg_elem_2.png', 2450, 120, 0.6, 0.5);
  addBackgroundobject('img/bg_elem_1.png', 2700, 255, 0.4, 0.6);
  addBackgroundobject('img/bg_elem_2.png', 3000, 260, 0.3, 0.2);

  addBackgroundobject('img/bg_elem_1.png', 3300, 195, 0.6, 0.4);
  addBackgroundobject('img/bg_elem_2.png', 3450, 120, 0.6, 0.5);
  addBackgroundobject('img/bg_elem_1.png', 3700, 255, 0.4, 0.6);
  addBackgroundobject('img/bg_elem_2.png', 4000, 260, 0.3, 0.2);

  // Draw ground
  ctx.fillStyle = "#FFE699";
  ctx.fillRect(0, 375, canvas.width, canvas.height - 375);

  for (let index = 0; index < 10; index++) {
    addBackgroundobject('img/sand.png', index * canvas.width - 600, 375, 0.36, 0.3);
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
        collectedBottles--;
        bottleThrowTime = new Date().getTime();
      }
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

