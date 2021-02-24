/**
* This function loads the game.
*/
function loadGame() {
  game_finished = false;
  AUDIO_BACKGROUND_MUSIC.play();
  lastKeyPressed = new Date().getTime();
  animateCharacter();
  animateEnemies();
  animateItems();
  calculateCloudOffset();
  moveEnemies();
  checkForCollision();
  listenForKeys();
  checkIfGameIsFinished();
}

/**
 * This function animates items.
 */
function animateItems() {
  animateBottle();
  animateCoin();
}

/**
 * This function moves the position of the enemies.
 */
function moveEnemies() {
  calculateChickenPosition();
  calculateHenPosition();
  calculateAlternatingHenPosition();
}

/**
 * This function animates the enemies of the character.
 */
function animateEnemies() {
  animateChicken();
  animateHens();
  animateAlternatingHens();
  animateBoss();
}

/**
 * This function checks if the character is falling down. 
 */
function checkIsFallingDown() {
  setInterval(function () {
    for (let index = 0; index < jumpBars.length; index++) {
      let jumpbar = jumpBars[index];
      let jumpbar_start_x = jumpbar.position_x - 50 + bg_ground;
      let jumpbar_end_x = jumpbar.position_x + jumpbar.length - 50 + bg_ground;
      let jumpbar_index = index + 1;

      if (character_y < 150) {
        if ((jumpbar_index == currentJumpbar) && (character_x < jumpbar_start_x - 10 || character_x > jumpbar_end_x - 10)) {
          isUp = false;
          isFallingDown = true;
        }
      }
    }

  }, 100);

}

/**
 * This function checks for collision in the game.
 */
function checkForCollision() {

  setInterval(function () {
    checkForHenCollision();
    checkForChickenCollission();
    checkForBossCollision();
    checkForAlternatingHenCollision();
    checkForBottleCollection();
    checkForCoinCollection();
    checkIfBottleHitBoss();
  }, 100);
}

/**
 * This function checks if alternating chicken cross the way of the character.
 */
function checkForAlternatingHenCollision() {
  for (let index = 0; index < alternatingHens.length; index++) {
    let hen = alternatingHens[index];
    let hen_x = hen.position_x + bg_ground;
    let hen_y = hen.position_y;
    let timePassedSinceJump = new Date().getTime() - lastJumpStarted;

    if (characterIsColliding(hen, hen_x, 40)) {
      if (timePassedSinceJump < 800 && character_y > hen_y - 168 - 100 && character_y < hen_y - 168) {
        henDies(hen);
      }
      if (characterIsColliding(hen, hen_x, 40) && character_y == hen_y - 168) {
        if (character_energy > 0) {
          if (timePassedSinceHurt > 2 * HURT_TIME) {
            characterGetsHurt();
          }
        } else {
          characterDies();
        }
      }
    }
  }
}

/**
 * This function lets the character die.
 */
function characterDies() {
  isDead = true;
  ishurt = false;
  deadStarted = new Date().getTime();
}

/**
 * This function lets the character die.
 */
function characterGetsHurt() {
  isHurt = true;
  AUDIO_HURT.play();
  lastHurtStarted = new Date().getTime();
  character_energy -= 10;
}

/**
 * This function lets a chicken die.
 * 
 * 
 * @param {object} hen - this is the chicken that dies.
 */
function henDies(hen) {
  AUDIO_CRACK.play();
  hen.dead = true;
}

/**
 * This function checks if the character is colliding with a chicken.
 * 
 * 
 * @param {object} hen - this is the chicken that collides with the character 
 * @param {integer} hen_x - this is the position of the chicken on the x-axis
 * @param {integer} collisionWidth - this is the width around the chicken-center
 */
function characterIsColliding(hen, hen_x, collisionWidth) {
  return (hen_x - collisionWidth) < character_x && (hen_x + collisionWidth) > character_x && !hen.dead
}


/**
 * This function checks for collision between the character and the hens.
 */
function checkForHenCollision() {
  for (let index = 0; index < hens.length; index++) {
    let hen = hens[index];
    let hen_x = hen.position_x + bg_ground;
    let timePassedSinceJump = new Date().getTime() - lastJumpStarted;

    if (characterIsColliding(hen, hen_x, 40)) {
      if (timePassedSinceJump < 800 && character_y > 100 && character_y < 150) {
        henDies(hen);
      }
      if (character_y == 150) {
        if (character_energy > 0) {
          if (timePassedSinceHurt > 2 * HURT_TIME) {
            characterGetsHurt();
          }
        } else {
          characterDies();
        }
      }
    }
    henIsClucking(hen, hen_x, 50);
  }
}

