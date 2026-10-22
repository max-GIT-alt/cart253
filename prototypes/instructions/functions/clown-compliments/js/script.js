/**
 * functions_clown-compliment
 * Maxim Yakimenko
 * 
 * Three clowns are on a stage. Click one and it will pay you a randomly generated compliment.
 */

"use strict";
// How long a compliment stays on screen
const MESSAGE_DURATION = 150;
// compliments
const openers = ["Wow,", "Honestly,", "Hey!", "Psst...", "Listen,"];
const subjects = ["your hair", "your laugh", "your code", "your vibe", "your shoes"];
const praises = ["is magnificent", "sparkles", "is so 1984", ":D", "is perfect"];

// object definition
let clownImage = undefined;
let leftClown = undefined;
let middleClown = undefined;
let rightClown = undefined;

function preload() {
    clownImage = loadImage("assets/images/clown.png");
}
//honkers movement logic
function createClown(x, y, size, speed) {
    const clown = {
        x: x,
        y: y,
        size: size,
        velocity: {
            x: speed
        },
        message: "",
      messageTimer: 0
    };
    return clown;
}


// canvas, and clown spawns
function setup() {
    createCanvas(600, 400);
    imageMode(CENTER);
    textAlign(CENTER, CENTER);
    // Each clown has set spawns
    leftClown = createClown(120, 280, 90, 2);
    middleClown = createClown(300, 280, 110, -3);
    rightClown = createClown(480, 280, 80, 1.2);
}

// frequent updates on objects
function draw() {
    background("#ffe5ec");
    drawStage();
    updateClown(leftClown);
    updateClown(middleClown);
    updateClown(rightClown);
}

//helper functions
function drawStage() {
    push();
    noStroke();
    fill("#9c6644");
    rect(0, 330, width, height - 330);
    fill("#7f5539");
    rect(0, 330, width, 10);
    fill("#590d22");
    textSize(26);
    textStyle(BOLD);
    text("Clown Compliments", width / 2, 40);
    textSize(14);
    textStyle(NORMAL);
    text("click a clown, you deserve it", width / 2, 68);
    pop();
}
function updateClown(clown) {
    moveClown(clown);
    drawClown(clown);
    drawMessage(clown);
}
function moveClown(clown) {
    if (clown.messageTimer > 0) {
        clown.messageTimer -= 1;
        return;
    }
    clown.x += clown.velocity.x;
    const halfSize = clown.size / 2;
    if (clown.x < halfSize || clown.x > width - halfSize) {
        clown.velocity.x *= -1;
        // edge logic
        clown.x = constrain(clown.x, halfSize, width - halfSize);
    }
}
function drawClown(clown) {
    let bob = 0;
    if (clown.messageTimer === 0) {
        bob = abs(sin(frameCount * 0.15 + clown.x * 0.05)) * 8;
    }
    image(clownImage, clown.x, clown.y - bob, clown.size, clown.size);
}
function drawMessage(clown) {
    if (clown.messageTimer === 0) {
        return;
    }
    const bubbleWidth = 190;
    const bubbleX = constrain(clown.x, bubbleWidth / 2 + 5, width - bubbleWidth / 2 - 5);
    const bubbleY = clown.y - clown.size / 2 - 45;
    push();
    rectMode(CENTER);
    fill(255);
    stroke("#590d22");
    strokeWeight(2);
    rect(bubbleX, bubbleY, bubbleWidth, 56, 12);
    noStroke();
    fill("#590d22");
    textSize(13);
    text(clown.message, bubbleX, bubbleY, bubbleWidth - 16, 50);
    pop();
}
function makeCompliment() {
    return random(openers) + " " + random(subjects) + " " + random(praises) + "!";
}
function checkClown(clown) {
    const d = dist(mouseX, mouseY, clown.x, clown.y);
    if (d < clown.size / 2) {
        clown.message = makeCompliment();
        clown.messageTimer = MESSAGE_DURATION;
    }
}
function mousePressed() {
    checkClown(leftClown);
    checkClown(middleClown);
    checkClown(rightClown);
}
