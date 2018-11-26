async function gameOver(dec) {
    let cinematic = await gameOverCinematic(dec);
    displayOutcome()
}

const gameOverCinematic = dec => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 4000);
    })
}
