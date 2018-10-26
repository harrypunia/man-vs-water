function allowAudio(e) {
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

formButton.addEventListener("click", validateForm, false);
window.addEventListener('keydown', function (e) {
    if (e.keyCode == 13 || e.which == 13) {
        validateForm();
    }
}, false);

function validateForm() {
    var formInput = document.getElementById("fname");
    if (formInput.value == '') {
        showError('form__wrapper__input');
    } else if (!ifMapSelected) {
        //showError('form__wrapper__select-opts');
    } else {
        gatherInfo();
        stopP5();
        pauseAudios();
        //enterLobby();
        playGame();
    }
    formButton.removeEventListener('click', validateForm, false);
}

function selectMap(e) {
    ifMapSelected = true;
    clearMapSelections();
    var mapSelected;
    mapSelected = document.getElementById(e.currentTarget.id);
    mapSelected.classList.add('mapSelected');
}

function enterLobby() {
    playerId = ref.push().key;
    ref.child(playerId).child("orientation").set({
        position: {
            x: 0,
            y: 0,
            z: 0
        },
        rotation: {
            x: 0,
            y: 0,
            z: 0
        }
    });
    console.log(getPlayersJoined());
    if (playersJoined == 0) {
        console.log('new Lobby was created');
        lobbyRef.child("Players").set({
            p1: playerId,
        });
    } else {
        console.log('Lobby already exists');
    }
}

function getPlayersJoined() {
    lobbyRef.on("value", function (snapshot) {
        return snapshot.numChildren()
    })
}

function playGame() {
    initThreeJs();
    displayUI();
    hideNavigation();
}

function displayUI() {
    document.getElementsByClassName('UI')[0].style.display = 'block';
}

function hideNavigation() {
    headphone.innerHTML = '';
    navigation.innerHTML = '';
    form.innerHTML = '';
    side.innerHTML = '';
}

function clearMapSelections() {
    for (var i = 0; i < maps.length; i++) {
        maps[i].classList.remove('mapSelected');
    }
}

function mapSize() {
    for (var i = 0; i < maps.length; i++) {
        if (maps[i].classList.contains('mapSelected')) {
            if (i == 0) return 'large'
            else if (i == 1) return 'medium'
            else return 'small'
        }
    }
}

function gatherInfo() {
    var form = document.getElementsByClassName('form')[0],
        formName = document.getElementById('fname'),
        playerSelected = document.getElementById('playerType');
    playerType = playerSelected.value;
    //Store Form info
    playerName = formName.value;
    arenaSizeSelected = mapSize();

    //Delete form
    form.innerHTML = '';
    form.style.display = 'none';
}

function showError(e) {
    var errorTarget = document.getElementsByClassName(e);
    for (var i = 0; i < errorTarget.length; i++) {
        errorTarget[i].style.animation = '.1s error ease-in-out 3';
        setTimeout(function () {
            var scope = i;
            errorTarget[scope].style.animation = '0';
        }, 90);
    }
}

function stopP5() {
    var garbage = container.removeChild(canvas);
    stopP5Draw = true;
}

function playAudios() {
    introAudio.play();
    introAudio.loop = true;
    rain.play();
    rain.volume = .1;
    rain.loop = true;
}

function pauseAudios() {
    introAudio.pause();
    rain.pause();
    for (var i = 0; i < p5Sounds.length; i++) {
        p5Sounds[i].pause();
    }
}

function removePermissionForm(dec) {
    if (dec == 'yes') {
        permission.style.animation = 'permissionOutYES .4s ease-in';
    } else {
        permission.style.animation = 'permissionOutNO .4s ease-in';
    }
    setTimeout(function () {
        permission.style.display = 'none';
        permission.innerHTML = '';
    }, 390);
    form.style.opacity = 1;
}

function changeAudioPermissions(e) {
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

function openMenu() {
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
