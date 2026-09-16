/**
 * instructions-challenge
 * Maxim Yakimenko
 * 
 * simple demo of p5 options and cats
 */

"use strict";

//setup handles canvas gen

let particles = [];

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100); // hue/sat/brightness/alpha makes rainbow colors easy
  noStroke();
}

function draw() {
  background(0, 0, 10, 25); // dark background, low alpha = motion-trail fade

  // Update and draw every particle, remove dead ones
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.update();
    p.display();
    if (p.isDead()) {
      particles.splice(i, 1);
    }
  }
}

function mousePressed() {
  explode(mouseX, mouseY);
  bopCat();
}

// Spawns a burst of rainbow particles at (x, y)
function explode(x, y) {
  const count = 60;
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(x, y));
  }
}

// Adds a quick CSS "bop" to the bongo cat image
function bopCat() {
  const cat = document.getElementById("bongoCat");
  if (!cat) return;
  cat.classList.add("bop");
  setTimeout(() => cat.classList.remove("bop"), 90);
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    const angle = random(TWO_PI);
    const speed = random(2, 8);
    this.vel = p5.Vector.fromAngle(angle).mult(speed);
    this.hue = random(360); // random point around the color wheel = rainbow
    this.alpha = 100;
    this.size = random(6, 14);
  }

  update() {
    this.pos.add(this.vel);
    this.vel.mult(0.95); // friction
    this.vel.y += 0.15;  // gentle gravity
    this.alpha -= 2.5;   // fade out over time
  }

  display() {
    fill(this.hue, 90, 100, this.alpha);
    circle(this.pos.x, this.pos.y, this.size);
  }

  isDead() {
    return this.alpha <= 0;
  }
}
