var bubbles = [];

var buoyObj;
var buoyVisible = false;

var h, w;
var yoff = 0.0;

var waterColour;

function setup() {

    oscType = 'sine';
    waterColour = 'deepskyblue';

    h = windowHeight;
    w = windowWidth;

    createCanvas(w, h);

    for (var i = 0; i < 10; i++) {
        //bubbles.push(new Bubble());
    }
}

function draw() {
    background(waterColour);
    drawWave();
    for (var i = 0; i < bubbles.length; i++) {
        if (!bubbles[i].deleted) {
            bubbles[i].move();
            bubbles[i].display();
        }
    }

    if (buoyVisible) {
        buoyObj.move();
        buoyObj.display();
    }
}


function Bubble() {
    this.x = random(w);
    this.y = h;
    this.diameter = random(10, 30);
    this.speed = 1;
    this.deleted = false;

    this.move = function () {
        this.x += random(-this.speed, this.speed);
        this.y -= 3;

         if (this.y < -2) {
             this.deleted = true;
         }

    };

    this.display = function () {
        noStroke();
        fill(waterColour);
        ellipse(this.x, this.y, this.diameter, this.diameter);
    };
}

function drawWave() {
    noStroke();
    fill(255);
    // We are going to draw a polygon out of the wave points
    beginShape();

    var xoff = 0;       // Option #1: 2D Noise
    // var xoff = yoff; // Option #2: 1D Noise

    // Iterate over horizontal pixels
    for (var x = 0; x <= width; x += 10) {
        // Calculate a y value according to noise, map to 

        // Option #1: 2D Noise
        var y = map(noise(xoff, yoff), 0, 1, 200, 300);

        // Option #2: 1D Noise
        // var y = map(noise(xoff), 0, 1, 200,300);

        // Set the vertex
        vertex(x, y);
        // Increment x dimension for noise
        xoff += 0.05;

    }
    // increment y dimension for noise
    yoff += 0.01;

    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
}

function mouseClicked() {

    if (!buoyVisible) {
        //playNoise();
        buoyObj = new Buoy(mouseX, mouseY);
        buoyVisible = true;
    } else {
        buoyObj = new Buoy(mouseX, mouseY);
    }
    oscType = oscTypeCycle(oscType);
}

function Buoy(a, b) {
    this.x = a;
    this.y = b;
    this.speed = 0.25;

    this.move = function () {
        this.x += random(-this.speed, this.speed);
        this.y += random(-this.speed, this.speed);
    };

    this.display = function () {
        noStroke();
        fill(waterColour);
        ellipse(this.x, this.y, 50, 50);
    };

}

function oscTypeCycle(type) {
    switch (type) {
        case "sine":
            console.log("Changing to sawtooth");
            waterColour = 'firebrick';
            return "sawtooth";
        case "sawtooth":
            console.log("Changing to triangle");
            waterColour = 'darkorange';
            return "triangle";
        case "triangle":
            console.log("Changing to square");
            waterColour = 'mediumseagreen';
            return "square";
        case "square":
            console.log("Changing to sine");
            waterColour = 'deepskyblue';
            return "sine";
    }
}

