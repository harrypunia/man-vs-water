zone = new Zone();
sky = new Sky();

var Environment = function () {
    this.init = () => {
        let otherPlayersExist = true;
        addLights();
        loadGround();
        sky.init();
        zone.init();
        walls = new Wall(Math.floor(arenaSize / 2), 5, player.mesh);
        grass = new Grass((arenaSize / 2), 1);
        if (otherPlayersExist) {
            walls.download();
            walls.init();
        } else {
            walls.init();
            walls.upload();
        }
    }
}