/**
 * conditionals-prototype-3-goldilocks-plant
 * Maxim Yakimenko
 * 
 * A plant with strong preferences. Move the mouse left/right to move the sun and hold the mouse button to water. The plant only grows when water and light are both in their "just right" range 
 */

"use strict";

// What part of the story are we in? "growing", "bloomed" or "dead"
let state = "growing";

// The plant
const plant = {
    x: 320,
    groundY: 400,
    height: 10,
    maxHeight: 220,
    growSpeed: 0.25,
    // Water from 0 (bone dry) to 100 (drowning)
    water: 50,
    waterDrain: 0.08,
    waterRate: 0.6,
    // The comfortable range for water
    minWater: 35,
    maxWater: 70,
    // Health from 0 (dead) to 100 (thriving)
    health: 100,
    // The colour of the flower it will bloom (chosen when planted)
    flowerColour: undefined
};

// The sun's light level from 0 to 100, set by the mouse
let light = 50;
// The comfortable range for light
const minLight = 30;
const maxLight = 75;

// A little bit of narration
let message = "";

/**
 * Creates the canvas and plants the first seed
 */
function setup() {
    createCanvas(640, 480);
    plantSeed();
}

/**
 * Resets the plant to a fresh seed
 */
function plantSeed() {
    state = "growing";
    plant.height = 10;
    plant.water = 50;
    plant.health = 100;
    // Every plant is a little different
    plant.flowerColour = color(random(150, 255), random(50, 200), random(100, 255));
}

/**
 * Runs whichever part of the story we're in
 */
function draw() {
    if (state === "growing") {
        growing();
    }
    else if (state === "bloomed") {
        bloomed();
    }
    else if (state === "dead") {
        dead();
    }
}

/**
 * The main part: care for the plant
 */
function growing() {
    // Mouse X controls the sun
    light = map(mouseX, 0, width, 0, 100, true);

    // Holding the mouse waters the plant, otherwise water slowly drains
    if (mouseIsPressed) {
        plant.water += plant.waterRate;
    }
    else {
        plant.water -= plant.waterDrain;
    }
    plant.water = constrain(plant.water, 0, 100);

    checkConditions();

    // Is the story over?
    if (plant.health <= 0) {
        state = "dead";
    }
    else if (plant.height >= plant.maxHeight) {
        state = "bloomed";
    }

    drawSky();
    drawSun();
    drawGround();
    drawPlant();
    if (mouseIsPressed) {
        drawWateringCan();
    }
    drawGauges();
    drawMessage();
}

/**
 * Decides how the plant feels about the water and the light
 */
function checkConditions() {
    const tooDry = plant.water < plant.minWater;
    const tooWet = plant.water > plant.maxWater;
    const tooDark = light < minLight;
    const tooBright = light > maxLight;

    // Everything is just right: grow and heal
    if (!tooDry && !tooWet && !tooDark && !tooBright) {
        plant.height += plant.growSpeed;
        plant.health += 0.3;
        message = "just right.";
    }
    else {
        // Something is wrong. Lose health, and say what.
        plant.health -= 0.25;

        if (tooWet && tooBright) {
            message = "it's a swamp AND a desert somehow.";
        }
        else if (tooDry && tooBright) {
            message = "too hot! it's thirsty.";
        }
        else if (tooWet) {
            message = "you're drowning it.";
        }
        else if (tooDry) {
            message = "it's thirsty.";
        }
        else if (tooDark) {
            message = "it's too dark to grow.";
        }
        else if (tooBright) {
            message = "the sun is too harsh.";
        }
    }

    plant.health = constrain(plant.health, 0, 100);
}

/**
 * The sky gets brighter or darker with the light level
 */
function drawSky() {
    const r = map(light, 0, 100, 20, 170);
    const g = map(light, 0, 100, 25, 210);
    const b = map(light, 0, 100, 60, 240);
    background(r, g, b);
}

/**
 * Draws the sun, which climbs higher as the light increases
 */
function drawSun() {
    const sunY = map(light, 0, 100, 330, 60);
    push();
    noStroke();
    // A harsh sun is white-hot, a gentle sun is yellow
    if (light > maxLight) {
        fill(255, 255, 230);
    }
    else {
        fill(255, 210, 80);
    }
    ellipse(mouseX, sunY, 60);
    pop();
}

/**
 * Draws the soil, which gets darker the wetter it is
 */
function drawGround() {
    push();
    noStroke();
    const soil = map(plant.water, 0, 100, 160, 60);
    fill(soil, soil * 0.7, soil * 0.45);
    rect(0, plant.groundY, width, height - plant.groundY);

    // Puddle when overwatered
    if (plant.water > plant.maxWater) {
        fill(90, 130, 200, 160);
        ellipse(plant.x, plant.groundY + 6, map(plant.water, plant.maxWater, 100, 40, 220), 14);
    }
    pop();
}

