const updateHealth = () => {
    let healthBar = document.getElementsByClassName('health')[0];
    healthBar.style.borderLeft = ((controls.health / stats.health) * 300) + 'px solid #e04a4a';
    healthBar.style.transform = 'scale(1.2)';
    setTimeout(() => {
        healthBar.style.transform = 'scale(1)';
    }, 500)
}

var updateStamina = () => {
    let staminaBar = document.getElementsByClassName('stamina')[0];
    staminaBar.style.borderLeft = ((controls.stamina / 100) * 300) + 'px solid #4e7fdd';
    if (controls.stamina < 100) {
        staminaBar.style.transform = 'scale(.9)';
    } else {
        staminaBar.style.transform = 'scale(1)';
    }

}

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
    let DM = takeDamageAudio.cloneNode();
    DM.volume = 0.1;
    DM.play();
    let targetDamage = from == 'tank' ? tankStats.damage : from == 'assassin' ? assassinStats.damage : speedyStats.damage;
    //------visual
    controls.health -= targetDamage / 10;
    updateHealth();
    //-------damage screen
    let damageScreen = document.getElementsByClassName('damage')[0];
    damageScreen.style.transition = '0s';
    damageScreen.style.opacity = .3;
    setTimeout(() => {
        damageScreen.style.transition = 'opacity .8s';
        if (controls.health / stats.health <= .4) {
            damageScreen.style.opacity = 0.2;
        } else {
            damageScreen.style.opacity = 0;
        }
    }, 500)
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

const dyingInfo = () => {
    ref.child(playerId).child("orientation").child("damageFrom").once("value").then(snap => {
        ref.child(snap.val()).child("orientation").update({
            kill: user.name,
            killKey: playerId
        })
        return new Promise(resolve => {
            resolve();
        })
    })
}

async function terminate() {
    await dyingInfo();
    gameOver('loose');
    ref.child(playerId).remove();
    cancelAnimationFrame(animate);
}

const conclude = () => {
    if (controls.health <= 0) {
        terminate();
    }
}
