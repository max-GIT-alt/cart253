/**
 * clown-rain
 * Maxim Yakimenko
 * 
 * Clowns fall from the sky, each stored as an object in an array. Click a clown to pop it. Missed clowns that fall off the bottom are removed from the array. Press SPACE to make it rain moooore.
 */

"use strict";

// clowns, many clowns
const clowns = [];
// Assets
let clownImage;
let barkSound;
// honk hink 
let spawnChance = 0.03;
// The number of clowns popped
let score = 0;

// Loads the image and the sound
function preload() {
  clownImage = loadImage("assets/images/clown.png");
  barkSound = loadSound("assets/sounds/bark.wav");
}

// canvas: create 
function setup() {
  createCanvas(640, 480);
  imageMode(CENTER);
  textSize(18);
}

function draw() {
  background(150, 200, 255);
  // Maybe spawn a new clown
  if (random() < spawnChance) {
    clowns.push(createClown());
  }
  // Loop backwards so removing an item doesn't skip the next one
  for (let i = clowns.length - 1; i >= 0; i--) {
    const clown = clowns[i];
    clown.y += clown.speed;
    clown.angle += clown.spin;
    drawClown(clown);

    if (clown.y > height + 50) {
      clowns.splice(i, 1);
    }
  }

  fill(0);
  textAlign(LEFT, TOP);
  text(`Popped: ${score}   On screen: ${clowns.length}`, 10, 10);
}

// where do clowns come from?
function createClown() {
  return {
    x: random(30, width - 30),
    y: -40,
    size: random(30, 90),
    speed: random(1, 4),
    angle: random(TWO_PI),
    spin: random(-0.05, 0.05)
  };
}
function drawClown(clown) {
  push();
  translate(clown.x, clown.y);
  rotate(clown.angle);
  image(clownImage, 0, 0, clown.size, clown.size);
  pop();
}
function mousePressed() {
  // Check from the end so the clown drawn on top is popped first
  for (let i = clowns.length - 1; i >= 0; i--) {
    const clown = clowns[i];
    if (dist(mouseX, mouseY, clown.x, clown.y) < clown.size / 2) {
      clowns.splice(i, 1);
      score++;
      barkSound.rate(random(0.6, 1.6));
      barkSound.play();
      break; // only pop one per click
    }
  }
}

//SPACE me up Jimmy
function keyPressed() {
  if (key === " ") {
    spawnChance = min(spawnChance + 0.02, 0.3);
  }
}
