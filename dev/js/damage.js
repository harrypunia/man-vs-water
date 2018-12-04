const recieveDamage = () => {
    ref.child(playerId).child("orientation").child("takeDamage").on("value", snap => {
        if (snap.val() == true) {
            inflictDamage();
            ref.child(playerId).child("orientation").update({
                takeDamage: false
            });
        }
    });
}

const inflictDamage = () => {
    let damageScreen = document.getElementsByClassName('damage')[0];
    damageScreen.style.opacity = 1;
    //------visual
    controls.health -= 5;
    let healthBar = document.getElementsByClassName('health')[0];
    healthBar.style.borderLeft = ((controls.health / 100) * 300) + 'px solid #e04a4a';
    //------
    setTimeout(() => {
        damageScreen.style.opacity = 0;
    }, 100);
    conclude();
}

const giveDamage = key => {
    ref.child(key).child("orientation").update({
        takeDamage: true
    })
}

const showDamageEnemy = key => {}

const conclude = () => {
    controls.health <= 0 ? gameOver('loose') : 0;
}
