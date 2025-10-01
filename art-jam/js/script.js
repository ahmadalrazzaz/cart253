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
    createCanvas(600, 600);
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
    rect(280, 540, 140, 150);

    // Draw face shape
    fill("#ffdbac");
    ellipse(350, 330, 350, 470);


    // Draw features
    drawEyes();
    drawNose();
    drawMouth();
    drawEyebrows();
    drawHair();
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

    // Draw teeth
    fill("#ffffff");
    rect(290, 450, 120, 20, 0, 0, 10, 10);

}

function drawEars() {
    fill("#ffdbac");
    ellipse(180, 370, 50, 80);
    ellipse(520, 370, 50, 80);

}

function drawHair() {
    fill("#49230eff");
    ellipse(490, 185, 80);
    ellipse(470, 140, 80);
    ellipse(210, 185, 80);
    ellipse(450, 130, 100);
    ellipse(360, 120, 80);
    ellipse(490, 235, 80);
    ellipse(470, 200, 80);
    ellipse(210, 235, 80);
    ellipse(230, 200, 80);
    ellipse(350, 130, 100);
    ellipse(300, 110, 100);
    ellipse(230, 150, 80);
    ellipse(250, 170, 100);
    ellipse(300, 150, 100);
    ellipse(400, 150, 100);
    ellipse(250, 120, 100);
    ellipse(450, 170, 100);
    ellipse(360, 150, 80);
    ellipse(400, 100, 100);
    ellipse(350, 120, 100);
}

function drawEyebrows() {
    fill("#321709ff");
    arc(270, 255, 100, 40, PI, 0);
    arc(430, 255, 100, 40, PI, 0);
}