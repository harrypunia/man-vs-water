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
        gatherInfo();
        stopP5();
        pauseAudios();
        playGame();
    }
}

const selectMap = e => {
    ifMapSelected = true;
    clearMapSelections();
    let mapSelectedImage = document.getElementById(e.currentTarget.id).getElementsByTagName('img')[0];
    mapSelectedImage.classList.add('mapSelected');
}

const clearMapSelections = () => {
    for (var i = 0; i < maps.length; i++) {
        maps[i].getElementsByTagName('img')[0].classList.remove('mapSelected');
    }
}

const playGame = () => {
    removeListeners();
    initThreeJs();
    displayUI();
    hideNavigation();
}

const displayUI = () => {
    document.getElementsByClassName('UI')[0].style.display = 'block';
}

const hideNavigation = () => {
    headphone.innerHTML = '';
    navigation.innerHTML = '';
    form.innerHTML = '';
    side.innerHTML = '';
}

const gatherInfo = () => {
    playerType = playerSelected.value;
    playerName = formName.value;
    deleteForm();
}

const deleteForm = () => {
    form.style.display = 'none';
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

const confirmPlayerSkin = () => {

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
    clearMapSelections();
    formName.value = '';

}

formButton.addEventListener("click", validateForm, false);
window.addEventListener('keydown', e => {
    if (e.keyCode == 13 || e.which == 13) {
        validateForm();
    }
}, false);
