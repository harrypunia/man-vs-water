async function gameOver(dec) {
    let cinematic = await gameOverCinematic(dec);
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
    console.log(filter);
    filter.style.display = 'block';
    filter.style.opacity = '1';
}
