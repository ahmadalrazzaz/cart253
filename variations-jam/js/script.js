/**
 * Variation Menu
 * Main p5 sketch and state switching
 */

"use strict";

let state = "menu";
let blockFont;
let menuBg, singleMenu, multiMenu, btnNormal, btnHover;

function preload() {
    blockFont = loadFont("assets/fonts/PressStart2P-Regular.ttf");

    menuBg = loadImage("assets/images/main-menu.jpg");
    singleMenu = loadImage("assets/images/singleplayer.jpg");
    multiMenu = loadImage("assets/images/multiplayer.jpg");
    
    btnNormal = loadImage("assets/images/button.png");
    btnHover = loadImage("assets/images/button-hovered.png");
}

// Setup the canvas
function setup() {
    createCanvas(500, 500);
    pongInit();
}

// Display the menu or the current variation
function draw() {
    switch (state) {
        case "menu":
            menuDraw();
            break;

        case "singlePlayer":
            singleplayerDraw();
            break;

        case "multiPlayer":
            multiplayerDraw();
            break;

        case "original":
            originalDraw();
            break;

        case "doubleBall":
            doubleBallDraw();
            break;
        case "brickBreaker":
            brickBreakerDraw();
            break;
        case "blackHole":
            blackHoleDraw();
            break;
    }
}

// Listen for mouse presses and call the function for it
function mousePressed() {
    switch (state) {
        case "menu":
            menuMousePressed();
            break;

        case "singlePlayer":
            singleplayerMousePressed();
            break;

        case "multiPlayer":
            multiplayerMousePressed();
            break;

        // ==========

        case "original":
            originalMousePressed();
            break;

        case "doubleBall":
            doubleBallMousePressed();
            break;
        case "brickBreaker":
            brickBreakerMousePressed();
            break;
        case "blackHole":
            blackHoleMousePressed();
            break;
    }
}

// Listen for key presses and call the function for it
function keyPressed() {
    switch (state) {
        case "menu":
            menuKeyPressed();
            break;

        case "singlePlayer":
            singleplayerKeyPressed();
            break;

        case "multiPlayer":
            multiplayerKeyPressed();
            break;

        // ==========

        case "original":
            originalKeyPressed();
            break;

        case "doubleBall":
            doubleBallKeyPressed();
            break;
        case "brickBreaker":
            brickBreakerKeyPressed();
            break;
        case "blackHole":
            blackHoleKeyPressed();
            break;
    }
}
