"use strict";

function menuDraw() {
    image(menuBg, 0, 0, width, height);

    drawMainMenuButtons();

    push();
    fill(180);
    textFont(blockFont);
    textSize(10);
    textAlign(CENTER, CENTER);
    text("Click a category or press 1 / 2", width / 2, height - 30);
    pop();
}

function drawMainMenuButtons() {
    const btnWidth = 280;
    const btnHeight = 70;

    const singleX = width / 2;
    const singleY = 260;

    const multiX = width / 2;
    const multiY = 350;

    drawMainMenuButton(singleX, singleY, btnWidth, btnHeight, "Single Player");
    drawMainMenuButton(multiX, multiY, btnWidth, btnHeight, "Multiplayer");
}

function drawMainMenuButton(x, y, w, h, label) {
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
    textFont(blockFont);
    textSize(18);
    text(label, x, y);
    pop();
}

// -------- INPUTS --------

function menuMousePressed() {
    const btnWidth = 280;
    const btnHeight = 70;

    const singleX = width / 2;
    const singleY = 260;

    const multiX = width / 2;
    const multiY = 350;

    if (
        mouseX > singleX - btnWidth / 2 && mouseX < singleX + btnWidth / 2 &&
        mouseY > singleY - btnHeight / 2 && mouseY < singleY + btnHeight / 2
    ) {
        state = "singlePlayer";
        return;
    }

    if (
        mouseX > multiX - btnWidth / 2 && mouseX < multiX + btnWidth / 2 &&
        mouseY > multiY - btnHeight / 2 && mouseY < multiY + btnHeight / 2
    ) {
        state = "multiPlayer";
        return;
    }
}

function menuKeyPressed() {
    const k = key;

    if (k === "1") {
        state = "singlePlayer";
    } else if (k === "2") {
        state = "multiPlayer";
    }
}
