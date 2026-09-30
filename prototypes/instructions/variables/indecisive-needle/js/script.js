/**
 * indecisive-needle
 * Maxim Yakimenko
 * 
 * A compass that follows the cursor, with a minor amount of extra physics to simulate a real compass.
 */

"use strict";

// The needle
const needle = {
    x: 240,
    y: 240,
    length: 160,
    angle: 0,
    easing: 0.05, // Fraction of the remaining turn to make each frame
    doubt: 1.2, // Max radians the noise can push 
    minWeight: 1,
    maxWeight: 12
};

// NOISE
const hesitation = {
    time: 0,
    speed: 0.01
};

// This is the brick in my WALL
function setup() {
  createCanvas(480, 480);
}

// draws needle, moves needle
function draw() {
    background(240, 235, 220);

    const mouseSpeed = dist(mouseX, mouseY, pmouseX, pmouseY);
    needle.doubt = map(mouseSpeed, 0, 30, 1.5, 0.05, true);

    // The angle from the needle's centre to the mouse
    const targetAngle = atan2(mouseY - needle.y, mouseX - needle.x);

    // Noise pushes the target
    hesitation.time += hesitation.speed;
    const wobble = map(noise(hesitation.time), 0, 1, -needle.doubt, needle.doubt);

    // How far we still have to turn
    let turn = (targetAngle + wobble) - needle.angle;
    turn = atan2(sin(turn), cos(turn));
    // Easing
    needle.angle += turn * needle.easing;

    drawDial();
    drawNeedle();
}
function drawDial() {
    push();
    translate(needle.x, needle.y);
    fill(255);
    stroke(60);
    strokeWeight(2);
    ellipse(0, 0, needle.length * 2 + 40);

    for (let i = 0; i < 12; i++) {
        push();
        rotate(i * TWO_PI / 12);
        line(needle.length + 5, 0, needle.length + 15, 0);
        pop();
    }
    pop();
}
// it's thicker, sometimes :)
function drawNeedle() {
    const weight = map(needle.doubt, 0.05, 1.5, needle.maxWeight, needle.minWeight);
    push();
    translate(needle.x, needle.y);
    rotate(needle.angle);
    strokeCap(ROUND);
    stroke(200, 40, 40);
    strokeWeight(weight);
    line(0, 0, needle.length, 0);
    stroke(60);
    line(0, 0, -needle.length / 2, 0);
    noStroke();
    fill(30);
    ellipse(0, 0, 14);
    pop();
}
