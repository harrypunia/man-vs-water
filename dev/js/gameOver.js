async function gameOver(dec) {
    let cinematic = await gameOverCinematic(dec);
    displayOutcome()
}

const gameOverCinematic = dec => {
    if (dec == 'win') {} else {}
    return new Promise(resolve => resolve());
}
