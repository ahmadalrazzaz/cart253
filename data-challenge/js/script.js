/**
 * Data Challenge
 * Ahmad AlRazzaz
 */

"use strict";

let carData = undefined;
let dinosaurData = undefined;

let cars = [];
let dinosaurs = [];

let langData = undefined;
let lang = "fr";

// Starts with the instruction
let carName = "Click to generate a car name.";

/**
 * Load the car and dinosaur data
 */
function preload() {
    carData = loadJSON('cars.json');
    dinosaurData = loadJSON('dinosaurs.json');
}

/**
 * Create the canvas
*/
function setup() {
    createCanvas(600, 400);
}

/**
 * Display the current main text (either instructions or a car)
*/
function draw() {
    background(0);

    push();
    fill("pink");
    textAlign(CENTER, CENTER);
    textSize(32);
    text(carName, width / 2, height / 2);
    pop();
}

/**
 * Generate a new car name
 */
function mousePressed() {
    let carIndex = floor(random(0, carData.cars.length));
    let dinosaurIndex = floor(random(0, dinosaurData.dinosaurs.length));

    carName = carData.cars[carIndex] + " " + dinosaurData.dinosaurs[dinosaurIndex];
}