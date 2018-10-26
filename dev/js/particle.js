function Particle(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 15);
    this.update = function (friction, rainSpeed) {
        this.pos.add(this.vel);
        if (this.vel.x > 0) {
            this.vel.x -= friction;
        }
        if (this.pos.y >= window.innerHeight) {
            this.pos.y = 0;
            this.pos.x = Math.floor(Math.random() * window.innerWidth);
            this.vel.y = (Math.floor(Math.random() * rainSpeed) + 8)
        } else if (this.pos.x > window.innerWidth) {
            this.pos.x = 0;
        }
        if (this.vel.x >= 10) {
            this.vel.x = 10;
        }
    }
    this.show = function (thick, shape) {
        if (shape == 0) {
            noStroke()
            fill(34, 116, 136, 90)
            ellipse(this.pos.x, this.pos.y, thick * 5, thick * 5)
        } else if (shape == 1) {
            noFill();
            strokeWeight(thick);
            stroke(34, 116, 136, 90);
            line(this.pos.x, this.pos.y, this.pos.x, this.pos.y + 20);
        } else if (shape == 2) {
            noStroke()
            fill(34, 116, 136, 90)
            rect(this.pos.x, this.pos.y, thick * 5, thick * 5)
        }
    }
    this.applyWind = function (windSpeed) {
        this.vel.add(Math.floor(Math.random() * windSpeed) + 5, 0);
    }
}
