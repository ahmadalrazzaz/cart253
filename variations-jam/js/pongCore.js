"use strict";

const paddle = {
    x: 250,
    y: 480,
    width: 80,
    height: 10
};

let balls = [];

let score = 0;

function pongInit() {
    paddle.x = width / 2;
    score = 0;
    balls = [];
}

// Create a ball object
function makeBall(x, y, vx, vy) {
    return {
        x: x,
        y: y,
        width: 10,
        height: 10,
        velocity: {
            x: vx,
            y: vy
        }
    };
}

function setBalls(newBalls) {
    balls = newBalls;
}

// Display the score in the top-left
function displayScore() {
    push();
    fill("white");
    textSize(32);
    textFont("Courier New");
    textAlign(LEFT, TOP);
    text(score, 10, 10);
    pop();
}

// Move the paddle left/right
function movePaddleShared() {
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
        paddle.x -= 8;
    }

    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
        paddle.x += 8;
    }

    // Constrain the paddle to the canvas
    paddle.x = constrain(
        paddle.x,
        paddle.width / 2,
        width - paddle.width / 2
    );
}

// Move the ball
function moveBallShared(ball) {
    ball.y += ball.velocity.y;
    ball.x += ball.velocity.x;
}

// Draw the paddle
function drawPaddleShared() {
    push();
    rectMode(CENTER);
    noStroke();
    fill("white");
    rect(paddle.x, paddle.y, paddle.width, paddle.height);
    pop();
}

// Draw the ball
function drawBallShared(ball) {
    push();
    rectMode(CENTER);
    noStroke();
    fill("white");
    rect(ball.x, ball.y, ball.width, ball.height);
    pop();
}

// Check for overlap between two rectangles
function checkOverlapShared(rectA, rectB) {
    return (
        rectA.x + rectA.width / 2 > rectB.x - rectB.width / 2 &&
        rectA.x - rectA.width / 2 < rectB.x + rectB.width / 2 &&
        rectA.y + rectA.height / 2 > rectB.y - rectB.height / 2 &&
        rectA.y - rectA.height / 2 < rectB.y + rectB.height / 2
    );
}
