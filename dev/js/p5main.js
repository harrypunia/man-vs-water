let p,
    particles = [],
    stopP5Draw = false,
    rainIntensity = 60,
    dropThickness = 1,
    thunderFrequency = 300,
    windSpeed = 5,
    airFriction = .05,
    rainSpeed = 10,
    p5Performance = document.getElementsByClassName('performanceCircle')[0],
    showFrameRate = document.getElementsByClassName('frameRateShow')[0],
    frameRateCounter = 20,
    g_color1,
    g_color2;

function setup() {
    var canvas = createCanvas(window.innerWidth, window.innerHeight);
    g_color1 = color(7, 0, 12);
    g_color2 = color(255, 120, 70);
    canvas.parent(container);
    particles = [];
    for (let i = 0; i < 300; i++) {
        particles[i] = new Particle(Math.floor(Math.random() * window.innerWidth), -Math.floor(Math.random() * window.innerHeight));
    }
}

function draw() {
    stopP5Draw ? noLoop() : 0;
    setGradient(0, 0, window.innerWidth, window.innerHeight, g_color1, g_color2);
    //Showing Frame Count
    frameRateCounter++;
    frameRateCounter >= 20 ? (showFrameRate.innerHTML = Math.floor(frameRate()), frameRateCounter = 1) : 0;

    //Thundering and sounds
    if (Math.floor(Math.random() * thunderFrequency) == 1) {
        background(200, 200, 200);
        for (var i = 0; i < rainIntensity; i++) {
            particles[i].applyWind(windSpeed);
        }
        if (permitAudio == true) {
            var p5SoundsIndex = Math.floor(Math.random() * 3);
            p5Sounds[p5SoundsIndex].play();
            if (p5SoundsIndex == 2) p5Sounds[p5SoundsIndex].volume = .1;
            else p5Sounds[p5SoundsIndex].volume = .5;
        }
    }
    for (var i = 0; i < rainIntensity; i++) {
        particles[i].update(airFriction, rainSpeed);
        particles[i].show(dropThickness);
    }

    //Show frameRate
    performanceIndicator(frameRate());
}

function setGradient(x, y, w, h, c1, c2) {
    noFill();
    for (var i = y; i <= y + h; i++) {
        var inter = map(i, y, y + h, 0, .4),
            c = lerpColor(c1, c2, inter);
        stroke(c);
        line(x, i, x + w, i);
    }
}

function performanceIndicator(frameRate) {
    if (frameRate >= 50) p5Performance.style.background = 'green'
    else if (frameRate >= 30) p5Performance.style.background = 'yellow'
    else p5Performance.style.background = 'red';
}

window.addEventListener("resize", function () {
    resizeCanvas(window.innerWidth, window.innerHeight);
})
