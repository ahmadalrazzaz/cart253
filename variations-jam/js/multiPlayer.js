"use strict";

const multiplayerButtons = [
    { label: "Classic",    mode: "multiClassic",   hotkey: "a" },
    { label: "Black Hole",    mode: "multiBlackHole",   hotkey: "b" },

];

function multiplayerDraw() {
    image(multiMenu, 0, 0, width, height);

    drawmultiplayerButtons();

    push();
    fill(180);
    textFont(blockFont);
    textSize(10);
    textAlign(CENTER, CENTER);
    text("Click a mode • A/B • ESC to go back", width / 2, height - 30);
    pop();
}

function drawmultiplayerButtons() {
    const btnWidth = 280;
    const btnHeight = 70;

    const startY = 180;
    const spacing = 80;

    for (let i = 0; i < multiplayerButtons.length; i++) {
        const x = width / 2;
        const y = startY + i * spacing;
        const btn = multiplayerButtons[i];

        drawmultiplayerButton(x, y, btnWidth, btnHeight, btn.label);
    }
}

function drawmultiplayerButton(x, y, w, h, label) {
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

function multiplayerMousePressed() {
    const btnWidth = 280;
    const btnHeight = 70;

    const startY = 180;
    const spacing = 80;

    for (let i = 0; i < multiplayerButtons.length; i++) {
        const x = width / 2;
        const y = startY + i * spacing;
        const btn = multiplayerButtons[i];

        const hovering =
            mouseX > x - btnWidth / 2 && mouseX < x + btnWidth / 2 &&
            mouseY > y - btnHeight / 2 && mouseY < y + btnHeight / 2;

        if (hovering) {
            state = btn.mode;

            if (btn.mode === "multiClassic" && typeof multiClassicSetup === "function") {
                multiClassicSetup();
            }
            else if (btn.mode === "multiBlackHole" && typeof multiBlackHoleSetup === "function") {
                multiBlackHoleSetup();
            }

            return;
        }
    }
}

function multiplayerKeyPressed() {
    if (keyCode === 27) {
        state = "menu";
        return;
    }

    const pressed = key.toLowerCase();

    for (const btn of multiplayerButtons) {
        if (pressed === btn.hotkey) {
            state = btn.mode;

            if (btn.mode === "multiClassic" && typeof multiClassicSetup === "function") {
                multiClassicSetup();
            } 
            else if (btn.mode === "multiBlackHole" && typeof multiBlackHoleSetup === "function") {
                multiBlackHoleSetup();
            }

            break;
        }
    }
}
