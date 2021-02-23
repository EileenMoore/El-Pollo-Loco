/**
 * This function is for drawing on the canvas.
 */
function draw() {

  requestAnimationFrame(draw);
  drawBackground();
  if (game_finished && level1) {
    drawFinalScreen1();
  } if (game_finished && level2) {
    drawFinalScreen2();
  } else {
    drawgame();
  }

}

/**
 * This function draws all the items needed for the game.
 */
function drawgame() {
  updateCharacter();
  drawChicken();
  drawHen();
  drawBottles();
  drawCoins();
  drawInformation();
  drawThrowBottle();
  if (level1) {
    drawFinalBoss();
  }
  if (level2) {
    drawJumpBars();
    drawAlternatingHens();
  }
}

/**
 * This draws the alternating hens on the canvas.
 */
function drawAlternatingHens() {

  for (let i = 0; i < alternatingHens.length; i++) {
    let hen = alternatingHens[i];
    let image = hen.currentAlternatingHenImage;

    if (hen.dead) {
      if (hen.henIsFacingLeft) {
        image = 'img/chicken/hen_dead.png';
      }
      if (hen.henIsFacingRight) {
        image = 'img/chicken/hen_deadR.png';
      }

    }
    addBackgroundobject(image, hen.position_x, bg_ground, hen.position_y, hen.scale, 1);
  }
}

/**
 * This draw the jump bars on the canvas.
 */
function drawJumpBars() {

  for (let index = 0; index < jumpBars.length; index++) {
    let jumpBar = jumpBars[index];

    ctx.fillStyle = "black";
    ctx.fillRect(jumpBar.position_x + bg_ground, jumpBar.position_y, jumpBar.length, 15);
  }

}

/**
* This function draws the chicken boss on the canvas.
*/
function drawFinalBoss() {
  let chicken_x = BOSS_POSITION;
  let chicken_y = 98;
  let energybar_y = 75;

  bossIsRunning();
  calculateDifference();

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
 * This function lets the chicken boss move.
 */
function bossIsRunning() {
  if (bossIsWalking && bossIsFacingLeft) {
    BOSS_POSITION = BOSS_POSITION - 5;
  }
  if (bossIsWalking && bossIsFacingRight) {
    BOSS_POSITION = BOSS_POSITION + 5;
  }
}

/**
 * This function calculates the difference between the character and the chicken boss.
 */
function calculateDifference() {
  let difference = character_x - (BOSS_POSITION + bg_ground);
  if (bossIsFacingLeft && difference > 500) {
    bossIsFacingLeft = false;
    bossIsFacingRight = true;
  }
  if (bossIsFacingRight && difference < -500) {
    bossIsFacingLeft = true;
    bossIsFacingRight = false;
  }
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
* This function draws the character.
*/
function updateCharacter() {
  let base_image = checkBackgroundImageCache(currentCharacterImage);
  let timePassedSinceJump = new Date().getTime() - lastJumpStarted;

  characterJumps(timePassedSinceJump);

  for (let index = 0; index < jumpBars.length; index++) {
    let jumpbar = jumpBars[index];
    let jumpbar_start_x = jumpbar.position_x - 50 + bg_ground;
    let jumpbar_end_x = jumpbar.position_x - 50 + jumpbar.length + bg_ground;
    let jumpbar_y = jumpbar.position_y - 200;
    characterFallsDown(jumpbar_start_x, jumpbar_end_x, jumpbar_y, index);
  }
  ctx.drawImage(base_image, character_x, character_y, base_image.width * 0.2, base_image.height * 0.2);
}

/**
 * This function lets the character fall down.
 * 
 * 
 * @param {integer} jumpbar_start_x - startpoint of the jumpbar on x-axis
 * @param {integer} jumpbar_end_x - endpoint of the jumpbar on x-axis
 * @param {integer} jumpbar_y - position of the jumpbar on the y-axis
 * @param {integer} index - number of jumpbar
 */
function characterFallsDown(jumpbar_start_x, jumpbar_end_x, jumpbar_y, index) {
  if (isFallingDown) {
    character_y = character_y + 7;
    if (characterCollidesJumpbar(jumpbar_start_x, jumpbar_end_x, jumpbar_y)) {
      characterLandsOnJumpbar(jumpbar_y, index);
    } else if (character_y > 150) {
      characterFallsOnGround();
    }
  }
}

/**
 * This function lets the character jump.
 * 
 * 
 * @param {number} timePassedSinceJump - milliseconds that passed since the start of the jump
 */
function characterJumps(timePassedSinceJump) {
  if (isJumpingUp && !isFallingDown) {
    character_y = character_y - 7;
    if (timePassedSinceJump > 350) {
      isJumpingUp = false;
      isFallingDown = true;
    }
  }
}

/**
 * This function lets the character fall down after the jump.
 */
function characterFallsOnGround() {
  character_y = 150;
  currentJumpbar = 0;
  isFallingDown = false;
}

/**
 * This function lets the character land on a jumpbar.
 * 
 * 
 * @param {integer} jumpbar_y - position of the jumpbar on the y-axis
 * @param {integer} index - number of the jumpbar
 */
function characterLandsOnJumpbar(jumpbar_y, index) {
  character_y = jumpbar_y - 28;
  isUp = true;
  isFallingDown = false;
  currentJumpbar = index + 1;
}

/**
 * This function examines if the character collides with a jumpbar.
 * 
 * 
 * @param {*} jumpbar_start_x - startpoint of the jumpbar on x-axis
 * @param {*} jumpbar_end_x - endpoint of the jumpbar on x-axis
 * @param {*} jumpbar_y - position of the jumpbar on the y-axis
 */
function characterCollidesJumpbar(jumpbar_start_x, jumpbar_end_x, jumpbar_y) {
  return character_x > jumpbar_start_x - 10 && character_x < jumpbar_end_x - 10 && character_y < jumpbar_y
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
