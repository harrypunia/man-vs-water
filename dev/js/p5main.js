var p, particles = [],
    stopP5Draw = false,
    rainIntensity, dropThickness, thunderFrequency, windSpeed, airFriction, rainShape, rainSpeed, p5Performance = document.getElementsByClassName('performanceCircle')[0],
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
    for (var i = 0; i < 300; i++) {
        particles[i] = new Particle(Math.floor(Math.random() * window.innerWidth), -Math.floor(Math.random() * window.innerHeight));
    }
}

function draw() {
    setGradient(0, 0, window.innerWidth, window.innerHeight, g_color1, g_color2);
    //Showing Frame Count
    frameRateCounter++;
    frameRateCounter >= 20 ? (showFrameRate.innerHTML = Math.floor(frameRate()), frameRateCounter = 1) : 0;

    //Parameters
    rainIntensity = document.getElementById('rainIntensity').value;
    dropThickness = document.getElementById('dropThickness').value;
    thunderFrequency = document.getElementById('thunderFreq').value;
    windSpeed = document.getElementById('windSpeed').value;
    airFriction = document.getElementById('airFriction').value;
    rainSpeed = document.getElementById('rainSpeed').value;

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
    //Stop p5 when entering the game
    if (stopP5Draw) {
        noLoop();
    }
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

function resetP5Parameters() {
    document.getElementById('rainIntensity').value = 100;
    document.getElementById('dropThickness').value = 1;
    document.getElementById('thunderFreq').value = 300;
    document.getElementById('windSpeed').value = 5;
    document.getElementById('airFriction').value = .05;
    document.getElementById('rainShape').value = 1;
    document.getElementById('rainSpeed').value = 7;
}
