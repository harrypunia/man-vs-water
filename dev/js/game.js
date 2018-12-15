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
        checkKills();
        removeFaultyPlayers();
    }
    this.update = function () {
        regulatePerks();
        oscillatePerks();
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
            totalPlayers += 1;
            updateTotalPlayers();
            if (playerId != PlayerData.key && !otherPlayers[PlayerData.key]) {
                otherPlayers[PlayerData.key] = new Player(PlayerData.key, PlayerData.val().orientation.userInfo.name, PlayerData.val().orientation.playerInfo.skin, PlayerData.val().orientation.playerInfo.chosenSide);
                otherPlayers[PlayerData.key].init();
                ref.child(PlayerData.key).on("value", listenToPlayer);
                keys.push(PlayerData.key);
                addFeed('new player has joined: ', PlayerData.val().orientation.userInfo.name);
            }
        }
    });
    ref.on("child_removed", PlayerData => {
        if (PlayerData.val()) {
            ref.child(playerId).child("orientation").child("killKey").once("value").then(snap => {
                if (snap.val() != PlayerData.key) {
                    addFeed('a player has left: ', PlayerData.val().orientation.userInfo.name);
                }
            });
            totalPlayers -= 1;
            updateTotalPlayers();
            ref.child(PlayerData.key).off("value", listenToPlayer);
            scene.remove(otherPlayers[PlayerData.key].mesh);
            delete otherPlayers[PlayerData.key];
            for (let i in keys) {
                keys[i] == PlayerData.key ? keys.splice(i, 1) : 0;
                removedPlayers.push(PlayerData.key);
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
        kill: 0,
        killKey: 0
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

var addFeed = (des, target) => {
    feed.style.display = 'flex';
    feed.style.opacity = 1;
    feedData.innerHTML = des + ' <span class="feedImp">' + target + '</span>';
    feedData.style.animation = 'feedIn .4s ease-out';
    feedData.style.animationFillMode = 'forwards';
    setTimeout(() => {
        feedData.style.animation = 'feedOut .4s ease-out';
        feedData.style.animationFillMode = 'forwards';
        feed.style.opacity = 0;
    }, 1500);
    setTimeout(() => {
        feed.style.display = 'none';
        feedData.innerHTML = '';
    }, 2300);
}

const updateTotalPlayers = () => {
    playersOnline.innerHTML = 'Players online: ' + totalPlayers;
}

const checkKills = () => {
    ref.child(playerId).child("orientation").child("kill").on("value", snap => {
        if (snap.val() != 0) {
            addFeed('you just killed', snap.val());
        }
    })
}

const faultyPlayers = () => {
    'use strict';
    for(let k in removedPlayers) {
        ref.once().then(snap => {
            console.log(snap.val());
        })
    }
}

const removeFaultyPlayers = setInterval(faultyPlayers, 1000);