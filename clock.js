// DL: TODO - use vector mathematics to remove the need for the translate function
// thereby allowing for multiple clocks. 
// DL: TODO - add further clock numbers and face effects. Us the mag function and 
// pythangoras theorem to deduce the x an dy coordinates for each number.

function Clock() {
    var dscale;
    var dHour;
    var dMinute;
    var dSecond;
    var dDiameter;
    var dmyPi;
    var dRotateSpeedChoices;
    var dRotateSpeed;
    var numberEdgeDistance; // DL: Clock number distrance from edge
    var rx, ry; // random x and y values for translate function
    var dx, dy; // random deltaX and Y values for clock face movement
    var directionChanged;
    var clockFaceColour;

    this.setup = function() {

        dscale = 30;

        dHour = {
            start: ((hour() % 12) + minute() / 60)  / 12 * TWO_PI,
            vect: createVector(1,1),
            scale: dscale / 2,
            angle: TWO_PI / 12660000,
            colour: color(100,220,80),
            weight: 4
        };

        dMinute = {
            start: ( minute() + second() / 60 ) / 60 * TWO_PI,
            vect: createVector(1,1),
            scale: dscale * 0.9,
            angle: TWO_PI / 216000,
            colour: color(200,200,50),
            weight: 2
        };

        dSecond = {
            start: second() / 60 * TWO_PI,
            vect: createVector(1,1),
            scale: dscale,
            angle: TWO_PI / 3600,
            colour: color(200,50,50,50),
            weight: 1
        };
        
        dHour.vect.normalize();
        dMinute.vect.normalize();
        dSecond.vect.normalize();
        dHour.vect.mult(dHour.scale);
        dMinute.vect.mult(dMinute.scale);
        dSecond.vect.mult(dSecond.scale);
        dHour.vect.setHeading(dHour.start);
        dMinute.vect.setHeading(dMinute.start);
        dSecond.vect.setHeading(dSecond.start);
        dDiameter = dscale * 2.2;
        dmyPi = random(- PI / 2, PI / 2);
        dRotateSpeedChoices = [-PI/500, - PI / 300, PI / 300, PI / 500];
        dRotateSpeed = random(dRotateSpeedChoices);
        numberEdgeDistance = 7;
        rx = random(width);
        ry = random(height);
        dx = random(-1, 1);
        dy = random(-1, 1);
        clockFaceColour = color(250);
        directionChanged = false;
    };

    this.draw = function() {
        // Put drawings here
        var twidth =  0;
        var theight = 0;
        background(100);
        push();
        translate(rx, ry);
        rotate(dmyPi); // DL: Starts 0 ( and 2PI radians at 12:00)
        noStroke();
        if (directionChanged) {
            clockFaceColour = color(random(255), random(255), random(255), random(255));
            directionChanged = false;
        }
        fill(clockFaceColour);
        ellipse(0, 0, dDiameter);
        // DL: Drawhour
        stroke(dHour.colour);
        strokeWeight(dHour.weight);
        line(0,0, dHour.vect.x, dHour.vect.y);
        dHour.vect.x = dHour.vect.x * cos(dHour.angle) - dHour.vect.y * sin(dHour.angle);
        dHour.vect.y = dHour.vect.x * sin(dHour.angle) + dHour.vect.y * cos(dHour.angle);
        // DL: Drawminute
        stroke(dMinute.colour);
        strokeWeight(dMinute.weight);
        line(0,0, dMinute.vect.x, dMinute.vect.y);
        dMinute.vect.x = dMinute.vect.x * cos(dMinute.angle) - dMinute.vect.y * sin(dMinute.angle);
        dMinute.vect.y = dMinute.vect.x * sin(dMinute.angle) + dMinute.vect.y * cos(dMinute.angle);
        // DL: Drawsecond
        stroke(dSecond.colour);
        strokeWeight(dSecond.weight);
        line(0,0, dSecond.vect.x, dSecond.vect.y);
        dSecond.vect.x = dSecond.vect.x * cos(dSecond.angle) - dSecond.vect.y * sin(dSecond.angle);
        dSecond.vect.y = dSecond.vect.x * sin(dSecond.angle) + dSecond.vect.y * cos(dSecond.angle);
        
        // DL: Add clock numbers
        fill(0);
        push();
        rotate(PI/2);
        textSize(10);
        textAlign(CENTER, CENTER);
        text(12, 0, - dDiameter / 2 + numberEdgeDistance);
        text(6, 0, dDiameter / 2 - numberEdgeDistance);
        text(9, - dDiameter / 2 + numberEdgeDistance, 0);
        text(3, dDiameter / 2 - numberEdgeDistance, 0);
        pop();
        // DL: Spin Clock
        dmyPi -= dRotateSpeed;
        // DL: Move Clock
        rx += dx;
        ry += dy;

        twidth = width - rx;
        theight = height - ry;

        // DL: Check if clock hits the canvas boundary, causing 
        // rebound and changing its colour using directionChanged to 
        // trigger the change in fill using a global object variable
        // clockFaceColour(color)

        if (-dDiameter / 2 < -rx || dDiameter / 2 > twidth) {
            dx *= -1;
            directionChanged = true;
        }

        if (-dDiameter / 2 < -ry || dDiameter / 2 > theight) {
            dy *= -1;
            directionChanged = true;
        }

        pop();
    };

}