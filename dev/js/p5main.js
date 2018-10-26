var p, particles = [],
    stopP5Draw = false,
    rainIntensity, dropThickness, thunderFrequency, windSpeed, airFriction, rainShape, rainSpeed, p5Performance = document.getElementsByClassName('performanceCircle')[0],
    showFrameRate = document.getElementsByClassName('frameRateShow')[0],
    frameRateCounter = 20;

function setup() {
    var canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent(container);
    particles = [];
    for (var i = 0; i < 300; i++) {
        particles[i] = new Particle(Math.floor(Math.random() * window.innerWidth), Math.floor(Math.random() * window.innerHeight));
    }
}

function draw() {
    background(10, 5, 33);
    //Showing Frame Count
    frameRateCounter++;
    if (frameRateCounter >= 20) {
        showFrameRate.innerHTML = Math.floor(frameRate());
        frameRateCounter = 1;
    }

    //Parameters
    rainIntensity = document.getElementById('rainIntensity').value;
    dropThickness = document.getElementById('dropThickness').value;
    thunderFrequency = document.getElementById('thunderFreq').value;
    windSpeed = document.getElementById('windSpeed').value;
    airFriction = document.getElementById('airFriction').value;
    rainShape = document.getElementById('rainShape').value;
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
        particles[i].show(dropThickness, rainShape);
    }

    //Show frameRate    
    performanceIndicator(frameRate());
    //Stop p5 when entering the game
    if (stopP5Draw) {
        noLoop();
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
