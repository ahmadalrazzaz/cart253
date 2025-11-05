/**
 * Frogs VS Flies
 * Ahmad AlRazzaz
 *
 */

"use strict";

// ===== Assets =====
let frogImage, flyImage, backgroundImage;

// ===== Game State =====
let gameState = "menu";

// ===== Frog =====
let frog = {
  x: 0,
  y: 0,
  size: 400,
  mouthOffsetY: 170
};

// ===== Tongue =====
let tongue = {
    isActive: false,
    isRetracting: false,
    length: 0,
    maxLength: 0,
    speed: 22
};

// ===== Fly =====
let fly = {
  x: 0,
  y: 30,
  size: 50,
  speed: 4
};

// ===== UI =====
let score = 0;
let lives = 5;

// ===== Preload =====
function preload() {
  frogImage = loadImage("js/assets/images/frog.png");
  flyImage = loadImage("js/assets/images/fly.png");
  backgroundImage = loadImage("js/assets/images/swamp-bg.png");
}

// ===== Setup =====
function setup() {
  createCanvas(1200, 750);
  frog.y = height - 300;
  resetFly();
}

// ===== Draw =====
function draw() {
  background(backgroundImage);

  if (gameState === "menu") {
    drawFly();
    drawFrog();
    drawStartScreen();
    return;
  }

  if (gameState === "playing") {
    moveFly();
    drawFly();

    if (tongue.isActive) {
      updateTongue();
      drawTongue();
    }

    moveFrog();
    drawFrog();
    drawHUD();

    if (lives <= 0) {
      gameState = "gameover";
      tongue.isActive = false;
    }
    return;
  }

  if (gameState === "gameover") {
    drawFly();
    drawFrog();
    drawGameOverScreen();
    return;
  }
}

// ===== Fly =====
function drawFly() {
  image(flyImage, fly.x, fly.y, fly.size, fly.size);
}

function moveFly() {
  fly.x += fly.speed;
  fly.y += random(-4, 4);
  fly.y = constrain(fly.y, 30, height * 0.4);

  if ((fly.x - (fly.size * 0.5)) > width) {
    lives = max(0, lives - 1);
    resetFly();
  }
}

function resetFly() {
  fly.x = random(-100, -30);
  fly.y = random(40, height * 0.55);
  fly.speed = (5 + (score / 20) * 0.8);
}

// ===== Frog =====
function drawFrog() {
  image(frogImage, frog.x - 200, frog.y, frog.size, frog.size);
}

function moveFrog() {
  frog.x = constrain(mouseX, 40, width - 40);
}

// ===== Tongue =====
function drawTongue() {
  const mx = frog.x;
  const my = frog.y + frog.mouthOffsetY;
  const tipY = my - tongue.length;

  const w = map(tongue.length, 0, tongue.maxLength, 18, 14);
  stroke(255, 120, 120);
  strokeWeight(w);
  strokeCap(ROUND);
  line(mx, my, mx, tipY);

  noStroke();
  fill(255, 150, 150);
  circle(mx, tipY, w + 6);
}

function updateTongue() {

  if (!tongue.isRetracting) {
    tongue.length += tongue.speed;
    if (tongue.length >= tongue.maxLength) {
        tongue.isRetracting = true;
    }
  } else {
    tongue.length -= tongue.speed * 1.2;
    if (tongue.length <= 0) {
      tongue.length = 0;
      tongue.isActive = false;
      tongue.isRetracting = false;
    }
  }

  const mx = frog.x;
  const my = frog.y + frog.mouthOffsetY;
  const tipY = my - tongue.length;

  // Check collision with fly
  const d = dist(mx, tipY, fly.x, fly.y);
  if (d < fly.size * 0.45) {
    score += 10;
    tongue.isRetracting = true;
    resetFly();
  }
}

// ===== UI =====
function drawHUD() {
  noStroke();
  fill(0, 0, 0, 110);
  rect(12, 14, 190, 76, 10);

  fill(255);
  textSize(22);
  text("Score: " + score, 62, 41);
  text("Lives: " + "❤".repeat(max(0, lives)) + "♡".repeat(max(0, 5 - lives)), 106, 72);
}

function drawStartScreen() {
  noStroke();
  fill(0, 0, 0, 150);
  const w = 520, h = 220;
  rect(width / 2 - w / 2, height * 0.28 - h / 2, w, h, 16);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(38);
  text("Frogs VS Flies", width / 2, height * 0.20 + 10);

  textSize(18);
  text(
    "\nMove mouse to aim • Click to shoot the tongue\nCatch flies to score points\n\Click to Start",
    width / 2,
    height * 0.28 + 26
  );
}

function drawGameOverScreen() {
  noStroke();
  fill(0, 0, 0, 160);
  const w = 520, h = 160;
  rect(width / 2 - w / 2, height * 0.35 - h / 2, w, h, 16);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(36);
  text("Game Over", width / 2, height * 0.35 - 18);

  textSize(20);
  text("\nScore: " + score + "\nClick to Restart", width / 2, height * 0.35 + 26);
}

// ===== Input =====
function mousePressed() {
  if (gameState === "menu") {
    startGame();
    return;
  }
  if (gameState === "gameover") {
    startGame();
    return;
  }

  if (lives <= 0) return;
  const mx = frog.x;
  const my = frog.y + frog.mouthOffsetY;
  tongue.length = 0;
  tongue.maxLength = my; // reach to top of canvas
  tongue.isActive = true;
  tongue.isRetracting = false;
}

// ===== Flow =====
function startGame() {
  score = 0;
  lives = 5;
  tongue.isActive = false;
  tongue.isRetracting = false;
  tongue.length = 0;
  resetFly();
  gameState = "playing";
}