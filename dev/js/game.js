environment = new Environment();

var Game = function () {
    this.init = function () {
        setAudioPara();
        loadMapsize();
        initMainPlayer();
        initOtherPlayers();
        environment.init();
        controls.init();
    }
    this.update = function () {
        playerFall();
        removePlayers();
        updateLight();
        walls.applyPhysics(.2); //Parameters: (repelForce)
        bulletPhysics(walls.list, bulletSize);
        arenaShrink();
        player.restrict(player.mesh);
    }
}

const listenToPlayer = (PlayerData) => {
    if (PlayerData.val()) {
        otherPlayers[PlayerData.key].setOrientation(PlayerData.val().orientation.position, PlayerData.val().orientation.rotation);
    }
}

const initOtherPlayers = () => {
    ref.on("child_added", function (PlayerData) {
        if (PlayerData.val()) {
            if (playerId != PlayerData.key && !otherPlayers[PlayerData.key]) {
                otherPlayers[PlayerData.key] = new Player(PlayerData.key);
                otherPlayers[PlayerData.key].init();
                ref.child(PlayerData.key).on("value", listenToPlayer);
            }
        }
    });
    ref.on("child_removed", function (PlayerData) {
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
    player = new Player(playerId, playerName, playerType);
    player.isMainPlayer = true;
    player.init();
}

const loadMapsize = () => {
    arenaSize = arenaSizeSelected == 'large' ? 300 : arenaSizeSelected == 'medium' ? 225 : 150;
    meshShrinkSpeed = shrinkSpeed / arenaSize;
}

const restrictPlayer = (player) => {
    let parameter = arenaSize / 2 - 0.5;
    player.position.x = player.position.x <= -parameter ? -parameter : player.position.x >= parameter ? parameter : null;
    player.position.z = player.position.z <= -parameter ? -parameter : player.position.z >= parameter ? parameter : null;
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

const removePlayers = () => {
    window.onunload = function () {
        ref.child(playerId).remove();
    };
    window.onbeforeunload = function () {
        ref.child(playerId).remove();
    };
}

const arenaShrink = () => {
    arenaSize > 50 ? zone.shrink(meshShrinkSpeed) : false;
    arenaSize -= shrinkSpeed;
}

const updateLight = () => {
    sun.position.set(player.mesh.position.x + arenaSize / 4, 100, player.mesh.position.z + arenaSize / 4);
}
