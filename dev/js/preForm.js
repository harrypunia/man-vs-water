const container = document.getElementById('container'),
    form = document.getElementsByClassName('form')[0],
    mapForm = document.getElementsByClassName('form__wrapper__select')[0],
    formButton = document.getElementsByClassName('form__wrapper__button')[0],
    maps = document.getElementsByClassName('form__wrapper__select-opts'),
    permission = document.getElementsByClassName('permission')[0],
    muteIcon = document.getElementsByClassName('muteStatus'),
    introAudio = new Audio('assets/audio/intro_music.mp3'),
    p5Sounds = [new Audio('assets/audio/thunder.m4a'), new Audio('assets/audio/thunder_2.mp3'), new Audio('assets/audio/wolf.mp3')],
    buttonAudio = new Audio('assets/audio/buttonAudio.mp3'),
    rain = new Audio('assets/audio/rain.mp3'),
    bulletCountDisplay = document.getElementById('bulletCountDisplay'),
    bulletCountAnimation = document.getElementsByClassName('bulletCountAnimation')[0],
    menu = document.getElementsByClassName('menu')[0],
    burger = document.getElementsByClassName('burger')[0],
    side = document.getElementsByClassName('side')[0],
    headphone = document.getElementsByClassName('headphone')[0],
    navigation = document.getElementsByClassName('navigation')[0],
    man = document.getElementsByClassName('man__player')[0],
    water = document.getElementsByClassName('water__player')[0];
var chosenSideId,
    chosenSide,
    neglectedSideId,
    neglectedSide,
    playersJoined,
    permitAudio = false,
    ifMapSelected = false,
    menuStatus = false,
    px,
    py,
    pz;

const openForm = e => {
    chosenSide = e.currentTarget.id;
    neglectedSide = chosenSide == 'man' ? neglectedSide = 'water' : 'man';
    //id's
    chosenSideId = document.getElementById(chosenSide);
    neglectedSideId = document.getElementById(neglectedSide);

    chosenSideId.classList.add('selectSide');
    neglectedSideId.classList.add('deSelectSide');
    side.classList.add('decisionMade');
    //Adjust form
    chosenSide == 'man' ? form.style.left = '60vw' : form.style.left = '40vw';
    form.style.zIndex = 100;
    //Show form
    document.getElementById('playerType').classList.remove('hideForm');
    document.getElementsByClassName('form')[0].classList.remove('hideForm');

    //Add Returning abilities
    chosenSideId.addEventListener("click", returnToChoose, false);
}

const returnToChoose = () => {
    form.style.zIndex = 1;
    side.style.width = '100vw';
    side.classList.remove('decisionMade');
    chosenSideId.classList.remove('selectSide');
    neglectedSideId.classList.remove('deSelectSide');
    chosenSideId.removeEventListener("click", returnToChoose, false);
    document.getElementById('playerType').classList.remove('hideForm');

    //Hide Form
    document.getElementById('playerType').classList.add('hideForm');
    document.getElementsByClassName('form')[0].classList.add('hideForm');
}

const openSide = () => {
    side.style.display = 'block';
}

const parallax = event => {
    let x = event.clientX,
        y = event.clientY,
        depth = 1000;
    man.style.left = 10 + (x / depth) + 'vw';
    man.style.top = 50 + (y / depth) + 'vh';
    water.style.right = 12 - (x / depth) + 'vw';
    water.style.top = 50 + (y / depth) + 'vh';
}

document.addEventListener("mousemove", parallax, false);
