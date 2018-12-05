var container = document.getElementById('container'),
    permission = document.getElementsByClassName('permission')[0],
    form = document.getElementsByClassName('form')[0],
    formName = document.getElementById('fname'),
    playerSelected = document.getElementsByClassName('form__wrapper__select')[0],
    playerTypes = document.getElementsByClassName('form__wrapper__select-opts'),
    formButton = document.getElementsByClassName('form__wrapper__button')[0],
    characterButton = document.getElementsByClassName('form__wrapper__button-character')[0],
    characters = document.getElementsByClassName('characters'),
    characterMan = document.getElementsByClassName('character__man')[0],
    characterWater = document.getElementsByClassName('character__water')[0],
    skinsMan = document.getElementsByClassName('manSkins'),
    skinsWater = document.getElementsByClassName('waterSkins'),
    customise = document.getElementsByClassName('form__customise')[0],
    settings = document.getElementsByClassName('form__settings')[0],
    backToCustomiseButton = document.getElementsByClassName('backToCustomise')[0],
    muteIcon = document.getElementsByClassName('muteStatus'),
    introAudio = new Audio('assets/audio/intro_music.mp3'),
    p5Sounds = [new Audio('assets/audio/thunder.m4a'), new Audio('assets/audio/thunder_2.mp3'), new Audio('assets/audio/wolf.mp3')],
    buttonAudio = new Audio('assets/audio/buttonAudio.mp3'),
    rain = new Audio('assets/audio/rain.mp3'),
    menu = document.getElementsByClassName('menu')[0],
    menuBig = document.getElementsByClassName('menu__noInteraction')[0],
    burger = document.getElementsByClassName('burger')[0],
    side = document.getElementsByClassName('side')[0],
    headphone = document.getElementsByClassName('headphone')[0],
    navigation = document.getElementsByClassName('navigation')[0],
    man = document.getElementsByClassName('man__player')[0],
    water = document.getElementsByClassName('water__player')[0],
    filter = document.getElementsByClassName('filter')[0],
    prevSkin = document.getElementById('prev'),
    nextSkin = document.getElementById('next'),
    lobby = document.getElementsByClassName('lobby')[0],
    manLobby = document.getElementsByClassName('man__final-player')[0],
    waterLobby = document.getElementsByClassName('water__final-player')[0],
    feed = null,
    feedData = null,
    bulletCountDisplay = null,
    bulletCountAnimation = null,
    emptyGun = null,
    gunSupressor = null,
    sniper = null,
    shotgun = null,
    reloadPistol = null,
    gun;
let gameStroke = null,
    chosenSideId,
    chosenPlayer,
    neglectedSideId,
    neglectedSide,
    playersJoined,
    skinIndex = 0,
    permitAudio = false,
    ifMapSelected = false,
    menuStatus = false,
    otherPlayersExist,
    geo, mat,
    walls, grass, plane,
    texture,
    ambLights, sun, sky, lights,
    zone, environment,
    scope,
    healthPerks = [],
    staminaPerks = [],
    ammoPerks = [],
    bullets = [],
    playerId, player, otherPlayers = {},
    keys = [],
    arenaSizeSelected, arenaSize,
    meshShrinkSpeed, shrinkSpeed = .01,
    stats,
    user = {},
    speedyStats = {
        type: 'speedy',
        health: 80,
        damage: 40,
        moveSpeed: .17,
        maxSpeed: .4,
        turnSpeed: .1,
        sprintTurnSpeed: .1,
        acceleration: .007,
        staminaDrain: .3,
        staminaRecovery: .025,
        fireSpeed: 7,
        bulletSize: .1,
        bulletSpeed: 1.8,
        magazineSize: 24,
        reloadSpeed: 3400,
        totalBullets: 120,
        maxBullets: 120,
        scopeZoom: 3,
        dblScopeZoom: 2,
        bulletHeight: 1
    },
    assassinStats = {
        type: 'assassin',
        health: 60,
        damage: 280,
        moveSpeed: .14,
        maxSpeed: .25,
        turnSpeed: .07,
        sprintTurnSpeed: .05,
        acceleration: .2,
        staminaDrain: .6,
        staminaRecovery: .1,
        fireSpeed: 120,
        bulletSize: .1,
        bulletSpeed: 2,
        magazineSize: 16,
        reloadSpeed: 1600,
        totalBullets: 72,
        maxBullets: 72,
        scopeZoom: 3,
        dblScopeZoom: 2,
        bulletHeight: 1
    },
    tankStats = {
        type: 'tank',
        health: 95,
        damage: 120,
        moveSpeed: .12,
        maxSpeed: .25,
        turnSpeed: .05,
        sprintTurnSpeed: .04,
        acceleration: .004,
        staminaDrain: .1,
        staminaRecovery: .02,
        fireSpeed: 60,
        bulletSize: 1,
        bulletSpeed: 1.5,
        magazineSize: 9,
        reloadSpeed: 5400,
        totalBullets: 45,
        maxBullets: 45,
        scopeZoom: 3,
        dblScopeZoom: 2,
        bulletHeight: 1
    };

(() => {
    setTimeout(() => {
        permission.classList.add('permissionIn');
        garbage(filter);
    }, 5000)
})()

const getThreeAssets = () => {
    bulletCountDisplay = document.getElementById('bulletCountDisplay');
    bulletCountAnimation = document.getElementsByClassName('bulletCountAnimation')[0];
    emptyGun = new Audio("../../assets/audio/emptyGun.m4a");
    gunSupressor = new Audio("../../assets/audio/gun_supressor.m4a");
    sniper = new Audio("../../assets/audio/Gun2.mp3");
    shotgun = new Audio("../../assets/audio/Gun3.mp3");
    reloadPistol = new Audio("../../assets/audio/reload_pistol.mp3");
    playerSelected = document.getElementsByClassName('form__wrapper__select')[0];
    feed = document.getElementsByClassName('feed')[0];
    feedData = document.getElementsByClassName('feedData')[0];
    gameStroke = new THREE.MeshBasicMaterial({
        color: 0x000000,
        wireframe: true,
        wireframeLinewidth: 2,
    });
    clearRam();
}

const clearRam = () => {
    permission = null;
    form = null;
    formName = null;
    playerTypes = null;
    formButton = null;
    characterButton = null;
    characters = null;
    characterMan = null;
    characterWater = null;
    skinsMan = null;
    skinsWater = null;
    customise = null;
    settings = null;
    backToCustomiseButton = null;
    muteIcon = null;
    introAudio = null;
    p5Sounds = null;
    buttonAudio = null;
    side = null;
    headphone = null;
    navigation = null;
    man = null;
    water = null;
    prevSkin = null;
    nextSkin = null;
}

const garbage = e => {
    e = null;
}

const clearHTML = e => {
    e.innerHTML = '';
}
