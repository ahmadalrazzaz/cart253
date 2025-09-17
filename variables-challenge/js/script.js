/*

Ahmad AlRazzaz
Variables Challenge 
CART 253 - September 17

 */

"use strict";

// Sky Colors
let skyRed = 160;
let skyGreen = 180;
let skyBlue = 200;

// Our friend Mr. Furious
let mrFurious = {
  // Position and size
  x: 200,
  y: 200,
  size: 100,
  // Colour
  fill: {
    r: 255,
    g: 225,
    b: 225,
  },
  rageLevel: 0
};

// Annoying Bird
let annoyingBird = {
  speed: 10,
  acceleration: 0.05,
  size: 50,

  // position
  x: 30,
  y: 30,

  // direction of travel
  goingForward: true,
};

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Draw (and update) Mr. Furious
 */
function draw() {
  background(skyRed, skyGreen, skyBlue);

  // Slowly changes sky color to black
  skyRed -= 0.5;
  skyGreen -= 0.5;
  skyBlue -= 0.4;

  // Draw Mr. Furious as a coloured circle
  push();
  noStroke();
  fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
  ellipse(mrFurious.x, mrFurious.y, mrFurious.size);
  pop();

  // Slowly make Mr. Furious more red
  mrFurious.fill.g -= 0.3;
  mrFurious.fill.b -= 0.3;

  // Creates annoying bird
  push();
  noStroke();
  fill("#ff8d29ff");
  ellipse(annoyingBird.x, annoyingBird.y, annoyingBird.size, 10);
  pop();

  // Makes bird fly back and forth annoyingly
  annoyingBird.speed += annoyingBird.acceleration;

  if (annoyingBird.goingForward == true) {
    annoyingBird.x += annoyingBird.speed;

    if (annoyingBird.x > 400) {
      annoyingBird.goingForward = false;
    }
  } else {
    annoyingBird.x -= annoyingBird.speed;

    if (annoyingBird.x < 0) {
      annoyingBird.goingForward = true;
    }
  }

  // Makes Mr. Furious shake with anger

  while (mrFurious.rageLevel < 20){
    mrFurious.rageLevel += 0.1;
  }

  mrFurious.x += random(0, mrFurious.rageLevel)
  mrFurious.x -= random(0, mrFurious.rageLevel)
  mrFurious.y += random(0, mrFurious.rageLevel)
  mrFurious.y -= random(0, mrFurious.rageLevel)

  if (mrFurious.x > 220 || mrFurious.y > 220 || mrFurious.y < 180 || mrFurious.x < 180){
    mrFurious.x = 200;
    mrFurious.y = 200;
  }
}
