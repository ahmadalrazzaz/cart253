/**
 * Black Hole Pong variation
 */

"use strict";

// ================================== STATE ==================================

let blackHoleStartBall;
let blackHoleStartPaddleX;

let blackHoleX;
let blackHoleY;
const blackHoleRadius = 20;
const blackHoleGravity = 0.15;

// ================================== SETUP ==================================

function blackHoleSetup() {
    const mainBall = makeBall(width / 2, 40, 1.5, 3);
    setBalls([mainBall]);

    blackHoleStartBall = {
        x: mainBall.x,
        y: mainBall.y,
        vx: mainBall.velocity.x,
        vy: mainBall.velocity.y
    };

    blackHoleStartPaddleX = width / 2;
    paddle.x = blackHoleStartPaddleX;

    blackHoleX = width / 2;
    blackHoleY = height / 2;

    score = 0;

    loop();
}

// ================================== DRAW ===================================

function blackHoleDraw() {
    background("#000000ff");

    displayScore();
    movePaddleShared();

    const ball = balls[0];

    blackHoleDrawHole();
    drawPaddleShared();
    drawBallShared(ball);

    moveBallShared(ball);

    blackHoleApplyGravity(ball);
    blackHoleHandlePhysics(ball);

}

// ================================== INPUTS =================================

function blackHoleKeyPressed() {
    if (keyCode === 27) {
        state = "menu";
        loop();
    }

    if (keyCode === 32) {
        blackHoleResetGame();
    } 
}

function blackHoleMousePressed() {
}

// =============================== RESET / LOGIC ==============================

function blackHoleResetGame() {
    score = 0;

    const ball = balls[0];
    ball.x = blackHoleStartBall.x;
    ball.y = blackHoleStartBall.y;
    ball.velocity.x = blackHoleStartBall.vx;
    ball.velocity.y = blackHoleStartBall.vy;

    paddle.x = blackHoleStartPaddleX;

    loop();
}

function blackHoleApplyGravity(ball) {
    if (
        ball.y < blackHoleY + 50 && ball.y > blackHoleY - 50 &&
        ball.x < blackHoleX + 125 && ball.x > blackHoleX - 125
    ) {
        const dx = blackHoleX - ball.x;
        const dy = blackHoleY - ball.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        const dirX = Math.sign(dx);
        ball.velocity.x += dirX * blackHoleGravity;

        const dirY = dy / distance;
        ball.velocity.y += dirY * (blackHoleGravity * 0.6);
    }
}



function blackHoleHandlePhysics(ball) {
    if (checkOverlapShared(ball, paddle)) {
        ball.velocity.y *= -1;

        ball.velocity.x += (ball.x - paddle.x) * 0.12;

        score++;

        playBounceSound();
    }

    if (ball.y < ball.height / 2) {
        ball.velocity.y *= -1;
        playBounceSound();
    }

    if (ball.x < ball.width || ball.x > width - ball.width) {
        ball.velocity.x *= -1;
        playBounceSound();
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

        playGameOverSound();

        noLoop();
    }
}

// =============================== DRAW HELPERS ===============================

function blackHoleDrawHole() {
    push();
    noStroke();

    for (let r = blackHoleRadius * 1.4; r > blackHoleRadius; r -= 6) {
        const alpha = map(r, blackHoleRadius, blackHoleRadius * 1.4, 10, 80);
        fill(150, 0, 255, alpha);
        ellipse(blackHoleX, blackHoleY, r * 2, r * 2);
    }

    fill(20);
    ellipse(blackHoleX, blackHoleY, blackHoleRadius * 2, blackHoleRadius * 2);

    fill(0);
    ellipse(blackHoleX, blackHoleY, blackHoleRadius * 1.4, blackHoleRadius * 1.4);

    pop();
}
