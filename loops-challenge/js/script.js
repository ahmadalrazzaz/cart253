/**
 * Lines
 * Pippin Barr
 * 
 * A series of lines across the canvas
 */

"use strict";

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(500, 500);

    colorMode(HSB);
}

/**
 * Draws lines across the canvas with increasing thickness and
 * gradually lightening colour
 */
function draw() {

    let hueController = map(mouseX, 0, width, 0, 360); // Controls hue based on mouseX
    let saturationController = map(mouseY, 0, height, 0, 100); // Controls saturation based on mouseY

    let fillColor = color(hueController, saturationController, 100);
    background(fillColor);
    
    let strokeVar = 0;

    while (strokeVar <= 250) {
        stroke(strokeVar);
        strokeWeight(strokeVar/25);

        line(strokeVar * 2, 0, strokeVar * 2, height);

        line(0, 250, (width/2)+strokeVar, strokeVar*2);
        
        strokeVar += 25;
    }

}