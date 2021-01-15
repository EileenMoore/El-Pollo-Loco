let canvas;
let ctx;
let character_x = 100;
let character_y = 250;
let bg_elements = 0;

let isMovingRight = false;
let isMovingLeft = false;
let lasJumpStarted = 0;

// -------------------------Game config-------------------------

let JUMP_TIME = 300; // in ms
let GAME_SPEED = 7;

function init() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext("2d");

  draw();

  listenForKeys();

}

function draw() {
  drawBackground();
  updateCharacter();
  requestAnimationFrame(draw);
}

function updateCharacter() {
  let base_image = new Image();
  base_image.src = 'img/charakter_1.png';

  let timePassedSinceJump = new Date().getTime() - lasJumpStarted;
  if (timePassedSinceJump < JUMP_TIME) {
    // character_y = character_y - 10;
  } else {

    //check falling 

    if (character_y < 250) {
      // character_y = character_y + 10;
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

