zone = new Zone();
//sky = new Sky();

var Environment = function () {
    this.init = () => {
        addLights();
        loadGround();
        //sky.init();
        zone.init();
        walls = new Wall(Math.floor(arenaSize / 2), 5, player.mesh);
        grass = new Grass((arenaSize / 2), 1);
        getMap();
    }
}
const checkOtherPlayers = () => {
    return new Promise(resolve => {
        ref.on('value', snap => {
            otherPlayersExist = (snap.numChildren() > 1) ? true : false;
            resolve('resolved');
        })
    })
}

async function getMap() {
    var result = await checkOtherPlayers();
    otherPlayersExist ? (walls.download(), grass.download(), walls.init(), grass.init()) : (walls.init(), grass.init(), walls.upload(), grass.upload());
}
