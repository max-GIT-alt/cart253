/**
 * not-weird-2 Prototyping
 * Maxim Yakimenko
 * 
 * A demonstration of a normal stylistic website using the p5 library on the topic of Kazimir Malevich's work.
 * This is the JS page this project handling logic
 */

"use strict";

// basic setup of the canvas, the colors, and a few variables
function setup() {
  let holder = document.getElementById('sketch-holder');
  let side = min(holder.clientWidth || 500, 500);
  let cnv = createCanvas(side, side);
  cnv.parent('sketch-holder');
  colorMode(RGB, 255);

  suprematistColors = [
    color(20, 20, 20),    // black
    color(213, 0, 28),    // red
    color(185, 183, 174), // gray
    color(30, 80, 170)    // blue accent
  ];

  angleMode(DEGREES);
  noLoop(); // a still "screenshot" of an imagined interactive piece
  drawComposition();
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
  background(247, 246, 242); // plain, near-white ground

  // One large, mostly-centered black square, as an homage to
  // Malevich's "Black Square"
  push();
  translate(width * 0.55, height * 0.45);
  rotate(random(-15, 15));
  fill(20, 20, 20);
  noStroke();
  rectMode(CENTER);
  rect(0, 0, width * 0.32, width * 0.32);
  pop();
}
