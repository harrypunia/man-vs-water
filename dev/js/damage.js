const recieveDamage = () => {
    ref.child(playerId).child("orientation").child("takeDamage").on("value", snap => {
        if (snap.val() == true) {
            ref.child(playerId).child("orientation").child("damageType").once("value").then(from => {
                inflictDamage(from.val());
            })
            ref.child(playerId).child("orientation").update({
                takeDamage: false,
                damageType: 0
            });
        }
    });
}

const inflictDamage = from => {
    let targetDamage = from == 'tank' ? tankStats.damage : from == 'assassin' ? assassinStats.damage : speedyStats.damage;
    //------visual
    controls.health -= targetDamage / 10;
    let healthBar = document.getElementsByClassName('health')[0];
    healthBar.style.borderLeft = ((controls.health / 100) * 300) + 'px solid #e04a4a';
    //------
    //-------damage screen
    let damageScreen = document.getElementsByClassName('damage')[0];
    damageScreen.style.opacity = .3;
    setTimeout(() => {
        damageScreen.classList.add('damageOut');
    }, 100)
    setTimeout(() => {
        damageScreen.style.opacity = 0;
        damageScreen.classList.remove('damageOut');
    }, 1000)
    conclude();
}

const giveDamage = key => {
    ref.child(key).child("orientation").update({
        takeDamage: true,
        damageType: stats.type,
        damageFrom: playerId
    });
}

const showDamageEnemy = key => {}

const conclude = () => {
    if (controls.health <= 0) {
        ref.child(playerId).child("orientation").child("damageFrom").once("value").then(snap => {
            console.log(snap.val());
        })
        gameOver('loose');
        ref.child(playerId).remove();
        playerId = null;
        cancelAnimationFrame(animate);
    }
}
