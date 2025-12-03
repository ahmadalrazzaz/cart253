/**
 * Original Pong variation
 */

"use strict";

let originalStartBall;
let originalStartPaddleX;

// ================================== SETUP =================================

function originalSetup() {
    const mainBall = makeBall(250, 20, 0, 3);
    setBalls([mainBall]);

    originalStartBall = {
        x: mainBall.x,
        y: mainBall.y,
        vx: mainBall.velocity.x,
        vy: mainBall.velocity.y
    };

    originalStartPaddleX = width / 2;
    paddle.x = originalStartPaddleX;

    score = 0;
}

// ================================== DRAW =================================

function originalDraw() {
    background("#000000ff");
    
    displayScore();
    movePaddleShared();
    
    for (let ball of balls) {
        moveBallShared(ball);
        originalHandleBounce(ball);
    }
    
    drawPaddleShared();
    
    for (let ball of balls) {
        drawBallShared(ball);
    }
}

// ================================== INPUTS =================================

function originalKeyPressed() {
    if (keyCode === 27) {
        state = "menu";
        loop();
    }

    if (keyCode === 32) {
        originalResetGame();
    } 
}


function originalMousePressed() {}


function originalResetGame() {
    score = 0;

    const ball = balls[0];
    ball.x = originalStartBall.x;
    ball.y = originalStartBall.y;
    ball.velocity.x = originalStartBall.vx;
    ball.velocity.y = originalStartBall.vy;

    paddle.x = originalStartPaddleX;

    loop();
}


function originalHandleBounce(ball) {
    if (checkOverlapShared(ball, paddle)) {
        ball.velocity.y *= -1;
        ball.velocity.x += (ball.x - paddle.x) * 0.1;

        score++;

        playBounceSound();
    }

    if (ball.y < ball.height / 2) {
        ball.velocity.y *= -1;
        playBounceSound();
    }

    if (ball.x < ball.width / 2 || ball.x > width - ball.width / 2) {
        ball.velocity.x *= -1;
        playBounceSound();
    }

    if (ball.y > height + ball.height / 2) {
        background("black");

        textFont(blockFont);
        textSize(42);
        textAlign(CENTER, CENTER);
        fill("red");
        text("Game Over!", width / 2, height / 2);

        fill("white");
        textFont(blockFont);
        textSize(14);
        text("Final Score: " + score, width / 2, height / 2 + 50);

        playGameOverSound();

        noLoop();
    }
}
