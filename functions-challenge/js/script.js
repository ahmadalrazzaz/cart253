/**
 * Functions Challenge
 * Ahmad AlRazzaz
 */

"use strict";

let restartButton;
let score = 0;

// Starting positions
let startBall;
let startBall2;
let startPaddle;

// Our ball
const ball = {
    x: 300,
    y: 20,
    width: 10,
    height: 10,
    velocity: {
        x: 0,
        y: 3
    }
};

// second ball
const ball2 = {
    x: 100,
    y: 20,
    width: 10,
    height: 10,
    velocity: {
        x: 2,
        y: 1
    }
};

// Our paddle
const paddle = {
    x: 300,
    y: 280,
    width: 80,
    height: 10
};


/**
 * Create the canvas
*/
function setup() {
    createCanvas(600, 300);

    // Store starting positions
    startBall = {
        x: ball.x,
        y: ball.y,
        velocity: {
            x: ball.velocity.x,
            y: ball.velocity.y
        }
    };

    startBall2 = {
        x: ball2.x,
        y: ball2.y,
        velocity: {
            x: ball2.velocity.x,
            y: ball2.velocity.y
        }
    };
    
    startPaddle = {
        x: paddle.x
    };

    // Create restart button
    restartButton = createButton("Restart Game");
    restartButton.position(0, height + 10);
    restartButton.size(200, 50);
    restartButton.mousePressed(resetGame);
}


/**
 * Move and display the ball and paddle
*/
function draw() {
    background("#000000ff");

    displayScore();

    movePaddle(paddle);
    moveBall(ball);
    moveBall(ball2);

    handleBounce(ball, paddle);
    handleBounce(ball2, paddle);

    drawPaddle(paddle);
    drawBall(ball);
    drawBall(ball2);

}

function resetGame() {
    score = 0;

    // Reset ball 1 to starting position and velocity
    ball.x = startBall.x;
    ball.y = startBall.y;
    ball.velocity.x = startBall.velocity.x;
    ball.velocity.y = startBall.velocity.y;

    // Reset ball 2 to starting position and velocity
    ball2.x = startBall2.x;
    ball2.y = startBall2.y;
    ball2.velocity.x = startBall2.velocity.x;
    ball2.velocity.y = startBall2.velocity.y;

    // Reset paddle to starting position
    paddle.x = startPaddle.x;


    loop();
}

function displayScore() {
    push();
    fill("white");
    textSize(32);
    textFont("Courier New");
    textAlign(LEFT, TOP);
    text(score, 10, 10);
    pop();
}

/**
 * Moves the paddle
 */
function movePaddle(paddle) {
    if (keyIsDown(LEFT_ARROW)) {
        paddle.x -= 4;
    }

    if (keyIsDown(RIGHT_ARROW)) {
        paddle.x += 4;
    }

    // Constrain the paddle to the canvas
    paddle.x = constrain(paddle.x, paddle.width / 2, width - paddle.width / 2);

}

/**
 * Moves the ball passed in as a parameter
 */
function moveBall(ball) {
    ball.y += ball.velocity.y;
    ball.x += ball.velocity.x;
}

/**
 * Bounces the provided ball off the provided paddle
 */
function handleBounce(ball, paddle) {
    if (checkOverlap(ball, paddle)) {
        ball.velocity.y *= -1;
        ball.velocity.x += (ball.x - paddle.x) * 0.1;

        ball.velocity.x = constrain(ball.velocity.x, -5, 5);
        
        score++; // Increase score on successful bounce
    }

    if (ball.y < ball.height/2) {
        ball.velocity.y *= -1;
    }

    if (ball.x < ball.width/2 || ball.x > width - ball.width/2) {
        ball.velocity.x *= -1;
    }

    // Game Over when ball goes to the bottom
    if (ball.y > height + ball.height/2) {
        background("black");
        textSize(64);
        textAlign(CENTER, CENTER);
        fill("red");
        text("Game Over!", width/2, height/2);
        noLoop();
    }
}

/**
 * Draws the specified paddle on the canvas
 */
function drawPaddle(paddle) {
    push();
    rectMode(CENTER);
    noStroke();
    fill("white");
    rect(paddle.x, paddle.y, paddle.width, paddle.height);
    pop();
}

/**
 * Draws the specified ball on the canvas
 */
function drawBall(ball) {
    push();
    rectMode(CENTER);
    noStroke();
    fill("white");
    rect(ball.x, ball.y, ball.width, ball.height);
    pop();
}

/**
 * Returns true if rectA and rectB overlap, and false otherwise
 * Assumes rectA and rectB have properties x, y, width and height to describe
 * their rectangles, and that rectA and rectB are displayed CENTERED on their
 * x,y coordinates.
 */
function checkOverlap(rectA, rectB) {
  return (rectA.x + rectA.width/2 > rectB.x - rectB.width/2 &&
          rectA.x - rectA.width/2 < rectB.x + rectB.width/2 &&
          rectA.y + rectA.height/2 > rectB.y - rectB.height/2 &&
          rectA.y - rectA.height/2 < rectB.y + rectB.height/2);
}