const recieveDamage = () => {
    ref.child(playerId).child("orientation").child("takeDamage").on("value", snap => {
        if (snap.val() == true) {
            ref.child(playerId).child("orientation").child("damageFrom").once("value").then(from => {
                inflictDamage(from.val());
            })
            ref.child(playerId).child("orientation").update({
                takeDamage: false,
                damageFrom: 0
            });
        }
    });
}

const inflictDamage = from => {
    let targetDamage = from == 'tank' ? tankStats.damage : from == 'assassin' ? assassinStats.damage : speedyStats.damage;
    let damageScreen = document.getElementsByClassName('damage')[0];
    damageScreen.style.opacity = 1;
    //------visual
    controls.health -= targetDamage / 10;
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
        takeDamage: true,
        damageFrom: stats.type
    })
}

const showDamageEnemy = key => {}

const conclude = () => {
    controls.health <= 0 ? gameOver('loose') : 0;
}
