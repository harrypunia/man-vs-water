var player_geo;
var Player = function (id, name, skin, side) {
    this.playerId = id;
    this.username = name;
    this.isMainPlayer = false;
    this.mesh;
    this.playerType = stats.type;
    this.player_mat;
    this.skin = skin;
    this.chosenSide = side;

    scope = this;
    this.init = () => {
        if (this.chosenSide == 'man') {
            player_geo = new THREE.BoxBufferGeometry(1, 1, 1);
            let man_mats = [new THREE.MeshBasicMaterial({
                    map: new THREE.TextureLoader().load("../../assets/img/SVG/man_skin" + this.skin + "_right.svg")
                }),
            new THREE.MeshBasicMaterial({
                    map: new THREE.TextureLoader().load("../../assets/img/SVG/man_skin" + this.skin + "_left.svg")
                }),
            new THREE.MeshBasicMaterial({
                    map: new THREE.TextureLoader().load("../../assets/img/SVG/man_skin" + this.skin + "_top.svg")
                }),
            new THREE.MeshBasicMaterial({
                    map: new THREE.TextureLoader().load("../../assets/img/SVG/man_skin" + this.skin + "_bottom.svg")
                }),
            new THREE.MeshBasicMaterial({
                    map: new THREE.TextureLoader().load("../../assets/img/SVG/man_skin" + this.skin + "_back.svg")
                }),
            new THREE.MeshBasicMaterial({
                    map: new THREE.TextureLoader().load("../../assets/img/SVG/man_skin" + this.skin + "_front.svg")
                })];
            player_mat = new THREE.MeshFaceMaterial(man_mats);
        } else {
            let water_mats = [];
            player_geo = new THREE.SphereGeometry(.5, 10, 10);
            player_mat = new THREE.MeshBasicMaterial({
                color: 0x47d1ea,
                transparent: true
            });
        }
        scope.mesh = new THREE.Mesh(player_geo, player_mat);
        scope.meshBorder = new THREE.Mesh(player_geo, gameStroke);
        user.side == 'man' ? scope.mesh.position.set(10 - (arenaSize / 2), arenaSize / 2, (Math.random() * arenaSize) - (arenaSize / 2)) : scope.mesh.position.set((arenaSize / 2) - 10, arenaSize / 2, (Math.random() * arenaSize) - (arenaSize / 2));
        scope.mesh.add(scope.meshBorder);
        scene.add(scope.mesh);
        if (scope.isMainPlayer) {
            controls = new THREE.PlayerControls(camera, scope.mesh, stats);
        }
    }
    this.setOrientation = (pos, rot) => {
        if (scope.mesh) {
            scope.mesh.position.copy(pos);
            scope.mesh.rotation.y = rot;
        }
    }
    this.restrict = activePlayer => {
        let parameter = arenaSize / 2 - 0.5;
        activePlayer.position.x = activePlayer.position.x <= -parameter ? -parameter : activePlayer.position.x >= parameter ? parameter : activePlayer.position.x;
        activePlayer.position.z = activePlayer.position.z <= -parameter ? -parameter : activePlayer.position.z >= parameter ? parameter : activePlayer.position.z;
    }
}
