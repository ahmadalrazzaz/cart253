/**
 * Frogfrogfrog
 * Ahmad AlRazzaz
 * 
 * A game of catching flies with your frog-tongue
 * 
 */

"use strict";

// Frog

    // Tongue


// Fly

let flyImage;

const fly = {
    x: 0,
    y: 30, 
    size: 50,
    speed: 3
}


// UI & Other Elements 

let backgroundImage;

    // Score

    // Lives


// =========== Preload ===========

function preload() {
    flyImage = loadImage('../assets/images/fly.png');
}

// =========== Setup ===========

function setup() {
    createCanvas(1000, 700);
}

// =========== Draw Loop ===========

function draw() {
    background("#87ceeb");

    // Fly
    drawFly();
    moveFly();
}

// =========== Fly Functions ===========

// Uses the fly image to draw the fly
function drawFly() {
    image(flyImage, fly.x, fly.y, fly.size, fly.size);
}

// Moves the fly according to its speed
function moveFly() {
    fly.x += fly.speed;

    // Reset the fly if it gets all the way to the right
    if (fly.x > width) {
        resetFly();
    }
}

// Resets the fly to the left with a random y
function resetFly() {
    fly.x = 0;
    fly.y = random(0, 300);
}

// ========== Frog Functions ===========



// ========== UI Functions ==========