/**
 * This function lets the hen cluck when its around the character.
 */
function henIsClucking(hen, hen_x, collisionWidth) {
  if ((hen_x - collisionWidth) < character_x && (hen_x + collisionWidth) > character_x && !hen.dead) {
    AUDIO_HEN.play();
  }
}


/**
 * This function checks for collision between the character and the chickens.
 */
function checkForChickenCollission() {
  for (let index = 0; index < chickens.length; index++) {
    let chicken = chickens[index];
    let chicken_x = chicken.position_x + bg_ground;
    let timePassedSinceJump = new Date().getTime() - lastJumpStarted;

    if (characterIsColliding(chicken, chicken_x, 40)) {
      if (timePassedSinceJump < 800 && character_y > 100 && character_y < 150) {
        henDies(chicken);
      }
      if (character_y == 150) {
        if (character_energy > 0) {
          if (timePassedSinceHurt > 2 * HURT_TIME) {
            characterGetsHurt();
          }
        } else {
          characterDies();
        }
      }
    }
  }
}

/**
 * This function checks for collision between the character and the chicken boss.
 */
function checkForBossCollision() {
  let boss_x = BOSS_POSITION + bg_ground;

  if ((boss_x - 80) < character_x && (boss_x + 80) > character_x && character_y > 10) {
    if (character_energy > 0) {
      if (timePassedSinceHurt > 2 * HURT_TIME && !bossIsDead) {
        characterGetsHurt();
      }
    } else {
      characterDies();
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
 * This function checks if the chicken boss is hit by a bottle.
 */
function checkIfBottleHitBoss() {
  setInterval(function () {
    if (thrownBottle_x > BOSS_POSITION + bg_ground - 100 && thrownBottle_x < BOSS_POSITION + bg_ground + 100 && thrownBottel_y > 50) {
      if (final_boss_energy > 0 && !bossIsHurt) {
        bossIsHitByBottle();
      }
      if (final_boss_energy == 0) {
        bossDies();
      }
    }
  }, 50);
}

/**
 * This function lets the chicken boss die.
 */
function bossDies() {
  bossDefeatedAt = new Date().getTime();
  bossIsDead = true;
  AUDIO_FINAL_BOSS2.pause();
  AUDIO_FINAL_BOSS.play();
}

/**
 * This function lets the chicken boss get hurt by the bottle
 */
function bossIsHitByBottle() {
  final_boss_energy = final_boss_energy - 20;
  AUDIO_GLASS.play();
  bossIsHurt = true;
  boss_energy_index++;
  currentBossEnergyImage = bossEnergyGraphics[boss_energy_index];
  bottleIsBroken = true;

  setTimeout(function () {
    AUDIO_FINAL_BOSS2.play();
  }, 500);
}

/**
 * This function checks if the game is finished.
 */
function checkIfGameIsFinished() {
  setInterval(function () {

    if (isDead || collectedCoins == 20 && bossIsDead) {
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
 * This function calculates the position of the hens.
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
 * This function calculated the position of the alternating hens.
 */
function calculateAlternatingHenPosition() {
  setInterval(function () {
    for (let i = 0; i < alternatingHens.length; i++) {
      let hen = alternatingHens[i];

      if (!hen.dead) {
        turnAlternatingHenAround(hen);

        if (hen.henIsFacingLeft) {
          hen.position_x = hen.position_x - hen.speed;
        }
        if (hen.henIsFacingRight) {
          hen.position_x = hen.position_x + hen.speed;
        }

      }
    }
  }, 50);
}

/**
 * This function determines the direction of the alternating hen.
 * 
 * 
 * @param {object} hen - the alternating hen
 */
function turnAlternatingHenAround(hen) {
  if (hen.position_x < (hen.start_position - hen.path_length)) {
    hen.henIsFacingLeft = false;
    hen.henIsFacingRight = true;
  }
  if (hen.position_x > hen.start_position) {
    hen.henIsFacingLeft = true;
    hen.henIsFacingRight = false;
  }
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
 * This function animates the character.
 */
function animateCharacter() {
  checkForStanding();
  // moveCharacter();
  checkIsFallingDown();
  checkForSleep();
  checkForRunning();
  checkForJump();
  checkIfHurt();
  checkIfDead();
}

// function moveCharacter() {
//   setInterval(function () {
//     let timePassedSinceJump = new Date().getTime() - lastJumpStarted;

//     characterJumps(timePassedSinceJump);

//     for (let index = 0; index < jumpBars.length; index++) {
//       let jumpbar = jumpBars[index];
//       let jumpbar_start_x = jumpbar.position_x - 50 + bg_ground;
//       let jumpbar_end_x = jumpbar.position_x - 50 + jumpbar.length + bg_ground;
//       let jumpbar_y = jumpbar.position_y - 200;
//       characterFallsDown(jumpbar_start_x, jumpbar_end_x, jumpbar_y, index);
//     }
//   }, 50);
// }

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
    character_y = character_y + 10;
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
    character_y = character_y - 10;
    if (timePassedSinceJump > 400) {
    // if (character_y < start_height - 100) {
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
 * This function determines the current image if the character is standing.
 */
function checkForStanding() {
  setInterval(function () {

    if (isFacingRight && !isMovingRight && !isMovingLeft && !isHurt && !isJumping && !isSleeping) {
      characterAnimating(characterGraphicsStandRight);
    }
    if (isFacingLeft && !isMovingRight && !isMovingLeft && !isHurt && !isJumping && !isSleeping) {
      characterAnimating(characterGraphicsStandLeft);
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
        characterAnimating(characterGraphicsSleepRight);
      }
      else if (isFacingLeft) {
        characterAnimating(characterGraphicsSleepLeft);
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
      characterAnimating(characterGraphicsWalkRight);
    }
    if (isMovingLeft) {
      isFacingRight = false;
      isFacingLeft = true;
      isSleeping = false;
      AUDIO_RUNNING.play();
      characterAnimating(characterGraphicsWalkLeft);
    }
    if (!isMovingRight && !isMovingLeft) {
      AUDIO_RUNNING.pause();
    }

  }, 125);
}

function characterAnimating(graphics) {
  let index = characterGraphicIndex % graphics.length;
  currentCharacterImage = graphics[index];
  characterGraphicIndex = characterGraphicIndex + 1;
}

/**
 * This function checks for the current image if the character is jumping.
 */
function checkForJump() {
  setInterval(function () {

    characterJumping(isFacingRight, characterGraphicsJumpRight);
    characterJumping(isFacingLeft, characterGraphicsJumpLeft);

  }, 125);
}

/**
 * This function checks for the direction of thecurrent image if the character is jumping.
 */
function characterJumping(direction, graphics) {
  if (isJumping && direction) {
    let index = characterGraphicJumpIndex % graphics.length;
    currentCharacterImage = graphics[index];
    characterGraphicJumpIndex = characterGraphicJumpIndex + 1;

    if (index == characterGraphicsJumpLeft.length - 1) {
      isJumping = false;
      index = 0;
      characterGraphicJumpIndex = 0;
    }
  }
}

/**
 * This function checks for the current image if the character is hurt.
 */
function checkIfHurt() {
  setInterval(function () {

    characterHurting(isFacingRight, characterGraphicsHurtRight);
    characterHurting(isFacingLeft, characterGraphicsHurtLeft);

  }, 125);
}

/**
 * This function checks for the direction of the current image if the character is hurt.
 */
function characterHurting(direction, graphics) {
  if (isHurt && direction) {

    let index = characterHurtGraphicIndex % graphics.length;
    currentCharacterImage = graphics[index];
    characterHurtGraphicIndex = characterHurtGraphicIndex + 1;

    if (index == characterGraphicsHurtLeft.length - 1) {
      isHurt = false;
      index = 0;
      characterHurtGraphicIndex = 0;
    }
  }
}

/**
 * This function checks for the current image if the character is dead.
 */
function checkIfDead() {
  setInterval(function () {
    bossDying(isFacingRight, characterGraphicsDeadRight);
    bossDying(isFacingLeft, characterGraphicsDeadLeft);

  }, 125);
}

/**
 * This function checks for the direction of the current image if the character is dead.
 */
function bossDying(direction, graphics) {
  if (isDead && direction) {

    let index = characterGraphicIndex % graphics.length;
    currentCharacterImage = graphics[index];
    characterGraphicIndex = characterGraphicIndex + 1;
  }
}

/**
 * This function checks for the current image of the thrown bottle.
 */
function animateBottle() {
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
function animateCoin() {
  setInterval(function () {

    let index = coinGraphicIndex % coinGraphics.length;
    currentCoinImage = coinGraphics[index];
    coinGraphicIndex = coinGraphicIndex + 1;

  }, 250);
}

/**
 * This creates jump bars.
 */
function createJumpBars(x, y, length) {
  return {
    'position_x': x,
    'position_y': y,
    'length': length
  }
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
 * This function animates the current image of the chicken.
 */
function animateChicken() {
  setInterval(function () {

    let index = chickenGraphicIndex % chickenGraphics.length; //Infinte loop
    currentChickenImage = chickenGraphics[index];
    chickenGraphicIndex = chickenGraphicIndex + 1;

  }, 125);
}

/**
 * This function animates the current image of the hens.
 */
function animateHens() {
  setInterval(function () {

    let index = hensGraphicIndex % hensGraphicsLeft.length; //Infinite loop
    currentHenImage = hensGraphicsLeft[index];
    hensGraphicIndex = hensGraphicIndex + 1;

  }, 125);
}

/**
 * This function animates the current image of the alternating hens.
 */
function animateAlternatingHens() {
  let index;

  setInterval(function () {

    for (let i = 0; i < alternatingHens.length; i++) {
      let hen = alternatingHens[i];

      if (hen.henIsFacingLeft) {
        index = hensGraphicIndex % hensGraphicsLeft.length; //Infinite loop
        hen.currentAlternatingHenImage = hensGraphicsLeft[index];
        hensGraphicIndex = hensGraphicIndex + 1;
      }
      if (hen.henIsFacingRight) {
        index = hensGraphicIndex % hensGraphicsRight.length; //Infinite loop
        hen.currentAlternatingHenImage = hensGraphicsRight[index];
        hensGraphicIndex = hensGraphicIndex + 1;
      }
    }
  }, 125);
}

/**
 * This function animates the current image of the chicken boss.
 */
function animateBoss() {
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
  bossAttacking(bossIsFacingLeft, bossAttackLeftGraphics);
  bossAttacking(bossIsFacingRight, bossAttackRightGraphics);
}

/**
 * This function checks for the direction of the current image if the chicken boss is attacking.
 */
function bossAttacking(direction, graphics) {
  if (bossIsAttacking && direction) {
    index_attack = bossGraphicIndex % graphics.length;
    currentBossImage = graphics[index_attack];
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
  bossHurting(bossIsFacingLeft, bossHurtLeftGraphics);
  bossHurting(bossIsFacingRight, bossHurtRightGraphics);
}

/**
 * This function checks for the direction of the current image if the chicken boss is hurt.
 */
function bossHurting(direction, graphics) {
  if (bossIsHurt && direction) {
    bossIsAlerted = false;
    bossIsWalking = false;
    bossIsAttacking = false;

    if (index_hurt == 5) {
      stopBossHurting();
    } else {
      index_hurt = bossGraphicIndex % graphics.length;
      currentBossImage = graphics[index_hurt];
      bossGraphicIndex = bossGraphicIndex + 1;
    }
  }
}

/**
 * Thus function stopr the boss hurt.
 */
function stopBossHurting() {
  bossIsAttacking = true;
  bossIsHurt = false;
  index_hurt = 0;
  bossGraphicIndex = 0;
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
 * This function executes events on pressed keys.
 */
function listenForKeys() {
  keyIsDown();
  keyIsUp();
}

/**
 * This function checks is a key is released.
 */
function keyIsUp() {
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
 * This function checks is a key is pressed down.
 */
function keyIsDown() {
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
}

/**
 * This function moves the character to the right.
 */
function moveright() {
  if (gamestart) {
    isMovingRight = true;
    lastKeyPressed = 0;
    document.getElementById('arrow-right').classList.add('arrow-move');
  }
}

/**
 * This function stops the movement of the character to the right.
 */
function stopmoveright() {
  isMovingRight = false;
  lastKeyPressed = new Date().getTime();
  document.getElementById('arrow-right').classList.remove('arrow-move');
}

/**
 * This function moves the character to the left.
 */
function moveleft() {
  if (gamestart) {
    isMovingLeft = true;
    lastKeyPressed = 0;
    document.getElementById('arrow-left').classList.add('arrow-move');
  }
}

/**
 * This function stops the movement of the character to the left.
 */
function stopmoveleft() {
  isMovingLeft = false;
  lastKeyPressed = new Date().getTime();
  document.getElementById('arrow-left').classList.remove('arrow-move');
}

/**
 * This function makes the character jump.
 */
function jump() {
  if (gamestart) {
    let timePassedSinceJump = new Date().getTime() - lastJumpStarted;
    if (timePassedSinceJump > JUMP_TIME * 2) {
      lastKeyPressed = 0;
      isJumping = true;
      isJumpingUp = true;
      start_height = character_y;
      AUDIO_JUMP.play();
      lastJumpStarted = new Date().getTime();
      document.getElementById('arrow-up').classList.add('arrow-move');
    }
  }
}

/**
 * This function recognizes the stop of the jump of the character.
 */
function stopjump() {
  lastKeyPressed = new Date().getTime();
  document.getElementById('arrow-up').classList.remove('arrow-move');
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
      document.getElementById('bottle').classList.add('arrow-move');
      checkForBottleDirection();
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
 * Thus function checks for the direction of the thrown bottle.
 */
function checkForBottleDirection() {
  if (isFacingRight) {
    isThrowingRight = true;
  }
  if (isFacingLeft) {
    isThrowingLeft = true;
  }
}

/**
 * This function recognizes the stop of the throwing of a bottle.
 */
function stopthrowbottle() {
  lastKeyPressed = new Date().getTime();
  document.getElementById('bottle').classList.remove('arrow-move');
}

/**
 * This function restarts the game.
 */
function restart() {
  location.reload();
  loadGame();
}

/**
 * This function mutes the music.
 */
function muteMusic() {
  document.addEventListener("keydown", e => {
    turnOffMusic(e);
    turnOnmusic(e);
  });
}

/**
 * This function turn off the music.
 */
function turnOffMusic(e) {
  if (e.key == 'm' && musicIsOn) {
    AUDIO_BACKGROUND_MUSIC.muted = true;

    setTimeout(function () {
      musicIsOn = false;
      musicIsOff = true;
    }, 100);
  }
}

/**
 * This function turns on the music.
 */
function turnOnmusic(e) {
  if (e.key == 'm' && musicIsOff) {
    AUDIO_BACKGROUND_MUSIC.muted = false;

    setTimeout(function () {
      musicIsOn = true;
      musicIsOff = false;
    }, 100);
  }
}

/**
 * This function turns off the sound.
 */
function muteSound() {
  document.addEventListener("keydown", e => {

    turnSoundOff(e);
    turnSoundOn(e);

  });
}

/**
 * Thus function turns the sound off.
 */
function turnSoundOff(e) {
  if (e.key == 'v' && soundIsOn) {
    AUDIO_BOTTLE.muted = true;
    AUDIO_FINAL_BOSS.muted = true;
    AUDIO_FINAL_BOSS2.muted = true;
    AUDIO_GLASS.muted = true;
    AUDIO_HEN.muted = true;
    AUDIO_JUMP.muted = true;
    AUDIO_THROW.muted = true;
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
}

/**
 * Thus function turns the sound on.
 */
function turnSoundOn(e) {
  if (e.key == 'v' && soundIsOff) {
    AUDIO_BOTTLE.muted = false;
    AUDIO_FINAL_BOSS.muted = false;
    AUDIO_FINAL_BOSS2.muted = false;
    AUDIO_GLASS.muted = false;
    AUDIO_HEN.muted = false;
    AUDIO_JUMP.muted = false;
    AUDIO_THROW.muted = false;
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
 * This function prevents propagation.
 * 
 * @param {object} event 
 */
window.oncontextmenu = function (event) {

  if ((screen.width < 1000)) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }

};

/**
 * This function checks if the screen orientation is landscape.
 */
window.addEventListener("resize", checkForScreenOrientation);
function checkForScreenOrientation() {
  var orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;

  if (screen.width < 1000 && (orientation === "portrait-secondary" || orientation === "portrait-primary")) {
    alert("Please rotate the display.");
  } else if (orientation === undefined) {
    alert("The orientation API isn't supported in this browser :(");
  }
}

/**
 * This function checks which browser is being used.
 */
function checkForBrowser() {
  let f = navigator.userAgent.search("Firefox");
  let m8 = navigator.userAgent.search("MSIE 8.0");
  let m9 = navigator.userAgent.search("MSIE 9.0");
  let s = navigator.userAgent.search("Safari");
  if (f > -1) {
    alert('Please use Chrome');
  } else if (m9 > -1) {
    alert('Please use Chrome');
  } else if (m8 > -1) {
    alert('Please use Chrome');
  }
}