/**
 * functions_firefly-field
 * Maxim Yakimenko
 * 
 * Five fireflies fly over a dark hill. They get curious and move toward the mouse when it's close.
 */

"use strict";
const CURIOUS_DISTANCE = 140;
//  swarm
let firefly1 = undefined;
let firefly2 = undefined;
let firefly3 = undefined;
let firefly4 = undefined;
let firefly5 = undefined;
let sky = undefined;

// canvas, sky, and firefly spawn
function setup() {
    createCanvas(600, 400);
    sky = color("#0b1026");
    createAllFireflies();
}

// create the objects
function draw() {
    background(sky);
    drawGrass();
    updateFirefly(firefly1);
    updateFirefly(firefly2);
    updateFirefly(firefly3);
    updateFirefly(firefly4);
    updateFirefly(firefly5);
}

// helper functions
function createAllFireflies() {
    firefly1 = createFirefly();
    firefly2 = createFirefly();
    firefly3 = createFirefly();
    firefly4 = createFirefly();
    firefly5 = createFirefly();
}
function createFirefly() {
    const firefly = {
        x: random(0, width),
        y: random(0, height),
        size: random(8, 14),
        velocity: {
            x: random(-1.5, 1.5),
            y: random(-1.5, 1.5)
        },
        // drift
        jitter: random(0.05, 0.2),
        glow: randomGlowColour(),
        blinkSpeed: random(0.02, 0.08),
        blinkOffset: random(0, TWO_PI)
    };
    return firefly;
}
function randomGlowColour() {
    const r = random(180, 255);
    const g = random(220, 255);
    const b = random(40, 120);
    return color(r, g, b);
}
function getBrightness(firefly) { //how bright it is
    const wave = sin(frameCount * firefly.blinkSpeed + firefly.blinkOffset);
    return map(wave, -1, 1, 0, 1);
}
function drawGrass() {
    push();
    noStroke();
    fill("#132a13");
    ellipse(width / 2, height + 120, width * 1.6, 300);
    pop();
}
function updateFirefly(firefly) {
    moveFirefly(firefly);
    drawFirefly(firefly);
}
function moveFirefly(firefly) {
    firefly.velocity.x += random(-firefly.jitter, firefly.jitter);
    firefly.velocity.y += random(-firefly.jitter, firefly.jitter);
    const d = dist(firefly.x, firefly.y, mouseX, mouseY);
    if (d < CURIOUS_DISTANCE) {
        firefly.velocity.x += (mouseX - firefly.x) * 0.002;
        firefly.velocity.y += (mouseY - firefly.y) * 0.002;
    }
    firefly.velocity.x = constrain(firefly.velocity.x, -2, 2);
    firefly.velocity.y = constrain(firefly.velocity.y, -2, 2);
    firefly.x += firefly.velocity.x;
    firefly.y += firefly.velocity.y;
    firefly.x = wrap(firefly.x, 0, width);
    firefly.y = wrap(firefly.y, 0, height);
}
function wrap(value, min, max) {
    if (value < min) {
        return max;
    }
    else if (value > max) {
        return min;
    }
    else {
        return value;
    }
}
function drawFirefly(firefly) {
    const brightness = getBrightness(firefly);
    push();
    noStroke();
    const glow = color(firefly.glow);
    glow.setAlpha(brightness * 130);
    fill(glow);
    ellipse(firefly.x, firefly.y, firefly.size * 4);
    const tail = color(firefly.glow);
    tail.setAlpha(80 + brightness * 175);
    fill(tail);
    ellipse(firefly.x, firefly.y, firefly.size);
    fill("#2b2b2b");
    ellipse(firefly.x - firefly.size * 0.3, firefly.y - firefly.size * 0.3, firefly.size * 0.5);
    pop();
}
function mousePressed() {
    createAllFireflies();
}
