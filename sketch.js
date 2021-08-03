var myV;
var angle;
var myClock;

function setup() {
  createCanvas(400, 400);
  myClock = new Clock();
  myClock.setup();
}

function draw() {
  // Put drawings here
  myClock.draw();
}
