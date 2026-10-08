/**
 * conditionals-prototype-1-shy-blob
 * Maxim Yakimenko
 * 
 * A nervous little creature whose whole personality is built from conditionals. Move the mouse near it and it gets nervous; move too close and it runs. Hold the mouse still nearby and it slowly learns to trust you. Click it once it trusts you (the bar turns gold) and it hops happily
 */

"use strict";

// The blob and all of its feelings
const blob = {
    x: 320,
    y: 240,
    size: 80,
    // How big it is normally vs. when hiding
    normalSize: 80,
    hidingSize: 30,
    // Movement speeds for each mood
    curiousSpeed: 0.6,
    fleeSpeed: 5,
    // Trust from 0 (none) to 100 (best friends)
    trust: 0,
    trustThreshold: 60,
    // Current mood, decided by conditionals every frame
    mood: "calm",
    // Frames left of a happy hop after a successful click
    happyTimer: 0,
    // Frames left of hiding after a bad click
    hideTimer: 0
};

// Distances that define the blob's "personal space"
const nervousDistance = 180;
const panicDistance = 90;

// How long the mouse has been still (in frames)
let stillFrames = 0;
// How many still frames before the blob notices you're being gentle
const stillNeeded = 30;

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(640, 480);
}

/**
 * Updates the blob's mood and movement, then draws everything
 */
function draw() {
    background(235, 230, 215);

    checkStillness();
    decideMood();
    moveBlob();
    keepBlobOnCanvas();
    drawBlob();
    drawTrustMeter();
}

/**
 * Counts how long the mouse has been holding still
 */
function checkStillness() {
    // If the mouse moved since last frame, reset the counter
    if (mouseX !== pmouseX || mouseY !== pmouseY) {
        stillFrames = 0;
    }
    else {
        stillFrames += 1;
    }
}

/**
 * The heart of the blob's personality: which mood is it in right now?
 */
function decideMood() {
    const d = dist(mouseX, mouseY, blob.x, blob.y);
    const mouseIsStill = stillFrames > stillNeeded;

    // Timed moods (from clicks) take priority over everything else
    if (blob.happyTimer > 0) {
        blob.mood = "happy";
        blob.happyTimer -= 1;
    }
    else if (blob.hideTimer > 0) {
        blob.mood = "hiding";
        blob.hideTimer -= 1;
    }
    // If you hold still near the blob, it learns to trust you
    else if (mouseIsStill && d < nervousDistance) {
        blob.mood = "trusting";
        blob.trust += 0.4;
    }
    // Moving way too close? Panic!
    else if (d < panicDistance && blob.trust < blob.trustThreshold) {
        blob.mood = "panic";
        blob.trust -= 0.5;
    }
    // Moving kind of close? Nervous.
    else if (d < nervousDistance && blob.trust < blob.trustThreshold) {
        blob.mood = "nervous";
    }
    // If it trusts you and you're nearby, it's just content
    else if (d < nervousDistance) {
        blob.mood = "content";
    }
    // Otherwise you're far away and the blob is curious
    else {
        blob.mood = "curious";
    }

    blob.trust = constrain(blob.trust, 0, 100);
}

/**
 * Moves the blob differently depending on its mood
 */
function moveBlob() {
    // Direction from the blob to the mouse
    const dx = mouseX - blob.x;
    const dy = mouseY - blob.y;
    const d = dist(mouseX, mouseY, blob.x, blob.y);

    // Avoid dividing by zero if the mouse is exactly on the blob
    if (d === 0) {
        return;
    }

    if (blob.mood === "curious" || blob.mood === "trusting") {
        // Creep toward the mouse
        blob.x += (dx / d) * blob.curiousSpeed;
        blob.y += (dy / d) * blob.curiousSpeed;
    }
    else if (blob.mood === "panic") {
        // Run directly away from the mouse
        blob.x -= (dx / d) * blob.fleeSpeed;
        blob.y -= (dy / d) * blob.fleeSpeed;
    }
    else if (blob.mood === "nervous") {
        // Tremble in place
        blob.x += random(-2, 2);
        blob.y += random(-2, 2);
    }
    else if (blob.mood === "happy") {
        // Hop up and down
        blob.y += sin(frameCount * 0.5) * 3;
    }
    // Content and hiding blobs stay where they are

    // Size: shrink when hiding, otherwise ease back to normal
    if (blob.mood === "hiding") {
        blob.size = lerp(blob.size, blob.hidingSize, 0.2);
    }
    else {
        blob.size = lerp(blob.size, blob.normalSize, 0.1);
    }
}

/**
 * Stops the blob from escaping off the edges of the canvas
 */
