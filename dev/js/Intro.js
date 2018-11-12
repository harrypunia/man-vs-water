const container = document.getElementById('container'),
    form = document.getElementsByClassName('form')[0],
    formName = document.getElementById('fname'),
    mapForm = document.getElementsByClassName('form__wrapper__select')[0],
    formButton = document.getElementsByClassName('form__wrapper__button')[0],
    characterButton = document.getElementsByClassName('form__wrapper__button-character')[0],
    characterMan = document.getElementsByClassName('character__man')[0],
    characterWater = document.getElementsByClassName('character__water')[0],
    skinsMan = document.getElementsByClassName('manSkins'),
    skinsWater = document.getElementsByClassName('waterSkins'),
    customise = document.getElementsByClassName('form__customise')[0],
    settings = document.getElementsByClassName('form__settings')[0],
    backToCustomiseButton = document.getElementsByClassName('backToCustomise')[0],
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
    water = document.getElementsByClassName('water__player')[0],
    filter = document.getElementsByClassName('filter')[0],
    playerSelected = document.getElementById('playerType');
let chosenSideId,
    chosenSide,
    neglectedSideId,
    neglectedSide,
    playersJoined,
    permitAudio = false,
    ifMapSelected = false,
    menuStatus = false,
    otherPlayersExist;

(() => {
    setTimeout(() => {
        permission.classList.add('permissionIn');
        filter.innerHTML = '';
        filter.style.display = 'none';
    }, 5000)
})()
