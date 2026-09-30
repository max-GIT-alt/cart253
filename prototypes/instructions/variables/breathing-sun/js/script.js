/**
 * breathing-sun
 * Maxim Yakimenko
 * 
 * A cyclic exploration of a sun orb growing and shrinking, while being sensitive to mouse movements and proximity.
 */

"use strict";

// sun is here
const sun = {
    x: 240,
    y: 240,
    size: 100, // Changes every frame
    minSize: 80,
    maxSize: 220,
    breath: 0, // An ever-increasing angle that we feed into sin()
    breathSpeed: 0.02, // How much breath increases each frame (set by the mouse)
    fill: {
        r: 255,
        g: 200, // Changes with the breath
        b: 0
    }
};
// skynet
const sky = {
    r: 20,
    g: 20,
    b: 60 // Changes with the breath
};

//canvas, we just need a wall
function setup() {
    createCanvas(480, 480);
}

// "breating"
function draw() {
    sun.breathSpeed = map(mouseY, 0, height, 0.005, 0.15, true);
    sun.breath += sun.breathSpeed;

    const breathAmount = sin(sun.breath);
    sun.size = map(breathAmount, -1, 1, sun.minSize, sun.maxSize);
    sun.fill.g = map(breathAmount, -1, 1, 120, 230);
    sky.b = map(breathAmount, -1, 1, 40, 120);
    const glowWeight = map(breathAmount, -1, 1, 2, 30);

    background(sky.r, sky.g, sky.b);
    drawGlow(glowWeight);
    drawSun();
}

//helper functions
function drawGlow(weight) {
    push();
    noFill();
    stroke(sun.fill.r, sun.fill.g, sun.fill.b, 80);
    strokeWeight(weight);
    ellipse(sun.x, sun.y, sun.size * 1.4);
    pop();
}
function drawSun() {
    push();
    noStroke();
    fill(sun.fill.r, sun.fill.g, sun.fill.b);
    ellipse(sun.x, sun.y, sun.size);
    pop();
}
