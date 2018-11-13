const allowAudio = e => {
    if (e.currentTarget.id == 'yes') {
        playAudios();
        permitAudio = true;
        buttonAudio.play();
        muteIcon[0].style.display = 'block';
        removePermissionForm('yes');
    } else {
        removePermissionForm('no');
        permitAudio = false;
        muteIcon[1].style.display = 'block';
    }
}

const validateForm = () => {
    var formInput = document.getElementById("fname");
    if (formInput.value == '') {
        showError('form__wrapper__input');
    } else if (!ifMapSelected) {} else {
        user.name = formName.value;
        form.style.display = 'none';
        stopP5();
        pauseAudios();
        removeListeners();
        hideNavigation();
        initThreeJs();
        document.getElementsByClassName('UI')[0].style.display = 'block';
    }
}

const selectPlayer = e => {
    let target = e.currentTarget.id;
    ifMapSelected = true;
    clearPlayerSelections();
    let playerSelectedImage = document.getElementById(target).getElementsByTagName('img')[0];
    playerSelectedImage.classList.add('mapSelected');
    target == 'speedy' ? stats = speedyStats : target == 'assassin' ? stats = assassinStats : stats = tankStats;
    showStats(stats);
}

const clearPlayerSelections = () => {
    for (var i = 0; i < playerTypes.length; i++) {
        playerTypes[i].getElementsByTagName('img')[0].classList.remove('mapSelected');
    }
}

const hideNavigation = () => {
    headphone.style.display = 'none';
    navigation.style.display = 'none';
    form.style.display = 'none';
    side.style.display = 'none';
}

const showError = e => {
    let errorTarget = document.getElementsByClassName(e);
    for (let i = 0; i < errorTarget.length; i++) {
        errorTarget[i].style.animation = '.1s error ease-in-out 3';
        setTimeout(() => {
            let snap = i;
            errorTarget[snap].style.animation = '0';
        }, 90);
    }
}

const stopP5 = () => {
    var garbage = container.removeChild(canvas);
    stopP5Draw = true;
}

const playAudios = () => {
    introAudio.play();
    introAudio.loop = true;
    rain.play();
    rain.volume = .1;
    rain.loop = true;
}

const pauseAudios = () => {
    introAudio.pause();
    rain.pause();
    for (var i = 0; i < p5Sounds.length; i++) {
        p5Sounds[i].pause();
    }
}

const changeAudioPermissions = e => {
    var toggle = e.currentTarget.id;
    if (toggle == 'mute') {
        muteIcon[0].style.display = 'none';
        muteIcon[1].style.display = 'block';
        permitAudio = false;
        pauseAudios();
    } else {
        muteIcon[0].style.display = 'block';
        muteIcon[1].style.display = 'none';
        permitAudio = true;
        playAudios();
    }
}

const openBurgerMenu = () => {
    if (!menuStatus) {
        menu.classList.add('openMenu');
        burger.classList.add('cross');
        menuStatus = true;
    } else {
        menu.classList.remove('openMenu');
        burger.classList.remove('cross');
        menuStatus = false;
    }
}

const removeListeners = () => {
    document.removeEventListener("mousemove", parallax, false);
    window.removeEventListener("keydown", validateForm, false);
    formButton.removeEventListener("click", validateForm, false);
}

const toForm = () => {
    customise.style.transform = 'translate3d(-100%, -50%, 0)';
    settings.style.transform = 'translate3d(0, -50%, 0)';
    backToCustomiseButton.style.display = 'block';
}

const backToCustomise = () => {
    customise.style.transform = 'translate3d(0, -50%, 0)';
    settings.style.transform = 'translate3d(100%, -50%, 0)';
    backToCustomiseButton.style.display = 'none';
    clearPlayerSelections();
    clearStats();
    formName.value = '';
    stats = null;
}

const showStats = activeStat => {
    let statBars = document.getElementsByClassName('stat');
    statBars[0].style.transform = 'translate3d(' + (activeStat.health - 100) + '%, 0, 0)';
    statBars[1].style.transform = 'translate3d(' + (activeStat.damage - 100) + '%, 0, 0)';
    statBars[2].style.transform = 'translate3d(' + (((activeStat.magazineSize / 30) * 100) - 100) + '%, 0, 0)';
    statBars[3].style.transform = 'translate3d(' + ((activeStat.reloadSpeed / 100) - 100) + '%, 0, 0)';
    statBars[4].style.transform = 'translate3d(' + (-((activeStat.fireSpeed / 150) * 100)) + '%, 0, 0)';
    statBars[5].style.transform = 'translate3d(' + (((activeStat.moveSpeed + activeStat.maxSpeed + activeStat.acceleration) * 100) - 100) + '%, 0, 0)';
}

const clearStats = () => {
    let statBars = document.getElementsByClassName('stat');
    for (let i = 0; i < statBars.length; i++) {
        statBars[i].style.transform = 'translate3d(-50%, 0, 0)';
    }
}

formButton.addEventListener("click", validateForm, false);
window.addEventListener('keydown', e => {
    if (e.keyCode == 13 || e.which == 13) {
        validateForm();
    }
}, false);
