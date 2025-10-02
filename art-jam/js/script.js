/**
 * Art Jam
 * Ahmad AlRazzaz
 * Oct 1 2025
 */

"use strict";

let eyes = {
    width: 80,
    height: 50,

    red: 255,
    green: 255,
    blue: 255,

    leftX: 270,
    leftY: 300,
    rightX: 430,
    rightY: 300
}

let sky={
    red:135,
    green:206,
    blue:235,

    nightTime: false,

    dayRed: 135,
    dayGreen: 206,
    dayBlue: 235,
    nightRed: 6, 
    nightGreen: 6, 
    nightBlue: 41
}

/**
 * create the canvas
*/
function setup() {
    createCanvas(1000, 600);
}


/**
 * Draws my face
*/
function draw() {
    background(sky.red, sky.green, sky.blue);
    transitionDayAndNight();

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
    fill(eyes.red, eyes.green, eyes.blue);
    ellipse(eyes.leftX, eyes.leftY, eyes.width, eyes.height);    
    ellipse(eyes.rightX, eyes.rightY, eyes.width, eyes.height);

    // Move eyes based on mouse position
    let eyeOffsetX = map(mouseX, 0, width, -15, 15);
    let eyeOffsetY = map(mouseY, 0, height, -8, 8);

    // Constrain the offsets to keep pupils within the eyes
    eyeOffsetX = constrain(eyeOffsetX, -15, 15);
    eyeOffsetY = constrain(eyeOffsetY, -8, 8);

    // Redraw pupils with offsets
    fill("#2e1100ff");
    ellipse(270 + eyeOffsetX, 300 + eyeOffsetY, 30); // Left pupil
    ellipse(430 + eyeOffsetX, 300 + eyeOffsetY, 30); // Right pupil

    if (mouseIsPressed) {
        eyes.blue -= 0.5;
        eyes.green -= 0.5;

        if (eyes.blue < 0) {
            eyes.blue = 0;
        }
        if (eyes.green < 0) {
            eyes.green = 0;
        }
    }
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

function transitionDayAndNight() {
    sky.red = constrain(sky.red, sky.nightRed, sky.dayRed);
    sky.green = constrain(sky.green, sky.nightGreen, sky.dayGreen);
    sky.blue = constrain(sky.blue, sky.nightBlue, sky.dayBlue);

    if (sky.nightTime) {
        sky.red -= 0.5;
        sky.green -= 0.5;
        sky.blue -= 0.5;

        if (sky.red <= sky.nightRed && sky.green <= sky.nightGreen && sky.blue <= sky.nightBlue) {
            sky.nightTime = false;
        }
    } else {
        sky.red += 0.3;
        sky.green += 0.3;
        sky.blue += 0.7;

        if (sky.red >= sky.dayRed && sky.green >= sky.dayGreen && sky.blue >= sky.dayBlue) {
            sky.nightTime = true;
        }
    }
}