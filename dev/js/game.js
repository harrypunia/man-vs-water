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

function listenToPlayer(PlayerData) {
    if (PlayerData.val()) {
        otherPlayers[PlayerData.key].setOrientation(PlayerData.val().orientation.position, PlayerData.val().orientation.rotation);
    }
}

function initOtherPlayers() {
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

function initMainPlayer() {
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

function loadMapsize() {
    if (arenaSizeSelected == 'large') {
        arenaSize = 300;
    } else if (arenaSizeSelected == 'medium') {
        arenaSize = 225;
    } else {
        arenaSize = 150;
    }
    meshShrinkSpeed = shrinkSpeed / arenaSize;
}

function restrictPlayer(player) {
    if (player.position.x <= -((arenaSize / 2) - 0.5)) {
        player.position.x = -((arenaSize / 2) - 0.5);
    } else if (player.position.x >= ((arenaSize / 2) - 0.5)) {
        player.position.x = ((arenaSize / 2) - 0.5);
    }
    if (player.position.z <= -((arenaSize / 2) - 0.5)) {
        player.position.z = -((arenaSize / 2) - 0.5);
    } else if (player.position.z >= ((arenaSize / 2) - 0.5)) {
        player.position.z = ((arenaSize / 2) - 0.5);
    }
}

function playerFall() {
    if (controls.hasLanded == false) {
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

function removePlayers() {
    window.onunload = function () {
        ref.child(playerId).remove();
    };
    window.onbeforeunload = function () {
        ref.child(playerId).remove();
    };
}

function arenaShrink() {
    if (arenaSize > 50) {
        zone.shrink(meshShrinkSpeed);
        arenaSize -= shrinkSpeed;
    } else if (arenaSize <= 50) {
        return false
    }
}

function updateLight() {
    sun.position.set(player.mesh.position.x + arenaSize / 4, 100, player.mesh.position.z + arenaSize / 4);
}
