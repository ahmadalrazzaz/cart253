/**
 * Double Ball Pong variation
 */

"use strict";

// ================================== STATE ==================================

let doubleBallStartBalls = [];
let doubleBallStartPaddleX;

// ================================== SETUP ==================================

function doubleBallSetup() {
    const ball1 = makeBall(300, 20, 0, 3);
    const ball2 = makeBall(100, 20, 1, 1);

    setBalls([ball1, ball2]);

    doubleBallStartBalls = balls.map(ball => ({
        x: ball.x,
        y: ball.y,
        vx: ball.velocity.x,
        vy: ball.velocity.y
    }));

    doubleBallStartPaddleX = width / 2;
    paddle.x = doubleBallStartPaddleX;

    score = 0;

    loop();
}

// ================================== DRAW ===================================

function doubleBallDraw() {
    background("#000000ff");

    displayScore();
    movePaddleShared();

    for (let ball of balls) {
        moveBallShared(ball);
        doubleBallHandleBounce(ball);
    }

    drawPaddleShared();

    for (let ball of balls) {
        drawBallShared(ball);
    }
}

// ================================== INPUTS =================================

function doubleBallKeyPressed() {
    if (keyCode === 27) {
        state = "menu";
        loop();
    }

    if (keyCode === 32) {
        doubleBallResetGame();
    } 
}

function doubleBallMousePressed() {
}

// =============================== RESET / LOGIC ==============================

function doubleBallResetGame() {
    score = 0;

    balls.forEach((ball, index) => {
        const start = doubleBallStartBalls[index];
        ball.x = start.x;
        ball.y = start.y;
        ball.velocity.x = start.vx;
        ball.velocity.y = start.vy;
    });

    paddle.x = doubleBallStartPaddleX;

    loop();
}

function doubleBallHandleBounce(ball) {
    if (checkOverlapShared(ball, paddle)) {
        ball.velocity.y *= -1;
        ball.velocity.x += (ball.x - paddle.x) * 0.1;

        score++;
    }

    if (ball.y < ball.height / 2) {
        ball.velocity.y *= -1;
    }

    if (ball.x < ball.width / 2 || ball.x > width - ball.width / 2) {
        ball.velocity.x *= -1;
    }

    if (ball.y > height + ball.height / 2) {
        background("black");

        textSize(64);
        textAlign(CENTER, CENTER);
        fill("red");
        text("Game Over!", width / 2, height / 2);

        fill("white");
        textSize(20);
        text("Final Score: " + score, width / 2, height / 2 + 50);

        noLoop();
    }
}
