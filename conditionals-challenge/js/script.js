/*
Ahmad AlRazzaz
CART 253 - Conditionals Challenge
Date: 24 September 2025
 */

"use strict";

const puck = {
  x: 200,
  y: 200,
  size: 100,
  fill: "#ff0000",
  isMoving: false,
  speed: 5,
  movementAngle: 0
};

const user = {
  x: undefined, // will be mouseX
  y: undefined, // will be mouseY
  size: 75,
  fill: "#000000"
};

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Move the user circle, check for overlap, draw the two circles
 */
function draw() {
  background("#aaaaaa");
  
  // Move user circle
  moveUser();
  
  // Draw the user and puck
  drawUser();
  drawPuck();

  const d = dist(user.x, user.y, puck.x, puck.y);

  const overlap = (d < user.size/2 + puck.size/2);
  if (overlap) {
    // Finding angle of contact
    puck.movementAngle = atan2(puck.y - user.y, puck.x - user.x);
    puck.isMoving = true;
  }

    if (puck.isMoving) {
        movePuck();
        // Reset puck when speed reaches 0
        if (puck.speed <= 0) {
            puck.isMoving = false;
            puck.speed = 5;
        }
    }

}

/**
 * Sets the user position to the mouse position
 */
function moveUser() {
  user.x = mouseX;
  user.y = mouseY;
}

/**
 * Displays the user circle
 */
function drawUser() {
  push();
  noStroke();
  fill(user.fill);
  ellipse(user.x, user.y, user.size);
  pop();
}

/**
 * Displays the puck circle
 */
function drawPuck() {
  push();
  noStroke();
  fill(puck.fill);
  ellipse(puck.x, puck.y, puck.size);
  pop();
}

function movePuck() {
    
    puck.x += cos(puck.movementAngle) * puck.speed;
    puck.y += sin(puck.movementAngle) * puck.speed;
    
    puck.speed -= 0.03; // Decrease speed over time

    if (puck.x > width || puck.x < 0) {
        puck.movementAngle = PI - puck.movementAngle;
    }
    if (puck.y > height || puck.y < 0) {
        puck.movementAngle = -puck.movementAngle;
    }

}