/**
 * Draws the plant. It droops and goes brown when it's unhealthy.
 */
function drawPlant() {
    push();
    // Healthy plants are green, sick plants are brown
    const healthy = color(60, 160, 70);
    const sick = color(130, 100, 50);
    const plantColour = lerpColor(sick, healthy, plant.health / 100);

    // Sick plants droop to one side
    const droop = map(plant.health, 0, 100, 60, 0);
    const topX = plant.x + droop;
    const topY = plant.groundY - plant.height + droop * 0.5;

    stroke(plantColour);
    strokeWeight(6);
    noFill();
    bezier(plant.x, plant.groundY,
        plant.x, plant.groundY - plant.height * 0.5,
        topX, topY + plant.height * 0.3,
        topX, topY);

    // Leaves only appear once the plant is tall enough
    noStroke();
    fill(plantColour);
    if (plant.height > 60) {
        ellipse(plant.x - 18, plant.groundY - 50, 30, 12);
    }
    if (plant.height > 120) {
        ellipse(plant.x + 20 + droop * 0.3, plant.groundY - 105, 30, 12);
    }
    if (plant.height > 170) {
        ellipse(plant.x - 16 + droop * 0.6, plant.groundY - 155, 26, 10);
    }

    // A little bud on top
    fill(plantColour);
    ellipse(topX, topY, 14);
    pop();
}

/**
 * Draws a watering can and drops by the mouse
 */
function drawWateringCan() {
    push();
    noStroke();
    fill(90, 140, 220);
    for (let i = 0; i < 5; i++) {
        ellipse(plant.x + random(-25, 25), random(plant.groundY - 120, plant.groundY), 4, 8);
    }
    pop();
}

/**
 * Draws the water, light and health gauges with their "just right" zones
 */
function drawGauges() {
    drawGauge("water", plant.water, plant.minWater, plant.maxWater, 20);
    drawGauge("light", light, minLight, maxLight, 50);
    drawGauge("health", plant.health, 0, 100, 80);
}

/**
 * Draws one gauge. The comfortable zone is outlined.
 */
function drawGauge(label, value, low, high, y) {
    push();
    noStroke();
    fill(255, 255, 255, 160);
    rect(70, y, 150, 14, 4);

    // The "just right" zone
    fill(120, 200, 120, 160);
    rect(70 + low * 1.5, y, (high - low) * 1.5, 14);

    // The current value marker
    if (value >= low && value <= high) {
        fill(30, 120, 40);
    }
    else {
        fill(200, 60, 50);
    }
    rect(70 + value * 1.5 - 2, y - 3, 4, 20);

    fill(30);
    textSize(13);
    textAlign(RIGHT, CENTER);
    text(label, 62, y + 7);
    pop();
}

/**
 * Draws the plant's current feeling
 */
function drawMessage() {
    push();
    fill(255);
    textSize(18);
    textAlign(CENTER, CENTER);
    text(message, width / 2, plant.groundY + 40);
    pop();
}

/**
 * The happy ending: a flower
 */
function bloomed() {
    background(190, 220, 240);
    drawGround();
    drawPlant();

    // Petals in this plant's unique colour, slowly turning
    // Same droop maths as drawPlant() so the flower sits on the stem tip
    const droop = map(plant.health, 0, 100, 60, 0);
    const topX = plant.x + droop;
    const topY = plant.groundY - plant.height + droop * 0.5;
    push();
    translate(topX, topY);
    rotate(frameCount * 0.01);
    noStroke();
    fill(plant.flowerColour);
    for (let i = 0; i < 8; i++) {
        rotate(TWO_PI / 8);
        ellipse(0, 22, 18, 36);
    }
    fill(255, 210, 80);
    ellipse(0, 0, 22);
    pop();

    push();
    fill(255);
    textSize(18);
    textAlign(CENTER, CENTER);
    text("it bloomed. there will never be another one quite like it.", width / 2, plant.groundY + 35);
    textSize(14);
    text("click to plant a new seed", width / 2, plant.groundY + 60);
    pop();
}

/**
 * The sad ending: the plant is gone
 */
function dead() {
    background(70, 65, 70);
    drawGround();
    drawPlant();

    push();
    fill(220);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("it didn't make it.", width / 2, plant.groundY + 35);
    textSize(14);
    text("click to plant a new seed", width / 2, plant.groundY + 60);
    pop();
}

/**
 * Clicking restarts only at the end of the story
 */
function mousePressed() {
    if (state === "bloomed" || state === "dead") {
        plantSeed();
    }
}
