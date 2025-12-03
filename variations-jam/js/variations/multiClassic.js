/**
 * Multiplayer Classic Pong variation
 */

"use strict";

let multiStartBall;
let leftPaddle;
let rightPaddle;
let leftScore;
let rightScore;
let multiWinScore = 5;

// ================================== SETUP =================================

function multiClassicSetup() {
    const mainBall = makeBall(width / 2, height / 2, 3, 2);
    setBalls([mainBall]);

    multiStartBall = {
        x: mainBall.x,
        y: mainBall.y,
        vx: mainBall.velocity.x,
        vy: mainBall.velocity.y
    };

    leftPaddle = {
        x: 20,
        y: height / 2,
        width: 10,
        height: 80
    };

    rightPaddle = {
        x: width - 20,
        y: height / 2,
        width: 10,
        height: 80
    };

    leftScore = 0;
    rightScore = 0;

    loop();
}

// ================================== DRAW =================================

function multiClassicDraw() {
    background("#000000ff");

    drawMultiScores();
    moveMultiPaddles();

    const ball = balls[0];

    moveBallShared(ball);
    multiClassicHandleBounce(ball);

    drawMultiPaddle(leftPaddle);
    drawMultiPaddle(rightPaddle);
    drawBallShared(ball);
}

// ================================== INPUTS ================================

function multiClassicKeyPressed() {
    if (keyCode === 27) {
        state = "menu";
        loop();
    }

    if (keyCode === 32) {
        multiClassicResetRound();
    }
}

function multiClassicMousePressed() {}

// =============================== RESET / SCORES ===========================

function multiClassicResetRound(direction = 0) {
    const ball = balls[0];
    ball.x = multiStartBall.x;
    ball.y = multiStartBall.y;

    const baseSpeedX = 3;
    const baseSpeedY = 2;

    if (direction > 0) {
        ball.velocity.x = baseSpeedX;
    } else if (direction < 0) {
        ball.velocity.x = -baseSpeedX;
    } else {
        ball.velocity.x = random([-baseSpeedX, baseSpeedX]);
    }

    ball.velocity.y = random([-baseSpeedY, baseSpeedY]);

    leftPaddle.y = height / 2;
    rightPaddle.y = height / 2;

    loop();
}

function multiClassicGameOver(winnerText) {
    background("black");

    textFont(blockFont);
    textSize(42);
    textAlign(CENTER, CENTER);
    fill("red");
    text("Game Over!", width / 2, height / 2 - 20);

    fill("white");
    textFont(blockFont);
    textSize(14);
    text(winnerText, width / 2, height / 2 + 20);

    playGameOverSound();
    noLoop();
}

// =============================== MOVEMENT =================================

function moveMultiPaddles() {
    if (keyIsDown(87)) {
        leftPaddle.y -= 6;
    }
    if (keyIsDown(83)) {
        leftPaddle.y += 6;
    }

    if (keyIsDown(UP_ARROW)) {
        rightPaddle.y -= 6;
    }
    if (keyIsDown(DOWN_ARROW)) {
        rightPaddle.y += 6;
    }

    leftPaddle.y = constrain(
        leftPaddle.y,
        leftPaddle.height / 2,
        height - leftPaddle.height / 2
    );

    rightPaddle.y = constrain(
        rightPaddle.y,
        rightPaddle.height / 2,
        height - rightPaddle.height / 2
    );
}

function drawMultiPaddle(p) {
    push();
    rectMode(CENTER);
    noStroke();
    fill("white");
    rect(p.x, p.y, p.width, p.height);
    pop();
}

// =============================== COLLISIONS ===============================

function multiClassicHandleBounce(ball) {
    if (checkOverlapShared(ball, leftPaddle)) {
        ball.velocity.x *= -1;
        ball.velocity.y += (ball.y - leftPaddle.y) * 0.08;

        playBounceSound();
    }

    if (checkOverlapShared(ball, rightPaddle)) {
        ball.velocity.x *= -1;
        ball.velocity.y += (ball.y - rightPaddle.y) * 0.08;

        playBounceSound();
    }

    if (ball.y < ball.height / 2 || ball.y > height - ball.height / 2) {
        ball.velocity.y *= -1;
        playBounceSound();
    }

    if (ball.x < -ball.width / 2) {
        rightScore++;
        playBounceSound();
        if (rightScore >= multiWinScore) {
            multiClassicGameOver("Right Player Wins! " + leftScore + " - " + rightScore);
        } else {
            multiClassicResetRound(1);
        }
        return;
    }

    if (ball.x > width + ball.width / 2) {
        leftScore++;
        playBounceSound();
        if (leftScore >= multiWinScore) {
            multiClassicGameOver("Left Player Wins! " + leftScore + " - " + rightScore);
        } else {
            multiClassicResetRound(-1);
        }
        return;
    }
}

// =============================== UI / SCORES ==============================

function drawMultiScores() {
    push();
    textFont(blockFont);
    textSize(24);
    textAlign(CENTER, TOP);
    fill("white");

    text(leftScore, width / 4, 20);
    text(rightScore, (width * 3) / 4, 20);

    textSize(12);
    text("First to " + multiWinScore, width / 2, 20);

    pop();
}
