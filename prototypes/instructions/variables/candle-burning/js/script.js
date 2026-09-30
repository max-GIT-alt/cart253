/**
 * candle-burning
 * Maxim Yakimenko
 * 
 * A quickly shrinking candle light, that reacts to mouse proximity by becoming more random and unstable.
 */

"use strict";

// The candle wax
const candle = {
    x: 240,
    bottom: 420,
    width: 60,
    height: 260,
    maxHeight: 260,
    meltRate: 0.15
};
// The flame, uses noise to create instability
const flame = {
    size: 30,
    lit: true,
    noiseTime: 0,
    noiseSpeed: 0.05, 
    calmSpeed: 0.02,
    windySpeed: 0.4
};

// I NEED A WALL, and this is the brick
function setup() {
    createCanvas(480, 480);
}

// melting with time, spice and lime 
function draw() {
    background(15, 10, 20);

    // Melt while lit
    if (flame.lit) {
        candle.height -= candle.meltRate;
        candle.height = constrain(candle.height, 0, candle.maxHeight);
    }
    // kills the fire
    if (candle.height === 0) {
        flame.lit = false;
    }

    // instability funk
    const candleTop = candle.bottom - candle.height;
    const mouseDistance = dist(mouseX, mouseY, candle.x, candleTop);
    flame.noiseSpeed = map(mouseDistance, 0, 200, flame.windySpeed, flame.calmSpeed, true);
    flame.noiseTime += flame.noiseSpeed;

    // noise func
    const flicker = noise(flame.noiseTime);
}

function drawFlame(candleTop, flicker) {
    const flameWidth = flame.size * map(flicker, 0, 1, 0.6, 1.2);
    const flameHeight = flame.size * 2 * map(flicker, 0, 1, 0.7, 1.3);
    // A second, separate noise value for sideways sway
    const sway = map(noise(flame.noiseTime + 100), 0, 1, -8, 8);

    push();
    noStroke();
    fill(255, 140, 0);
    ellipse(candle.x + sway, candleTop - 12 - flameHeight / 2, flameWidth, flameHeight);
    fill(255, 240, 150);
    ellipse(candle.x + sway, candleTop - 12 - flameHeight / 3, flameWidth / 2, flameHeight / 2);
    pop();
}
