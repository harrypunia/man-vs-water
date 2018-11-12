const setAudioPara = () => {
    overlapSounds(gunSupressor);
    reloadPistol.volume = .05;
    emptyGun.volume = .05;
    sniper.volume = .05;
    shotgun.volume = .05;
}

const overlapSounds = (audio) => {
    audio.preload = 'auto';
    audio.load();
}
