zone = new Zone();
sky = new Sky();

var Environment = function () {
    this.init = () => {
        addLights();
        loadGround();
        sky.init();
        zone.init();
        walls = new Wall(Math.floor(arenaSize / 2), 5, player.mesh);
        grass = new Grass((arenaSize / 2), 1);
        if (otherPlayersExist() == true) {
            walls.download();
            walls.init();
        } else {
            walls.init();
            walls.upload();
        }
    }
}

const otherPlayersExist = () => {
    ref.on('value', snap => {
        if (snap.numChildren() > 0) {
            console.log(snap.numChildren());
            return true;
        } else {
            console.log(snap.numChildren());
            return false;
        }
    })
}
