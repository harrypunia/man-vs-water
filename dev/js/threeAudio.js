var emptyGun = new Audio("../../assets/audio/emptyGun.m4a"),
    gunSupressor = new Audio("../../assets/audio/gun_supressor.m4a"),
    sniper = new Audio("../../assets/audio/Gun2.mp3"),
    shotgun = new Audio("../../assets/audio/Gun3.mp3"),
    reloadPistol = new Audio("../../assets/audio/reload_pistol.mp3");

function setAudioPara() {
    overlapSounds(gunSupressor);
    reloadPistol.volume = .05;
    emptyGun.volume = .05;
    sniper.volume = .05;
    shotgun.volume = .05;
}

function overlapSounds(audio) {
    audio.preload = 'auto';
    audio.load();
}
