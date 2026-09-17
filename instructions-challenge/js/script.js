/**
 * Rainbow Cat
 * Maxim Yakimenko
 *
 * CAT on CAT action!
 */
"use strict";

let particles = [];

const AUTO_INTERVAL = 45; // frames between automatic explosions (~0.75s at 60fps)

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.canvas.style.background = "transparent";
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  clear(); // fully transparent each frame
  
  // background scenery
  fill(120, 60, 45); // grass green
  rect(0, height * 0.82, width, height * 0.18);

  fill(50, 15, 95, 90); // pale moon
  circle(width - 100, 90, 90);
  
  // Automatic explosion at a random spot
  if (frameCount % AUTO_INTERVAL === 0) {
    explode(random(width), random(height));
    bopCat();
  }

  // Update and draw every particle
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.update();
    p.display();
    if (p.isDead()) {
      particles.splice(i, 1);
    }
  }
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
    this.hue = random(360);
    this.alpha = 100;
    this.size = random(6, 14);
  }

  update() {
    this.pos.add(this.vel);
    this.vel.mult(0.95);
    this.vel.y += 0.15;
    this.alpha -= 2.5;
  }

  display() {
    fill(this.hue, 90, 100, this.alpha);
    circle(this.pos.x, this.pos.y, this.size);
  }

  isDead() {
    return this.alpha <= 0;
  }
}
