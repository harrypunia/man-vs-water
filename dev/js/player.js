var player_geo,
    man_mats,
    water_mats = [];
var Player = function (playerID, playerName, playerType, skin, chosenSide) {
    this.playerID = playerID;
    this.username = playerName;
    this.isMainPlayer = false;
    this.mesh;
    this.playerType = playerType;
    this.player_mat;
    this.skin = skin;
    this.chosenSide = chosenSide;

    scope = this;
    this.init = () => {
        console.log(this.playerID, this.username, this.playerType, this.skin, this.chosenSide);
        if (this.chosenSide == 'man') {
            player_geo = new THREE.BoxBufferGeometry(1, 1, 1);
            man_mats = [new THREE.MeshBasicMaterial({
                    map: new THREE.TextureLoader().load("../../assets/img/SVG/man_skin" + this.skin + "_right.svg"),
                    transparent: true,
                }),
            new THREE.MeshBasicMaterial({
                    map: new THREE.TextureLoader().load("../../assets/img/SVG/man_skin" + this.skin + "_left.svg"),
                    transparent: true,
                }),
            new THREE.MeshBasicMaterial({
                    map: new THREE.TextureLoader().load("../../assets/img/SVG/man_skin" + this.skin + "_top.svg"),
                    transparent: true,
                }),
            new THREE.MeshBasicMaterial({
                    map: new THREE.TextureLoader().load("../../assets/img/SVG/man_skin" + this.skin + "_bottom.svg"),
                    transparent: true,
                }),
            new THREE.MeshBasicMaterial({
                    map: new THREE.TextureLoader().load("../../assets/img/SVG/man_skin" + this.skin + "_back.svg"),
                    transparent: true,
                }),
            new THREE.MeshBasicMaterial({
                    map: new THREE.TextureLoader().load("../../assets/img/SVG/man_skin" + this.skin + "_front.svg"),
                    transparent: true,
                })];
            player_mat = new THREE.MeshFaceMaterial(man_mats);
        } else {
            player_geo = new THREE.SphereGeometry(.5, 10, 10);
            player_mat = new THREE.MeshBasicMaterial(0x47d1ea)
        }
        scope.mesh = new THREE.Mesh(player_geo, player_mat);
        scope.meshBorder = new THREE.Mesh(player_geo, gameStroke);
        scope.mesh.position.x = (arenaSize / 2) - (Math.floor(Math.random() * arenaSize));
        scope.mesh.position.y = arenaSize / 2;
        scope.mesh.position.z = (arenaSize / 2) - (Math.floor(Math.random() * arenaSize));
        scope.mesh.add(scope.meshBorder);
        scene.add(scope.mesh);

        if (scope.isMainPlayer) {
            controls = new THREE.PlayerControls(camera, scope.mesh, scope.playerType);
        }
    }
    this.setOrientation = (pos, rot) => {
        if (scope.mesh) {
            scope.mesh.position.copy(pos);
            scope.mesh.rotation.x = rot.x;
            scope.mesh.rotation.y = rot.y;
            scope.mesh.rotation.z = rot.z;
        }
    }
    this.restrict = (activePlayer) => {
        let parameter = arenaSize / 2 - 0.5;
        activePlayer.position.x = activePlayer.position.x <= -parameter ? -parameter : activePlayer.position.x >= parameter ? parameter : activePlayer.position.x;
        activePlayer.position.z = activePlayer.position.z <= -parameter ? -parameter : activePlayer.position.z >= parameter ? parameter : activePlayer.position.z;
    }
}
