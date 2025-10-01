/**
 * Art Jam
 * Ahmad AlRazzaz
 * Oct 1 2025
 */

"use strict";

/**
 * create the canvas
*/
function setup() {
    createCanvas(700, 700);
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background("#460000ff");

    drawFace();
}

// Draw a face using functions for each feature
function drawFace() {
    // Draw face shape
    fill("#ffdbac");
    ellipse(350, 350, 400, 500);

    // Draw features
    drawEyes();
    drawNose();
    drawMouth();
}

function drawEyes() {

}

function drawNose() {
}

function drawMouth() {
}