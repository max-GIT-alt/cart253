/**
 * conditionals-prototype-2-wishing-sky
 * Maxim Yakimenko
 * 
 * A night sky you can wish on. Click a star to make a wish. Most wishes do nothing, some send a shooting star, and very rarely (about 2%) the moon wakes up and grants your wish. Clicking grass, empty sky or the sleeping moon gets its own response, and the narrator changes its tone the more you wish
 */

"use strict";

// All the stars in the sky
let stars = [];
const numStars = 60;

// The moon
const moon = {
    x: 530,
    y: 90,
    size: 80,
    awake: false,
    // Frames left being awake
    awakeTimer: 0,
    // Wishes left before the moon is willing to grant another
    cooldown: 0
};

// A single shooting star (only one at a time)
const shootingStar = {
    x: 0,
    y: 0,
    speed: 14,
    active: false
};

// The line of text at the bottom of the screen
let message = "click a star and make a wish";
let wishCount = 0;

// The chance thresholds (random(0, 1) has to be below these)
const rareChance = 0.02;
const uncommonChance = 0.2;

// Where the grass begins
const horizon = 400;

/**
 * Creates the canvas and scatters the stars
 */
function setup() {
    createCanvas(640, 480);

    for (let i = 0; i < numStars; i++) {
        const star = {
            x: random(0, width),
            y: random(0, horizon - 20),
            size: random(2, 5),
            twinkle: 0
        };
        stars.push(star);
    }
}

/**
 * Draws the sky, the stars, the moon and any shooting star
 */
function draw() {
    // The sky brightens a little when the moon is awake
    if (moon.awake) {
        background(40, 40, 90);
    }
    else {
        background(10, 10, 35);
    }

    drawStars();
    updateShootingStar();
    updateMoon();
    drawMoon();
    drawGrass();
    drawMessage();
}

/**
 * Draws every star, making recently-wished-on stars twinkle
 */
function drawStars() {
    push();
    noStroke();
    for (let star of stars) {
        let size = star.size;
        // A star that was just wished on glows bigger, then fades back
        if (star.twinkle > 0) {
            size = star.size + star.twinkle * 0.3;
            star.twinkle -= 1;
            fill(255, 240, 180);
        }
        else {
            fill(255);
        }
        ellipse(star.x, star.y, size);
    }
    pop();
}

/**
 * Moves and draws the shooting star if there is one
 */
function updateShootingStar() {
    if (shootingStar.active) {
        shootingStar.x += shootingStar.speed;
        shootingStar.y += shootingStar.speed * 0.4;

        push();
        stroke(255, 250, 200);
        strokeWeight(3);
        line(shootingStar.x, shootingStar.y, shootingStar.x - 60, shootingStar.y - 24);
        pop();

        // Once it leaves the screen (or hits the ground), it's gone
        if (shootingStar.x > width + 60 || shootingStar.y > horizon) {
            shootingStar.active = false;
        }
    }
}

/**
 * Counts down the moon's awake time
 */
function updateMoon() {
    if (moon.awakeTimer > 0) {
        moon.awakeTimer -= 1;
    }
    else {
        moon.awake = false;
    }
}

/**
 * Draws the moon with its eyes open or closed
 */
function drawMoon() {
    push();
    noStroke();
    // A glow around the moon only when it's awake
    if (moon.awake) {
        fill(255, 250, 200, 60);
        ellipse(moon.x, moon.y, moon.size * 1.8);
    }
    fill(245, 240, 210);
    ellipse(moon.x, moon.y, moon.size);

    stroke(80, 80, 100);
    strokeWeight(2);
    noFill();
    if (moon.awake) {
        // Open eyes and a smile
        fill(80, 80, 100);
        ellipse(moon.x - 14, moon.y - 6, 7);
        ellipse(moon.x + 14, moon.y - 6, 7);
        noFill();
        arc(moon.x, moon.y + 8, 30, 20, 0, PI);
    }
    else {
        // Sleeping eyes
        arc(moon.x - 14, moon.y - 6, 12, 8, 0, PI);
        arc(moon.x + 14, moon.y - 6, 12, 8, 0, PI);
    }
    pop();
}

/**
 * Draws the grass at the bottom
 */
function drawGrass() {
    push();
    noStroke();
    fill(20, 50, 30);
    rect(0, horizon, width, height - horizon);
    pop();
}

/**
 * Draws the current message
 */
function drawMessage() {
    push();
    fill(220, 230, 210);
    textAlign(CENTER, CENTER);
    textSize(16);
    text(message, width / 2, horizon + 40);
    pop();
}

/**
 * Figures out what was clicked and responds
 */
function mousePressed() {
    // Clicking the grass
    if (mouseY > horizon) {
        message = "you can't wish on grass. look up.";
        return;
    }

    // Clicking the moon directly
    if (dist(mouseX, mouseY, moon.x, moon.y) < moon.size / 2) {
        if (moon.awake) {
            message = "the moon giggles. it's ticklish.";
        }
        else {
            message = "shh. the moon is sleeping.";
        }
        return;
    }

    // Did we click a star? Look for the first star near the mouse
    let clickedStar = undefined;
    for (let star of stars) {
        // A generous click radius so the tiny stars are actually clickable
        if (dist(mouseX, mouseY, star.x, star.y) < 12) {
            clickedStar = star;
        }
    }

    // Clicked empty sky
    if (clickedStar === undefined) {
        message = "there's nothing there but dark.";
        return;
    }

    // We have a star! Make a wish.
    makeWish(clickedStar);
}

/**
 * Rolls the dice on a wish
 */
function makeWish(star) {
    wishCount += 1;
    star.twinkle = 30;

    const roll = random(0, 1);

    // The moon only grants wishes when it isn't on cooldown
    if (roll < rareChance && moon.cooldown <= 0) {
        moon.awake = true;
        moon.awakeTimer = 300;
        moon.cooldown = 20;
        message = "the moon opens its eyes. your wish is granted.";
    }
    else if (roll < uncommonChance) {
        shootingStar.active = true;
        shootingStar.x = star.x;
        shootingStar.y = star.y;
        message = "a shooting star! that's a good sign.";
    }
    else {
        // Nothing happens. But what the narrator says depends on your history.
        if (wishCount < 5) {
            message = "the star twinkles. nothing happens.";
        }
        else if (wishCount < 15) {
            message = "the star twinkles. still nothing.";
        }
        else if (wishCount < 40) {
            message = "wish number " + wishCount + ". you really want this, huh.";
        }
        else {
            message = "maybe the wishing is the point.";
        }
    }

    // Each wish brings the moon a little closer to being ready again
    if (moon.cooldown > 0) {
        moon.cooldown -= 1;
    }
}
