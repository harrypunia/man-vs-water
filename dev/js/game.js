environment = new Environment();

var Game = function () {
    this.init = function () {
        setAudioPara();
        loadMapsize();
        initMainPlayer();
        environment.init();
        controls.init();
        window.onunload = () => {
            ref.child(playerId).remove();
            console.log('removed a player');
        }
        window.onbeforeunload = () => {
            ref.child(playerId).remove();
            console.log('removed a player');
        }
    }
    this.update = function () {
        initOtherPlayers();
        playerFall();
        updateLight();
        walls.applyPhysics(.2);
        bulletPhysics(walls.list, bulletSize);
        arenaShrink();
        player.restrict(player.mesh);
    }
}

const listenToPlayer = PlayerData => {
    PlayerData.val() ? otherPlayers[PlayerData.key].setOrientation(PlayerData.val().orientation.position, PlayerData.val().orientation.rotation) : false;
}

const initOtherPlayers = () => {
    ref.on("child_added", PlayerData => {
        if (PlayerData.val()) {
            if (playerId != PlayerData.key && !otherPlayers[PlayerData.key]) {
                //gun.giveDamage();
                giveDamage(PlayerData.val().orientation.position);
                otherPlayers[PlayerData.key] = new Player(PlayerData.key, PlayerData.val().info.userInfo.name, PlayerData.val().info.playerInfo.playerType, PlayerData.val().info.playerInfo.skin, PlayerData.val().info.playerInfo.chosenSide);
                otherPlayers[PlayerData.key].init();
                ref.child(PlayerData.key).on("value", listenToPlayer);
            }
        }
    });
    ref.on("child_removed", PlayerData => {
        if (PlayerData.val()) {
            ref.child(PlayerData.key).off("value", listenToPlayer);
            scene.remove(otherPlayers[PlayerData.key].mesh);
            delete otherPlayers[PlayerData.key];
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
            x: 0,
            y: 0,
            z: 0
        }
    });
    ref.child(playerId).child("info").set({
        userInfo: {
            name: playerName
        },
        playerInfo: {
            skin: 1,
            chosenSide: chosenSide,
            playerType: playerType
        }
    });
    player = new Player(playerId, playerName, playerType, 1, chosenSide);
    player.isMainPlayer = true;
    player.init();
}

const loadMapsize = () => {
    arenaSize = arenaSizeSelected == 'large' ? 300 : arenaSizeSelected == 'medium' ? 225 : 150;
    meshShrinkSpeed = shrinkSpeed / arenaSize;
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

const arenaShrink = () => {
    arenaSize > 50 ? (zone.shrink(meshShrinkSpeed), arenaSize -= shrinkSpeed) : false;
}

const updateLight = () => {
    sun.position.set(player.mesh.position.x + arenaSize / 4, 100, player.mesh.position.z + arenaSize / 4);
}
