environment = new Environment();

var Game = function () {
    this.init = function () {
        setAudioPara();
        loadMapsize();
        initMainPlayer();
        initOtherPlayer();
        environment.init();
        controls.init();
        removePlayer();
    }
    this.update = function () {
        playerFall();
        walls.applyPhysics(.2);
        bulletPhysics(walls.list);
        player.restrict(player.mesh);
    }
}

const listenToPlayer = PlayerData => {
    PlayerData.val() ? otherPlayers[PlayerData.key].setOrientation(PlayerData.val().orientation.position, PlayerData.val().orientation.rotation.y) : false;
}

const initOtherPlayer = () => {
    ref.on("child_added", PlayerData => {
        if (PlayerData.val()) {
            if (playerId != PlayerData.key && !otherPlayers[PlayerData.key]) {
                otherPlayers[PlayerData.key] = new Player(PlayerData.key, PlayerData.val().orientation.userInfo.name, PlayerData.val().orientation.playerInfo.skin, PlayerData.val().orientation.playerInfo.chosenSide);
                otherPlayers[PlayerData.key].init();
                ref.child(PlayerData.key).on("value", listenToPlayer);
                keys.push(PlayerData.key);
            }
        }
    });
    ref.on("child_removed", PlayerData => {
        if (PlayerData.val()) {
            ref.child(PlayerData.key).off("value", listenToPlayer);
            scene.remove(otherPlayers[PlayerData.key].mesh);
            delete otherPlayers[PlayerData.key];
            for (let i in keys) {
                keysGarbage.push(PlayerData.key);
                keys[i] == PlayerData.key ? keys.splice(i, 1) : 0;
            }
        }
    });
}

const initMainPlayer = () => {
    playerId = ref.push().key;
    ref.child(playerId).child("orientation").set({
        position: {
            x: 0,
            y: 0,
            z: 0
        },
        rotation: {
            y: 0
        },
        userInfo: {
            name: user.name
        },
        playerInfo: {
            skin: skinIndex,
            chosenSide: user.side,
            playerType: stats.type
        },
        takeDamage: false,
        damageFrom: 0,
        damageType: 0,
        kill: 0
    });
    player = new Player(playerId, user.name, user.skin, user.side);
    player.isMainPlayer = true;
    player.init();
    recieveDamage();
}

const loadMapsize = () => {
    arenaSize = 150
    meshShrinkSpeed = shrinkSpeed / arenaSize;
}

const removePlayer = () => {
    window.onunload = () => ref.child(playerId).remove();
    window.onbeforeunload = () => ref.child(playerId).remove();
    window.onoffline = () => ref.child(playerId).remove();
}

const playerFall = () => {
    if (!controls.hasLanded) {
        if (player.mesh.position.y > 1) {
            controls.update();
            controls.access(4, .5, 4);
            player.mesh.position.y--;
            if (player.mesh.position.y <= 2) {
                player.mesh.position.y = 0.5;
                controls.access(4, .5, 4);
                controls.hasLanded = true;
            }
        }
    }
}

//const arenaShrink = () => {
//    arenaSize > 50 ? (zone.shrink(meshShrinkSpeed), arenaSize -= shrinkSpeed) : false;
//}

//const updateLight = () => {
//    sun.position.set(player.mesh.position.x + arenaSize / 4, 100, player.mesh.position.z + arenaSize / 4);
//}
