async function gameOver(dec) {
    let cinematic = await gameOverCinematic(dec);
    let damageScreen = document.getElementsByClassName('damage')[0];
    damageScreen.style.display = 'none';
    displayOutcome()
}

const gameOverCinematic = dec => {
    let filter = document.getElementsByClassName('filter')[0];
    if (dec == 'win') {
        filter.classList.add('pan');
    } else {}
    return new Promise(resolve => resolve());
}

const test = () => {
    let filter = document.getElementsByClassName('filter')[0];
    filter.style.display = 'block';
    filter.style.opacity = '1';
}
