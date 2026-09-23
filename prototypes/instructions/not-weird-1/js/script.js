/**
 * not-weird-1 Prototyping
 * Maxim Yakimenko
 * 
 * A demonstration of a normal stylistic website using the p5 library on the topic of Piet Mondrian's work.
 * This is the logic script of the project
 */

"use strict";

let mondrianColors;
let lineWeight = 10;

// creates the main interactive element via canvas, and provides base variables for the rest of the JS
function setup() {
  let holder = document.getElementById('sketch-holder');
  let side = min(holder.clientWidth, holder.clientHeight, 500);
  let cnv = createCanvas(side, side);
  cnv.parent('sketch-holder');
  colorMode(RGB, 255);
  // Mondrian's restricted palette: white, black, and the three primaries
  mondrianColors = {
    white: color(250, 250, 245),
    black: color(20, 20, 20),
    red: color(210, 30, 30),
    yellow: color(240, 200, 20),
    blue: color(20, 60, 160)
  };

  noLoop(); // the "screenshot" presenting his style
  drawComposition();
}

function draw() {
  //empty, we don't want animations for this case
  background(mondrianColors.white);

  // Start with the whole canvas as one region, then recursively split it
  // into smaller rectangles a random number of times
  let region = { x: 0, y: 0, w: width, h: height };
  let rects = splitRegion(region, 4); // 4 levels of recursive splitting

  // Fill each final rectangle
  for (let r of rects) {
    let roll = random();
    let fillColor;
    if (roll < 0.62) {
      fillColor = mondrianColors.white;
    } else if (roll < 0.76) {
      fillColor = mondrianColors.red;
    } else if (roll < 0.9) {
      fillColor = mondrianColors.yellow;
    } else {
      fillColor = mondrianColors.blue;
    }

    noStroke();
    fill(fillColor);
    rect(r.x, r.y, r.w, r.h);
  }

  // Draw the grid on every region boundary
  stroke(mondrianColors.black);
  strokeWeight(lineWeight);
  for (let r of rects) {
    noFill();
    rect(r.x, r.y, r.w, r.h);
  }
}

function drawComposition() {
  

}
