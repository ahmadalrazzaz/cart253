"use strict";

const singleplayerButtons = [
    { label: "Original",  mode: "original",     hotkey: "a" },
    { label: "Double Ball",    mode: "doubleBall",   hotkey: "b" },
    { label: "Brick Breaker",  mode: "brickBreaker", hotkey: "c" },
    { label: "Black Hole",     mode: "blackHole",    hotkey: "d" }
];

function singleplayerDraw() {
    image(singleMenu, 0, 0, width, height);

    drawsingleplayerButtons();

    push();
    fill(180);
    textFont(blockFont);
    textSize(10);
    textAlign(CENTER, CENTER);
    text("Click a mode • A/B/C/D • ESC to go back", width / 2, height - 30);
    pop();
}

function drawsingleplayerButtons() {
    const btnWidth = 280;
    const btnHeight = 70;

    const startY = 180;
    const spacing = 80;

    for (let i = 0; i < singleplayerButtons.length; i++) {
        const x = width / 2;
        const y = startY + i * spacing;
        const btn = singleplayerButtons[i];

        drawsingleplayerButton(x, y, btnWidth, btnHeight, btn.label);
    }
}

function drawsingleplayerButton(x, y, w, h, label) {
    const hovering =
        mouseX > x - w / 2 && mouseX < x + w / 2 &&
        mouseY > y - h / 2 && mouseY < y + h / 2;

    push();
    imageMode(CENTER);

    if (hovering) {
        image(btnHover, x, y, w, h);
    } else {
        image(btnNormal, x, y, w, h);
    }

    fill(0);
    textAlign(CENTER, CENTER);
    textSize(18);
    textFont(blockFont);
    text(label, x, y);
    pop();
}


// -------- INPUTS --------

function singleplayerMousePressed() {
    const btnWidth = 280;
    const btnHeight = 70;

    const startY = 180;
    const spacing = 80;

    for (let i = 0; i < singleplayerButtons.length; i++) {
        const x = width / 2;
        const y = startY + i * spacing;
        const btn = singleplayerButtons[i];

        const hovering =
            mouseX > x - btnWidth / 2 && mouseX < x + btnWidth / 2 &&
            mouseY > y - btnHeight / 2 && mouseY < y + btnHeight / 2;

        if (hovering) {
            state = btn.mode;

            if (btn.mode === "original") {
                originalSetup();
            } else if (btn.mode === "doubleBall") {
                doubleBallSetup();
            } else if (btn.mode === "brickBreaker") {
                brickBreakerSetup();
            } else if (btn.mode === "blackHole") {
                blackHoleSetup();
            }

            return;
        }
    }
}

function singleplayerKeyPressed() {
    if (keyCode === 27) {
        state = "menu";
        return;
    }

    const pressed = key.toLowerCase();

    for (const btn of singleplayerButtons) {
        if (pressed === btn.hotkey) {
            state = btn.mode;

            if (btn.mode === "original") {
                originalSetup();
            } else if (btn.mode === "doubleBall") {
                doubleBallSetup();
            } else if (btn.mode === "brickBreaker") {
                brickBreakerSetup();
            } else if (btn.mode === "blackHole") {
                blackHoleSetup();
            }

            break;
        }
    }
}
