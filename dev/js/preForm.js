const openForm = e => {
    chosenSide = e.currentTarget.id;
    neglectedSide = chosenSide == 'man' ? neglectedSide = 'water' : 'man';
    chosenSideId = document.getElementById(chosenSide);
    neglectedSideId = document.getElementById(neglectedSide);
    chosenSideId.classList.add('selectSide');
    neglectedSideId.classList.add('deSelectSide');
    side.classList.add('decisionMade');
    chosenSide == 'man' ? form.style.left = '60vw' : form.style.left = '40vw';
    form.style.zIndex = 100;
    playerSelected.classList.remove('hideForm');
    document.getElementsByClassName('form')[0].classList.remove('hideForm');

    //Add Returning abilities
    chosenSideId.addEventListener("click", returnToChoose, false);
    displayCharacter(chosenSide);
}

const returnToChoose = () => {
    form.style.zIndex = 1;
    side.style.width = '100vw';
    side.classList.remove('decisionMade');
    chosenSideId.classList.remove('selectSide');
    neglectedSideId.classList.remove('deSelectSide');
    chosenSideId.removeEventListener("click", returnToChoose, false);
    playerSelected.classList.remove('hideForm');
    //Hide Form
    playerSelected.classList.add('hideForm');
    document.getElementsByClassName('form')[0].classList.add('hideForm');
    backToCustomise();
    hideCharacter();
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

const displayCharacter = side => {
    side == 'man' ? characterMan.style.display = 'block' : characterWater.style.display = 'block';
}

const hideCharacter = () => {
    characterMan.style.display = 'none';
    characterWater.style.display = 'none';
}

document.addEventListener("mousemove", parallax, false);
