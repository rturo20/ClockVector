function Clock() {

    var dHour;
    var dMinute;
    var dSecond;

    this.setup = function() {

        dHour = {
            start: ((hour() % 12) + minute() / 60)  / 12 * TWO_PI,
            vect: createVector(1,1),
            scale: 30,
            angle: TWO_PI / 12660000,
            colour: color(100,220,80),
            weight: 4
        };

        dMinute = {
            start: ( minute() + second() / 60 ) / 60 * TWO_PI,
            vect: createVector(1,1),
            scale: 55,
            angle: TWO_PI / 216000,
            colour: color(200,200,50),
            weight: 2
        };

        dSecond = {
            start: second() / 60 * TWO_PI,
            vect: createVector(1,1),
            scale: 60,
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

    };

    this.draw = function() {
        // Put drawings here
        background(100);
        push();
        translate(width / 2, height / 2);
        rotate(- PI / 2); // DL: Starts 0 ( and 2PI radians at 12:00)
        fill(250);
        noStroke();
        ellipse(0, 0, dSecond.vect.mag() * 2.2);
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
        pop();
    };

}