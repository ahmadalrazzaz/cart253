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
 * Draws my face
*/
function draw() {
    background("#460000ff");

    drawFace();
}

// Draw a face using functions for each feature
function drawFace() {
    
    // Draw neck
    fill("#c4a57cff");
    rect(280, 550, 140, 150);

    // Draw face shape
    fill("#ffdbac");
    ellipse(350, 350, 350, 470);


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