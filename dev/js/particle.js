function Particle(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 15);
    this.lavaBounce = createVector((Math.random() * 10) - 5, -25);
    this.isLava = false;
    this.update = (friction, rainSpeed) => {
        this.pos.add(this.vel);
        this.vel.x > 0 ? this.vel.x -= friction : 0; //Friction
        this.vel.x >= 10 ? this.vel.x = 10 : 0;
        this.resetPos();
    }
    this.show = (thick) => {
        if (this.isLava) {
            noStroke()
            fill(255, 90, 40, 80);
            ellipse(this.pos.x, this.pos.y, thick * 5, thick * 5)
        } else {
            noFill();
            strokeWeight(thick);
            stroke(255, 40);
            line(this.pos.x, this.pos.y, this.pos.x, this.pos.y + 20);
        }
    }
    this.applyWind = windSpeed => {
        this.vel.add(Math.floor(Math.random() * windSpeed) + 5, 0);
    }
    this.resetPos = () => {
        if (this.pos.y >= window.innerHeight && !this.isLava) {
            this.isLava = true;
        } else if (this.pos.y >= window.innerHeight && this.isLava) {
            this.pos.y = 0;
            this.pos.x = Math.floor(Math.random() * window.innerWidth);
            this.vel.y = (Math.floor(Math.random() * rainSpeed) + 8)
            this.isLava = false;
            this.lavaBounce = createVector((Math.random() * 10) - 5, -25);
        }
        this.pos.x > window.innerWidth ? this.pos.x = 0 : this.pos.x < 0 ? this.pos.x = window.innerWidth : 0;
        this.isLava ? (this.pos.add(this.lavaBounce), this.lavaBounce.mult(.97)) : 0;
    }
}
