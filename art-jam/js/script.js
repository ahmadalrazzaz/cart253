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

    drawEars();
    
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
    // Left eye
    fill("#ffffff");
    ellipse(270, 300, 80, 50);
    fill("#2e1100ff");
    ellipse(270, 300, 30);

    // Right eye
    fill("#ffffff");
    ellipse(430, 300, 80, 50);
    fill("#2e1100ff");
    ellipse(430, 300, 30);
}

function drawNose() {
    fill("#ffb380");
    //triangle(350, 320, 330, 400, 370, 400);

    // Never used quad before, so trying it out
    quad(340, 320, 330, 400, 370, 400, 360, 320);

}

function drawMouth() {
    fill("#ff6666");

    // First time using arc() function
    arc(350, 450, 150, 100, 0, PI);

}

function drawEars() {
    fill("#ffdbac");
    ellipse(180, 370, 50, 80);
    ellipse(520, 370, 50, 80);

}