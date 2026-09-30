/**
 * breathing-sun
 * Maxim Yakimenko
 * 
 * A cyclic exploration of a sun orb growing and shrinking, while being sensitive to mouse movements and proximity.
 */

"use strict";

// sun is here
function setup() {
    x: 240,
    y: 240,
    size: 100, // Changes every frame
    minSize: 80,
    maxSize: 220,
    breath: 0, // An angle that we feed into sin()
    breathSpeed: 0.02, // How much breath increases each frame + mouse sensitivity
    fill: {
        r: 255,
        g: 200, // Changes with the breath
        b: 0
    }
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {

}
