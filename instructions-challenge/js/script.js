/*
    Ahmad AlRazzaz
    Instructions Challenge 
    Done with Skyla and Willow
 */

"use strict";

/**
    Sets up the canvas and background
*/
function setup() {
    createCanvas(500, 500)
    background("#D4F0F0")
}

/**
    Draws house, clouds, grass and birds
*/
function draw() {
    illuminatiHouse();

}

function illuminatiHouse(){

    
    // Roof
    push();
    noStroke();
    fill("#0e6e0eff")
    triangle(250, 50, 400, 180, 100, 180)
    pop();
    
    // Eye
    push();
    noStroke();
    fill("#ffffff");
    ellipse(250, 120, 100, 50);
    fill("#000000");
    ellipse(250, 120, 40, 50);
    pop();

}