/**
 * weird-1
 * Maxim Yakimenko
 * 
 * This a "weird" page that is not meant ot be used or understood. The goal is to scare or confuse you.
 */

"use strict";

let phrases = [
  'PLEASE READ CAREFULLY',
  'CLICK TO CONTINUE',
  'SUBJECT TO CHANGE WITHOUT NOTICE',
  'ERROR 404: MEANING NOT FOUND',
  'YOU HAVE ALREADY AGREED',
  'THIS IS NOT A BUTTON',
  'SCROLL FOR MORE NOTHING',
  'YOUR ATTENTION IS REQUIRED',
  'LOADING LOADING LOADING',
  'ACCEPT ALL',
  'DECLINE IS NOT AN OPTION',
  'THERE IS NO WARNING',
  'PRESS ANYWHERE TO MAKE THIS WORSE',
  'SUBMIT',
  'CONFIRM YOUR EXISTENCE',
  'THANK YOU FOR YOUR PATIENCE',
  'THIS TEXT MEANS NOTHING',
  'READ MORE',
  'READ LESS',
  'CLOSE THIS IF YOU CAN',
  'STATUS: UNKNOWN',
  'DO NOT SCROLL'
];

let densityLevel = 1; 

// basic canvas setup and a few variables
function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent('sketch-holder');
  angleMode(DEGREES);
  textFont('Courier New');
  textStyle(BOLD);

  background(0);
  buildWall(280);      // the initial wall of text
  drawFakeInterface(14); // a first pass of useless UI chrome on top
}

function draw() {
  //not used
}

//the wall of text generator
function buildWall(count) {
  noStroke();
  for (let i = 0; i < count; i++) {
    let phrase = random(phrases);
    let x = random(width);
    let y = random(height);
    let size = random(8, 46);
    let angle = random(-25, 25);

    // Mostly "noise"
    let useRed = random() < 0.08;
    let c = useRed
      ? color(220, 30, 30, random(120, 255))
      : color(255, random(80, 255));

    push();
    translate(x, y);
    rotate(angle);
    textSize(size);
    fill(c);
    text(phrase, 0, 0);
    pop();
  }
}

// fake ui element generation
function drawFakeInterface(count) {
  for (let i = 0; i < count; i++) {
    let kind = random(['button', 'checkbox', 'scrollbar']);
    let x = random(width);
    let y = random(height);
    let angle = random(-15, 15);

    push();
    translate(x, y);
    rotate(angle);

    if (kind === 'button') {
      let w = random(90, 170);
      let h = random(28, 44);
      stroke(255);
      strokeWeight(2);
      fill(0, 180);
      rectMode(CENTER);
      rect(0, 0, w, h);
      noStroke();
      fill(255);
      textSize(12);
      textAlign(CENTER, CENTER);
      text(random(['OK', 'SUBMIT', 'CANCEL', 'CONTINUE', 'NO']), 0, 0);
    } else if (kind === 'checkbox') {
      let s = random(16, 26);
      stroke(255);
      strokeWeight(2);
      noFill();
      rectMode(CENTER);
      rect(0, 0, s, s);
      if (random() < 0.5) {
        line(-s / 2, -s / 2, s / 2, s / 2);
        line(-s / 2, s / 2, s / 2, -s / 2);
      }
    } else {
      // a fake scrollbar track with a thumb in an arbitrary position,
      // implying a scrollable area that doesn't actually exist
      let trackLen = random(120, 260);
      stroke(120);
      strokeWeight(6);
      line(0, 0, 0, trackLen);
      let thumbY = random(20, trackLen - 20);
      stroke(255);
      strokeWeight(10);
      point(0, thumbY);
    }
    pop();
  }
  textAlign(LEFT, BASELINE);
}

//on clic, make it worse
function mousePressed() {
  densityLevel++;
  buildWall(120 + densityLevel * 20);
  drawFakeInterface(6 + densityLevel * 2);
}

//you will not escape the pain of looking at it
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
  densityLevel = 1;
  buildWall(280);
  drawFakeInterface(14);
}
