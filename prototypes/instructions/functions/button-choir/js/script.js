/**
 * button-choir
 * Maxim Yakimenko
 * 
 * A row of four singing buttons. Click one and it barks at its own pitch and squishes while it sings. Every button is an object with the same shape, and the same functions. Adding a fifth singer makes one new object and two extra lines.
 */

"use strict";
let barkSFX = undefined;

// Four buttons.
const lowButton = {
    x: 100,
    y: 200,
    size: 100,
    fill: "#e63946",
    label: "low",
    rate: 0.6,
    bounce: 0
};

const midButton = {
    x: 233,
    y: 200,
    size: 100,
    fill: "#f4a261",
    label: "mid",
    rate: 1,
    bounce: 0
};

const highButton = {
    x: 366,
    y: 200,
    size: 100,
    fill: "#2a9d8f",
    label: "high",
    rate: 1.5,
    bounce: 0
};

const squeakButton = {
    x: 500,
    y: 200,
    size: 100,
    fill: "#457b9d",
    label: "squeak",
    rate: 2.2,
    bounce: 0
};
// sound before visuals
function preload() {
    barkSFX = loadSound("assets/sounds/bark.wav");
}

// canvas and a few font aspects
function setup() {
    createCanvas(600, 400);
    textAlign(CENTER, CENTER);
    textSize(18);
    textStyle(BOLD);
}


// call to update buttons
function draw() {
    background("#f1faee");
    drawTitle();
    updateButton(lowButton);
    updateButton(midButton);
    updateButton(highButton);
    updateButton(squeakButton);
}

// helper functions
function drawTitle() {
    push();
    fill("#1d3557");
    noStroke();
    textSize(28);
    text("Button Choir", width / 2, 70);
    textSize(14);
    textStyle(NORMAL);
    text("click a singer", width / 2, 100);
    pop();
}
function updateButton(button) {
    button.bounce = lerp(button.bounce, 0, 0.1);
    drawButton(button);
}
function drawButton(button) {
    push();
    if (isMouseOver(button)) {
        stroke("#1d3557");
        strokeWeight(5);
    }
    else {
        noStroke();
    }
    fill(button.fill);
    const w = button.size + button.bounce;
    const h = button.size - button.bounce;
    ellipse(button.x, button.y, w, h);
    noStroke();
    fill("#1d3557");
    ellipse(button.x, button.y + 15, 20, 4 + button.bounce);
    fill("#f1faee");
    text(button.label, button.x, button.y - 12);
    pop();
}
function isMouseOver(button) {
    const d = dist(mouseX, mouseY, button.x, button.y);
    return d < button.size / 2;
}
function pressButton(button) {
    if (isMouseOver(button)) {
        // Play the bark at this button's own pitch
        barkSFX.rate(button.rate);
        barkSFX.play();
        // Squish!
        button.bounce = 40;
    }
}
function mousePressed() {
    pressButton(lowButton);
    pressButton(midButton);
    pressButton(highButton);
    pressButton(squeakButton);
}
