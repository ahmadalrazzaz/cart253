/**
 * Brick Breaker variation
 */

"use strict";

// ================================== STATE ==================================

let brickBreakerStartBall;
let brickBreakerStartPaddleX;

let bricks = [];

const BRICK_ROWS = 5;
const BRICK_COLS = 8;
const BRICK_HEIGHT = 20;
const BRICK_MARGIN = 4;

// ================================== SETUP ==================================

function brickBreakerSetup() {
    const mainBall = makeBall(width / 2, height / 2, 2, 3);
    setBalls([mainBall]);

    brickBreakerStartBall = {
        x: mainBall.x,
        y: mainBall.y,
        vx: mainBall.velocity.x,
        vy: mainBall.velocity.y
    };

    brickBreakerStartPaddleX = width / 2;
    paddle.x = brickBreakerStartPaddleX;

    score = 0;
    brickBreakerCreateBricks();

    loop();
}

function brickBreakerCreateBricks() {
    bricks = [];

    const totalMarginX = (BRICK_COLS + 1) * BRICK_MARGIN;
    const brickWidth = (width - totalMarginX) / BRICK_COLS;

    const topOffset = 60;

    for (let row = 0; row < BRICK_ROWS; row++) {
        for (let col = 0; col < BRICK_COLS; col++) {
            const x = BRICK_MARGIN + col * (brickWidth + BRICK_MARGIN) + brickWidth / 2;
            const y = topOffset + row * (BRICK_HEIGHT + BRICK_MARGIN) + BRICK_HEIGHT / 2;

            bricks.push({
                x: x,
                y: y,
                width: brickWidth,
                height: BRICK_HEIGHT,
                alive: true
            });
        }
    }
}

// ================================== DRAW ===================================

function brickBreakerDraw() {
    background("#000000ff");

    displayScore();
    movePaddleShared();

    const ball = balls[0];

    moveBallShared(ball);
    brickBreakerHandleCollisions(ball);

    drawPaddleShared();
    brickBreakerDrawBricks();

    drawBallShared(ball);
}

// ================================== INPUTS =================================

function brickBreakerKeyPressed() {
    if (keyCode === 27) {
        state = "menu";
        loop();
    }

    if (keyCode === 32) {
        brickBreakerResetGame();
    } 
}

function brickBreakerMousePressed() {
}

// =============================== RESET / LOGIC ==============================

function brickBreakerResetGame() {
    score = 0;

    const ball = balls[0];
    ball.x = brickBreakerStartBall.x;
    ball.y = brickBreakerStartBall.y;
    ball.velocity.x = brickBreakerStartBall.vx;
    ball.velocity.y = brickBreakerStartBall.vy;

    paddle.x = brickBreakerStartPaddleX;

    brickBreakerCreateBricks();

    loop();
}

function brickBreakerHandleCollisions(ball) {
    if (checkOverlapShared(ball, paddle)) {
        ball.velocity.y *= -1;

        ball.velocity.x += (ball.x - paddle.x) * 0.1;

        ball.velocity.y *= 1.05;
        ball.velocity.x *= 1.05;
    }

    if (ball.y < ball.height / 2) {
        ball.velocity.y *= -1;
    }

    if (ball.x < ball.width / 2 || ball.x > width - ball.width / 2) {
        ball.velocity.x *= -1;
    }

    let bricksRemaining = 0;

    for (let brick of bricks) {
        if (!brick.alive) continue;
        bricksRemaining++;

        if (checkOverlapShared(ball, brick)) {
            brick.alive = false;

            ball.velocity.y *= -1;

            score += 10;

            break;
        }
    }

    if (bricksRemaining === 0) {
        background("black");

        textSize(48);
        textAlign(CENTER, CENTER);
        fill("lime");
        text("You Win!", width / 2, height / 2);

        fill("white");
        textSize(20);
        text("Final Score: " + score, width / 2, height / 2 + 50);

        noLoop();
        return;
    }

    if (ball.y > height + ball.height / 2) {
        background("black");

        textSize(48);
        textAlign(CENTER, CENTER);
        fill("red");
        text("Game Over!", width / 2, height / 2);

        fill("white");
        textSize(20);
        text("Final Score: " + score, width / 2, height / 2 + 50);

        noLoop();
    }
}

// =============================== DRAW HELPERS ===============================

function brickBreakerDrawBricks() {
    push();
    rectMode(CENTER);
    noStroke();
    fill("#ffcc00");

    for (let brick of bricks) {
        if (!brick.alive) continue;
        rect(brick.x, brick.y, brick.width, brick.height);
    }

    pop();
}
