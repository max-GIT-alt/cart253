/**
 * locust-wheat
 * Maxim Yakimenko
 * 
 * A swarm of locusts hunts and eats stalks of wheat, which slowly regrow. Click to add a locust, you can press SPACE to remove one.
 */

"use strict";

// me stuff n'here
const wheat = [];
const locusts = [];

const WHEAT_COUNT = 60;
const STARTING_LOCUSTS = 3;

// Moses kinda shiii here, some locust some food
function setup() {
  createCanvas(640, 480);
  noStroke();
  for (let i = 0; i < WHEAT_COUNT; i++) {
    wheat.push({
      x: random(20, width - 20),
      y: random(60, height - 20),
      growth: 1 // 0 = eaten, 1 = fully grown
    });
  }
  for (let i = 0; i < STARTING_LOCUSTS; i++) {
    locusts.push(createLocust(random(width), 0));
  }
}

function draw() {
  background(210, 190, 120);
  for (let i = 0; i < wheat.length; i++) {
    growWheat(wheat[i]);
    drawWheat(wheat[i]);
  }

  for (let i = 0; i < locusts.length; i++) {
    moveLocust(locusts[i]);
    drawLocust(locusts[i]);
  }

  fill(0);
  textSize(14);
  text(`Locusts: ${locusts.length}  (click to add, SPACE to remove)`, 10, 20);
}

//no so helper functions
function createLocust(x, y) {
  return { x: x, y: y, speed: random(1, 2) };
}
function growWheat(stalk) {
  stalk.growth = min(stalk.growth + 0.001, 1);
}
function drawWheat(stalk) {
  if (stalk.growth <= 0.05) return; // basically eaten

  const h = stalk.growth * 30;
  fill(230, 180, 40);
  rect(stalk.x - 2, stalk.y - h, 4, h);
  ellipse(stalk.x, stalk.y - h, 8, 12);
}
function moveLocust(locust) {
  let target = null;
  let nearest = Infinity;
  // Search the whole wheat array for the closest edible stalk
  for (let i = 0; i < wheat.length; i++) {
    const stalk = wheat[i];
    if (stalk.growth > 0.2) {
      const d = dist(locust.x, locust.y, stalk.x, stalk.y);
      if (d < nearest) {
        nearest = d;
        target = stalk;
      }
    }
  }

  if (target) {
    // Move toward the target
    const angle = atan2(target.y - locust.y, target.x - locust.x);
    locust.x += cos(angle) * locust.speed;
    locust.y += sin(angle) * locust.speed;
    // Eat it when close
    if (nearest < 10) {
      target.growth = 0;
    }
  }
  else {
    // Nothing to eat: jitter around
    locust.x += random(-2, 2);
    locust.y += random(-2, 2);
  }
}
function drawLocust(locust) {
  fill(80, 140, 40);
  ellipse(locust.x, locust.y, 16, 8);
  fill(30, 60, 20);
  ellipse(locust.x + 7, locust.y, 6);
}
// you are the locust spawer
function mousePressed() {
  locusts.push(createLocust(mouseX, mouseY));
}
function keyPressed() {
  if (key === " ") {
    locusts.pop();
  }
}
