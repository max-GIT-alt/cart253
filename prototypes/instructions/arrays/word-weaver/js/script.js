/**
 * word-weaver
 * Maxim Yakimenko
 * 
 * Arrays of words are combined at random into a poem. Click to add a line, press "<-" to clear.
 */

"use strict";

// ink, for the poem
const adjectives = ["quiet", "electric", "sleepy", "enormous", "tiny", "borrowed", "golden"];
const nouns = ["locust", "teapot", "river", "astronaut", "lighthouse", "sandwich", "ghost"];
const verbs = ["whispers to", "dreams of", "argues with", "waves at", "hides from", "dances past"];
const places = ["the moon", "a parking lot", "the library", "tomorrow", "the deep sea", "my cousin"];
const poem = [];
const MAX_LINES = 12;

// canvas, the paper
function setup() {
  createCanvas(640, 480);
  textFont("Georgia");
  textAlign(LEFT, TOP);
  addLine();
}

function draw() {
  background(250, 245, 230);
  fill(120);
  textSize(14);
  text("Click to add a line. BACKSPACE to clear.", 20, 12);
  textSize(24);
  for (let i = 0; i < poem.length; i++) {
    // Newer lines (lower index) are darker
    const shade = map(i, 0, MAX_LINES, 20, 200);
    fill(shade);
    text(poem[i], 20, 50 + i * 34);
  }
}

function pickRandom(array) {
  return random(array);
}
function addLine() {
  const line = `The ${pickRandom(adjectives)} ${pickRandom(nouns)} ${pickRandom(verbs)} ${pickRandom(places)}.`;
  poem.unshift(line);
  // Remove the oldest line if there are too many
  if (poem.length > MAX_LINES) {
    poem.pop();
  }
}
function mousePressed() {
  addLine();
}
function keyPressed() {
  if (keyCode === BACKSPACE) {
    poem.length = 0;
    addLine();
  }
}
