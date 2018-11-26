const openForm = e => {
    user.side = e.currentTarget.id;
    neglectedSide = user.side == 'man' ? 'water' : 'man';
    chosenSideId = document.getElementById(e.currentTarget.id);
    neglectedSideId = document.getElementById(neglectedSide);
    chosenSideId.classList.add('selectSide');
    neglectedSideId.classList.add('deSelectSide');
    side.classList.add('decisionMade');
    user.side == 'man' ? (form.style.left = '60vw', characterMan.style.display = 'block') : (form.style.left = '40vw', characterWater.style.display = 'block');
    form.classList.remove('hideForm');
    //Add Returning abilities
    chosenSideId.addEventListener("click", returnToChoose);
}

const returnToChoose = () => {
    side.style.width = '100vw';
    side.classList.remove('decisionMade');
    chosenSideId.classList.remove('selectSide');
    neglectedSideId.classList.remove('deSelectSide');
    chosenSideId.removeEventListener("click", returnToChoose);
    //Hide Form
    form.classList.add('hideForm');
    backToCustomise();
    resetSkin();
    characterMan.style.display = 'none';
    characterWater.style.display = 'none';
}
//
//const parallax = event => {
//    let x = event.clientX,
//        y = event.clientY,
//        depth = 1000;
//    man.style.left = 10 + (x / depth) + 'vw';
//    man.style.top = 50 + (y / depth) + 'vh';
//    water.style.right = 12 - (x / depth) + 'vw';
//    water.style.top = 50 + (y / depth) + 'vh';
//}
//document.addEventListener("mousemove", parallax, false);
