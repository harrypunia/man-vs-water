const setAudioPara = () => {
    overlapSounds(gunSupressor);
    overlapSounds(takeDamageAudio);
    reloadPistol.volume = .2;
    healAudio.volume = .1;
    healAudio.playbackRate = 2;
    ammoAudio.volume = .2;
    staminaAudio.volume = .1;
    staminaAudio.playbackRate = 4;
    emptyGun.volume = .2;
    sniper.volume = .2;
    shotgun.volume = .2;
}

const overlapSounds = (audio) => {
    audio.preload = 'auto';
    audio.load();
}