function keepBlobOnCanvas() {
    blob.x = constrain(blob.x, blob.size / 2, width - blob.size / 2);
    blob.y = constrain(blob.y, blob.size / 2, height - blob.size / 2 - 40);
}

/**
 * Draws the blob with a colour and face that match its mood
 */
function drawBlob() {
    push();
    noStroke();

    // Body colour depends on mood
    if (blob.mood === "panic") {
        fill(240, 120, 120);
    }
    else if (blob.mood === "nervous") {
        fill(240, 170, 170);
    }
    else if (blob.mood === "happy") {
        fill(250, 210, 90);
    }
    else if (blob.mood === "hiding") {
        fill(150, 150, 170);
    }
    else {
        fill(130, 190, 200);
    }
    ellipse(blob.x, blob.y, blob.size, blob.size * 0.85);

    // Eyes look toward the mouse... unless it's panicking or hiding
    const eyeOffset = blob.size * 0.18;
    let lookX = 0;
    let lookY = 0;
    if (blob.mood !== "panic" && blob.mood !== "hiding") {
        lookX = constrain((mouseX - blob.x) * 0.02, -3, 3);
        lookY = constrain((mouseY - blob.y) * 0.02, -3, 3);
    }

    // Hiding blobs have their eyes shut
    if (blob.mood === "hiding") {
        stroke(40);
        strokeWeight(2);
        line(blob.x - eyeOffset - 4, blob.y - 4, blob.x - eyeOffset + 4, blob.y - 4);
        line(blob.x + eyeOffset - 4, blob.y - 4, blob.x + eyeOffset + 4, blob.y - 4);
    }
    else {
        fill(255);
        let eyeSize = blob.size * 0.22;
        // Panicked eyes go wide
        if (blob.mood === "panic") {
            eyeSize = blob.size * 0.3;
        }
        ellipse(blob.x - eyeOffset, blob.y - 6, eyeSize);
        ellipse(blob.x + eyeOffset, blob.y - 6, eyeSize);
        fill(40);
        ellipse(blob.x - eyeOffset + lookX, blob.y - 6 + lookY, eyeSize * 0.45);
        ellipse(blob.x + eyeOffset + lookX, blob.y - 6 + lookY, eyeSize * 0.45);
    }

    // Mouth depends on mood too
    noFill();
    stroke(40);
    strokeWeight(2);
    if (blob.mood === "happy" || blob.mood === "content") {
        arc(blob.x, blob.y + 8, blob.size * 0.3, blob.size * 0.2, 0, PI);
    }
    else if (blob.mood === "panic") {
        fill(40);
        ellipse(blob.x, blob.y + 14, blob.size * 0.12, blob.size * 0.16);
    }
    else if (blob.mood === "nervous") {
        // A wobbly little line
        line(blob.x - 8, blob.y + 14, blob.x - 3, blob.y + 11);
        line(blob.x - 3, blob.y + 11, blob.x + 3, blob.y + 14);
        line(blob.x + 3, blob.y + 14, blob.x + 8, blob.y + 11);
    }
    else if (blob.mood !== "hiding") {
        line(blob.x - 6, blob.y + 12, blob.x + 6, blob.y + 12);
    }

    // Blush when nervous or content (for different reasons...)
    if (blob.mood === "nervous" || blob.mood === "content") {
        noStroke();
        fill(255, 120, 140, 120);
        ellipse(blob.x - blob.size * 0.32, blob.y + 6, 12, 7);
        ellipse(blob.x + blob.size * 0.32, blob.y + 6, 12, 7);
    }

    pop();
}

/**
 * Draws the trust bar and a hint about the blob's mood
 */
function drawTrustMeter() {
    push();
    noStroke();
    fill(60);
    textSize(14);
    textAlign(LEFT, CENTER);
    text("trust", 20, height - 22);

    fill(200);
    rect(70, height - 30, 200, 16, 8);
    // The bar turns gold once trust passes the threshold
    if (blob.trust >= blob.trustThreshold) {
        fill(250, 200, 70);
    }
    else {
        fill(130, 190, 200);
    }
    rect(70, height - 30, blob.trust * 2, 16, 8);

    fill(60);
    textAlign(RIGHT, CENTER);
    text("the blob feels " + blob.mood, width - 20, height - 22);
    pop();
}

/**
 * Clicking the blob is a gamble that depends on trust
 */
function mousePressed() {
    const d = dist(mouseX, mouseY, blob.x, blob.y);

    // Only clicks on the blob count
    if (d < blob.size / 2) {
        if (blob.trust >= blob.trustThreshold) {
            // A friend! Happy hop.
            blob.happyTimer = 90;
        }
        else {
            // Too soon. Hide.
            blob.hideTimer = 120;
            blob.trust -= 15;
        }
    }
}
